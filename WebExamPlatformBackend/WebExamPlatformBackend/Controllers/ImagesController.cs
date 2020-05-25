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
        public IActionResult Get(int id)
        {
            var result = imagesTableController.GetById(id);
            if (result != null)
                return Ok(result);
            else return NotFound();
        }
        [HttpGet("{id}&context={context}")]
        public IActionResult Get(int id, string context)
        {
            Image image;
            switch (context)
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
            }
            if (image != null)
                return Ok(image);
            else return Ok();
        }
        [HttpPost("contextId={contextId}&option={option}")]
        public void Post([FromBody] byte[] image, [FromRoute] int contextId, [FromRoute] string option)
        {
            System.Diagnostics.Debug.WriteLine("Image size is:" + image.Length);
            System.Diagnostics.Debug.WriteLine("Context is:" + contextId);
            System.Diagnostics.Debug.WriteLine("Option is:" + option);
            System.Diagnostics.Debug.WriteLine(HttpContext.Request.Path + " AND " + HttpContext.Request.PathBase);
        }
        /*
         public async void Uploadfile()
         {
             
             /*
             try
             {
                   var content = new StreamContent(HttpContext.Request.Body);
                   byte[] recievingImage = await content.ReadAsByteArrayAsync();
                   imagesTableController.AddImage(imagesTableController.NewImage(recievingImage, contextId, option));
             }
             catch (Exception e)
             {
                 System.Diagnostics.Debug.WriteLine(e.Message);
             }*//*
          }
         */
        /*public async void Uploadfile()
        {
            
            try
            {
                int.TryParse(HttpContext.Items["contextId"], out int contextId);
                string option = HttpContext.Current.Request.Params["option"];
                var content = new StreamContent(HttpContext.Current.Request.GetBufferlessInputStream(true));
                byte[] recievingImage = await content.ReadAsByteArrayAsync();
                imagesTableController.AddImage(imagesTableController.NewImage(recievingImage, contextId, option));
            }
            catch (Exception e)
            {
                System.Diagnostics.Debug.WriteLine(e.Message);
            }
        }*/
    }
}
