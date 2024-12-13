using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using System.Data.Entity;
using WebBackendProject.Models;
using WebBackendProject.Models.DTO;
using WebBackendProject.DTO.Booking;

namespace WebBackendProject.Controllers
{
    [RoutePrefix("api/booking")]
    public class BookingApiController : ApiController
    {
        private readonly DbAppContext db = new DbAppContext();

        [HttpGet]
        [Route("bookings")]
        public async Task<IHttpActionResult> GetBookings()
        {
            try
            {
                var bookings = await db.Bookings.ToListAsync();
                return Ok(bookings);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("info/{tourPackageId}")]
        public async Task<IHttpActionResult> GetBookingInfo(int? tourPackageId)
        {
            if (tourPackageId == null)
            {
                return BadRequest("Tour package ID is required.");
            }

            var tourPackage = await db.TourPackages.FindAsync(tourPackageId);
            if (tourPackage == null)
            {
                return NotFound();
            }

            var schedule = await db.Schedules
                .Include(s => s.TourPackage)
                .Where(s => s.TourPackage.Id == tourPackageId)
                .Select(s => new
                {
                    s.TravelDay,
                    s.Quantity,
                })
                .ToListAsync();

            var totalQuantity = schedule.Sum(s => s.Quantity);
            var formatDate = schedule.Select(s => s.TravelDay?.ToString("dd/MM/yyyy")).ToList();

            var result = new { tourPackage, totalQuantity, formatDate };

            return Ok(result);
        }

        [HttpGet]
        [Route("contact/{user_id}")]
        public async Task<IHttpActionResult> GetContactInfo(int? user_id)
        {
            try
            {
                if (user_id == null)
                {
                    return BadRequest("User ID is required.");
                }

                var data = await db.Users
                    .Include(d => d.UserProfile)
                    .Where(d => d.Id == user_id)
                    .Select(d => new
                    {
                        Name = d.UserProfile.FirstName + " " + d.UserProfile.LastName,
                        d.UserProfile.Phone,
                        d.Email
                    }).FirstOrDefaultAsync();

                if (data == null)
                {
                    return NotFound();
                }

                return Ok(data);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPost]
        [Route("create")]
        public async Task<IHttpActionResult> StoreBookingInfo(BookingDTO bookingDTO)
        {
            try
            {
                var booking = bookingDTO.info.Booking;
                var user = await db.Users.FindAsync(bookingDTO.User_Id);
                if (user == null)
                {
                    return BadRequest("User not found.");
                }

                booking.User = user;
                booking.CreatedAt = DateTime.UtcNow;
                booking.UpdatedAt = DateTime.UtcNow;
                booking.Status = "pending";
                db.Bookings.Add(booking);

                var contact = bookingDTO.info.Contact;
                if (contact == null)
                {
                    return BadRequest("Contact information is required.");
                }
                contact.Booking = booking;
                db.Contacts.Add(contact);

                foreach (var traveler in bookingDTO.info.Traveler)
                {
                    traveler.Booking = booking;
                    db.Travelers.Add(traveler);
                }

                await db.SaveChangesAsync();

                return Ok(booking.Id);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPatch]
        [Route("update/status")]
        public async Task<IHttpActionResult> SetStatus(BookingStatus bookingStatus)
        {
            try
            {
                if (string.IsNullOrEmpty(bookingStatus.status))
                {
                    return BadRequest("Status cannot be null or empty.");
                }

                var booking = await db.Bookings.FindAsync(bookingStatus.bookingId);
                if (booking == null)
                {
                    return NotFound();
                }

                booking.Status = bookingStatus.status;
                db.Entry(booking).Property(b => b.Status).IsModified = true;

                await db.SaveChangesAsync();

                return Ok(new { message = "Success" });
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPost]
        [Route("check/status")]
        public async Task<IHttpActionResult> CheckStatusPending(BookingRequest request)
        {
            try
            {
                var bookings = await db.Bookings
                    .Include(b => b.User)
                    .Where(b => b.User.Id == request.User_Id)
                    .ToListAsync();

                if (bookings == null || !bookings.Any())
                {
                    return Ok(new { message = "No booking Pending" });
                }

                if (bookings.Any(b => b.Status == "pending"))
                {
                    return Ok(new { message = "Has booking Pending" });
                }

                return Ok(new { message = "No booking Pending" });
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPatch]
        [Route("delete/soft/{bookingId}")]
        public async Task<IHttpActionResult> SoftDeleted(int bookingId)
        {
            try
            {
                var booking = await db.Bookings.FindAsync(bookingId);
                if (booking == null)
                {
                    return NotFound();
                }

                booking.IsDeleted = true;
                db.Entry(booking).Property(b => b.IsDeleted).IsModified = true;

                await db.SaveChangesAsync();

                return Ok(new { message = "Success" });
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        private async Task<List<MyBooking>> SetMyBookingAsync(int userId, object statusFilter)
        {
            var bookingsTemp = db.Bookings
                .Include(b => b.TourPackage)
                .Where(b => b.User.Id == userId && b.IsDeleted != true);

            if (statusFilter is string singleStatus)
            {
                bookingsTemp = bookingsTemp.Where(b => b.Status == singleStatus);
            }
            else if (statusFilter is string[] multipleStatuses)
            {
                bookingsTemp = bookingsTemp.Where(b => multipleStatuses.Contains(b.Status));
            }

            var bookings = await bookingsTemp.ToListAsync();

            return bookings.Select(booking => new MyBooking
            {
                Id = booking.Id,
                TourPackageId = booking.TourPackageId,
                Name = booking.TourPackage.Name,
                Price = booking.TourPackage.Price,
                Status = booking.Status,
                NumOfPeople = booking.NumOfPeople,
            }).ToList();
        }

        [HttpGet]
        [Route("user/{userId}")]
        public async Task<IHttpActionResult> GetMyBooking(int userId)
        {
            var bookings = await SetMyBookingAsync(userId, null);
            return Ok(bookings);
        }

        [HttpGet]
        [Route("user/pending/{userId}")]
        public async Task<IHttpActionResult> GetMyPendingBooking(int userId)
        {
            var bookings = await SetMyBookingAsync(userId, "pending");
            return Ok(bookings);
        }

        [HttpGet]
        [Route("user/waiting/{userId}")]
        public async Task<IHttpActionResult> GetMyApprovalBooking(int userId)
        {
            var bookings = await SetMyBookingAsync(userId, "waiting");
            return Ok(bookings);
        }

        [HttpGet]
        [Route("user/accepted/{userId}")]
        public async Task<IHttpActionResult> GetMyAcceptedBooking(int userId)
        {
            var bookings = await SetMyBookingAsync(userId, "success");
            return Ok(bookings);
        }

        [HttpGet]
        [Route("user/unaccepted/{userId}")]
        public async Task<IHttpActionResult> GetMyUnacceptedBooking(int userId)
        {
            var bookings = await SetMyBookingAsync(userId, "fail");
            return Ok(bookings);
        }

        [HttpGet]
        [Route("user/canceled/{userId}")]
        public async Task<IHttpActionResult> GetMyCanceledBooking(int userId)
        {
            var bookings = await SetMyBookingAsync(userId, "cancel");
            return Ok(bookings);
        }

        [HttpGet]
        [Route("statistics/{year}")]
        public async Task<IHttpActionResult> BookingStatistics(int year)
        {
            var totalBooking = await db.Bookings
                .Where(p => p.BookingDate.Year == year)
                .CountAsync();

            var totalBookingPerMonth = await db.Bookings
                .Where(p => p.BookingDate.Year == year)
                .GroupBy(b => b.BookingDate.Month)
                .Select(b => new
                {
                    BookingMonth = b.Key,
                    BookingCount = b.Count()
                })
                .OrderBy(b => b.BookingMonth)
                .ToListAsync();

            var bookingSuccessPerMonth = await db.Bookings
                .Where(b => b.Status == "success" && b.BookingDate.Year == year)
                .GroupBy(b => b.BookingDate.Month)
                .Select(b => new
                {
                    BookingMonth = b.Key,
                    BookingCount = b.Count()
                })
                .OrderBy(b => b.BookingMonth)
                .ToListAsync();

            var bookingFailPerMonth = await db.Bookings
                .Where(b => b.Status == "fail" && b.BookingDate.Year == year)
                .GroupBy(b => b.BookingDate.Month)
                .Select(b => new
                {
                    BookingMonth = b.Key,
                    BookingCount = b.Count()
                })
                .OrderBy(b => b.BookingMonth)
                .ToListAsync();

            var result = new { totalBooking, totalBookingPerMonth, bookingSuccessPerMonth, bookingFailPerMonth };

            return Ok(result);
        }
    }
}