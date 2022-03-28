using Business.Abstract;
using Entities.Concrete;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Business.Concrete
{
    public class AuthManager : IAuthService
    {

        private IUserService _userService;
        private IConfiguration _config;

        public AuthManager(IUserService userService, IConfiguration config)
        {
            _userService = userService;
            _config = config;
        }

        

        public string Generate(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));

            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim("name", user.username),
            };

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
              _config["Jwt:Audience"],
              claims,
              expires: DateTime.Now.AddMinutes(30),
              signingCredentials: credentials);
            
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public User Authenticate(UserLogin userLogin)
        {
            var userToCheck = _userService.GetByUsername(userLogin.username);

            if (userToCheck == null)
            {
                throw new KeyNotFoundException("not found");
            }

            if (userToCheck.password != userLogin.password)
            {
                throw new KeyNotFoundException("wrong password");
            }

            return userToCheck;
        }
    }
}
