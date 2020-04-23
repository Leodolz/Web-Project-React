using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using WebApplication2.Models;
using WebApplication2.DBControllers;
using WebApplication2.Proxies;

namespace WebApplication2.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class PwdChangeController : ApiController
    {
        UserController userController = new UserController();
        // GET: api/PwdChange
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/PwdChange/5
        public string Get(int id)
        {
            return userController.GetById(id).password;
        }

        // POST: api/PwdChange
        public void Post(object newPassword)
        {
            JObject juser = newPassword as JObject;
            PasswordObject passwordObject = juser.ToObject<PasswordObject>();
            DAL.User user = userController.GetById(passwordObject.userId);
            UserProxy.UpdateUser(user.Id);
            user.password = passwordObject.newPassword;
            userController.EditUser(user.Id, user);

        }

        // PUT: api/PwdChange/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/PwdChange/5
        public void Delete(int id)
        {
        }
    }
}
