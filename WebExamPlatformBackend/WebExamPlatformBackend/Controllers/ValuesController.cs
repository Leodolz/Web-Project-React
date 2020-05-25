using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebExamPlatformBackend.DBControllers;
using WebExamPlatformBackend.DAL;
using WebExamPlatformBackend.Models;
using Microsoft.AspNetCore.Cors;

namespace WebExamPlatformBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowOrigin")]
    public class ValuesController : Controller
    {
        AreaController areaController = new AreaController();
        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
            //areaController.AddArea(new DAL.Areas { Created = DateTime.Today, Name = "NewArea" }); FUNCIONA!!!!!!!!!
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            
            List<Area> allAreas =  areaController.GetAllAreas();
            List<string> allNames = new List<string>();
            foreach(Area area in allAreas)
            {
                allNames.Add(area.name);
            }
            return Ok(new TestObject { name = string.Join(",", allNames.ToArray()), age = 2 });
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
