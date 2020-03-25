﻿using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Web.Http;
using System.Web.Http.Cors;
using WebApplication2.Models;

namespace WebApplication2.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class UsersController : ApiController
    {
        public static List<User> DefaultUsers = new List<User>
        {
            new User {id = 1, name = "Me", email= "email1", phone="1", role=1, shaName=StringToSha("Me")},
            new User {id = 2, name = "OtherMe", email= "email2", phone="2", role=2, shaName = StringToSha("OtherMe")}
        };
        
        // GET: api/Users
        public IEnumerable<User> Get()
        {
            return DefaultUsers;
        }

        // GET: api/Users/5
        public IHttpActionResult Get(string id)
        {
            System.Diagnostics.Debug.WriteLine("Recieved GET with value = "+id);
            var product = DefaultUsers.Find((user) => user.shaName == id);
            if (product == null)
            {
                AuthController.currentUser = null;
                AuthController.WebAuth = false;
                return NotFound();
            }
            AuthController.currentUser = product;
            AuthController.WebAuth = true;
            return Ok(product);
        }

        // POST: api/Users
        public void Post(object user)
        {
            JObject juser = user as JObject;
            User realUser = juser.ToObject<User>();
            System.Diagnostics.Debug.WriteLine("Recieved User: "+realUser.name);
            realUser.id = DefaultUsers.Count + 1;
            realUser.shaName = StringToSha(realUser.name);
            DefaultUsers.Add(realUser);
        }

        // PUT: api/Users/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Users/5
        public void Delete(int id)
        {
        }
        public static string StringToSha(string value)
        {
            using (SHA256 hash = SHA256.Create())
            {
                return string.Concat(hash
                  .ComputeHash(Encoding.UTF8.GetBytes(value))
                  .Select(item => item.ToString("x2")));
            }
        }
    }
}
