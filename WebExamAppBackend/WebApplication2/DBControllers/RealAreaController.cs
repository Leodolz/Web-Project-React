using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication2.Models;
using WebApplication2.DAL;
using WebApplication2.Utils;
using WebApplication2.Proxies;


namespace WebApplication2.DBControllers
{
    public class RealAreaController
    {
        private AreaController areaController = new AreaController();
        private SubAreaController subAreaController = new SubAreaController();

        public List<RealArea> GetAllAdminAreas (RealAreaProxy areasProxy)
        {
            List<Area> allAreas = areaController.GetAllAreas();
            List<RealArea> allRealAreas = new List<RealArea>();
            foreach(Area area in allAreas)
            {
                allRealAreas.Add(areasProxy.GetArea(area.Id));
            }
            return allRealAreas;
        }
    }
}