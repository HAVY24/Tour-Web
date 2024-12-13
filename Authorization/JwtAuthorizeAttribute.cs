using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Web;
using System.Web.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Diagnostics;
using WebBackendProject.Models;

public class JwtAuthorizeAttribute : AuthorizeAttribute
{
    private const string SecretKey = "AnPhan12121212!@#SuperSecretKey123456";
    private readonly string[] _allowedRoles;

    public JwtAuthorizeAttribute(params string[] roles)
    {
        _allowedRoles = roles;
    }

    protected override bool AuthorizeCore(HttpContextBase httpContext)
    {
        Debug.WriteLine(new string('-', 50)); // Divider
        Debug.WriteLine("Authorization process started.");

        try
        {
            // Extract token from header
            var token = httpContext.Request.Headers["Authorization"]?.Replace("Bearer ", "");
            if (string.IsNullOrEmpty(token))
            {
                Debug.WriteLine("Authorization header missing or empty.");
                return false;
            }

            Debug.WriteLine($"Received Token: {token}");

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(SecretKey);

            // Validate the token
            tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                ClockSkew = TimeSpan.Zero
            }, out SecurityToken validatedToken);

            Debug.WriteLine("Token validated successfully.");

            // Decode and check claims in token
            var jwtToken = (JwtSecurityToken)validatedToken;

            var emailClaim = jwtToken.Claims.FirstOrDefault(x => x.Type == "unique_name");
            var usernameClaim = jwtToken.Claims.FirstOrDefault(x => x.Type == "username");
            var roleClaim = jwtToken.Claims.FirstOrDefault(x => x.Type == "role");
            var userIdClaim = jwtToken.Claims.FirstOrDefault(x => x.Type == "user_id");

            var user_id = int.Parse(userIdClaim.Value);
            using (var db = new DbAppContext())
            {
                var user = db.Users.Find(user_id);
                if (user == null || user.IsBanned)
                {
                    Debug.WriteLine($"User with ID {user_id} is banned or does not exist.");
                    return false;
                }
            }

            Debug.WriteLine(emailClaim);
            Debug.WriteLine(usernameClaim);
            Debug.WriteLine(roleClaim);
            Debug.WriteLine(userIdClaim);

            if (emailClaim == null || usernameClaim == null || roleClaim == null || userIdClaim == null)
            {
                Debug.WriteLine("Required claims (email, username, role, or user_id) not found in the token.");
                return false;
            }

            var email = emailClaim.Value;
            var username = usernameClaim.Value;
            var role = roleClaim.Value;
            var userId = userIdClaim.Value;

            Debug.WriteLine($"Authenticated user: {username} with email: {email}, role: {role}, and user_id: {userId}");

            // Check if the user's role is within the allowed roles
            if (_allowedRoles.Length > 0 && !_allowedRoles.Contains(role))
            {
                Debug.WriteLine("User's role is not authorized for this resource.");
                return false;
            }

            // Attach user information to HttpContext for controller access
            httpContext.User = new ClaimsPrincipal(
                new ClaimsIdentity(
                    new[]
                    {
                    new Claim(ClaimTypes.Name, username),   // Attach username
                    new Claim(ClaimTypes.Role, role),        // Attach role
                    new Claim("user_id", userId),            // Attach user_id
                    new Claim("email", email)                // Attach email (unique_name)
                    }
                )
            );
            return true;
        }
        catch (Exception ex)
        {
            Debug.WriteLine($"Token validation failed: {ex.Message}");
            return false;
        }
    }


    protected override void HandleUnauthorizedRequest(AuthorizationContext filterContext)
    {
        filterContext.Result = new JsonResult
        {
            Data = new { error = "Unauthorized" },
            JsonRequestBehavior = JsonRequestBehavior.AllowGet
        };
    }
}
