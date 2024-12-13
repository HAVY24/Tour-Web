using Amazon.S3;
using Amazon.S3.Model;
using System;
using System.IO;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace WebBackendProject.Controllers
{
    [RoutePrefix("api/cloud")]
    public class CloudApiController : ApiController
    {
        private static readonly string bucketName = "travel-web-an-phan";
        private static readonly string accessKey = "AKIAVVZPCXP3AL34LB5D";
        private static readonly string secretKey = "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";
        private static readonly string region = "us-east-1";
        private static IAmazonS3 s3Client;

        public CloudApiController()
        {
            s3Client = new AmazonS3Client(accessKey, secretKey, Amazon.RegionEndpoint.GetBySystemName(region));
        }

        [HttpPost]
        [Route("upload/image")]
        public async Task<IHttpActionResult> UploadImage()
        {
            try
            {
                var httpRequest = HttpContext.Current.Request;
                var file = httpRequest.Files["image"];

                if (file != null && file.ContentLength > 0)
                {
                    string folder = httpRequest.Form["folder"];
                    folder = string.IsNullOrWhiteSpace(folder) ? "default" : folder.Trim().Replace("..", "").Replace("/", "");

                    string fileName = Path.GetFileName(file.FileName);
                    string filePath = $"{folder}/{fileName}";

                    await UploadFileToS3(file, filePath);

                    return Ok(new { success = true, message = "Image uploaded successfully!", filePath });
                }
                else
                {
                    return BadRequest("Please select a file to upload.");
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(new Exception("Error: " + ex.Message));
            }
        }

        private async Task UploadFileToS3(HttpPostedFile file, string filePath)
        {
            try
            {
                using (var newMemoryStream = new MemoryStream())
                {
                    file.InputStream.CopyTo(newMemoryStream);

                    var request = new PutObjectRequest
                    {
                        InputStream = newMemoryStream,
                        BucketName = bucketName,
                        Key = filePath,
                        ContentType = file.ContentType
                    };

                    await s3Client.PutObjectAsync(request);
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error uploading file to S3", ex);
            }
        }
    }
}