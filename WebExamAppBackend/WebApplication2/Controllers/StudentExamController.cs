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
        private DBControllers.StudentExamController studentExamController = new DBControllers.StudentExamController();
        // GET: api/StudentExam
        public IHttpActionResult Get()
        {
            if (currentExam != null)
            {
                currentExam.untilDate = DateTime.Parse(currentExam.untilDate).ToShortDateString() + " "+ 
                    DateTime.Parse(currentExam.untilDate).ToShortTimeString();
                return Ok(currentExam);
            }
            else return NotFound();
        }

        // POST: api/StudentExam
        public void Post(object realExam)
        {
            OptionAssignController optionAssignController = new OptionAssignController();
            JObject juser = realExam as JObject;
            RealExam recievingRealExam = juser.ToObject<RealExam>();
            Exam modelExam = examController.GetById(recievingRealExam.Id);
            RealExam realModelExam;
            if (!modelExam.staticQuestions)
                realModelExam = realExamController.GetRandomExamModel(recievingRealExam);
            else
                realModelExam = realExamController.GetStaticExam(modelExam);
            //From here it should be in some kind of controller
            Dictionary<string,float> questionScores = StudentExamUtils.EvaulateExam(recievingRealExam, realModelExam);
            StudentExam exam = StudentExamUtils.NewRealExamToStudentExam(recievingRealExam, (int)questionScores["~totalScore"],recievingRealExam.studentId);
            int studentExamId = studentExamController.AddStudentExam(exam);
            StudentExamQuestionController studentExamQuestionController = new StudentExamQuestionController();
            foreach(RealExamQuestion question in recievingRealExam.examElements)
            {
                StudentQuestionTable studentQuestion = StudentExamUtils.RealQuestionToStudentQuestion(question,(int)questionScores[question.title], studentExamId, optionAssignController);
                studentExamQuestionController.AddStudentExamQuestion(studentQuestion);
            }

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
