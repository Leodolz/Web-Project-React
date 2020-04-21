using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication2.DAL;
using WebApplication2.DBControllers;
using WebApplication2.Utils;
using WebApplication2.Models;

namespace WebApplication2.Proxies
{
    public class RealAreaProxy
    {
        private static List<RealArea> realAreasCache = new List<RealArea>();
        private UserController userController = new UserController();
        private SubAreaController subAreaController = new SubAreaController();
        private AreaController areaController = new AreaController();
        public RealArea GetArea(int id)
        {
            RealArea cachedArea = realAreasCache.Find(area => area.Id == id);
            if (cachedArea == null)
            {
                RealArea newArea = AreaUtils.AreaToRealArea(areaController.getById(id), subAreaController, userController);
                realAreasCache.Add(newArea);
                System.Diagnostics.Debug.WriteLine("Area fetched is:" + newArea.name);
                return newArea;
            }
            System.Diagnostics.Debug.WriteLine("Area cached is:" + cachedArea.name);
            return cachedArea;
        }
        public static void UpdateArea(RealArea area)
        {
            realAreasCache.Remove(area);
        }
        public static void UpdateArea(int areaId)
        {
            realAreasCache.RemoveAll(area=>area.Id == areaId);
        }
        public static void UpdateFromSubArea(int subAreaId, SubAreaController subAreaController)
        {
            int areaId = subAreaController.GetById(subAreaId).parentAreaId;
            realAreasCache.RemoveAll(area => area.Id == areaId);
        }

    }
}