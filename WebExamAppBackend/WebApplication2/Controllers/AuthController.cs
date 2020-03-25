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
    public class AuthController : ApiController
    {
        public static bool WebAuth = false;
        public static User currentUser = null;
        // GET: api/Auth/5
        public IHttpActionResult Get()
        {
            if (WebAuth)
                return Ok(currentUser);
            else return NotFound();
        }

        // POST: api/Auth
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Auth/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Auth/5
        public void Delete(int id)
        {
        }
    }
}
