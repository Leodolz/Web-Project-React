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
                subareas = SubAreaUtils.getSubAreasStrings(userSubAreas),
                areas = getAreas(userSubAreas, areaController) //This is not working 
            };
        }
        private static string[] getAreas(List<SubArea> subAreas, AreaController areaController)
        {
           
            List<string> areas = new List<string>();
            foreach (SubArea subarea in subAreas)
            {
                string areaName = areaController.getById(subarea.parentAreaId).name;
                if(areas.Find(name=>name==areaName)==null)
                    areas.Add(areaName);
            }
            return areas.ToArray();
        }
        
    }
}