using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using LoginRegisterBackendNetCore.Models;
using Newtonsoft.Json.Linq;

namespace LoginRegisterBackendNetCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowOrigin")]
    public class StudentsController : ControllerBase
    {
        private static List<Student> SavedStudents = new List<Student>
        {
            new Student{ID=1,name="John", age=20},
            new Student{ID=2,name="Bob", age=18},
            new Student{ID=3,name="Steve", age=23}
        };

        // GET: api/Students
        [HttpGet]
        public IEnumerable<Student> Get()
        {
            return SavedStudents.AsEnumerable();
        }

        // GET: api/Students/5
        [HttpGet("{id}", Name = "Get")]
        public IActionResult Get(int id)
        {
            System.Diagnostics.Debug.WriteLine("Recieved GET");
            Student foundStudent = SavedStudents.Find(student => student.ID == id);
            if (foundStudent == null)
            {
                return NotFound();
            }
            return Ok(foundStudent);
        }


        // POST: api/Students
        [HttpPost]
        public void Post( object student)
        {
            JObject jstudent = student as JObject;
            Student realStudent = jstudent.ToObject<Student>();
            System.Diagnostics.Debug.WriteLine("Recieved Student: " + realStudent.name);
            realStudent.ID = SavedStudents.Count + 1;
            SavedStudents.Add(realStudent);

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
