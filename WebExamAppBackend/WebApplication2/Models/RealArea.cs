using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication2.Models
{
    public class RealArea
    {
        public int Id { get; set; }
        public string name { get; set; }
        public string created { get; set; }
        public string[] students { get; set; }
        public RealSubArea[] subareas { get; set; }
    }
}