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
                user = StudentUtils.EditedStudentToUser(realStudent,studentController.GetUserController());
                bool changedName = (realStudent.name != realStudent.full_name);
                studentController.EditStudent(user,realStudent.subareas,changedName);
            }
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
