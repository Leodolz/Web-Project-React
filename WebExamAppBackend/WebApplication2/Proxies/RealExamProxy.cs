using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication2.DBControllers;
using WebApplication2.Utils;
using WebApplication2.Models;

namespace WebApplication2.Proxies
{
    public class RealExamProxy
    {
        private static List<RealExam> realExamsCache = new List<RealExam>();
        private static List<RealExam> studentExamsCache = new List<RealExam>();
        private ExamController examController = new ExamController();
        private StudentExamController studentExamController = new StudentExamController();
        private RealExamController realExamController = new RealExamController();
        public RealExam GetRealExam(int id)
        {
            RealExam cachedExam = realExamsCache.Find(realExam => realExam.Id == id);
            if (!cachedExam.staticQuestions)
                return GetRandomExam(examController.GetById(id));
            if (cachedExam == null)
            {
                DAL.Exam exam = examController.GetById(id);
                if (!exam.staticQuestions)
                    return GetRandomExam(exam);
                RealExam newExam = realExamController.GetStaticExam(exam);
                realExamsCache.Add(newExam);
                System.Diagnostics.Debug.WriteLine("Exam fetched is:" + newExam.title);
                return newExam;
            }
            System.Diagnostics.Debug.WriteLine("Exam cached is:" + cachedExam.title);
            return cachedExam;
        }
        private RealExam GetRandomExam(DAL.Exam exam)
        {
            RealExam randomExam = realExamController.GetRandomExam(exam);
            realExamsCache.Add(randomExam);
            System.Diagnostics.Debug.WriteLine("Exam fetched is:" + randomExam.title);
            return randomExam;
        }
        public RealExam GetStudentExam(int id)
        {
            RealExam cachedExam = studentExamsCache.Find(studentExam => studentExam.Id == id);
            if (cachedExam == null)
            {
                RealExam newExam = realExamController.GetStudentExam(studentExamController.GetById(id));
                studentExamsCache.Add(newExam);
                System.Diagnostics.Debug.WriteLine("Exam fetched is:" + newExam.title);
                return newExam;
            }
            System.Diagnostics.Debug.WriteLine("Exam cached is:" + cachedExam.title);
            return cachedExam;
        }
        public static void UpdateStudentExam(int studentExamId)
        {
            studentExamsCache.RemoveAll(exam => exam.Id == studentExamId);
        }
        public static void UpdateRealExam(int examId)
        {
            realExamsCache.RemoveAll(exam => exam.Id == examId);
        }
    }
}