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
        public static List<StaticUser> DefaultUsers = new List<StaticUser>
        {
            new StaticUser {id = 1, name = "Me", email= "email1", phone="1", role=1, shaName=StringUtils.StringToSha("Me")},
            new StaticUser {id = 2, name = "OtherMe", email= "email2", phone="2", role=2, shaName = StringUtils.StringToSha("OtherMe")}
        };
        private static UserProxy userProxy = new UserProxy(new UserController());
        
        // GET: api/Users
        public IEnumerable<StaticUser> Get()
        {
            
            return DefaultUsers;
        }

        public IHttpActionResult Get(string username, string password)
        {
            System.Diagnostics.Debug.WriteLine("Recieved GET with value = " + username);
            var result = userProxy.GetUser(username);
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
            User realUser = juser.ToObject<User>();
            System.Diagnostics.Debug.WriteLine("Recieved User: "+realUser.username);
            UserController userController = new UserController();
            
            //DefaultUsers.Add(realUser);
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
