//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace WebApplication2.DAL
{
    using System;
    using System.Collections.Generic;
    
    public partial class Exam
    {
        public int Id { get; set; }
        public string title { get; set; }
        public System.DateTime fromDate { get; set; }
        public int subAreaId { get; set; }
        public int numberQuestions { get; set; }
        public System.DateTime untilDate { get; set; }
        public bool staticQuestions { get; set; }
    }
}
