using Microsoft.EntityFrameworkCore;
using System.Runtime.CompilerServices;

namespace aspnetserver.Data
{
    internal static class PostsRepository
    {
        //read operation to get all post asynichronous
        internal async static Task<List<Post>> GetPostsAsync()//To return a list of type post
        {
            //Using for clean up on garbage collector after use
            using(var db = new AppDBContext())
            {
                return await db.Posts.ToListAsync();
            }
        }

        //Get a single post by ID
        internal async static Task<Post> GetPostByIdAsync(int postId)
        {
            using (var db = new AppDBContext()) 
            {
                //Can return null
                return await db.Posts.SingleOrDefaultAsync(post => post.PostId == postId);
            }
        }

        //create a new post returns true if post was created
        internal async static Task<bool> CreatePostAsync(Post postToCreate)
        {
            using(var db = new AppDBContext())
            {
                //Trying to add a post
                try
                {
                    await db.Posts.AddAsync(postToCreate);
                    //If the amount of changes is greater than or equal to 1 it works
                    return await db.SaveChangesAsync() >= 1; //If it isnt its false
                }
                catch (Exception e) 
                {
                    return false;
                }
            }
        }
        //Update Post Method
        internal async static Task<bool> UpdatePostAsync(Post postToUpdate)
        {
            using (var db = new AppDBContext())
            {
                //Trying to add a post
                try
                {
                    //Call Update Method
                    db.Posts.Update(postToUpdate);

                    return await db.SaveChangesAsync() >= 1; //If it isnt >=  1its false
                }
                catch (Exception e)
                {
                    return false;
                }
            }
        }
        //Delete Post Async
        internal async static Task<bool> DeletePostAsync(int postId)
        {
            using (var db = new AppDBContext())
            {
                //Trying to add a post
                try
                {
                    //Calls the Get Post ID method
                    Post postToDelete = await GetPostByIdAsync(postId);

                    //Deletes posts from database
                    db.Remove(postToDelete);

                    return await db.SaveChangesAsync() >= 1; 
                }
                catch (Exception e)
                {
                    return false;
                }
            }
        }

    }
}
