﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication2.DAL;
using WebApplication2.Models;
using WebApplication2.DBControllers;

namespace WebApplication2.Utils
{
    public static class AreaUtils
    {
        public static RealArea AreaToRealArea(Area area, SubAreaController subAreaController, UserController userController)
        {
            List<SubArea> availableSubAreas = SubAreaUtils.GetAvailableSubAreasInAreas(new List<Area> { area }, subAreaController);
            List<RealSubArea> realAvailableSubAreas = new List<RealSubArea>();
            foreach (SubArea subarea in availableSubAreas)
            {
                realAvailableSubAreas.Add(SubAreaToRealSubArea(subarea, subAreaController, userController));
            }
            return new RealArea
            {
                Id = area.Id,
                created = area.created.ToShortDateString(),
                name = area.name,
                subareas = realAvailableSubAreas.ToArray(),
                students = allNonRepeatedStudents(realAvailableSubAreas)
            };
        }
        public static RealSubArea SubAreaToRealSubArea(SubArea subArea, SubAreaController subAreaController, UserController userController)
        {
            List<int> allStudents = subAreaController.GetAllStudentsIds(subArea.Id);
            List<string> allStudentNames = new List<string>();
            foreach(int studentId in allStudents)
            {
                User user = userController.GetById(studentId);
                if(user.role=="Student")
                    allStudentNames.Add(user.full_name); 
            }
            RealSubArea realSubArea = new RealSubArea
            {
                parentAreaId = subArea.parentAreaId,
                name = subArea.name,
                Id = subArea.Id,
                created = subArea.created.ToShortDateString(),
                students = allStudentNames.ToArray()
            };
            return realSubArea;
        }
        public static RefurbishedSubArea SubAreaToRefurbished(SubArea subArea, SubAreaController subAreaController, UserController userController)
        {
            List<User> allStudents = new List<User>();
            List<int> allStudentsIds = subAreaController.GetAllStudentsIds(subArea.Id);
            foreach (int studentId in allStudentsIds)
            {
                User user = userController.GetById(studentId);
                if(user.role=="Student")
                    allStudents.Add(user); 
            }
            return new RefurbishedSubArea
            {
                Id = subArea.Id,
                created = subArea.created.ToShortDateString(),
                name = subArea.name,
                students = allStudents.ToArray(),
                parentId = subArea.parentAreaId
            };
        }
        private static string[] allNonRepeatedStudents(List<RealSubArea> allrealSubAreas)
        {
            List<string> allStudents = new List<string>();
            foreach(RealSubArea realSubArea in allrealSubAreas )
            {
                foreach(string student in realSubArea.students)
                {
                    if (!allStudents.Contains(student))
                        allStudents.Add(student);
                }
            }
            return allStudents.ToArray();
        }
        
    }
}