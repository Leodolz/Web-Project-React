using Newtonsoft.Json.Linq;
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

namespace WebApplication2.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class EditStudentController : ApiController
    {
        public static bool Editing = false;
        public static RealStudent currentStudent = null;
        private RealStudentController studentController = new RealStudentController();
        // GET: api/EditStudent/5
        public IHttpActionResult Get()
        {
            if (Editing)
                return Ok(currentStudent);
            else return NotFound();
        }

        // POST: api/EditStudent
        public void Post(object student)
        {
            JObject juser = student as JObject;
            RealStudent realStudent = juser.ToObject<RealStudent>();
           
            System.Diagnostics.Debug.WriteLine("With areas: " + string.Join(", ", realStudent.areas));
            System.Diagnostics.Debug.WriteLine("With subareas: " + string.Join(", ", realStudent.subareas));
            System.Diagnostics.Debug.WriteLine("With id: " + realStudent.Id);

            DAL.User user = StudentUtils.NewStudentToUser(realStudent);
            studentController.AddStudent(user, realStudent.subareas);
        }

        // PUT: api/EditStudent/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/EditStudent/5
        public void Delete(int id)
        {
        }
    }
}
