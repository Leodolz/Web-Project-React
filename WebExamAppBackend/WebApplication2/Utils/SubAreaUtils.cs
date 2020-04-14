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
        //This should be at Sub Area Assigned Utils
        public static void AssignUsersToSubAreas(User[] users, SubAreaController subAreaController, int subAreaId)
        {
            foreach(User user in users)
            {
                SubAreaAssign newAssignment = new SubAreaAssign
                {
                    userId = user.Id,
                    created= DateTime.Today,
                    subAreaId = subAreaId
                };
                subAreaController.AssignNewSubArea(newAssignment);
            }
        }
        //This should be at Sub Area Assigned Utils
        public static void AssignSubAreasToUser(int userId, SubAreaController subAreaController, string[] subareas)
        {
            foreach (string subAreaName in subareas)
            {
                int subAreaId = subAreaController.GetByName(subAreaName).Id;
                SubAreaAssign newAssignment = new SubAreaAssign
                {
                    userId = userId,
                    created = DateTime.Today, // TODO: Change name to modified
                    subAreaId = subAreaId,
                };
                subAreaController.AssignNewSubArea(newAssignment);
            }
        }
        //This should be at Sub Area Assigned Utils
        public static void UnAssignSubAreasToUser(int userId, SubAreaController subAreaController, string[] subareas)
        {
            foreach (string subAreaName in subareas)
            {
                int subAreaId = subAreaController.GetByName(subAreaName).Id;
                int subAreaAssignId = subAreaController.GetAssignmentId(subAreaId, userId);
                subAreaController.DeleteAssignment(subAreaAssignId);
            }

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
       
    }
}