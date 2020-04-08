using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Web.Http;
using System.Web.Http.Cors;
using WebApplication2.Models;
using WebApplication2.Proxies;
using WebApplication2.DBControllers;
using WebApplication2.DAL;

namespace WebApplication2.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class UsersController : ApiController
    {
        public static List<StaticUser> DefaultUsers = new List<StaticUser>
        {
            new StaticUser {id = 1, name = "Me", email= "email1", phone="1", role=1, shaName=StringToSha("Me")},
            new StaticUser {id = 2, name = "OtherMe", email= "email2", phone="2", role=2, shaName = StringToSha("OtherMe")}
        };
        public static List<User> CurrentUsers = new List<User>
        {
            new User{Id = 1, email="leodolz14@gmail.com", password=StringToSha("12345"), role="Admin", username="Lean7"}
        };
        private static UserProxy userProxy = new UserProxy(new UserController());
        
        // GET: api/Users
        public IEnumerable<StaticUser> Get()
        {
            
            return DefaultUsers;
        }

        // GET: api/Users/5
        public IHttpActionResult Get(string id)
        {
            System.Diagnostics.Debug.WriteLine("Recieved GET with value = "+id);

            var result = CurrentUsers.Find((user) => user.password == id);
            if (result == null)
            {
                AuthController.currentUser = null;
                AuthController.WebAuth = false;
                return NotFound();
            }
            AuthController.currentUser = result;
            AuthController.WebAuth = true;
            return Ok(result);
        }

        public IHttpActionResult Get(string username, string password)
        {
            System.Diagnostics.Debug.WriteLine("Recieved GET with value = " + username);
            var result = userProxy.GetUser(username);
            //var result = CurrentUsers.Find((user) => user.username == username);
            
            if (result == null || result.password.Trim()!=password.Trim())
            {
                System.Diagnostics.Debug.WriteLine("User is: "+result.password);
                System.Diagnostics.Debug.WriteLine("Real password is: " + password);
                AuthController.currentUser = null;
                AuthController.WebAuth = false;
                return NotFound();
            }
            AuthController.currentUser = result;
            AuthController.WebAuth = true;
            return Ok(result);
        }

        // POST: api/Users
        public void Post(object user)
        {
            JObject juser = user as JObject;
            StaticUser realUser = juser.ToObject<StaticUser>();
            System.Diagnostics.Debug.WriteLine("Recieved User: "+realUser.name);
            realUser.id = DefaultUsers.Count + 1;
            realUser.shaName = StringToSha(realUser.name);
            DefaultUsers.Add(realUser);
        }

        // PUT: api/Users/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Users/5
        public void Delete(int id)
        {
        }
        public static string StringToSha(string value)
        {
            using (SHA256 hash = SHA256.Create())
            {
                return string.Concat(hash
                  .ComputeHash(Encoding.UTF8.GetBytes(value))
                  .Select(item => item.ToString("x2")));
            }
        }
    }
}
