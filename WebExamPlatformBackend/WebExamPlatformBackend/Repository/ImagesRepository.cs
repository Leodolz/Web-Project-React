using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebExamPlatformBackend.DAL;

namespace WebExamPlatformBackend.Repository
{
    public class ImagesRepository : Generic.GenericRepository<Image>
    {
        public ImagesRepository(DbContext context) : base(context)
        {

        }
       
        public Image GetByContext(string context, int contextId)
        {
            return table.FirstOrDefault(image => image.imgContext == context &&
                image.contextId == contextId);
        }
    }
}
