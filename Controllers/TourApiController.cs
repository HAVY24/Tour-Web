using Amazon.S3;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Drawing;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using WebBackendProject.DTO.Tour;
using WebBackendProject.Models;

namespace WebBackendProject.Controllers
{
    [RoutePrefix("api/tour")]
    public class TourApiController : ApiController
    {
        DbAppContext db = new DbAppContext();

        [AllowAnonymous]
        [HttpGet]
        [Route("tours")] // GET: tour/tours
        public async Task<IHttpActionResult> Tours
            (
                int page,
                int pageSize,
                string region = null,
                string searchBy = null,
                string searchQuery = null,
                string sortBy = null,
                int? priceRange0 = null,
                int? priceRange1 = null
            )
        {
            var request = new TourRequest
            {
                page = page,
                pageSize = pageSize,
                region = region,
                searchBy = searchBy,
                searchQuery = searchQuery,
                sortBy = sortBy,
                priceRange = priceRange0 != null && priceRange1 != null ? new int?[] { priceRange0, priceRange1 } : null
            };

            var query = db.Tours.Where(t => t.IsDeleted == false);

            if (!string.IsNullOrEmpty(request.region))
            {
                query = query.Where(t => t.Region == request.region);
            }

            if (!string.IsNullOrEmpty(request.searchQuery))
            {
                switch (request.searchBy)
                {
                    case "Name":
                        query = query.Where(q => q.Name.Contains(request.searchQuery));
                        break;
                    case "City":
                        query = query.Where(q => q.City.Contains(request.searchQuery));
                        break;
                    case "Country":
                        query = query.Where(q => q.Country.Contains(request.searchQuery));
                        break;
                }
            }

            if (!string.IsNullOrEmpty(request.sortBy))
            {
                switch (request.sortBy.ToLower())
                {
                    case "created":
                        query = query.OrderByDescending(t => t.CreatedAt.Value);
                        break;
                    case "created_asc":
                        query = query.OrderBy(t => t.CreatedAt.Value);
                        break;
                    default:
                        query = query.OrderBy(t => t.Id);
                        break;
                }
            }
            else
            {
                query = query.OrderBy(t => t.Id);
            }

            var toursWithMinPrice = await query
                .Skip((request.page - 1) * request.pageSize)
                .Take(request.pageSize)
                .Select(t => new
                {
                    t.Id,
                    t.Name,
                    t.Image,
                    t.Region,
                    t.Country,
                    t.City,
                    t.CreatedAt,
                    t.UpdateAt,
                    t.DeletedAt,
                    t.IsDeleted,
                    t.Opening,
                    t.Ending,
                    t.Description,
                    MinPrice = db.TourPackages
                        .Where(tp => tp.Tour.Id == t.Id)
                        .Min(tp => (decimal?)tp.Price) ?? 0
                })
                .ToListAsync();

            if (request.priceRange != null)
            {
                toursWithMinPrice = toursWithMinPrice
                    .Where(t => request.priceRange[0] <= t.MinPrice && t.MinPrice <= request.priceRange[1])
                    .ToList();
            }

            int totalTours = await query.CountAsync();

            return Ok(new
            {
                tours = toursWithMinPrice,
                totalTours = totalTours,
                totalPages = (int)Math.Ceiling((double)totalTours / request.pageSize)
            });
        }

        [HttpPost]
        [Route("create")] // POST: tour/create
        public async Task<IHttpActionResult> TourAndPackagesCreate(TourCreate tourCreate)
        {
            try
            {
                var user = await db.Users.FindAsync(tourCreate.user_id);
                tourCreate.tour.User = user;
                tourCreate.tour.CreatedAt = DateTime.UtcNow;
                tourCreate.tour.UpdateAt = DateTime.UtcNow;
                db.Tours.Add(tourCreate.tour);
                await db.SaveChangesAsync();

                foreach (TourPackage package in tourCreate.tourPackages)
                {
                    package.Tour = tourCreate.tour;
                    package.CreatedAt = DateTime.UtcNow;
                    package.UpdatedAt = DateTime.UtcNow;
                    db.TourPackages.Add(package);
                }
                await db.SaveChangesAsync();

                return Ok(new { message = "success" });
            }
            catch (Exception ex)
            {
                return BadRequest("Error Create Tour and Packages: " + ex.Message);
            }
        }

