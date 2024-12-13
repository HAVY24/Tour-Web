using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using WebBackendProject.Models;

namespace WebBackendProject.Controllers
{
    [RoutePrefix("api/package")]
    public class TourPackageApiController : ApiController
    {
        DbAppContext db = new DbAppContext();

        [AllowAnonymous]
        [HttpGet]
        [Route("packages")] // GET: /package/packages
        public async Task<IHttpActionResult> TourPackages()
        {
            var data = await db.TourPackages.ToListAsync();
            return Ok(data);
        }

        [JwtAuthorize("admin", "user")]
        [HttpGet]
        [Route("detail/{id}")] // GET: /package/detail/{id}
        public async Task<IHttpActionResult> TourPackageDetail(int id)
        {
            var tourPackage = await db.TourPackages.FirstOrDefaultAsync(model => model.Id == id);
            return Ok(tourPackage);
        }

        [HttpGet]
        [Route("vouchers/{id}")] // GET: /package/vouchers/{id}
        public async Task<IHttpActionResult> GetVoucher(int? id)
        {
            var vouchers = await db.Vouchers
                .Where(v => v.TourPackage.Id == id)
                .Select(v => new
                {
                    v.Code,
                    v.Title,
                    v.Discount
                })
                .ToListAsync();

            if (!vouchers.Any())
            {
                return Ok(new { message = "No vouchers found" });
            }

            return Ok(vouchers);
        }

        [HttpGet]
        [Route("VAT/{id}")] // GET: /package/VAT/{id}
        public async Task<IHttpActionResult> GetVat(int id)
        {
            var vat = await db.TourPackages
                .Where(t => t.Id == id)
                .Select(t => t.VAT)
                .FirstOrDefaultAsync();

            if (vat == 0)
            {
                return Ok(new { message = "No VAT" });
            }

            return Ok(vat);
        }

        [HttpGet]
        [Route("package/{tour_id}")] // GET: package/package/{tour_id}
        public async Task<IHttpActionResult> PackageByTourId(int tour_id)
        {
            try
            {
                var packages = await db.TourPackages
                    .Where(p => p.Tour.Id == tour_id)
                    .ToListAsync();

                return Ok(packages);
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
    }
}