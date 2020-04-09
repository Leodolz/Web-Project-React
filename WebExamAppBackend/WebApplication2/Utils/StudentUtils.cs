using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication2.DAL;
using WebApplication2.Models;
using WebApplication2.DBControllers;

namespace WebApplication2.Utils
{
    public static class StudentUtils
    {
        public static RealStudent UserToStudent(User user, SubAreaController subAreaController, AreaController areaController)
        {
            List<SubArea> userSubAreas = subAreaController.GetUserSubAreas(user.Id);
            return new RealStudent
            {
                Id=user.Id,
                email= user.email,
                username= user.username,
                active= user.active,
                name = user.full_name,
                subareas = getSubAreas(userSubAreas),
                areas = getAreas(userSubAreas, areaController) //This is not working 
            };
        }
        private static string[] getAreas(List<SubArea> subAreas, AreaController areaController)
        {
           
            List<string> areas = new List<string>();
            foreach (SubArea subarea in subAreas)
            {
                areas.Add(areaController.getById(subarea.parentAreaId).name);
            }
            return areas.ToArray();
        }
        private static string[] getSubAreas(List<SubArea> subAreas)
        {

            List<string> areas = new List<string>();
            foreach (SubArea subarea in subAreas)
            {
                areas.Add(subarea.name);
            }
            return areas.ToArray();
        }
    }
}