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
    public class EditExamController : ApiController
    {
        public static bool Editing = false;
        public static RealExam currentExam = null;
        private RealExamController realExamController = new RealExamController();
        private ExamController examController = new ExamController();
        // GET: api/EditExam
        public IHttpActionResult Get()
        {
            if (Editing)
                return Ok(currentExam);
            else return Ok();
        }

        // GET: api/EditExam/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/EditExam
        public void Post(object realExam ,bool edit)
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
                if(recievingRealExam.staticQuestions)
                    realExamController.EditExamQuestions(recievingRealExam.examElements, exam.Id);
            }
        }

        // PUT: api/EditExam/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/EditExam/5
        public void Delete(int id)
        {
        }
    }
}
