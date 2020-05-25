using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebExamPlatformBackend.DAL;
using WebExamPlatformBackend.Repository;

namespace WebExamPlatformBackend.DBControllers
{
    public class AreaController
    {
        private AreaRepository areaRepository;

        public AreaController()
        {
            areaRepository = new AreaRepository(new ExamPlatformDBContext());
        }
        public List<Area> GetAllAreas()
        {
            return areaRepository.GetAll().ToList();
        }

        public void AddArea(Area model)
        {
            var allSubAreas = areaRepository.GetAll();
            int lastId = 0;
            if (allSubAreas.Count() > 0)
                lastId = allSubAreas[allSubAreas.Count() - 1].Id;
            model.Id = lastId + 1;
            areaRepository.Insert(model);
            areaRepository.Save();
        }
        public void EditArea(int areaId, Area newArea)
        {
            Area model = areaRepository.GetById(areaId);
            model.name = newArea.name;
            EditArea(model);
        }
        private void EditArea(Area model)
        {
            areaRepository.Update(model);
            areaRepository.Save();
        }
        public void DeleteArea(int areaId)
        {
            Area model = areaRepository.GetById(areaId);
            if (model == null)
                return;
            Delete(areaId);
        }

        private void Delete(int areaId)
        {
            areaRepository.Delete(areaId);
            areaRepository.Save();
        }
        public Area getById(int id)
        {
            return areaRepository.GetById(id);
        }
        public Area getByName(string name)
        {
            return areaRepository.GetByAreaName(name);
        }
    }
}
