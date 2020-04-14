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
using WebApplication2.Proxies;

namespace WebApplication2.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class AreasController : ApiController
    {
        private AreaController areaController = new AreaController();
        private RealAreaProxy areasProxy = new RealAreaProxy();
        // GET: api/Areas?strings={true/false}
        public string[] Get(bool strings)
        {
           
            List<Area> areas = areaController.GetAllAreas();
            List<string> areaNames = new List<string>();
            foreach(Area area in areas)
            {
                areaNames.Add(area.name);
            }
            return areaNames.ToArray();
        }
        // GET: api/Areas
        public RealArea[] Get()
        {
            EditAreaController.Editing = false;
            EditSubAreaController.Editing = false;
            RealAreaController realAreaController = new RealAreaController();
            return realAreaController.GetAllAdminAreas(areasProxy).ToArray();
            
        }

        // GET: api/Areas/5
        public IHttpActionResult Get(int id)
        {
            System.Diagnostics.Debug.WriteLine("Recieved GET with value = " + id);
            var result = areasProxy.GetArea(id);
            if (result == null)
            {
                System.Diagnostics.Debug.WriteLine("Couldn't return area");
                EditAreaController.currentArea = null;
                EditAreaController.Editing = false;
                return NotFound();
            }
            RealAreaProxy.UpdateArea(result);
            EditAreaController.currentArea = result;
            EditAreaController.Editing = true;
            return Ok(result);
        }

        // POST: api/Areas
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Areas/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Areas/5
        public void Delete(int id)
        {
        }
    }
}
