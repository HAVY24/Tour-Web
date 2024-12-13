using System;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using WebBackendProject.DTO.Post;
using WebBackendProject.Models;
using WebBackendProject.Models.DTO;

namespace WebBackendProject.Controllers
{
    [RoutePrefix("api/post")]
    public class PostApiController : ApiController
    {
        private DbAppContext db = new DbAppContext();

        [AllowAnonymous]
        [HttpGet]
        [Route("posts/{flag}")]
        public async Task<IHttpActionResult> GetPosts(int flag)
        {
            var posts = await db.BlogPosts
                .Where(p => p.User.IsDeleted == false && (flag == 1 ? p.Status == "accept" : p.Status == "waiting"))
                .Select(p => new
                {
                    p.User.UserProfile.FirstName,
                    p.User.UserProfile.LastName,
                    p.User.UserProfile.Avatar,
                    UserId = p.User.Id,
                    p.Owner,
                    p.Id,
                    p.Title,
                    p.Datetime,
                    p.Image,
                    p.Content,
                    p.Hashtags,
                    p.Status,
                })
                .ToListAsync();

            var formattedPosts = posts.Select(post => new
            {
                post.FirstName,
                post.LastName,
                post.Avatar,
                post.UserId,
                post.Owner,
                post.Id,
                post.Title,
                Datetime = post.Datetime.HasValue
                    ? post.Datetime.Value.ToString("MMMM dd, yyyy hh:mm tt")
                    : "No Date",
                post.Image,
                post.Content,
                post.Hashtags,
                post.Status,
            }).ToList();

            return Ok(formattedPosts);
        }

        [JwtAuthorize("admin", "user")]
        [HttpGet]
        [Route("detail/{id}")]
        public async Task<IHttpActionResult> GetPostDetail(int id)
        {
            var post = await db.BlogPosts
                .Select(p => new
                {
                    p.User.UserProfile.FirstName,
                    p.User.UserProfile.LastName,
                    p.User.UserProfile.Avatar,
                    p.Owner,
                    p.Id,
                    p.Title,
                    p.Datetime,
                    p.Image,
                    p.Content,
                    p.Hashtags,
                })
                .FirstOrDefaultAsync(model => model.Id == id);

            if (post == null)
            {
                return NotFound();
            }

            var formattedPost = new
            {
                post.FirstName,
                post.LastName,
                post.Owner,
                post.Avatar,
                post.Id,
                post.Title,
                Datetime = post.Datetime?.ToString("MMMM dd, yyyy hh:mm tt"),
                post.Image,
                post.Content,
                post.Hashtags,
            };

            return Ok(formattedPost);
        }

        [HttpGet]
        [Route("get/deleted/{user_id}")]
        public async Task<IHttpActionResult> GetDeletedPost(int user_id)
        {
            var posts = await db.BlogPosts
                .Where(p => p.User.Id == user_id && p.IsDeleted == true)
                .Select(p => new
                {
                    p.User.UserProfile.FirstName,
                    p.User.UserProfile.LastName,
                    p.User.UserProfile.Avatar,
                    p.Owner,
                    p.Id,
                    p.Title,
                    p.Datetime,
                    p.Image,
                    p.Content,
                    p.Hashtags,
                    p.DeletedAt
                })
                .ToListAsync();

            if (!posts.Any())
            {
                return NotFound();
            }

            return Ok(posts);
        }

        [JwtAuthorize("admin", "user")]
        [HttpPost]
        [Route("create")]
        public async Task<IHttpActionResult> CreatePost(PostCreateDTO postToCreate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid post data");
            }

            postToCreate.post.Datetime = DateTime.UtcNow;
            postToCreate.post.CreatedAt = DateTime.UtcNow;
            postToCreate.post.UpdatedAt = DateTime.UtcNow;

            var user = await db.Users.FindAsync(postToCreate.user_id);
            if (user == null)
            {
                return BadRequest("User not found");
            }

            postToCreate.post.User = user;
            postToCreate.post.Status = user.Role == "admin" ? "accept" : "waiting";

            db.BlogPosts.Add(postToCreate.post);
            await db.SaveChangesAsync();

            return Ok(new { message = "success" });
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("user/{user_id}")]
        public async Task<IHttpActionResult> GetPostsByUserId(int? user_id)
        {
            if (user_id == null)
            {
                return BadRequest("User_Id is null");
            }

            var posts = await db.BlogPosts
                .Where(post => post.User.Id == user_id && post.IsDeleted == false)
                .ToListAsync();

            if (!posts.Any())
            {
                return Ok(new { message = "User has no posts." });
            }

            return Ok(posts);
        }

