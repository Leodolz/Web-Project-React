using System;
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
        private static UserProxy userProxy = new UserProxy(new UserController());
        // GET: api/Students
        public Student[] Get()
        {
            StudentController studentController = new StudentController();
            return studentController.GetAllUsers().ToArray();
        }

        // GET: api/Students/5
        public string Get(int id)
        {
            return "value";
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
