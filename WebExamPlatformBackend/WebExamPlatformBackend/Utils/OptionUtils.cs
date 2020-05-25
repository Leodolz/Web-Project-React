using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebExamPlatformBackend.DAL;
using WebExamPlatformBackend.Models;
using WebExamPlatformBackend.DBControllers;

namespace WebExamPlatformBackend.Utils
{
    public static class OptionUtils
    {
        public static RealOption[] OptionsToRealOptions(List<OptionAssign> allOptions)
        {
            List<RealOption> options = new List<RealOption>();
            foreach (OptionAssign option in allOptions)
            {
                options.Add(new RealOption
                {
                    title = option.optionTitle,
                    optionId = option.Id,
                });
            }
            return options.ToArray();
        }
        public static string[] OptionsToAnswers(List<OptionAssign> allOptions)
        {
            List<string> answers = new List<string>();
            foreach (OptionAssign option in allOptions)
            {
                if (option.answer == true)
                    answers.Add(option.optionTitle);
            }
            return answers.ToArray();
        }
        public static OptionAssign OptionToOptionAssign(int questionId, RealOption option, string[] answers)
        {
            bool answer = false;
            if (answers.Contains(option.title))
                answer = true;
            OptionAssign optionAssign = new OptionAssign
            {
                questionId = questionId,
                optionTitle = option.title,
                answer = answer,
            };

            return optionAssign;
        }
        public static List<OptionAssign> OneWayCompareOptions(List<OptionAssign> completeList, List<OptionAssign> actualList)
        {
            List<OptionAssign> differentItems = new List<OptionAssign>();
            foreach (OptionAssign listElement in completeList)
            {
                OptionAssign foundElement = actualList.Find(optionElement => optionElement.optionTitle == listElement.optionTitle);
                OptionAssign foundAnswer = actualList.Find(optionElement => optionElement.answer == listElement.answer);
                if (foundElement == null || foundAnswer == null)
                    differentItems.Add(listElement);
            }
            return differentItems;
        }
        public static List<OptionAssign> FilterUnwishedOptions(List<OptionAssign> completeList, List<OptionAssign> bannedList)
        {
            List<OptionAssign> filteredOptions = new List<OptionAssign>();
            foreach (OptionAssign option in completeList)
            {
                if (!bannedList.Contains(option))
                {
                    filteredOptions.Add(option);
                }
            }
            return filteredOptions;
        }
    }
}
