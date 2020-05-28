using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebExamPlatformBackend.DAL;
using WebExamPlatformBackend.DBControllers;

namespace WebExamPlatformBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowOrigin")]
    public class ImagesController : Controller
    {
        ImagesTableController imagesTableController = new ImagesTableController();

        // GET: api/Images/5
        [HttpGet("{id}")]
        public ActionResult Get(int id)
        {
            var result = imagesTableController.GetById(id);
            if (result != null)
                return Ok(result);
            else return NotFound();
        }
        [HttpGet("{id}&context={context}")]
        public ActionResult Get(int id, string context)
        {
            Image image = imagesTableController.GetByContext(context,id);
            /*switch (context)
            {
                case "question":
                    image = imagesTableController.GetByQuestionId(id);
                    break;
                case "option":
                    image = imagesTableController.GetByOptionId(id);
                    break;
                default:
                    image = null;
                    break;
            }*/
            if (image != null)
                return Ok(image);
            else return Ok();
        }
        [HttpPost("contextId={contextId}&option={option}&edit={edit}")]
        public async Task<ActionResult> Uploadfile(int contextId, string option, bool edit)
         {
            try
            {
                var content = new StreamContent(HttpContext.Request.Body);
                byte[] recievingImage = await content.ReadAsByteArrayAsync();
                System.Diagnostics.Debug.WriteLine(recievingImage.Length);
                if (edit)
                    imagesTableController.EditImage(option, contextId, recievingImage);
                else
                    imagesTableController.AddImage(imagesTableController.NewImage(recievingImage, contextId, option));
                return Ok();
            }
            catch (Exception e)
            {
                System.Diagnostics.Debug.WriteLine("CUSTOM ERROR:");
                System.Diagnostics.Debug.WriteLine(e.Message);
                return NotFound();
            }
         }
        
        
    }
}
