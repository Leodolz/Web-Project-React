using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using WebExamPlatformBackend.DBControllers;
using WebExamPlatformBackend.Models;
using WebExamPlatformBackend.Utils;

namespace WebExamPlatformBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowOrigin")]
    public class EditStudentController : Controller
    {
        public static bool Editing = false;
        public static RealStudent currentStudent = null;
        private RealStudentController studentController = new RealStudentController();
        // GET: api/EditStudent
        [HttpGet]
        public IActionResult Get()
        {
            if (Editing)
                return Ok(currentStudent);
            else return NotFound();
        }

        // POST: api/EditStudent
        [HttpPost("edit={edit}")]
        public void Post(object student, bool edit)
        {
            JObject juser = student as JObject;
            RealStudent realStudent = juser.ToObject<RealStudent>();

            DAL.User user = new DAL.User();
            if (edit == false)
            {
                user = StudentUtils.NewStudentToUser(realStudent);
                studentController.AddStudent(user, realStudent.subareas);
            }
            else
            {
                user = StudentUtils.EditedStudentToUser(realStudent, studentController.GetUserController());
                bool changedName = (realStudent.name != realStudent.full_name);
                studentController.EditStudent(user, realStudent.subareas, changedName);
            }
        }

        // PUT: api/EditStudent/5
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
