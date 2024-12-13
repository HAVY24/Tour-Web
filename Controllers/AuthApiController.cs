using System;
using System.Linq;
using System.Web.Http;
using WebBackendProject.Models;
using Google.Apis.Auth;
using System.Threading.Tasks;
using WebBackendProject.Models.DTO;
using System.Diagnostics;
using System.Data.Entity;
using WebBackendProject.DTO.Auth;
using System.Net.Mail;
using System.Net;
using WebBackendProject.DTO.Email;

namespace WebBackendProject.Controllers
{
    [RoutePrefix("api/auth")]
    public class AuthApiController : ApiController
    {
      private readonly DbAppContext db = new DbAppContext();

        [HttpPost]
        [Route("signup")] // POST: auth/signup
        public async Task<IHttpActionResult> Signup(SignUpInfo info)
        {
            var existedUserEmail = await db.Users.FirstOrDefaultAsync(eu => eu.Email == info.Email);
            var existedUserUsername = await db.Users.FirstOrDefaultAsync(eu => eu.Username == info.Username);
            var softDeletedUserEmail = await db.Users.FirstOrDefaultAsync(u => u.Email == info.Email && u.IsDeleted == true );

            if (existedUserEmail != null)
            {
                return BadRequest("Email is already in use. Please login or click forgot password");
            }

            if (existedUserUsername != null)
            {
                return BadRequest("User has been used by someone else");
            }

            if (softDeletedUserEmail != null)
            {
                return BadRequest("Your account has been deleted. After 30 days your account will be completely deleted. Please contact admin to restore within 30 days");
            }

            if (ModelState.IsValid)
            {
                var user = new User
                {
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow,
                    LastActive = DateTime.UtcNow,
                    Role = "user",
                    Username = info.Username,
                    Password = info.Password,
                    Email = info.Email
                };

                db.Users.Add(user);
                await db.SaveChangesAsync(); 

                var profile = new UserProfile
                {
                    UserId = user.Id
                };

                db.UserProfiles.Add(profile);
                await db.SaveChangesAsync(); 

                return Ok(info);
            }

            return BadRequest("Invalid Info");
        }

        [HttpPost]
        [Route("signin")] // POST: auth/signin
        public async Task<IHttpActionResult> Signin(SignInInfo info)
        {
            var loginUser = await db.Users
                .FirstOrDefaultAsync(u => u.Email == info.Email);

            if (loginUser == null)
            {
                return BadRequest("Email Not Found");
            }
            else if (loginUser.Password != info.Password)
            {
                return BadRequest("Incorrect Password");
            }
            else if (loginUser.IsDeleted == true)
            {
                return BadRequest("Your account has been deleted. After 30 days your account will be completely deleted. Please contact admin to restore within 30 days");
            }
            else if (loginUser.IsBanned == true)
            {
                return BadRequest("Your account has been banned. Please contact us to know details.");
            }
            else
            {
                var token = JwtHelper.GenerateToken(loginUser.Email, loginUser.Username, loginUser.Role, loginUser.Id.ToString());

                Debug.WriteLine(loginUser);
                Debug.WriteLine(token);

                return Ok(new { token = token, message = "Success" });
            }
        }
            
        [JwtAuthorize("admin", "user")]
        [HttpGet]
        [Route("signout")] // GET: auth/signout
        public IHttpActionResult Signout()
        {
            return Ok(new { message = "Log out success" });
        }

        [JwtAuthorize("admin", "user")]
        [HttpPost]
        [Route("password/check")] // POST: auth/password/check
        public async Task<IHttpActionResult> PasswordCheck(PasswordCheck passwordCheck)
        {
            var user = await db.Users.FindAsync(passwordCheck.user_id);

            if (user == null || user.Password != passwordCheck.password)
            {
                return BadRequest("Invalid Password");
            }
            else
            {
                return Ok(new { message = "Success" });
            }
        }

        [HttpPost]
        [Route("google-login")]
        public async Task<IHttpActionResult> GoogleLogin([FromBody] GoogleLogin model)
        {
            if (model == null || string.IsNullOrEmpty(model.IdToken))
            {
                return BadRequest("Invalid Google token");
            }

            try
            {
                var payload = GoogleJsonWebSignature.ValidateAsync(model.IdToken).Result;

                if (payload == null)
                {
                    return Unauthorized();
                }

                var user = await db.Users.FirstOrDefaultAsync(u => u.Email == payload.Email);
                if (user == null)
                {
                    user = new User
                    {
                        Username = payload.Name,
                        Email = payload.Email,
                        Role = "user", 
                        CreatedAt = DateTime.UtcNow,
                        UpdatedAt = DateTime.UtcNow,
                        IsOnline = true,
                        LastActive = DateTime.UtcNow,
                    };

                    db.Users.Add(user);
                   await db.SaveChangesAsync();

                    var profile = new UserProfile
                    {
                        UserId = user.Id
                    };

                    db.UserProfiles.Add(profile);
                    await db.SaveChangesAsync();
                }
                else
                {
                    user.IsOnline = true;
                    user.LastActive = DateTime.UtcNow;
                  await db.SaveChangesAsync();
                }

                var token = JwtHelper.GenerateToken(user.Email, user.Username, user.Role, user.Id.ToString());

                return Ok(new
                {
                    message = "Success",
                    token = token,
                });
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPost]
        [Route("send-email")]
        public async Task<IHttpActionResult> SendPasswordResetCode([FromBody] EmailRequest emailRequest)
        {
            try
            {
                var user = await db.Users.FirstOrDefaultAsync(u => u.Email == emailRequest.To);
                if (user == null)
                {
                    return BadRequest("Invalid email request.");

                }

                var verificationCode = new Random().Next(100000, 999999).ToString();

                user.VerificationCode = verificationCode;
                user.VerificationCodeExpiration = DateTime.UtcNow.AddMinutes(5);
                await db.SaveChangesAsync();

                emailRequest.Body = $"Your verification code is valid for 5 minutes: {verificationCode}";


                var smtpClient = new SmtpClient("smtp.gmail.com")
                {
                    Port = 587,
                    Credentials = new NetworkCredential("phanducan147@gmail.com", "xtoe wian jrwy twdq"),
                    EnableSsl = true
                };

                var mailMessage = new MailMessage
                {
                    From = new MailAddress("phanducan147@gmail.com", "VVBA Travel Agency"),
                    Subject = emailRequest.Subject,
                    Body = emailRequest.Body,
                    IsBodyHtml = false
                };

                mailMessage.To.Add(emailRequest.To);

                await smtpClient.SendMailAsync(mailMessage);

                return Ok( new { message = "success" });
            }
            catch (SmtpException smtpEx)
            {
                return InternalServerError(smtpEx);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPost]
        [Route("reset-password")]
        public async Task<IHttpActionResult> VerifyCodeAndResetPassword([FromBody] PasswordResetRequest request)
        {
            try
            {
                // Check if the verification code is correct and not expired
                var user = await db.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
                if (user == null || user.VerificationCode != request.VerificationCode || DateTime.UtcNow > user.VerificationCodeExpiration)
                {
                    user.VerificationCode = null;
                    user.VerificationCodeExpiration = null;
                    return BadRequest("Invalid or expired verification code.");
                }

                user.Password = request.NewPassword; 
                user.VerificationCode = null;
                user.VerificationCodeExpiration = null;
                await db.SaveChangesAsync();

                return Ok( new {message = "success"});
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }


    }
}
