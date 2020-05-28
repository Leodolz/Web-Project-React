using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebExamPlatformBackend.DAL;
using WebExamPlatformBackend.Repository;

namespace WebExamPlatformBackend.DBControllers
{
    public class ImagesTableController
    {
        private ImagesRepository imagesRepository = new ImagesRepository(new ExamPlatformDBContext());
        public Image GetById(int id)
        {
            return imagesRepository.GetById(id);
        }

        public Image NewImage(byte[] data, int contextId, string context)
        {
            return new Image
            {
                imgData = data,
                contextId = contextId,
                imgContext = context
            };
        }
        public Image GetByQuestionId(int questionId)
        {
            return imagesRepository.GetByQuestionId(questionId);
        }
        public Image GetByOptionId(int optionId)
        {
            return imagesRepository.GetByOptionId(optionId);
        }
        public Image GetByContext(string context, int contextId)
        {
            return imagesRepository.GetByContext(context, contextId);
        }

        public int AddImage(Image model)
        {
            var allImages = imagesRepository.GetAll();
            int lastId = 0;
            if (allImages.Count() > 0)
                lastId = allImages[allImages.Count() - 1].Id;
            model.Id = lastId + 1;
            imagesRepository.Insert(model);
            imagesRepository.Save();
            return model.Id;
        }
        public void EditImage(string imageContext, int contextId,byte[] newImage)
        {
            Image model = imagesRepository.GetByContext(imageContext,contextId);
            model.imgData = newImage;
            EditArea(model);
        }
        private void EditArea(Image model)
        {
            imagesRepository.Update(model);
            imagesRepository.Save();
        }

        public void DeleteImage(int imageId)
        {
            Image model = imagesRepository.GetById(imageId);
            if (model == null)
                return;
            Delete(imageId);
        }
        private void Delete(int examId)
        {
            imagesRepository.Delete(examId);
            imagesRepository.Save();
        }
    }
}
