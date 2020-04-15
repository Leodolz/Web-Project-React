using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using WebApplication2.Models;
using WebApplication2.DBControllers;
using WebApplication2.Utils;

namespace WebApplication2.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class EditExamController : ApiController
    {
        public static bool Editing = false;
        public static RealExam currentExam = null;
        private RealExamController realExamController = new RealExamController();
        // GET: api/EditExam
        public IHttpActionResult Get()
        {
            if (Editing)
                return Ok(currentExam);
            else return NotFound();
        }

        // GET: api/EditExam/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/EditExam
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/EditExam/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/EditExam/5
        public void Delete(int id)
        {
        }
    }
}
