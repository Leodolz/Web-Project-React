using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication2.DAL;
using WebApplication2.Models;
using WebApplication2.DBControllers;


namespace WebApplication2.Utils
{
    public static class SubAreaUtils
    {
        public static List<SubArea> GetAvailableSubAreasInAreas(List<Area> areas, SubAreaController subAreaController)
        {
            List<SubArea> allSubAreas = subAreaController.GetAllSubAreas();
            List<SubArea> filteredSubAreas = new List<SubArea>();
            foreach (Area area in areas)
            {
                foreach(SubArea subarea in allSubAreas)
                {
                    if (subarea.parentAreaId == area.Id)
                        filteredSubAreas.Add(subarea);
                }
            }
            return filteredSubAreas;
        }
        public static string[] GetSubAreasStrings(List<SubArea> subAreas)
        {

            List<string> areas = new List<string>();
            foreach (SubArea subarea in subAreas)
            {
                areas.Add(subarea.name);
            }
            return areas.ToArray();
        }
        public static List<string> OneWayCompareSubAreas(List<string> completeList, List<string> containingList)
        {
            List<string> differentItems = new List<string>();
            foreach (string listElement in completeList)
            {
                if (!containingList.Contains(listElement))
                    differentItems.Add(listElement);
            }
            return differentItems;
        }
        public static SubArea NewSubToSubArea(RefurbishedSubArea refurbishedSubArea, SubAreaController subAreaController)
        {

            //Assign students to subArea
            return new SubArea
            {
                created = DateTime.Today,
                Id = refurbishedSubArea.Id,
                parentAreaId = refurbishedSubArea.parentId,
                name = refurbishedSubArea.name
            };

        }
        public static SubArea EditedSubToSubArea(RefurbishedSubArea refurbishedSubArea, SubAreaController subAreaController)
        {
            SubArea subArea = subAreaController.GetById(refurbishedSubArea.Id);
            subArea.name = refurbishedSubArea.name;
            return subArea;
        }
        public static List<int> SubAreasToSubAreaIds(List<SubArea> subAreas)
        {
            List<int> subAreaIds = new List<int>();
            foreach(SubArea subArea in subAreas)
            {
                subAreaIds.Add(subArea.Id);
            }
            return subAreaIds;
        }

    }
}