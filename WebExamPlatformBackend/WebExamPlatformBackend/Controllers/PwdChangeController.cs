using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using WebExamPlatformBackend.DBControllers;
using WebExamPlatformBackend.Models;
using WebExamPlatformBackend.Proxies;

namespace WebExamPlatformBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowOrigin")]
    public class PwdChangeController : Controller
    {
        UserController userController = new UserController();
        // GET: api/Pwd
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Pwd/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return userController.GetById(id).password;
        }

        // POST: api/Pwd
        [HttpPost]
        public void Post([FromBody] object newPassword)
        {
            JObject juser = newPassword as JObject;
            PasswordObject passwordObject = juser.ToObject<PasswordObject>();
            DAL.User user = userController.GetById(passwordObject.userId);
            UserProxy.UpdateUser(user.Id);
            user.password = passwordObject.newPassword;
            userController.EditUser(user.Id, user);
        }

        // PUT: api/Pwd/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
