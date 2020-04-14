using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using WebApplication2.DBControllers;
using WebApplication2.DAL;
using WebApplication2.Models;
using Newtonsoft.Json.Linq;

namespace WebApplication2.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class EditAreaController : ApiController
    {
        public static bool Editing = false;
        public static RealArea currentArea = null;
        private AreaController areaController = new AreaController();
        public IHttpActionResult Get()
        {
            if (Editing)
                return Ok(currentArea);
            else return NotFound();
        }

        // POST: api/EditArea
        public void Post(object area, bool edit)
        {
            
            JObject juser = area as JObject;
            Area recievingArea = juser.ToObject<Area>();
            if (edit == false)
            {
                recievingArea.created = DateTime.Today;
                areaController.AddArea(recievingArea);
            }
            else
            {
                areaController.EditArea(recievingArea.Id, recievingArea);
            }
        }

        // PUT: api/EditArea/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/EditArea/5
        public void Delete(int id)
        {
        }
    }
}
