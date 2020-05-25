using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebExamPlatformBackend.DBControllers;
using WebExamPlatformBackend.Models;
using WebExamPlatformBackend.Proxies;

namespace WebExamPlatformBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowOrigin")]
    public class StudentExamsController : Controller
    {
        private RealExamController realExamController = new RealExamController();
        private RealExamProxy studentExamProxy = new RealExamProxy();
        // GET: api/StudentExams
        [HttpGet("{id}&time={time}")]
        public RealExam[] Get(int id, string time)
        {
            StudentExamController.currentExam = null;
            switch (time)
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
        }

        // GET: api/StudentExams/5
        [HttpGet("{id}")]
        public ActionResult Get(int id)
        {
            var result = studentExamProxy.GetStudentExam(id);
            if (result == null)
            {
                StudentExamController.currentExam = null;
                return NotFound();
            }
            RealExamProxy.UpdateStudentExam(result.Id);

            StudentExamController.currentExam = result;
            return Ok(result);
        }

        // POST: api/StudentExams
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/StudentExams/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
