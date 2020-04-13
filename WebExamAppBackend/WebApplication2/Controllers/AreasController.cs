using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using WebApplication2.DBControllers;
using WebApplication2.DAL;

namespace WebApplication2.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class AreasController : ApiController
    {
        // GET: api/Areas
        public string[] Get(bool strings)
        {
           
            AreaController areaController = new AreaController();
            List<Area> areas = areaController.GetAllAreas();
            List<string> areaNames = new List<string>();
            foreach(Area area in areas)
            {
                areaNames.Add(area.name);
            }
            return areaNames.ToArray();
        }
        // GET: api/Areas
        public List<Area> Get()
        {
            AreaController areaController = new AreaController();
            return areaController.GetAllAreas();

        }

        // GET: api/Areas/5
        public string Get(int id)
        {
            return "value";
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
