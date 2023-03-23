using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/user")]
    public class UserController : Controller
    {
        private readonly MyTodoAPIDbContext dbContext;
        
        public UserController(MyTodoAPIDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public MyTodoAPIDbContext DbContext { get; }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            return Ok(await dbContext.Users.ToListAsync());
        }

        [HttpPost]
        public async Task<IActionResult> AddUser(AddUserRequest addUserRequest) 
        {
            var user = new User()
            {
                Id = Guid.NewGuid(),
                FullName = addUserRequest.FullName,
                Email = addUserRequest.Email,
                Password = addUserRequest.Password
            };

            var userExist = dbContext.Users.Where(u => u.Email == addUserRequest.Email).FirstOrDefault();

            if (userExist != null)
            {
                return Ok("This email already exist!");
            }

            await dbContext.Users.AddAsync(user);
            await dbContext.SaveChangesAsync();

            return Ok(user);
        }

        [HttpPost]
        [Route("verifyuser")]
        public async Task<IActionResult> VerifyUser(VerifyUserRequest verifyUserRequest)
        {
            var userEmail = verifyUserRequest.Email;
            var userPassword = verifyUserRequest.Password;

            var user = dbContext.Users.Where(u => u.Email == userEmail && u.Password == userPassword).FirstOrDefault();

            if (user == null)
            {
                return Ok("Please check your email or password!");
            }

            return Ok(user);
        }
    }
}
