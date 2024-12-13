using System;
using System.Diagnostics;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

public static class JwtHelper
{

    private const string SecretKey = "AnPhan12121212!@#SuperSecretKey123456";
    private const int ExpiryDurationInMinutes = 300000;

    public static string GenerateToken(string email, string username, string role, string userId)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(SecretKey);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
            new Claim("unique_name", email),    
            new Claim("username", username),     
            new Claim("role", role),            
            new Claim("user_id", userId) 
        }),
            Expires = DateTime.UtcNow.AddMinutes(ExpiryDurationInMinutes),
            SigningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        Debug.WriteLine("Success generate token");
        return tokenHandler.WriteToken(token);
    }

}
