using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using WebExamPlatformBackend.DAL;
using WebExamPlatformBackend.DBControllers;
using WebExamPlatformBackend.Models;

namespace WebExamPlatformBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowOrigin")]
    public class EditAreaController : Controller
    {
        public static bool Editing = false;
        public static RealArea currentArea = null;
        private AreaController areaController = new AreaController();
        // GET: api/EditArea
        [HttpGet]
        public IActionResult Get()
        {
            if (Editing)
                return Ok(currentArea);
            else return NotFound();
        }

        // POST: api/EditArea
        [HttpPost("edit={edit}")]
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
