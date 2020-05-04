using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication2.DAL;
using WebApplication2.Models;
using WebApplication2.DBControllers;

namespace WebApplication2.Utils
{
    public static class OptionUtils
    {
        public static string[] OptionsToStrings(List<OptionAssign> allOptions)
        {
            List<string> options = new List<string>();
            foreach (OptionAssign option in allOptions)
            {
                options.Add(option.optionTitle);
            }
            return options.ToArray();
        }
        public static string[] OptionsToAnswers(List<OptionAssign> allOptions)
        {
            List<string> answers = new List<string>();
            foreach (OptionAssign option in allOptions)
            {
                if (option.answer[0] == 1)
                    answers.Add(option.optionTitle);
            }
            return answers.ToArray();
        }
        public static OptionAssign OptionToOptionAssign(int questionId, string option, string[] answers)
        {
            byte[] answer = new byte[] { 0 };
            if (answers.Contains(option))
                answer[0] = 1;
            OptionAssign optionAssign = new OptionAssign
            {
                questionId = questionId,
                optionTitle = option,
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
                OptionAssign foundAnswer = actualList.Find(optionElement => optionElement.answer[0] == listElement.answer[0]);
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