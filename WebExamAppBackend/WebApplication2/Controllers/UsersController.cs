using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using WebApplication2.Models;

namespace WebApplication2.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class UsersController : ApiController
    {
        public static List<User> DefaultUsers = new List<User>
        {
            new User {id = 1, name = "Me", email= "email1", phone="1", role=1},
            new User {id = 2, name = "OtherMe", email= "email2", phone="2", role=2}
        };
        
        // GET: api/Users
        public IEnumerable<User> Get()
        {
            return DefaultUsers;
        }

        // GET: api/Users/5
        public IHttpActionResult Get(string id)
        {

            System.Diagnostics.Debug.WriteLine("Recieved GET");
            var product = DefaultUsers.Find((user) => user.name == id);
            if (product == null)
            {
                AuthController.WebAuth = false;
                return NotFound();
            }
            AuthController.WebAuth = true;
            return Ok(product);
        }

        // POST: api/Users
        public void Post(object user)
        {
            JObject juser = user as JObject;
            User realUser = juser.ToObject<User>();
            System.Diagnostics.Debug.WriteLine("Recieved User: "+realUser.name);
            DefaultUsers.Add(realUser);
            System.Diagnostics.Debug.WriteLine(DefaultUsers[2].name);
        }

        // PUT: api/Users/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Users/5
        public void Delete(int id)
        {
        }
    }
}
