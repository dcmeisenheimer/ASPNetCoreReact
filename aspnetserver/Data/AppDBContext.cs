using Microsoft.EntityFrameworkCore;

namespace aspnetserver.Data
{
    //Application DB Context Class
    internal sealed class AppDBContext : DbContext
    {
        public DbSet<Post> Posts { get; set; }

        //Override to use SQLite Nuget package as database connection
        protected override void OnConfiguring(DbContextOptionsBuilder dbContextOptionsBuilder) => dbContextOptionsBuilder.UseSqlite("Data Source=./Data/AppDB.db");

        //adding example data to our database
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //will post 6 seeds
            Post[] postsToSeed = new Post[6];

            for(int i = 1; i <= 6; i++) 
            {
                postsToSeed[i - 1] = new Post
                {
                    PostId = i,
                    Title = $"Post {i}",
                    Content = $"This is post {i} and it has some very interesting content."
                };
            }

            modelBuilder.Entity<Post>().HasData(postsToSeed);

        }
    }
}
