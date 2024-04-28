using Controller;
using Model;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var MyAllowSpecificOrigins = "_matApi";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
     policy =>
     {
         policy.WithOrigins("http://localhost:5173", "https://localhost:7091")
         .AllowAnyHeader()
         .AllowAnyMethod();
     });
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors(MyAllowSpecificOrigins);
app.UseHttpsRedirection();

var summaries = new BeltController();
app.MapGet("/api/belt", async () =>
{
    var forecast = await summaries.GetBeltList();
    System.Console.WriteLine("", forecast);
    return forecast;
})
.WithName("Belt")
.WithOpenApi();

app.MapPost("/api/insert/belt", async (Belt belt) =>
{
    await summaries.InserteBelt(belt);
}).WithName("Insert").WithOpenApi();

app.MapDelete("/api/delete/{beltId}", async (int beltId) =>
{
    await summaries.DeleteAsync(beltId);
}).WithName("Delete").WithOpenApi();

app.MapGet("/api/belt/{beltId}", async (int beltId) =>
{
    return await summaries.GetBeltAsync(beltId);
});

app.Run();
