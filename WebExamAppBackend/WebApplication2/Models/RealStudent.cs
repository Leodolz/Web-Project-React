using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication2.Models
{
    public class RealStudent
    {
        public int Id { get; set; }
        public string email { get; set; }
        public string username { get; set; }
        public string birth { get; set; }
        public byte[] active { get; set; }
        public string name { get; set; }
        public string contact { get; set; }
        public string[] areas { get; set; }
        public string[] subareas { get; set; }
    }
}