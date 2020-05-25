using System;
using System.Collections.Generic;

namespace WebExamPlatformBackend.DAL
{
    public partial class User
    {
        public int Id { get; set; }
        public string email { get; set; }
        public string username { get; set; }
        public string role { get; set; }
        public string password { get; set; }
        public DateTime created { get; set; }
        public DateTime until { get; set; }
        public bool active { get; set; }
        public string full_name { get; set; }
        public DateTime birth { get; set; }
        public string contact { get; set; }
    }
}
