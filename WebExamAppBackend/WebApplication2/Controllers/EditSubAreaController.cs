using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication2.DBControllers;
using WebApplication2.DAL;
using WebApplication2.Models;
using System.Web.Http.Cors;

namespace WebApplication2.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class EditSubAreaController : ApiController
    {
        public static bool Editing = false;
        public static RealSubArea currentSubArea = null;
        private SubAreaController subAreaController = new SubAreaController();

        // GET: api/EditSubArea
        public IHttpActionResult Get()
        {
            if (Editing)
                return Ok(currentSubArea);
            else return NotFound();
        }


        // POST: api/EditSubArea
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/EditSubArea/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/EditSubArea/5
        public void Delete(int id)
        {
        }
    }
}
