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
using WebApplication2.Proxies;

namespace WebApplication2.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class StudentExamsController : ApiController
    {
        private RealExamController realExamController = new RealExamController();
        private RealExamProxy studentExamProxy = new RealExamProxy();
        // GET: api/StudentExams
        public IEnumerable<string> Get()
        {
            //Not used yet
            return new string[] { "value1", "value2" };
        }

        // GET: api/StudentExams/5
        public RealExam[] Get(int id)
        {
            StudentExamController.currentExam = null;
            return realExamController.GetAllStudentExams(studentExamProxy,id).ToArray();
        }

        // POST: api/StudentExams
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/StudentExams/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/StudentExams/5
        public void Delete(int id)
        {
        }
    }
}
