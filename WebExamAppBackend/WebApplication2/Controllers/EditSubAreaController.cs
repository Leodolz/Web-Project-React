using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication2.DBControllers;
using WebApplication2.DAL;
using WebApplication2.Models;
using System.Web.Http.Cors;
using Newtonsoft.Json.Linq;
using WebApplication2.Utils;

namespace WebApplication2.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class EditSubAreaController : ApiController
    {
        public static bool Editing = false;
        public static RealSubArea currentSubArea = null;
        public static int parentAreaId = 0; 
        private SubAreaController subAreaController = new SubAreaController();

        // GET: api/EditSubArea
        public IHttpActionResult Get()
        {
            if (Editing)
                return Ok(currentSubArea);
            else return Ok(parentAreaId);
        }


        // POST: api/EditSubArea
        public void Post(object refurbishedSubArea, bool edit)
        {
            JObject juser = refurbishedSubArea as JObject;
            RealSubArea recievingSubArea = juser.ToObject<RealSubArea>();
            SubArea subArea = new SubArea();
            if (edit == false)
            {
                subArea = SubAreaUtils.NewSubToSubArea(recievingSubArea, subAreaController);
                int subAreaId = subAreaController.AddSubArea(subArea);
                int[] studentsIds = UserUtils.UserToUserIds(recievingSubArea.studentsObj).ToArray();
                SubAreaAssignUtils.AssignUsersToSubArea(studentsIds, subAreaController, subAreaId);
            }
            else
            {
                subArea = SubAreaUtils.EditedSubToSubArea(recievingSubArea, subAreaController);
                subAreaController.EditSubArea(recievingSubArea.Id, subArea);
                ChangeSubAreaUsers(recievingSubArea.Id, recievingSubArea.studentsObj);
            }
        }

        // PUT: api/EditSubArea/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/EditSubArea/5
        public void Delete(int id)
        {
        }
        private void ChangeSubAreaUsers(int subAreaId, User[] actualUsers)
        {
            List<int> oldSubAreaUsers = subAreaController.GetAllStudentsIds(subAreaId);
            List<int> actualUsersIds = UserUtils.UserToUserIds(actualUsers);
            List<int> usersToAssign = UserUtils.OneWayCompareUsers(actualUsersIds, oldSubAreaUsers);
            List<int> usersToDelete = UserUtils.OneWayCompareUsers(oldSubAreaUsers, actualUsersIds);
            SubAreaAssignUtils.AssignUsersToSubArea(usersToAssign.ToArray(), subAreaController, subAreaId);
            SubAreaAssignUtils.UnAssignUsersToSubArea(usersToDelete.ToArray(), subAreaController, subAreaId );
        }
    }
}
