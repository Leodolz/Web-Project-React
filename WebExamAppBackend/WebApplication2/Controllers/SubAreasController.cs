using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using WebApplication2.DBControllers;
using WebApplication2.DAL;
using WebApplication2.Utils;

namespace WebApplication2.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class SubAreasController : ApiController
    {
        private SubAreaController subAreaController = new SubAreaController();
        private AreaController areaController = new AreaController();
        // GET: api/SubAreas
        public List<SubArea> Get()
        {
            return subAreaController.GetAllSubAreas();
        }
        public string[] Get(string studentAreas)
        {
            //Better if we put some area proxies
            //AND if we put this method into some sort of area utils
            List<string> allStudentAreas = studentAreas.Split(',').ToList();
            List<Area> userAreas = new List<Area>();
            foreach (string areaName in allStudentAreas)
            {
                userAreas.Add(areaController.getByName(areaName));
            }
            List<SubArea> finalSubAreas = SubAreaUtils.GetAvailableSubAreasInAreas(userAreas, subAreaController);
      
            return SubAreaUtils.GetSubAreasStrings(finalSubAreas);
        }

        // GET: api/SubAreas/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/SubAreas
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/SubAreas/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/SubAreas/5
        public void Delete(int id)
        {
        }
    }
}
