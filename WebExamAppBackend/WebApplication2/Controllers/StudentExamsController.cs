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
       
        public RealExam[] Get(int id, string time)
        {
            StudentExamController.currentExam = null;
            switch(time)
            {
                case "past":
                    return realExamController.GetAllPastStudentExams(studentExamProxy, id).ToArray();
                case "future":
                    return realExamController.GetAllStudentFutureExams(studentExamProxy, id).ToArray();
                case "present":
                    return realExamController.GetAllStudentPresentExams(studentExamProxy, id).ToArray();
                case "pastAdmin":
                    return realExamController.GetAllTeacherPastExams(studentExamProxy, id).ToArray();
                default:
                    return null;
            }

            //TODO: Return Present Exams TOO
        }
        public IHttpActionResult Get(int id)
        {
            var result = studentExamProxy.GetStudentExam(id);
            if (result == null)
            {
                System.Diagnostics.Debug.WriteLine("Couldn't return student Exam");
                StudentExamController.currentExam = null;
                return NotFound();
            }
            RealExamProxy.UpdateStudentExam(result.Id);
            
            StudentExamController.currentExam = result;
            return Ok(result);
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
