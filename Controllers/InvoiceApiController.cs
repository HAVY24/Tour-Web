using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using WebBackendProject.Models;
using iText.Kernel.Pdf;
using iText.Layout;
using iText.Layout.Element;
using System.Data.Entity;

namespace WebBackendProject.Controllers
{
    [RoutePrefix("api/invoice")]
    public class InvoiceApiController : ApiController
    {
        private DbAppContext db = new DbAppContext();

        [HttpGet]
        [Route("get/{user_id}")]
        public async Task<IHttpActionResult> GetPayment(int user_id)
        {
            var payments = await db.Payments
                .Where(p => p.Booking.User.Id == user_id)
                .Select(p => new
                {
                    p.Booking.User.UserProfile.FirstName,
                    p.Booking.User.UserProfile.LastName,
                    p.Booking.User.UserProfile.Address,
                    p.BookingId,
                    p.Booking.BookingDate,
                    p.Booking.TourPackage.Name,
                    p.Booking.NumOfPeople,
                    p.PaymentDate,
                    p.PaymentAmount,
                    p.PaymentMethod,
                    p.PaymentStatus,
                    p.TransactionId,
                })
                .ToListAsync();

            return Ok(payments);
        }

        [HttpGet]
        [Route("pdf")]
        public async Task<IHttpActionResult> GeneratePdf(string transactionId)
        {
            var invoice = await db.Payments.FirstOrDefaultAsync(p => p.TransactionId == transactionId);
            if (invoice == null) return Content(HttpStatusCode.NotFound, "Invoice not found.");

            var pdf = GeneratePdfForInvoice(invoice);

            if (pdf == null || pdf.Length == 0)
            {
                return Content(HttpStatusCode.InternalServerError, "Failed to generate PDF.");
            }

            var result = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ByteArrayContent(pdf)
            };
            result.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("application/pdf");
            result.Content.Headers.ContentDisposition = new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment")
            {
                FileName = $"Invoice-{transactionId}.pdf"
            };

            return ResponseMessage(result);
        }

        private byte[] GeneratePdfForInvoice(Payment invoice)
        {
            try
            {
                using (var memoryStream = new MemoryStream())
                {
                    var writer = new PdfWriter(memoryStream);
                    var pdf = new PdfDocument(writer);

                    var document = new Document(pdf);

                    document.Add(new Paragraph("Invoice"));
                    document.Add(new Paragraph($"Transaction ID: {invoice.TransactionId}"));
                    document.Add(new Paragraph($"Payment Date: {invoice.PaymentDate:yyyy-MM-dd}"));
                    document.Add(new Paragraph($"Amount: ${invoice.PaymentAmount}"));

                    document.Close();

                    return memoryStream.ToArray();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error generating PDF: {ex.Message}");
                return null;
            }
        }
    }
}