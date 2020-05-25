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
        public Image GetByQuestionId(int questionId)
        {
            return table.FirstOrDefault(image => image.imgContext == "question" &&
               image.contextId == questionId);
        }
        public Image GetByOptionId(int optionId)
        {
            return table.FirstOrDefault(image => image.imgContext == "option" &&
               image.contextId == optionId);
        }
    }
}
