using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using WebExamPlatformBackend.Models;

namespace WebExamPlatformBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowOrigin")]
    public class SubAreaQuestionsController : Controller
    {
        private DBControllers.SubAreaQuestionsController subAreaQuestionsController = new DBControllers.SubAreaQuestionsController();
        // GET: api/SubAreaQuestions
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/SubAreaQuestions/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(subAreaQuestionsController.GetAllSubAreaQuestions(id));
        }

        // POST: api/SubAreaQuestions
        [HttpPost("edit={edit}&subAreaId={subAreaId}")]
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
