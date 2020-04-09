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
    public class EditStudentController : ApiController
    {
        public static bool Editing = false;
        public static RealStudent currentStudent = null;
        // GET: api/EditStudent/5
        public IHttpActionResult Get()
        {
            if (Editing)
                return Ok(currentStudent);
            else return NotFound();
        }

        // POST: api/EditStudent
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/EditStudent/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/EditStudent/5
        public void Delete(int id)
        {
        }
    }
}
