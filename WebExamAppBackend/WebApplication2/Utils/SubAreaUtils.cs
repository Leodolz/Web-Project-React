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
        public static List<SubArea> getAvailableSubAreasInAreas(List<Area> areas, SubAreaController subAreaController)
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
        public static string[] getSubAreasStrings(List<SubArea> subAreas)
        {

            List<string> areas = new List<string>();
            foreach (SubArea subarea in subAreas)
            {
                areas.Add(subarea.name);
            }
            return areas.ToArray();
        }
        public static void AssignSubAreasToUser(int userId, SubAreaController subAreaController, string[] subareas)
        {
            foreach (string subAreaName in subareas)
            {
                int subAreaId = subAreaController.GetByName(subAreaName).Id;
                SubAreaAssign newAssignment = new SubAreaAssign
                {
                    userId = userId,
                    created = DateTime.Today,
                    subAreaId = subAreaId,
                };
                subAreaController.AssignNewSubArea(newAssignment);
            }

        }
    }
}