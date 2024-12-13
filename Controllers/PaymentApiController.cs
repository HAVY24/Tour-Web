using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using WebBackendProject.DTO.Payment;
using WebBackendProject.Models;
using WebBackendProject.Models.DTO;

namespace WebBackendProject.Controllers
{
    [RoutePrefix("api/payment")]
    public class PaymentApiController : ApiController
    {
        DbAppContext db = new DbAppContext();

        [HttpGet]
        [Route("card/{userId}")] //GET: payment/card/{userId}
        public async Task<IHttpActionResult> GetPaymentCard(int userId)
        {
            var card = await db.PaymentCards
                .Where(c => c.User.Id == userId)
                .ToListAsync();

            return Ok(card);
        }

        private string GenerateTransactionId()
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            Random random = new Random();
            return new string(Enumerable.Repeat(chars, 12)
                .Select(s => s[random.Next(s.Length)]).ToArray());
        }

        [HttpPost]
        [Route("create/info")] //POST: payment/create/info
        public async Task<IHttpActionResult> CreatePaymentInfo(PaymentInfo info)
        {
            Payment payment = new Payment
            {
                PaymentDate = DateTime.UtcNow,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                PaymentMethod = info.PaymentMethod,
                PaymentStatus = info.PaymentStatus,
                PaymentAmount = info.PaymentAmount,
                TransactionId = "#" + GenerateTransactionId(),
                BookingId = info.BookingId
            };

            db.Payments.Add(payment);
            await db.SaveChangesAsync();

            return Ok(new { message = "Success" });
        }

        [HttpPatch]
        [Route("update/status")] //PATCH: payment/update/status
        public async Task<IHttpActionResult> SetPaymentStatus(PaymentStatus paymentStatus)
        {
            try
            {
                if (string.IsNullOrEmpty(paymentStatus.status))
                {
                    return BadRequest("Status cannot be null or empty.");
                }

                var payment = new Payment { BookingId = paymentStatus.bookingId };

                db.Payments.Attach(payment);

                payment.PaymentStatus = paymentStatus.status;

                db.Entry(payment).Property(b => b.PaymentStatus).IsModified = true;

                await db.SaveChangesAsync();

                return Ok(new { message = "Success" });
            }
            catch (Exception ex)
            {
                return BadRequest("Failed to update payment status. " + ex.Message);
            }
        }

        [HttpGet]
        [Route("statistics/{year}")] //GET: payment/statistics/{year}
        public async Task<IHttpActionResult> BookingStatistics(int year)
        {
            var totalPayment = await db.Payments
                .Where(p => p.PaymentDate.Year == year)
                .CountAsync();

            var totalPaymentPerMonth = await db.Payments
                .Where(p => p.PaymentDate.Year == year)
                .GroupBy(b => b.PaymentDate.Month)
                .Select(b => new
                {
                    PaymentMonth = b.Key,
                    PaymentCount = b.Count()
                })
                .OrderBy(b => b.PaymentMonth)
                .ToListAsync();

            var PaymentSuccessPerMonth = await db.Payments
                .Where(b => b.PaymentStatus == "success" && b.PaymentDate.Year == year)
                .GroupBy(b => b.PaymentDate.Month)
                .Select(b => new
                {
                    PaymentMonth = b.Key,
                    PaymentCount = b.Count()
                })
                .OrderBy(b => b.PaymentMonth)
                .ToListAsync();

            var PaymentFailPerMonth = await db.Payments
                .Where(b => b.PaymentStatus == "fail" && b.PaymentDate.Year == year)
                .GroupBy(b => b.PaymentDate.Month)
                .Select(b => new
                {
                    PaymentMonth = b.Key,
                    PaymentCount = b.Count()
                })
                .OrderBy(b => b.PaymentMonth)
                .ToListAsync();

            var result = new { totalPayment, totalPaymentPerMonth, PaymentSuccessPerMonth, PaymentFailPerMonth };

            return Ok(result);
        }

        [HttpGet]
        [Route("statistics/revenue/{year}")] //GET: payment/statistics/revenue/{year}
        public async Task<IHttpActionResult> RevenueStatistics(int year)
        {
            var totalRevenue = await db.Payments
                .Where(p => p.PaymentDate.Year == year)
                .SumAsync(p => p.PaymentAmount);

            var revenuePerMonth = await db.Payments
                .Where(p => p.PaymentDate.Year == year)
                .GroupBy(p => p.PaymentDate.Month)
                .Select(p => new
                {
                    Month = p.Key,
                    Revenue = p.Sum(s => s.PaymentAmount)
                })
                .ToListAsync();

            var revenuePerYear = await db.Payments
                .GroupBy(r => r.PaymentDate.Year)
                .Select(p => new
                {
                    Year = p.Key,
                    Revenue = p.Sum(s => s.PaymentAmount)
                })
                .ToListAsync();

            var result = new { totalRevenue, revenuePerMonth, revenuePerYear };

            return Ok(result);
        }
    }
}