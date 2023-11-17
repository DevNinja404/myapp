using Azure;
using ErpOperatation.Models;
using ErpOperatation.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace ErpOperatation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public AuthController(IUserRepository userRepository)
        {

            _userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Post(UserModel model)
        {
            var user = await _userRepository.AuthenticateAsync(model.UserName, model.Password);

            if (user == null)
                return Unauthorized();

            // Generate and return a JWT token
            //var token = GenerateJwtToken(user); // Implement this method

            //return Ok(new { Token = token });
            //return new JsonResult("Ok");
            return new JsonResult("Success");
            //return new Response
            //{
            //    Status = "Success",
            //    Message = Lg.UserName
            //};
        }
    }
}
