﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication2.DAL;
using WebApplication2.DBControllers;

namespace WebApplication2.Utils
{
    public static class UserUtils
    {
        public static List<int> UserToUserIds(User[] users)
        {
            List<int> usersIds = new List<int>();
            foreach(User user in users)
            {
                usersIds.Add(user.Id);
            }
            return usersIds;
        }
        public static List<int> OneWayCompareUsers(List<int> completeList, List<int> actualList)
        {
            List<int> differentItems = new List<int>();
            foreach (int listElement in completeList)
            {
                if (!actualList.Contains(listElement))
                    differentItems.Add(listElement);
            }
            return differentItems;
        }
    }
}