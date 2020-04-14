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
using Newtonsoft.Json.Linq;
using WebApplication2.Utils;

namespace WebApplication2.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class EditSubAreaController : ApiController
    {
        public static bool Editing = false;
        public static RefurbishedSubArea currentSubArea = null;
        private SubAreaController subAreaController = new SubAreaController();

        // GET: api/EditSubArea
        public IHttpActionResult Get()
        {
            if (Editing)
                return Ok(currentSubArea);
            else return NotFound();
        }


        // POST: api/EditSubArea
        public void Post(object refurbishedSubArea, bool edit)
        {
            JObject juser = refurbishedSubArea as JObject;
            RefurbishedSubArea recievingSubArea = juser.ToObject<RefurbishedSubArea>();
            SubArea subArea = new SubArea();
            if (edit == false)
            {
                subArea = AreaUtils.NewSubToSubArea(recievingSubArea, subAreaController);
                subAreaController.AddSubArea(subArea);
            }
            else
            {
                subArea = AreaUtils.EditedSubToSubArea(recievingSubArea, subAreaController);
                subAreaController.EditSubArea(recievingSubArea.Id, subArea);
            }
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
