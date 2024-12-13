using System.Threading.Tasks;
using System.Web.Http;
using System;
using WebBackendProject.Models;
using System.Linq;
using System.Data.Entity;
using WebBackendProject.DTO.Admin;

namespace WebBackendProject.Controllers
{
    [RoutePrefix("api/admin")]
    public class AdminApiController : ApiController
    {
        private readonly DbAppContext db = new DbAppContext();

        [HttpPatch]
        [Route("ban")] // PATCH: api/admin/ban
        public async Task<IHttpActionResult> BanUser(UserRequest request)
        {
            try
            {
                var user = await db.Users.FindAsync(request.UserId);

                if (user == null)
                {
                    return BadRequest("User not found");
                }

                user.IsBanned = true;
                await db.SaveChangesAsync();

                return Ok(new { message = "success" });
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPatch]
        [Route("unban")] // PATCH: api/admin/unban
        public async Task<IHttpActionResult> UnbanUser(UserRequest request)
        {
            try
            {
                var user = await db.Users.FindAsync(request.UserId);

                if (user == null)
                {
                    return BadRequest("User not found");
                }

                user.IsBanned = false;
                await db.SaveChangesAsync();

                return Ok(new { message = "success" });
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("get/banned")] // GET: api/admin/get/banned
        public async Task<IHttpActionResult> BannedUser()
        {
            var users = await db.Users
                .Where(u => u.IsBanned == true)
                .ToListAsync();

            return Ok(users);
        }

        [HttpGet]
        [Route("get/online")] // GET: api/admin/get/online
        public async Task<IHttpActionResult> OnlineUser()
        {
            var users = await db.Users
                .Where(u => u.IsOnline == true)
                .ToListAsync();

            return Ok(users);
        }

        [HttpGet]
        [Route("get/offline")] // GET: api/admin/get/offline
        public async Task<IHttpActionResult> OfflineUser()
        {
            var users = await db.Users
                .Where(u => u.IsOnline == false)
                .ToListAsync();

            return Ok(users);
        }

        [HttpPatch]
        [Route("block/profile")] // PATCH: api/admin/block/profile
        public async Task<IHttpActionResult> BlockProfile(UserRequest request)
        {
            var user = await db.Users.FindAsync(request.UserId);

            if (user == null)
            {
                return BadRequest("User not found");
            }

            user.IsProfileBlocked = true;
            await db.SaveChangesAsync();

            return Ok(new { message = "success" });
        }

        [HttpPatch]
        [Route("unblock/profile")] // PATCH: api/admin/unblock/profile
        public async Task<IHttpActionResult> UnBlockProfile(UserRequest request)
        {
            var user = await db.Users.FindAsync(request.UserId);

            if (user == null)
            {
                return BadRequest("User not found");
            }

            user.IsProfileBlocked = false;
            await db.SaveChangesAsync();

            return Ok(new { message = "success" });
        }

        [HttpGet]
        [Route("get/profile/block")] // GET: api/admin/get/profile/block
        public async Task<IHttpActionResult> ProfileBlockUser()
        {
            var users = await db.Users
                .Where(u => u.IsProfileBlocked == true)
                .ToListAsync();

            return Ok(users);
        }

        [HttpGet]
        [Route("get/deleted/soft")] // GET: api/admin/get/deleted/soft
        public async Task<IHttpActionResult> DeletedSoftUser()
        {
            var users = await db.Users
                .Where(u => u.IsDeleted == true)
                .ToListAsync();

            return Ok(users);
        }

        [HttpDelete]
        [Route("delete/permanently/{user_id}")] // DELETE: api/admin/delete/permanently/{user_id}
        public async Task<IHttpActionResult> DeleteAccount(int user_id)
        {
            try
            {
                var user = await db.Users
                    .Include(u => u.UserProfile)
                    .FirstOrDefaultAsync(u => u.Id == user_id);

                if (user == null)
                {
                    return BadRequest("User not found");
                }

                db.UserProfiles.Remove(user.UserProfile);
                db.Users.Remove(user);
                await db.SaveChangesAsync();

                return Ok(new { message = "success" });
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPost]
        [Route("restore/account")] // POST: api/admin/restore/account
        public async Task<IHttpActionResult> RestoreAccount(UserRequest request)
        {
            try
            {
                var user = await db.Users.FirstOrDefaultAsync(u => u.Id == request.UserId && u.IsDeleted);
                if (user == null)
                {
                    return BadRequest("User not found or not deleted");
                }

                user.IsDeleted = false;
                user.DeletedAt = null;
                await db.SaveChangesAsync();

                return Ok(new { message = "User restored successfully" });
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("users/{id}")] // GET: api/admin/users/{id}
        public async Task<IHttpActionResult> UserById(int id)
        {
            var data = await db.Users.FindAsync(id);

            if (data == null)
            {
                return NotFound();
            }

            return Ok(data);
        }

        [HttpGet]
        [Route("request/payment")] // GET: api/admin/request/payment
        public async Task<IHttpActionResult> GetUserPaymentRequest()
        {
            return await GetPaymentRequests(null);
        }

        [HttpGet]
        [Route("request/payment/pending")] // GET: api/admin/request/payment/pending
        public async Task<IHttpActionResult> GetPendingPayment()
        {
            return await GetPaymentRequests("waiting");
        }

        [HttpGet]
        [Route("request/payment/processed")] // GET: api/admin/request/payment/processed
        public async Task<IHttpActionResult> GetProcessedPayment()
        {
            return await GetPaymentRequests(new[] { "success", "fail" });
        }

        [HttpGet]
        [Route("request/payment/accepted")] // GET: api/admin/request/payment/accepted
        public async Task<IHttpActionResult> GetAcceptedPayment()
        {
            return await GetPaymentRequests("success");
        }

        [HttpGet]
        [Route("request/payment/unaccepted")] // GET: api/admin/request/payment/unaccepted
        public async Task<IHttpActionResult> GetNotAcceptedPayment()
        {
            return await GetPaymentRequests("fail");
        }

        private async Task<IHttpActionResult> GetPaymentRequests(object statusFilter)
        {
            try
            {
                var query = db.Bookings
                    .Include(b => b.User)
                    .Include(b => b.Payment)
                    .Include(b => b.TourPackage);

                if (statusFilter is string singleStatus)
                {
                    query = query.Where(b => b.Status == singleStatus);
                }
                else if (statusFilter is string[] multipleStatuses)
                {
                    query = query.Where(b => multipleStatuses.Contains(b.Status));
                }
                else
                {
                    query = query.Where(b => b.Status != "cancel");
                }

                var bookings = (await query.ToListAsync())
                    .Where(b => b.Status != "pending")
                    .Select(b => new
                    {
                        User_Id = b.User?.Id,
                        User_Name = b.User?.Username, 
                        Booking_Date = b.CreatedAt?.ToLocalTime().ToString("MMMM dd, yyyy hh:mm tt"),
                        Booking_Id = b.Id,
                        TourPackage_Id = b.TourPackageId,
                        TourPackage_Name = b.TourPackage?.Name, 
                        Total_Price = b.Payment?.PaymentAmount, 
                        Payment_Method = b.Payment?.PaymentMethod, 
                        Payment_Status = b.Payment?.PaymentStatus 
                    }).ToList();

                return Ok(bookings);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("statistics/register/{year}")] // GET: api/admin/statistics/register/{year}
        public async Task<IHttpActionResult> RegisterStatistics(int year)
        {
            var registerUsersPerMonth = await db.Users
                .Where(u => u.CreatedAt.Value.Year == year)
                .GroupBy(u => u.CreatedAt.Value.Month)
                .Select(u => new
                {
                    RegisterMonth = u.Key,
                    RegisterCount = u.Count()
                })
                .OrderBy(b => b.RegisterMonth)
                .ToListAsync();

            return Ok(new { registerUsersPerMonth });
        }
    }
}

