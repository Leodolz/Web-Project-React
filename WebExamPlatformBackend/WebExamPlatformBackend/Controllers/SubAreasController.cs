using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebExamPlatformBackend.DAL;
using WebExamPlatformBackend.DBControllers;
using WebExamPlatformBackend.Proxies;
using WebExamPlatformBackend.Utils;

namespace WebExamPlatformBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowOrigin")]
    public class SubAreasController : Controller
    {
        private SubAreaController subAreaController = new SubAreaController();
        private AreaController areaController = new AreaController();
        private UserController userController = new UserController();
        // GET: api/SubAreas
        [HttpGet]
        public List<SubArea> Get()
        {
            return subAreaController.GetAllSubAreas();
        }

        // GET: api/SubAreas/5
        [HttpGet("studentAreas={studentAreas}")]
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
        [HttpGet("{id}")]
        public IActionResult Get(int id)
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
            EditSubAreaController.currentSubArea = AreaUtils.SubAreaToRealSubArea(result, subAreaController, userController);
            EditSubAreaController.Editing = true;
            return Ok(result);
        }
        [HttpGet("{id}&action={act}")]
        public IActionResult Get(int id, string act)
        {
            if (act.Equals("SetParentArea"))
            {
                EditSubAreaController.Editing = false;
                EditSubAreaController.parentAreaId = id;
                RealAreaProxy.UpdateArea(id);
                return Ok();
            }
            else if (act.Equals("GetSubAreas"))
            {

                if (userController.GetById(id).role == "Admin")
                    return Ok(subAreaController.GetAllSubAreas().ToArray());
                SubArea[] subareas = subAreaController.GetUserSubAreas(id).ToArray();
                return Ok(subareas);
            }

            else return NotFound();
        }

        // POST: api/SubAreas
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/SubAreas/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
