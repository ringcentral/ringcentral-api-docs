using System;
using System.IO;
using System.Text;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Primitives;
using Newtonsoft.Json;

namespace server
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment()) app.UseDeveloperExceptionPage();

            app.Run( async (context) =>
            {
                if (context.Request.Path == "/webhook" && context.Request.Method == "POST")
                {
                    using (StreamReader reader = new StreamReader(context.Request.Body, Encoding.UTF8))
                    {
                        var eventPayload = await reader.ReadToEndAsync();
                        dynamic jsonObj = JsonConvert.DeserializeObject(eventPayload);
                        Console.WriteLine("JobId: " + jsonObj.jobId);
                        Console.WriteLine("Status: " + jsonObj.status);
                        Console.WriteLine("API: " + jsonObj.api);
                        Console.WriteLine("creationTime: " + jsonObj.creationTime);
                        Console.WriteLine("completionTime: " + jsonObj.completionTime);
                        Console.WriteLine("expirationTime: " + jsonObj.expirationTime);
                        Console.WriteLine("==== RESPONSE ====");
                        Console.WriteLine(jsonObj.response);
                    }
                }
            });
        }
    }
}
