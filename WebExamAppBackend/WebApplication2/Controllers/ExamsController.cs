using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication2.DBControllers;
using WebApplication2.DAL;
using WebApplication2.Models;
using WebApplication2.Utils;
using WebApplication2.Proxies;
using System.Web.Http.Cors;

namespace WebApplication2.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ExamsController : ApiController
    {
        private RealExamController realExamController = new RealExamController();
        private RealExamProxy realExamProxy = new RealExamProxy();
        // GET: api/Exams
        public IHttpActionResult Get()
        {
            return Ok(realExamController.GetAllRealExams(realExamProxy));
            //THIS IS ONLY FOR DEMO PURPOSES
        }

        // GET: api/Exams/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Exams
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Exams/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Exams/5
        public void Delete(int id)
        {
        }
    }
}
