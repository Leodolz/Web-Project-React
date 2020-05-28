using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebExamPlatformBackend.DAL;

namespace WebExamPlatformBackend.Models
{
    public class RealSubArea
    {
        public int Id { get; set; }
        public string name { get; set; }
        public string created { get; set; }
        public string[] students { get; set; }
        public User[] studentsObj { get; set; }
        public int parentAreaId { get; set; }
        public User[] teachersObj { get; set; }
    }
}
