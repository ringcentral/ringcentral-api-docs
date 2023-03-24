import com.ringcentral.RestClient;
import com.ringcentral.RestException;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.ringcentral.definitions.TokenInfo;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.eclipse.jetty.server.Request;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.handler.AbstractHandler;

import java.io.IOException;
import java.util.Arrays;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

public class AuthorizationFlow extends AbstractHandler {
  static RestClient rc;
  private static String TOKEN_KEY = "rc-token";
  // Make sure this is the same URL as the one i
  private static String REDIRECT_URI = System.getenv("RC_REDIRECT_URL"); 

  public static void main(String[] args) throws Exception {
    rc = new RestClient( System.getenv("RC_CLIENT_ID"),
			 System.getenv("RC_CLIENT_SECRET"),
			 System.getenv("RC_SERVER_URL") );
    try {
      Server server = new Server(5000);
      server.setHandler(new AuthorizationFlow());
      server.start();
      server.join();
    }
    catch (RestException | IOException e) {
      e.printStackTrace();
    }
  }

  @Override
  public void handle(String target, Request baseRequest, HttpServletRequest request, HttpServletResponse response) throws IOException {
    response.setContentType("text/html; charset=utf-8");
    response.setStatus(HttpServletResponse.SC_OK);
    baseRequest.setHandled(true);
    Cookie[] cookiesArray = request.getCookies();
    List<Cookie> cookies = Arrays.asList(cookiesArray);
    List<Cookie> filteredCookies = cookies.stream().filter(c -> c.getName().equals(TOKEN_KEY)).collect(Collectors.toList());
    String requestUri = request.getRequestURI();

    if (filteredCookies.size() > 0) {
      String base64String = filteredCookies.get(0).getValue();
      byte[] decodedBytes = Base64.getDecoder().decode(base64String);
      String tokenString = new String(decodedBytes);
      rc.token = JSON.parseObject(tokenString, TokenInfo.class);
    } else if (!requestUri.equals("/oauth2callback")) {
      response.getWriter().println("<h2>RingCentral Authorization Code Flow Authentication</h2>"
        + "<a href=\"" + rc.authorizeUri(REDIRECT_URI)
        + "\"><bold>Login using RingCentral Account</bold></a>");
      return;
    }
    System.out.println(requestUri);
    switch (requestUri) {
      case "/":
        response.getWriter().println("<b><a href=\"/logout\">Logout</a></b>\n" +
          "<h2>Call APIs</h2>\n" +
          "<ul>\n" +
          "<li><a href=\"/test?api=extension\">Read Extension Info</a></li>\n" +
          "<li><a href=\"/test?api=extension-call-log\">Read Extension Call Log</a></li>\n" +
          "<li><a href=\"/test?api=account-call-log\">Read Account Call Log</a></li>\n" +
          "</ul>");
        break;
      case "/oauth2callback":
        String code = request.getParameter("code");
        try {
          rc.authorize(code, REDIRECT_URI);
        } catch (RestException e) {
          e.printStackTrace();
        }
        String base64String = Base64.getEncoder().encodeToString(JSON.toJSONString(rc.token).getBytes());
        Cookie cookie2 = new Cookie(TOKEN_KEY, base64String);
        cookie2.setMaxAge(999999999);
        response.addCookie(cookie2);
        response.sendRedirect("/");
        break;
      case "/test":
        String api = request.getParameter("api");
        String result = "";
        switch (api) {
          case "extension":
            try {
              result = JSON.toJSONString(rc.restapi().account().extension().list(), SerializerFeature.PrettyFormat);
            } catch (RestException e1) {
              // TODO Auto-generated catch block
              e1.printStackTrace();
            }
            break;
          case "extension-call-log":
            try {
              result = JSON.toJSONString(rc.restapi().account().extension().callLog().list(), SerializerFeature.PrettyFormat);
            } catch (RestException e1) {
              // TODO Auto-generated catch block
              e1.printStackTrace();
            }
            break;
          case "account-call-log":
            try {
              result = JSON.toJSONString(rc.restapi().account().callLog().list(), SerializerFeature.PrettyFormat);
            } catch (RestException e1) {
              // TODO Auto-generated catch block
              e1.printStackTrace();
            }
            break;
        }

        response.getWriter().println("<pre>" + result + "</pre>");
        break;
      case "/logout":
        try {
          rc.revoke();
        } catch (RestException e) {
          e.printStackTrace();
        }
        Cookie cookie = new Cookie(TOKEN_KEY, "");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
        response.sendRedirect("/");
        break;
      default:
        response.setStatus(HttpServletResponse.SC_NOT_FOUND);
        break;
    }
  }
}
