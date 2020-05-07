using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;
using WebApplication2.Models;
using WebApplication2.Proxies;
using WebApplication2.DBControllers;
using WebApplication2.Utils;
using WebApplication2.DAL;

namespace WebApplication2.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class UsersController : ApiController
    {
       
        private UserProxy userProxy = new UserProxy(new UserController());
        
        // GET: api/Users
        
        public string[] Get()
        {
            UserController userController = new UserController();
            return userController.GetAllUsernames().ToArray();
        }

        public IHttpActionResult Get(string username, string password)
        {
            var result = userProxy.GetUser(username);
            if (result == null || result.password.Trim()!=password.Trim())
            {
                return NotFound();
            }
            return Ok(result);
        }

        // POST: api/Users
        public void Post(object user)
        {
            JObject juser = user as JObject;
            User realUser = juser.ToObject<User>();
            UserController userController = new UserController();
            
        }

        // PUT: api/Users/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Users/5
        public IHttpActionResult Delete(int id)
        {
            if (id < 1)
                return BadRequest("Not a valid Id");
            RealStudentController realStudentController = new RealStudentController();
            realStudentController.DeleteStudent(id);
            return Ok();
        }

    }
}
