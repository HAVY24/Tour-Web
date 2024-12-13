using System;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using WebBackendProject.DTO.PaymentCard;
using WebBackendProject.Models;

namespace WebBackendProject.Controllers
{
    [RoutePrefix("api/card")]
    public class PaymentCardApiController : ApiController
    {
        private DbAppContext db = new DbAppContext();

        [HttpPost]
        [Route("store/address")]
        public async Task<IHttpActionResult> StoreBillingAddress(CardAddress address)
        {
            var cards = db.PaymentCards.Where(c => c.User.Id == address.user_id);

            if (!cards.Any())
            {
                return NotFound();
            }

            foreach (var card in cards)
            {
                card.BillingAddress = address.billingAddress;
            }
            await db.SaveChangesAsync();

            return Ok(new { message = "success" });
        }

        [HttpGet]
        [Route("get")]
        public async Task<IHttpActionResult> GetCardByUserId(int user_id)
        {
            var card = await db.PaymentCards.Where(c => c.User.Id == user_id)
                .Select(p => new
                {
                    p.Last4Digits,
                    p.CardholderName,
                    p.ExpirationDate,
                    p.User.UserProfile.FirstName,
                    p.User.UserProfile.LastName,
                }).FirstOrDefaultAsync();

            if (card == null)
            {
                return NotFound();
            }

            return Ok(card);
        }
    }
}