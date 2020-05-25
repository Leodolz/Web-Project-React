using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebExamPlatformBackend.Models
{
    public class RealStudent
    {
        public int Id { get; set; }
        public string email { get; set; }
        public string username { get; set; }
        public string birth { get; set; }
        public bool active { get; set; }
        public string name { get; set; }
        public string contact { get; set; }
        public string[] areas { get; set; }
        public string[] subareas { get; set; }
        public string full_name { get; set; }
        public string role { get; set; }
    }
}
