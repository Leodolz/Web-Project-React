using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication2.DAL;

namespace WebApplication2.Models
{
    public class RefurbishedSubArea
    {
        public int Id { get; set; }
        public string name { get; set; }
        public string created { get; set; }
        public User[] students { get; set; }
        public int parentId { get; set; }
    }
}