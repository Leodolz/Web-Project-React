using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebExamPlatformBackend.DAL;
using WebExamPlatformBackend.DBControllers;
using WebExamPlatformBackend.Models;
using WebExamPlatformBackend.Proxies;

namespace WebExamPlatformBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowOrigin")]
    public class AreasController : Controller
    {
        private AreaController areaController = new AreaController();
        private RealAreaProxy areasProxy = new RealAreaProxy();
        // GET: api/Areas
        [HttpGet]
        public RealArea[] Get()
        {
            EditAreaController.Editing = false;
            EditSubAreaController.Editing = false;
            RealAreaController realAreaController = new RealAreaController();
            return realAreaController.GetAllAdminAreas(areasProxy).ToArray();
        }

        // api/Areas/strings?strings={strings}
        //[HttpGet("strings")]
        //api/Areas/strings={strings}
        [HttpGet("strings={strings}")]
        public string[] Get(bool strings)
        {
            List<Area> areas = areaController.GetAllAreas();
            List<string> areaNames = new List<string>();
            foreach (Area area in areas)
            {
                areaNames.Add(area.name);
            }
            return areaNames.ToArray();
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            
            var result = areasProxy.GetArea(id);
            if (result == null)
            {
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
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Areas/5
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
