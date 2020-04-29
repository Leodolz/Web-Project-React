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
using WebApplication2.Utils;
using WebApplication2.Proxies;

namespace WebApplication2.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class SubAreasController : ApiController
    {
        private SubAreaController subAreaController = new SubAreaController();
        private AreaController areaController = new AreaController();
        private UserController userController = new UserController();
        // GET: api/SubAreas
        public List<SubArea> Get()
        {
            return subAreaController.GetAllSubAreas();
        }
        public string[] Get(string studentAreas)
        {
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
        public IHttpActionResult Get(int id)
        {
            System.Diagnostics.Debug.WriteLine("Recieved GET with value = " + id);
            var result = subAreaController.GetById(id);
            if (result == null)
            {
                System.Diagnostics.Debug.WriteLine("Couldn't return area");
                EditSubAreaController.currentSubArea = null;
                EditSubAreaController.Editing = false;
                return NotFound();
            }
            RealAreaProxy.UpdateArea(result.parentAreaId);
            EditSubAreaController.currentSubArea = AreaUtils.SubAreaToRefurbished(result,subAreaController,userController);
            EditSubAreaController.Editing = true;
            return Ok(result);
        }
        public IHttpActionResult Get(int id, string action)
        {
            if (action.Equals("SetParentArea"))
            {
                EditSubAreaController.Editing = false;
                EditSubAreaController.parentAreaId = id;
                RealAreaProxy.UpdateArea(id);
                return Ok();
            }
            else if (action.Equals("GetSubAreas"))
            {
                
                if (userController.GetById(id).role == "Admin")
                    return Ok(subAreaController.GetAllSubAreas().ToArray());
                //Use this for getting sub areas that only the teacher can access to 
                SubArea[] subareas = subAreaController.GetUserSubAreas(id).ToArray();
                return Ok(subareas);
            }
            else if (action.Equals("GetQuestions"))
            {
                RealExamController realExamController = new RealExamController();
                return Ok(realExamController.GetAllSubAreaQuestions(id));
            }
            else return NotFound();
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
