using System;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using System.Data.Entity;
using WebBackendProject.Models;
using WebBackendProject.Models.DTO;
using WebBackendProject.DTO;

namespace WebBackendProject.Controllers.Api
{
    [RoutePrefix("api/user")]
    public class UserApiController : ApiController
    {
        private readonly DbAppContext db = new DbAppContext();

        // Get all users
        [HttpGet]
        [Route("users")]
        public async Task<IHttpActionResult> GetUsers()
        {
            var users = await db.Users.ToListAsync();
            return Ok(users);
        }

        // Heartbeat / Ping endpoint
        [HttpPost]
        [AllowAnonymous]
        [Route("ping")]
        public async Task<IHttpActionResult> HeartBeat([FromBody] HeartBeatRequest request)
        {
            try
            {
                var user = await db.Users.FindAsync(request.userId);
                if (user == null)
                {
                    return NotFound();
                }

                user.LastActive = DateTime.UtcNow;
                user.IsOnline = true;
                await db.SaveChangesAsync();

                return Ok(new { success = true });
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // Get User Profile by UserId
        [HttpGet]
        [Route("profile/{user_id}")]
        public async Task<IHttpActionResult> GetProfileByUserId(int user_id)
        {
            try
            {
                var profile = await db.UserProfiles.FindAsync(user_id);
                int? age = profile?.Birthday.HasValue == true
                    ? DateTime.Now.Year - profile.Birthday.Value.Year
                    : (int?)null;

                var result = new { profile, age };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // Update User Profile
        [HttpPut]
        [Route("profile/update")]
        public async Task<IHttpActionResult> UpdateUserProfile( UserProfileDTO profile)
        {
            try
            {
                if (profile == null || profile.UserId == 0)
                {
                    return BadRequest("Invalid profile data.");
                }

                var userProfile = await db.UserProfiles.FirstOrDefaultAsync(u => u.UserId == profile.UserId);

                if (userProfile == null)
                {
                    return NotFound();
                }

                bool isUpdated = false;

                if (userProfile.FirstName != profile.FirstName) { userProfile.FirstName = profile.FirstName; isUpdated = true; }
                if (userProfile.LastName != profile.LastName) { userProfile.LastName = profile.LastName; isUpdated = true; }
                if (userProfile.Address != profile.Address) { userProfile.Address = profile.Address; isUpdated = true; }
                if (userProfile.City != profile.City) { userProfile.City = profile.City; isUpdated = true; }
                if (userProfile.Country != profile.Country) { userProfile.Country = profile.Country; isUpdated = true; }
                if (userProfile.PostalCode != profile.PostalCode) { userProfile.PostalCode = profile.PostalCode; isUpdated = true; }
                if (userProfile.AboutMe != profile.AboutMe) { userProfile.AboutMe = profile.AboutMe; isUpdated = true; }
                if (userProfile.Phone != profile.Phone) { userProfile.Phone = profile.Phone; isUpdated = true; }
                if (userProfile.Birthday != profile.Birthday) { userProfile.Birthday = profile.Birthday; isUpdated = true; }
                if (userProfile.QuickIntroduction != profile.QuickIntroduction) { userProfile.QuickIntroduction = profile.QuickIntroduction; isUpdated = true; }

                if (isUpdated)
                {
                    db.Entry(userProfile).State = EntityState.Modified;
                    await db.SaveChangesAsync();
                    return Ok(new { message = "Profile updated successfully" });
                }
                else
                {
                    return Ok(new { message = "No changes detected" });
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // Get User Account Information
        [HttpGet]
        [Route("account/{user_id}")]
        public async Task<IHttpActionResult> GetAccountInfo(int user_id)
        {
            try
            {
                var profile = await db.UserProfiles
                    .Include(p => p.User)
                    .FirstOrDefaultAsync(p => p.UserId == user_id);

                if (profile == null || profile.User == null)
                {
                    return NotFound();
                }

                var result = new
                {
                    profile.User.Username,
                    profile.FirstName,
                    profile.LastName,
                    registerDate = profile.User.CreatedAt?.ToString("MMMM dd, yyyy hh:mm tt")
                };

                return Ok(result);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [JwtAuthorize("admin", "user")]
        [HttpPut]
        [Route("update/account")] // PUT: user/update/account
        public async Task<IHttpActionResult> UpdateAccount(UserInfoUpdate userInfo)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var user = await db.Users.FindAsync(userInfo.user_id);

                    if (user == null)
                    {
                        return NotFound();
                    }

                    if (!string.IsNullOrEmpty(userInfo.Username) && user.Username != userInfo.Username)
                    {
                        user.Username = userInfo.Username;
                    }
                    if (!string.IsNullOrEmpty(userInfo.Email) && user.Email != userInfo.Email)
                    {
                        user.Email = userInfo.Email;
                    }
                    if (!string.IsNullOrEmpty(userInfo.Password) && user.Password != userInfo.Password)
                    {
                        user.Password = userInfo.Password;
                    }

                    var token = JwtHelper.GenerateToken(user.Email, user.Username, user.Role, user.Id.ToString());

                    await db.SaveChangesAsync();

                    return Ok(new { message = "User account updated successfully", userInfo = userInfo, token = token });
                }
                catch (Exception ex)
                {
                    return InternalServerError(new Exception("Error updating user account: " + ex.Message));
                }
            }
            else
            {
                return BadRequest("Invalid input data.");
            }
        }

        // Update User Status
        [HttpPost]
        [Route("update-status")]
        public void UpdateUserStatus()
        {
            var threshold = DateTime.UtcNow.AddSeconds(-30);
            var users = db.Users.Where(u => u.LastActive < threshold && u.IsOnline).ToList();

            foreach (var user in users)
            {
                user.IsOnline = false;
            }

            db.SaveChanges();
        }


        // Soft delete account
        [HttpDelete]
        [Route("delete/account/soft/{user_id}")]
        public async Task<IHttpActionResult> SoftDeleteAccount(int user_id)
        {
            try
            {
                var user = await db.Users.FindAsync(user_id);
                if (user == null)
                {
                    return NotFound();
                }

                user.IsDeleted = true;
                user.DeletedAt = DateTime.UtcNow;
                await db.SaveChangesAsync();

                return Ok(new { message = "User marked as deleted" });
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
    }
}