        [HttpGet]
        [Route("detail/{id}")] // GET: tour/detail/{id}
        public async Task<IHttpActionResult> TourDetail(int id)
        {
            try
            {
                var row = await db.Tours
                    .Where(t => t.Id == id)
                    .Select(t => new
                    {
                        t.Id,
                        t.Name,
                        t.Description,
                        t.Region,
                        t.City,
                        t.Country,
                        t.Opening,
                        t.Image,
                        t.Ending,
                        t.CreatedAt,
                        t.UpdateAt,
                        t.User.UserProfile.FirstName,
                        t.User.UserProfile.LastName,
                        t.UserId,
                    }).FirstOrDefaultAsync();
                return Ok(row);
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    Exception = ex.Message,
                    StackTrace = ex.StackTrace
                }.ToString());
            }
        }

        [HttpGet]
        [Route("user/{user_id}")] // GET: tour/user/{user_id}
        public async Task<IHttpActionResult> TourByUserId(int user_id)
        {
            try
            {
                var tours = await db.Tours
                    .Where(t => t.User.Id == user_id && t.IsDeleted == false)
                    .ToListAsync();
                return Ok(tours);
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    Exception = ex.Message,
                    StackTrace = ex.StackTrace
                }.ToString());
            }
        }

        [HttpGet]
        [Route("package/count/{tour_id}")] // GET: tour/package/count/{tour_id}
        public async Task<IHttpActionResult> CountPackageInTour(int tour_id)
        {
            try
            {
                var count = await db.TourPackages
                    .Where(t => t.Tour.Id == tour_id)
                    .CountAsync();
                return Ok(count);
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    Exception = ex.Message,
                    StackTrace = ex.StackTrace
                }.ToString());
            }
        }

        [HttpPut]
        [Route("update")] // PUT: tour/update
        public async Task<IHttpActionResult> UpdateTourAndPackages(TourCreate tourUpdate)
        {
            try
            {
                var existingTour = await db.Tours.FindAsync(tourUpdate.tour.Id);
                var user = await db.Users.FindAsync(tourUpdate.user_id);

                if (existingTour == null || user == null)
                {
                    return BadRequest("Tour or User not found");
                }

                existingTour.Name = tourUpdate.tour.Name;
                existingTour.Region = tourUpdate.tour.Region;
                existingTour.Country = tourUpdate.tour.Country;
                existingTour.City = tourUpdate.tour.City;
                existingTour.Image = tourUpdate.tour.Image;
                existingTour.Opening = tourUpdate.tour.Opening;
                existingTour.Ending = tourUpdate.tour.Ending;
                existingTour.User = user;
                existingTour.UpdateAt = DateTime.UtcNow;

                await db.SaveChangesAsync();

                var existingPackages = await db.TourPackages.Where(t => t.Tour.Id == tourUpdate.tour.Id).ToListAsync();
                var incomingPackageIds = tourUpdate.tourPackages.Select(tp => tp.Id).ToList();

                var packagesToDelete = existingPackages
                    .Where(ep => !incomingPackageIds.Contains(ep.Id))
                    .ToList();

                foreach (var package in packagesToDelete)
                {
                    var packageDelete = await db.TourPackages.Include(p => p.Bookings.Select(b => b.Contact))
                        .Include(p => p.Bookings.Select(b => b.Payment))
                        .FirstOrDefaultAsync(p => p.Id == package.Id);

                    var bookingsToRemove = packageDelete.Bookings.ToList();

                    foreach (var booking in bookingsToRemove)
                    {
                        if (booking.Payment != null)
                        {
                            db.Payments.Remove(booking.Payment);
                        }

                        if (booking.Contact != null)
                        {
                            db.Contacts.Remove(booking.Contact);
                        }

                        db.Bookings.Remove(booking);
                    }

                    db.TourPackages.Remove(packageDelete);
                }
                await db.SaveChangesAsync();
                foreach (var package in tourUpdate.tourPackages)
                {
                    var existingPackage = await db.TourPackages.FindAsync(package.Id);

                    if (existingPackage == null)
                    {
                        var newPackage = new TourPackage
                        {
                            Name = package.Name,
                            Image = package.Image,
                            Price = package.Price,
                            Activities = package.Activities,
                            IsChangeSchedule = package.IsChangeSchedule,
                            IsRefund = package.IsRefund,
                            CheckIn = package.CheckIn,
                            VAT = package.VAT,
                            Quantity = package.Quantity,
                            Description = package.Description,
                            Tour = existingTour,
                            CreatedAt = DateTime.UtcNow,
                            UpdatedAt = DateTime.UtcNow
                        };
                        db.TourPackages.Add(newPackage);
                    }
                    else
                    {
                        existingPackage.Name = package.Name;
                        existingPackage.Description = package.Description;
                        existingPackage.Image = package.Image;
                        existingPackage.Price = package.Price;
                        existingPackage.Activities = package.Activities;
                        existingPackage.IsChangeSchedule = package.IsChangeSchedule;
                        existingPackage.IsRefund = package.IsRefund;
                        existingPackage.CheckIn = package.CheckIn;
                        existingPackage.VAT = package.VAT;
                        existingPackage.Quantity = package.Quantity;
                        existingPackage.Tour = existingTour;
                        existingPackage.UpdatedAt = DateTime.UtcNow;
                    }
                }

                await db.SaveChangesAsync();

                return Ok(new { message = "success" });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    Exception = ex.Message,
                    InnerException = ex.InnerException?.Message,
                    DetailedInnerException = ex.InnerException?.InnerException?.Message,
                    StackTrace = ex.StackTrace
                }.ToString());
            }
        }

        [HttpDelete]
        [Route("delete/package")] // DELETE: tour/delete/package
        public async Task<IHttpActionResult> DeleteTourPackage(int id)
        {
            try
            {
                var package = await db.TourPackages.Include(p => p.Bookings.Select(b => b.Contact))
                    .Include(p => p.Bookings.Select(b => b.Payment))
                    .FirstOrDefaultAsync(p => p.Id == id);

                if (package == null)
                {
                    return BadRequest("Tour Package not found");
                }

                var bookingsToRemove = package.Bookings.ToList();

                foreach (var booking in bookingsToRemove)
                {
                    if (booking.Payment != null)
                    {
                        db.Payments.Remove(booking.Payment);
                    }

                    if (booking.Contact != null)
                    {
                        db.Contacts.Remove(booking.Contact);
                    }

                    db.Bookings.Remove(booking);
                }

                db.TourPackages.Remove(package);

                await db.SaveChangesAsync();

                return Ok(new { message = "success" });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    Exception = ex.Message,
                    InnerException = ex.InnerException?.Message,
                    DetailedInnerException = ex.InnerException?.InnerException?.Message,
                    StackTrace = ex.StackTrace
                }.ToString());
            }
        }

        [HttpPatch]
        [Route("delete/soft/{id}")] // PATCH: tour/delete/soft/{id}
        public async Task<IHttpActionResult> DeleteSoftTour(int id)
        {
            try
            {
                var tour = new Tour { Id = id };

                db.Tours.Attach(tour);

                tour.IsDeleted = true;
                tour.DeletedAt = DateTime.UtcNow;

                db.Entry(tour).Property(b => b.IsDeleted).IsModified = true;
                db.Entry(tour).Property(b => b.DeletedAt).IsModified = true;

                await db.SaveChangesAsync();
                return Ok(new { message = "success" });

            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    Exception = ex.Message,
                    InnerException = ex.InnerException?.Message,
                    DetailedInnerException = ex.InnerException?.InnerException?.Message,
                    StackTrace = ex.StackTrace
                }.ToString());
            }
        }

        [HttpGet]
        [Route("get/deleted")] // GET: tour/get/deleted
        public async Task<IHttpActionResult> GetDeletedTour()
        {
            try
            {
                var tours = await db.Tours
                    .Where(t => t.IsDeleted == true)
                    .ToListAsync();
                return Ok(tours);
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    Exception = ex.Message,
                    InnerException = ex.InnerException?.Message,
                    DetailedInnerException = ex.InnerException?.InnerException?.Message,
                    StackTrace = ex.StackTrace
                }.ToString());
            }
        }

        [HttpDelete]
        [Route("delete/permanently/{id}")] // DELETE: tour/delete/permanently/{id}
        public async Task<IHttpActionResult> DeleteTour(int id)
        {
            try
            {
                var tourDelete = await db.Tours.FindAsync(id);

                db.Tours.Remove(tourDelete);
                await db.SaveChangesAsync();
                return Ok(new { message = "success" });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    Exception = ex.Message,
                    InnerException = ex.InnerException?.Message,
                    DetailedInnerException = ex.InnerException?.InnerException?.Message,
                    StackTrace = ex.StackTrace
                }.ToString());
            }
        }

        [HttpPatch]
        [Route("restore/{id}")] // PATCH: tour/restore/{id}
        public async Task<IHttpActionResult> RestorePost(int id)
        {
            try
            {
                var tour = new Tour { Id = id };

                db.Tours.Attach(tour);

                tour.IsDeleted = false;
                tour.DeletedAt = null;

                db.Entry(tour).Property(b => b.IsDeleted).IsModified = true;
                db.Entry(tour).Property(b => b.DeletedAt).IsModified = true;

                await db.SaveChangesAsync();

                return Ok(new { message = "success" });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    Exception = ex.Message,
                    StackTrace = ex.StackTrace
                }.ToString());
            }
        }

        [HttpGet]
        [Route("stars/{tour_id}")] // GET: tour/stars/{tour_id}
        public async Task<IHttpActionResult> TourStars(int tour_id)
        {
            try
            {
                var averageStar = await db.TourPackages
                    .Where(t => t.Tour.Id == tour_id)
                    .Select(t => (double?)t.TourReviews
                        .Average(rv => (int?)rv.Star) ?? 0
                    )
                    .FirstOrDefaultAsync();

                return Ok(averageStar);
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    Exception = ex.Message,
                    StackTrace = ex.StackTrace
                }.ToString());
            }
        }

        [HttpGet]
        [Route("review/{tour_id}")] // GET: tour/review/{tour_id}
        public async Task<IHttpActionResult> Reviews(int tour_id)
        {
            try
            {
                var reviews = await db.TourReviews
                    .Include(r => r.TourPackage)
                    .Include(r => r.User)
                    .Where(r => r.TourPackage.TourId == tour_id)
                    .Select(r => new
                    {
                        r.Review,
                        r.Star,
                        r.TourPackage.Name,
                        r.User.UserProfile.FirstName,
                        r.User.UserProfile.LastName,
                    })
                    .ToListAsync();

                if (reviews.Count == 0)
                {
                    return Ok(new { message = "No reviews" });
                }

                return Ok(reviews);
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    message = "An error occurred while fetching reviews",
                    exception = ex.Message,
                    stackTrace = ex.StackTrace
                }.ToString());
            }
        }
    }
}