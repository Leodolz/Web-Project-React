﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class Exam_DBPltaform5 : DbContext
    {
        public Exam_DBPltaform5()
            : base("name=Exam_DBPltaform5")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Area> Areas { get; set; }
        public virtual DbSet<Exam> Exams { get; set; }
        public virtual DbSet<Image> Images { get; set; }
        public virtual DbSet<OptionAssign> OptionAssigns { get; set; }
        public virtual DbSet<questionAssign> questionAssigns { get; set; }
        public virtual DbSet<StaticQuestionAssign> StaticQuestionAssigns { get; set; }
        public virtual DbSet<StudentExam> StudentExams { get; set; }
        public virtual DbSet<StudentQuestionTable> StudentQuestionTables { get; set; }
        public virtual DbSet<SubAreaAssign> SubAreaAssigns { get; set; }
        public virtual DbSet<SubArea> SubAreas { get; set; }
        public virtual DbSet<User> Users { get; set; }
    }
}
