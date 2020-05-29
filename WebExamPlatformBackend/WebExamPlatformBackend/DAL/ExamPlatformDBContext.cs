using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace WebExamPlatformBackend.DAL
{
    public partial class ExamPlatformDBContext : DbContext
    {
        public ExamPlatformDBContext()
        {
        }

        public ExamPlatformDBContext(DbContextOptions<ExamPlatformDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Area> Areas { get; set; }
        public virtual DbSet<Exam> Exams { get; set; }
        public virtual DbSet<Image> Images { get; set; }
        public virtual DbSet<OptionAssign> OptionAssign { get; set; }
        public virtual DbSet<QuestionAssign> QuestionAssign { get; set; }
        public virtual DbSet<StaticQuestionAssign> StaticQuestionAssign { get; set; }
        public virtual DbSet<StudentExam> StudentExam { get; set; }
        public virtual DbSet<StudentQuestionTable> StudentQuestionTable { get; set; }
        public virtual DbSet<SubAreaAssign> SubAreaAssign { get; set; }
        public virtual DbSet<SubArea> SubAreas { get; set; }
        public virtual DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                /*System.Diagnostics.Debug.WriteLine("PRINTING DIR");
                System.Diagnostics.Debug.WriteLine(Environment.CurrentDirectory);*/
                //optionsBuilder.UseSqlServer("Server=db-server;Database=ExamPlatformDB;User Id=sa;Password=User_123;multipleactiveresultsets=True"); //For using with docker
                optionsBuilder.UseSqlServer("data source=(LocalDB)\\MSSQLLocalDB;attachdbfilename="+ (Environment.CurrentDirectory) + "\\AppData\\ExamPlatformDB.mdf;integrated security=True;multipleactiveresultsets=True;connect timeout=30;application name=EntityFramework");

            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Area>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.created)
                    .HasColumnName("created")
                    .HasColumnType("date");

                entity.Property(e => e.name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Exam>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.fromDate)
                    .HasColumnName("fromDate")
                    .HasColumnType("datetime");

                entity.Property(e => e.numberQuestions).HasColumnName("numberQuestions");

                entity.Property(e => e.staticQuestions).HasColumnName("staticQuestions");

                entity.Property(e => e.subAreaId).HasColumnName("subAreaId");

                entity.Property(e => e.title)
                    .IsRequired()
                    .HasColumnName("title")
                    .HasMaxLength(50);

                entity.Property(e => e.untilDate)
                    .HasColumnName("untilDate")
                    .HasColumnType("datetime");
            });

            modelBuilder.Entity<Image>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.contextId).HasColumnName("contextId");

                entity.Property(e => e.imgContext)
                    .IsRequired()
                    .HasColumnName("imgContext")
                    .HasMaxLength(50);

                entity.Property(e => e.imgData)
                    .IsRequired()
                    .HasColumnName("imgData");
            });

            modelBuilder.Entity<OptionAssign>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.answer).HasColumnName("answer");

                entity.Property(e => e.optionTitle)
                    .IsRequired()
                    .HasColumnName("optionTitle")
                    .HasMaxLength(150);

                entity.Property(e => e.questionId).HasColumnName("questionId");
            });

            modelBuilder.Entity<QuestionAssign>(entity =>
            {
                entity.ToTable("questionAssign");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.score).HasColumnName("score");

                entity.Property(e => e.subAreaId).HasColumnName("subAreaId");

                entity.Property(e => e.title)
                    .IsRequired()
                    .HasColumnName("title")
                    .HasMaxLength(250);

                entity.Property(e => e.type)
                    .IsRequired()
                    .HasColumnName("type")
                    .HasMaxLength(10);
            });

            modelBuilder.Entity<StaticQuestionAssign>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.examId).HasColumnName("examId");

                entity.Property(e => e.questionId).HasColumnName("questionId");
            });

            modelBuilder.Entity<StudentExam>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.examId).HasColumnName("examId");

                entity.Property(e => e.score).HasColumnName("score");

                entity.Property(e => e.studentId).HasColumnName("studentId");
            });

            modelBuilder.Entity<StudentQuestionTable>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.questionId).HasColumnName("questionId");

                entity.Property(e => e.score).HasColumnName("score");

                entity.Property(e => e.studentAnswerIds)
                    .IsRequired()
                    .HasColumnName("studentAnswerIds")
                    .HasMaxLength(250);

                entity.Property(e => e.studentExamId).HasColumnName("studentExamId");
            });

            modelBuilder.Entity<SubAreaAssign>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.created)
                    .HasColumnName("created")
                    .HasColumnType("date");

                entity.Property(e => e.subAreaId).HasColumnName("subAreaId");

                entity.Property(e => e.userId).HasColumnName("userId");
            });

            modelBuilder.Entity<SubArea>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.created)
                    .HasColumnName("created")
                    .HasColumnType("date");

                entity.Property(e => e.name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasMaxLength(50);

                entity.Property(e => e.parentAreaId).HasColumnName("parentAreaId");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.active).HasColumnName("active");

                entity.Property(e => e.birth)
                    .HasColumnName("birth")
                    .HasColumnType("date");

                entity.Property(e => e.contact)
                    .HasColumnName("contact")
                    .HasMaxLength(20);

                entity.Property(e => e.created)
                    .HasColumnName("created")
                    .HasColumnType("date");

                entity.Property(e => e.email)
                    .IsRequired()
                    .HasColumnName("email")
                    .HasMaxLength(80);

                entity.Property(e => e.full_name)
                    .IsRequired()
                    .HasColumnName("full_name")
                    .HasMaxLength(80);

                entity.Property(e => e.password)
                    .IsRequired()
                    .HasColumnName("password")
                    .HasMaxLength(64);

                entity.Property(e => e.role)
                    .IsRequired()
                    .HasColumnName("role")
                    .HasMaxLength(20);

                entity.Property(e => e.until)
                    .HasColumnName("until")
                    .HasColumnType("date");

                entity.Property(e => e.username)
                    .IsRequired()
                    .HasColumnName("username")
                    .HasMaxLength(50);
            });
        }
    }
}
