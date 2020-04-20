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
        public static bool Editing = false;
        public static RealExam currentExam = null;
        private RealExamController realExamController = new RealExamController();
        private ExamController examController = new ExamController();
        // GET: api/StudentExam
        public IHttpActionResult Get(string code)
        {
            switch(code)
            {
                case "test":
                    return Ok(currentExam);
                default:
                    return NotFound();
            }
        }

        // GET: api/StudentExam/5
        public string Get(int id)
        {
            return "value";
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
