using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebApplication2.Controllers
{
    public class LogoutController : ApiController
    {
        // GET: api/Logout
        public void Get()
        {
            AuthController.currentUser = null;
            AuthController.WebAuth = false;
        }

    }
}
