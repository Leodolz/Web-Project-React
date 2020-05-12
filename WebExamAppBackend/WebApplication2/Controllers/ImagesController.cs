using System;
using System.Collections.Specialized;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using WebApplication2.DAL;
using WebApplication2.DBControllers;

namespace WebApplication2.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ImagesController : ApiController
    {
        ImagesTableController imagesTableController = new ImagesTableController();
        
        public async void Uploadfile()
        {
            try
            {
                int.TryParse(HttpContext.Current.Request.Params["contextId"],out int contextId);
                string option = HttpContext.Current.Request.Params["option"];
                var content = new StreamContent(HttpContext.Current.Request.GetBufferlessInputStream(true));
                byte[] recievingImage = await content.ReadAsByteArrayAsync();
                imagesTableController.AddImage(imagesTableController.NewImage(recievingImage, contextId, option));
            }
            catch(Exception e)
            {
                System.Diagnostics.Debug.WriteLine(e.Message);
            }
        }

        public IHttpActionResult Get(int id)
        {
            var result = imagesTableController.GetById(id);
            if (result != null)
                return Ok(result);
            else return NotFound();
        }
        public IHttpActionResult Get(int id, string context)
        {
            Image image;
            switch(context)
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
            else return NotFound();
        }


    }
}
