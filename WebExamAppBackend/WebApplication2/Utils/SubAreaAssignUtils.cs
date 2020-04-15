﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication2.DAL;
using WebApplication2.Models;
using WebApplication2.DBControllers;

namespace WebApplication2.Utils
{
    public class SubAreaAssignUtils
    {
        public static void AssignUsersToSubArea(int[] usersIds, SubAreaController subAreaController, int subAreaId)
        {
            foreach (int userId in usersIds)
            {
                SubAreaAssign newAssignment = new SubAreaAssign
                {
                    userId = userId,
                    created = DateTime.Today,
                    subAreaId = subAreaId
                };
                subAreaController.AssignNewSubArea(newAssignment);
            }
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
        public static void UnAssignSubAreasToUser(int userId, SubAreaController subAreaController, string[] subareas)
        {
            foreach (string subAreaName in subareas)
            {
                int subAreaId = subAreaController.GetByName(subAreaName).Id;
                int subAreaAssignId = subAreaController.GetAssignmentId(subAreaId, userId);
                subAreaController.DeleteAssignment(subAreaAssignId);
            }
        }
        public static void UnAssignUsersToSubArea(int[] studentsIds, SubAreaController subAreaController, int subAreaId)
        {
            foreach (int studentId in studentsIds)
            {
                int subAreaAssignId = subAreaController.GetAssignmentId(subAreaId, studentId);
                subAreaController.DeleteAssignment(subAreaAssignId);
            }

        }
       
    }
}