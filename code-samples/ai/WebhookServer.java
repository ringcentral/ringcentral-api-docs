package AIServer;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.eclipse.jetty.server.Request;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.handler.AbstractHandler;

public class WebhookServer extends AbstractHandler
{
    public static void main( String[] args ) throws Exception
    {
        Server server = new Server(3000);
        server.setHandler(new WebhookServer());
        server.start();
        server.join();
    }

    @Override
    public void handle(String target, Request baseRequest, HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException
    {
        response.setStatus(HttpServletResponse.SC_OK);
        if (request.getMethod() == "POST" && request.getPathInfo().equals("/webhook"))
        {
            String body = request.getReader().lines().collect( java.util.stream.Collectors.joining(System.lineSeparator()) );
            System.out.println(body);
        }
        baseRequest.setHandled(true);
    }
}
