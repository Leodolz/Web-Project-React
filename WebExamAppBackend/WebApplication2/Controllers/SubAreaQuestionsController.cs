using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using WebApplication2.DBControllers;
using WebApplication2.DAL;
using WebApplication2.Models;
using WebApplication2.Utils;
using WebApplication2.Proxies;
using Newtonsoft.Json.Linq;

namespace WebApplication2.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class SubAreaQuestionsController : ApiController
    {
        private DBControllers.SubAreaQuestionsController subAreaQuestionsController = new DBControllers.SubAreaQuestionsController();
        // GET: api/SubAreaQuestions
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/SubAreaQuestions/5
        public IHttpActionResult Get(int id)
        {
            return Ok(subAreaQuestionsController.GetAllSubAreaQuestions(id));
        }

        // POST: api/SubAreaQuestions
        public void Post(object realQuestions, bool edit, int subAreaId)
        {
            JArray juser = realQuestions as JArray;
            RealExamQuestion[] recievingQuestions = juser.ToObject<RealExamQuestion[]>();
            if (edit == false)
            {
                subAreaQuestionsController.AssignNewQuestionsToSubArea(recievingQuestions, subAreaId);
            }
            else
            {
                subAreaQuestionsController.QuestionEditActions(recievingQuestions, subAreaId);
            }
        }

        // PUT: api/SubAreaQuestions/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/SubAreaQuestions/5
        public void Delete(int id)
        {
        }
    }
}
