using System.ComponentModel.DataAnnotations;

namespace aspnetserver.Data
{
    //internal: can only be available in this project
    //sealed: cannot be inherited from
    internal sealed class Post
    {
        [Key]
        public int PostId { get; set; }

        [Required]
        //set max length for variable data
        [MaxLength(100)]
        //Initialize as string empty which is just an empty string
        public string Title { get; set; } = string.Empty;

        [Required]
        [MaxLength(100000)]
        public string Content { get; set; } = string.Empty;
    }
}
