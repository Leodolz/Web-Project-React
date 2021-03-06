﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication2.Models;
using WebApplication2.Proxies;
using WebApplication2.DBControllers;
using WebApplication2.Utils;
using WebApplication2.DAL;
using System.Web.Http.Cors;

namespace WebApplication2.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class StudentsController : ApiController
    {
        private StudentTeacherProxy studentTeacherProxy = new StudentTeacherProxy();
        // GET: api/Students
        public RealStudent[] Get(int subAreaId, string role) // This method DOES differentiate between roles
        {
            RealStudentController studentController = new RealStudentController();
            EditStudentController.Editing = false;
            if(subAreaId == 0)
                return studentController.GetAllUsersByRole(studentTeacherProxy,role).ToArray();
            else
            {
                return studentController.GetStudentsInSubAreas(studentTeacherProxy,subAreaId).ToArray();
            }
        }

        // GET: api/Students/5
        public IHttpActionResult Get(int id) //This method does NOT differentiate between any role
        {
            var result = studentTeacherProxy.GetStudent(id);
            if (result == null )
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
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Students/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Students/5
        public void Delete(int id)
        {
        }
    }
}
