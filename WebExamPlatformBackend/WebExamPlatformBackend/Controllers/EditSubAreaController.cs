using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using WebExamPlatformBackend.DAL;
using WebExamPlatformBackend.DBControllers;
using WebExamPlatformBackend.Models;
using WebExamPlatformBackend.Utils;

namespace WebExamPlatformBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowOrigin")]
    public class EditSubAreaController : Controller
    {
        public static bool Editing = false;
        public static RealSubArea currentSubArea = null;
        public static int parentAreaId = 0;
        private SubAreaController subAreaController = new SubAreaController();
        // GET: api/EditSubArea
        [HttpGet]
        public IActionResult Get()
        {
            if (Editing)
                return Ok(currentSubArea);
            else return Ok(parentAreaId);
        }

        // POST: api/EditSubArea
        [HttpPost("edit={edit}")]
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
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
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
            SubAreaAssignUtils.UnAssignUsersToSubArea(usersToDelete.ToArray(), subAreaController, subAreaId);
        }
    }
}
