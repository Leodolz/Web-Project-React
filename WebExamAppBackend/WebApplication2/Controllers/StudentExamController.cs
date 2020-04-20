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
using Newtonsoft.Json.Linq;
using WebApplication2.DAL;

namespace WebApplication2.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class StudentExamController : ApiController
    {
        public static string command = "none";
        public static RealExam currentExam = null;
        private RealExamController realExamController = new RealExamController();
        private ExamController examController = new ExamController();
        // GET: api/StudentExam
        public IHttpActionResult Get()
        {
            if (currentExam != null)
                return Ok(currentExam);
            else return NotFound();
        }

        // POST: api/StudentExam
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/StudentExam/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/StudentExam/5
        public void Delete(int id)
        {
        }
    }
}
