using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebExamPlatformBackend.DAL;
using WebExamPlatformBackend.Repository;
using WebExamPlatformBackend.Models;
using WebExamPlatformBackend.Proxies;

namespace WebExamPlatformBackend.DBControllers
{
    public class RealAreaController
    {
        private AreaController areaController = new AreaController();
        private SubAreaController subAreaController = new SubAreaController();

        public List<RealArea> GetAllAdminAreas(RealAreaProxy areasProxy)
        {
            List<Area> allAreas = areaController.GetAllAreas();
            List<RealArea> allRealAreas = new List<RealArea>();
            foreach (Area area in allAreas)
            {
                allRealAreas.Add(areasProxy.GetArea(area.Id));
            }
            return allRealAreas;
        }
    }
}
