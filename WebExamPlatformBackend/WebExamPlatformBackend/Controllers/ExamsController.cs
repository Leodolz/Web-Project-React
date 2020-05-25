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
    public class ExamsController : Controller
    {
        private RealExamController realExamController = new RealExamController();
        private RealExamProxy realExamProxy = new RealExamProxy();
        // GET: api/Exams
        [HttpGet]
        public IActionResult Get()
        {
            EditExamController.currentExam = null;
            EditExamController.Editing = false;
            return Ok(realExamController.GetAllRealExams(realExamProxy));
        }

        // GET: api/Exams/5
        [HttpGet("{id}&student={student}")]
        public ActionResult Get(int id, bool student)
        {
            if (student == false)
            {
                var result = realExamProxy.GetRealExam(id);
                if (result == null)
                {
                    EditExamController.currentExam = null;
                    EditExamController.Editing = false;
                    return NotFound();
                }
                RealExamProxy.UpdateRealExam(result.Id);
                EditExamController.currentExam = result;
                EditExamController.Editing = true;
                return Ok(result);
            }
            else
            {

                RealExam result = realExamProxy.GetRealExam(id);
                if (result == null)
                {
                    StudentExamController.currentExam = null;
                    return NotFound();
                }
                foreach (RealExamQuestion question in result.examElements)
                {
                    question.answerCount = question.answer.Count();
                    question.answer = new string[] { };
                }
                RealExamProxy.UpdateRealExam(id);
                StudentExamController.currentExam = result;
                return Ok();
            }
        }

        // POST: api/Exams
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Exams/5
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
