using aspnetserver.Data;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using Swashbuckle.AspNetCore.SwaggerUI;

var builder = WebApplication.CreateBuilder(args);

//Cors Configuration
builder.Services.AddCors(options =>
{
    options.AddPolicy("CORSPolicy", 
        builder =>
        {
            builder
            .AllowAnyMethod()
            .AllowAnyHeader()
            .WithOrigins("http://localhost:3000", "https://appname.azurestaticapps.net");
        });
});

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
//Improving swagger gen ui
builder.Services.AddSwaggerGen(SwaggerGenOptions => 
{
    //Create a title and version number
    SwaggerGenOptions.SwaggerDoc("v1", new OpenApiInfo { Title = "ASP.NET React Project", Version = "v1" });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseSwagger();
//Configure the title of the top of the page and endpoint
app.UseSwaggerUI(SwaggerUIOptions =>
{
    SwaggerUIOptions.DocumentTitle = "ASP.NET React Project"; 
    //Definition/Description of Endpoint
    SwaggerUIOptions.SwaggerEndpoint("/swagger/v1/swagger.json", "Web API serving a very simple Post Model.");
    SwaggerUIOptions.RoutePrefix = string.Empty;
});

app.UseHttpsRedirection();

//Tells Program to used cors policy
app.UseCors("CORSPolicy");

//Get all post endpoint passing nothing within async call
app.MapGet("/get-all-posts", async () => await PostsRepository.GetPostsAsync())
    .WithTags("Posts Endpoints");

//Get a post by ID with postId within async call
app.MapGet("/get-post-by-id/{postId}", async (int postId) =>
{
    //Calls the Get Post By ID Method
    Post postToReturn = await PostsRepository.GetPostByIdAsync(postId);

    //Checks if the post recieved is not null
    if(postToReturn != null)
    {
        //Ok returns the status code 200 if successful
        return Results.Ok(postToReturn);
    }
    else
    {
        //BadRequest returns error 400 if Id is not found.
        return Results.BadRequest();
    }
}).WithTags("Posts Endpoints");


//Create Post Endpoint
app.MapPost("/create-post", async (Post postToCreate) =>
{
    //Calls the Create post method to see if its true or false
    bool createSucessful = await PostsRepository.CreatePostAsync(postToCreate);

    //Checks if the post created is true
    if (createSucessful)
    {
        //Ok returns the status code 200 if successful
        return Results.Ok("Create Successful");
    }
    else
    {
        //BadRequest returns error 400 if Id is not found.
        return Results.BadRequest();
    }
}).WithTags("Posts Endpoints");

//Update Post Endpoint
app.MapPut("/update-post", async (Post postToUpdate) =>
{
    //Calls the Update post method to see if its true or false
    bool updateSucessful = await PostsRepository.UpdatePostAsync(postToUpdate);

    //Checks if the post updated is true
    if (updateSucessful)
    {
        //Ok returns the status code 200 if successful
        return Results.Ok("Update Successful");
    }
    else
    {
        //BadRequest returns error 400 if Id is not found.
        return Results.BadRequest();
    }
}).WithTags("Posts Endpoints");

//Delete Post Endpoint
app.MapDelete("/delete-post-by-id/{postId}", async (int postId) =>
{
    //Calls the Delete post method to see if its deleted 
    bool deleteSucessful = await PostsRepository.DeletePostAsync(postId);

    //Checks if the post updated is true
    if (deleteSucessful)
    {
        //Ok returns the status code 200 if successful
        return Results.Ok("Delete Successful");
    }
    else
    {
        //BadRequest returns error 400 if Id is not found.
        return Results.BadRequest();
    }
}).WithTags("Posts Endpoints");

app.Run();