        [HttpPut]
        [Route("update/{id}")]
        public async Task<IHttpActionResult> UpdatePost(PostInfoUpdate post, int id)
        {
            var existingPost = await db.BlogPosts.FindAsync(id);
            if (existingPost == null)
            {
                return NotFound();
            }

            existingPost.Title = post.Title;
            existingPost.Content = post.Content;
            existingPost.Hashtags = post.Hashtags;
            existingPost.Image = post.Image;
            existingPost.UpdatedAt = DateTime.UtcNow;

            await db.SaveChangesAsync();

            return Ok(new { message = "Post updated successfully" });
        }

        [HttpPatch]
        [Route("delete/soft/{id}")]
        public async Task<IHttpActionResult> DeleteSoftPost(int id)
        {
            var post = await db.BlogPosts.FindAsync(id);
            if (post == null)
            {
                return NotFound();
            }

            post.IsDeleted = true;
            post.DeletedAt = DateTime.UtcNow;

            await db.SaveChangesAsync();

            return Ok(new { message = "Success" });
        }

        [HttpPatch]
        [Route("restore/{id}")]
        public async Task<IHttpActionResult> RestorePost(int id)
        {
            var post = await db.BlogPosts.FindAsync(id);
            if (post == null)
            {
                return NotFound();
            }

            post.IsDeleted = false;
            post.DeletedAt = null;

            await db.SaveChangesAsync();

            return Ok(new { message = "Success" });
        }

        [JwtAuthorize("admin", "user")]
        [HttpDelete]
        [Route("delete/permanent/{id}")]
        public async Task<IHttpActionResult> DeletePost(int id)
        {
            var existingPost = await db.BlogPosts.FindAsync(id);
            if (existingPost == null)
            {
                return NotFound();
            }

            db.BlogPosts.Remove(existingPost);
            await db.SaveChangesAsync();

            return Ok(new { message = "Post deleted successfully" });
        }

        [HttpGet]
        [Route("statistics/{year}")]
        public async Task<IHttpActionResult> GetStatistics(int year)
        {
            var postPerMonth = await db.BlogPosts
                .Where(p => p.CreatedAt.Value.Year == year)
                .GroupBy(p => p.CreatedAt.Value.Month)
                .Select(p => new
                {
                    PostMonth = p.Key,
                    PostCount = p.Count()
                })
                .OrderBy(p => p.PostMonth)
                .ToListAsync();

            return Ok(new { postPerMonth });
        }

        [HttpGet]
        [Route("orderby/{condition}/{flag}")]
        public async Task<IHttpActionResult> PostOrderBy(string condition, int flag)
        {
            var posts = await db.BlogPosts
                .Where(p => p.User.IsDeleted == false && (flag == 1 ? p.Status == "accept" : p.Status == "waiting"))
                .Select(p => new
                {
                    p.User.UserProfile.FirstName,
                    p.User.UserProfile.LastName,
                    p.User.UserProfile.Avatar,
                    UserId = p.User.Id,
                    p.Owner,
                    p.Id,
                    p.Title,
                    p.Datetime,
                    p.Image,
                    p.Content,
                    p.Hashtags,
                })
                .ToListAsync();

            if (condition.ToLower() == "asc")
            {
                posts = posts.OrderBy(p => p.Datetime).ToList();
            }
            else if (condition.ToLower() == "desc")
            {
                posts = posts.OrderByDescending(p => p.Datetime).ToList();
            }

            var formattedPosts = posts.Select(post => new
            {
                post.FirstName,
                post.LastName,
                post.Avatar,
                post.UserId,
                post.Owner,
                post.Id,
                post.Title,
                Datetime = post.Datetime.HasValue
                    ? post.Datetime.Value.ToString("MMMM dd, yyyy hh:mm tt")
                    : "No Date",
                post.Image,
                post.Content,
                post.Hashtags,
            }).ToList();

            return Ok(formattedPosts);
        }

        [HttpPatch]
        [Route("verify/{postId}/{status}")]
        public async Task<IHttpActionResult> VerifyPost(int postId, string status)
        {
            var post = await db.BlogPosts.FindAsync(postId);
            if (post == null)
            {
                return NotFound();
            }

            post.Status = status;
            await db.SaveChangesAsync();

            return Ok(new { message = "success" });
        }
    }
}