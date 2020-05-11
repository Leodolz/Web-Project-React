using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApplication2.DAL;

namespace WebApplication2.Repository
{
    public class ImagesRepository: GenericRepository<Image>
    {
        public ImagesRepository(DbContext  context): base(context)
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