using System;
using System.IO;
using System.Text;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Primitives;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container if needed
builder.Services.AddRouting(); // Example: if you need routing services

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.Run(async (context) =>
{
    context.Request.Headers.TryGetValue("Validation-Token", out StringValues validationToken);
    context.Response.Headers.Add("Validation-Token", validationToken);

    if (context.Request.Path == "/webhook" && context.Request.Method == "POST")
    {
        using (StreamReader reader = new StreamReader(context.Request.Body, Encoding.UTF8))
        {
            var eventPayload = await reader.ReadToEndAsync();
            Console.WriteLine(eventPayload);
        }
    }
});

app.Run();