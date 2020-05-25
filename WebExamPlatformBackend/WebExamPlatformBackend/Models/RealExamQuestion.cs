using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebExamPlatformBackend.Models
{
    public class RealExamQuestion
    {
        public string title { get; set; }
        public string type { get; set; }
        public RealOption[] options { get; set; }
        public string[] answer { get; set; }
        public bool multiple { get; set; }
        public string[] studentAnswer { get; set; }
        public int studentScore { get; set; }
        public int score { get; set; }
        public int questionId { get; set; }
        public int answerCount { get; set; }
        public bool edited { get; set; }
        public bool showImage { get; set; }
        public RealExamQuestion()
        {

        }
        public RealExamQuestion(RealExamQuestion realExamQuestion)
        {
            title = realExamQuestion.title;
            type = realExamQuestion.type;
            options = realExamQuestion.options;
            answer = realExamQuestion.answer;
            multiple = realExamQuestion.multiple;
            studentAnswer = realExamQuestion.studentAnswer;
            studentScore = realExamQuestion.studentScore;
            score = realExamQuestion.score;
            questionId = realExamQuestion.questionId;
            answerCount = realExamQuestion.answerCount;
        }
    }
}
