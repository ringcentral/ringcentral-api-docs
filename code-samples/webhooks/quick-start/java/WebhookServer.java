package com.ringcentral;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.eclipse.jetty.server.Request;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.handler.AbstractHandler;

public class WebhookServer extends AbstractHandler
{
    @Override
    public void handle(String target, Request baseRequest,
                       HttpServletRequest request, HttpServletResponse response)
        throws IOException, ServletException
    {
        response.setStatus(HttpServletResponse.SC_OK);
        response.setHeader("Validation-Token", request.getHeader("Validation-Token"));
        if (request.getMethod() == "POST")
        {
            String body = request.getReader().lines().collect(
                   java.util.stream.Collectors.joining(System.lineSeparator())
            );
            System.out.println(body);
        }
        response.getWriter().println("OK");
        baseRequest.setHandled(true);
    }

    public static void main( String[] args ) throws Exception
    {
        Server server = new Server(5000);
        server.setHandler(new WebhookServer());
        server.start();
        server.join();
    }
}
