using Controller;
using Model;
using Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<BeltsServices>();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

var summaries = new BeltController();
app.MapGet("/belt", async () =>
{

    var forecast = await summaries.GetBeltList();
    System.Console.WriteLine("", forecast);
    return forecast;

})
.WithName("Belt")
.WithOpenApi();

app.Run();
