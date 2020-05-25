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
    public class StudentExamController : Controller
    {
        public static string command = "none";
        public static RealExam currentExam = null;
        private RealExamController realExamController = new RealExamController();
        private ExamController examController = new ExamController();
        private DBControllers.StudentExamController studentExamController = new DBControllers.StudentExamController();
        // GET: api/StudentExam
        [HttpGet]
        public IActionResult Get()
        {
            if (currentExam != null)
            {
                currentExam.untilDate = DateTime.Parse(currentExam.untilDate).ToShortDateString() + " " +
                    DateTime.Parse(currentExam.untilDate).ToShortTimeString();
                return Ok(currentExam);
            }
            else return NotFound();
        }

        // POST: api/StudentExam
        [HttpPost]
        public void Post([FromBody] object realExam)
        {
            JObject juser = realExam as JObject;
            RealExam recievingRealExam = juser.ToObject<RealExam>();
            Exam modelExam = examController.GetById(recievingRealExam.Id);
            RealExam realModelExam;
            if (!modelExam.staticQuestions)
                realModelExam = realExamController.GetRandomExamModel(recievingRealExam);
            else
                realModelExam = realExamController.GetStaticExamModel(modelExam);
            EvaluateAndRegister(recievingRealExam, realModelExam);
        }

        private void EvaluateAndRegister(RealExam studentExam, RealExam modelExam)
        {
            OptionAssignController optionAssignController = new OptionAssignController();
            Dictionary<string, float> questionScores = StudentExamUtils.EvaulateExam(studentExam, modelExam);
            StudentExam exam = StudentExamUtils.NewRealExamToStudentExam(studentExam, (int)questionScores["~totalScore"], studentExam.studentId);
            int studentExamId = studentExamController.AddStudentExam(exam);
            StudentExamQuestionController studentExamQuestionController = new StudentExamQuestionController();
            foreach (RealExamQuestion question in studentExam.examElements)
            {
                StudentQuestionTable studentQuestion = StudentExamUtils.RealQuestionToStudentQuestion(question, (int)questionScores[question.title], studentExamId, optionAssignController);
                studentExamQuestionController.AddStudentExamQuestion(studentQuestion);
            }
        }

        // PUT: api/StudentExam/5
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
