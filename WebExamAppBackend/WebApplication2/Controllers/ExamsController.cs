using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication2.DBControllers;
using WebApplication2.DAL;
using WebApplication2.Models;
using WebApplication2.Utils;
using WebApplication2.Proxies;
using System.Web.Http.Cors;

namespace WebApplication2.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ExamsController : ApiController
    {
        private RealExamController realExamController = new RealExamController();
        private RealExamProxy realExamProxy = new RealExamProxy();
        // GET: api/Exams
        public IHttpActionResult Get() //This is for admins who can see all exams
        {
            return Ok(realExamController.GetAllRealExams(realExamProxy));
        }
        public IHttpActionResult Get(string role ,int userId) //This is for student/teacher exams
        {
            return Ok("");
        }
        
        // GET: api/Exams/5
        public IHttpActionResult Get(int id, bool student)
        {
            if (student == false)
            {
                System.Diagnostics.Debug.WriteLine("Recieved GET with value = " + id);
                var result = realExamProxy.GetRealExam(id);
                if (result == null)
                {
                    System.Diagnostics.Debug.WriteLine("Couldn't return student");
                    EditExamController.currentExam = null;
                    EditExamController.Editing = false;
                    return NotFound();
                }
                RealExamProxy.UpdateRealExam(result.Id);
                EditExamController.currentExam = result;
                EditExamController.Editing = true;
                return Ok(result);
            }
            else return Ok("CHANGE THIS");
        }

        // POST: api/Exams
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Exams/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Exams/5
        public void Delete(int id)
        {
        }
    }
}
