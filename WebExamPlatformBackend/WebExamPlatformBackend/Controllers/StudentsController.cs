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
    public class StudentsController : Controller
    {
        private StudentTeacherProxy studentTeacherProxy = new StudentTeacherProxy();
        // GET: api/Students
        [HttpGet("subAreaId={subAreaId}&role={role}")]
        public RealStudent[] Get(int subAreaId, string role) // This method DOES differentiate between roles
        {
            RealStudentController studentController = new RealStudentController();
            EditStudentController.Editing = false;
            if (subAreaId == 0)
                return studentController.GetAllUsersByRole(studentTeacherProxy, role).ToArray();
            else
            {
                return studentController.GetStudentsInSubAreas(studentTeacherProxy, subAreaId).ToArray();
            }
        }

        // GET: api/Students/5
        [HttpGet("{id}")]
        public ActionResult Get(int id) //This method does NOT differentiate between any role
        {
            var result = studentTeacherProxy.GetStudent(id);
            if (result == null)
            {
                EditStudentController.currentStudent = null;
                EditStudentController.Editing = false;
                return NotFound();
            }
            StudentTeacherProxy.UpdateStudent(result);
            EditStudentController.currentStudent = result;
            EditStudentController.Editing = true;
            return Ok(result);
        }

        // POST: api/Students
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Students/5
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
