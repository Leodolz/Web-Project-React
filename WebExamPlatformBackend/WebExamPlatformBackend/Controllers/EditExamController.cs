using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using WebExamPlatformBackend.DAL;
using WebExamPlatformBackend.DBControllers;
using WebExamPlatformBackend.Models;
using WebExamPlatformBackend.Utils;

namespace WebExamPlatformBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowOrigin")]
    public class EditExamController : Controller
    {
        public static bool Editing = false;
        public static RealExam currentExam = null;
        private RealExamController realExamController = new RealExamController();
        private ExamController examController = new ExamController();
        // GET: api/EditExam
        [HttpGet]
        public IActionResult Get()
        {
            if (Editing)
                return Ok(currentExam);
            else return Ok();
        }

        // POST: api/EditExam
        [HttpPost("edit={edit}")]
        public void Post(object realExam, bool edit)
        {
            JObject juser = realExam as JObject;
            RealExam recievingRealExam = juser.ToObject<RealExam>();
            if (edit == false)
            {
                Exam exam = ExamUtils.NewRealExamToExam(recievingRealExam);
                realExamController.AddExam(exam, recievingRealExam.examElements);
            }
            else
            {
                Exam exam = ExamUtils.EditedRealToExam(recievingRealExam, examController);
                examController.EditExam(exam.Id, exam);
                if (recievingRealExam.staticQuestions)
                    realExamController.EditExamQuestions(recievingRealExam.examElements, exam.Id);
            }
        }

        // PUT: api/EditExam/5
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
