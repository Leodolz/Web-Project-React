using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using WebExamPlatformBackend.DAL;
using WebExamPlatformBackend.DBControllers;
using WebExamPlatformBackend.Proxies;

namespace WebExamPlatformBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowOrigin")]
    public class UsersController : Controller
    {
        private UserProxy userProxy = new UserProxy(new UserController());
        // GET: api/Users
        [HttpGet]
        public string[] Get()
        {
            UserController userController = new UserController();
            return userController.GetAllUsernames().ToArray();
        }

        // GET: api/Users/5
        [HttpGet("username={username}&password={password}")]
        public IActionResult Get(string username, string password)
        {
            var result = userProxy.GetUser(username);
            if (result == null || result.password.Trim() != password.Trim())
            {
                return NotFound();
            }
            return Ok(result);
        }

        // POST: api/Users
        [HttpPost]
        public void Post([FromBody] object user)
        {
            JObject juser = user as JObject;
            User realUser = juser.ToObject<User>();
            UserController userController = new UserController();
        }

        // PUT: api/Users/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (id < 1)
                return BadRequest("Not a valid Id");
            RealStudentController realStudentController = new RealStudentController();
            realStudentController.DeleteStudent(id);
            return Ok();
        }
    }
}
