using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebExamPlatformBackend.Utils
{
    public static class NumberUtils
    {
        public static List<int> GetSetOfRandomNumbers(int max, int length)
        {
            if (length > max)
                return new List<int>();
            List<int> randomNumbers = new List<int>();
            Random random = new Random();
            for (int i = 0; i < length; i++)
            {
                int randomNumber = 0;
                do
                {
                    randomNumber = random.Next(max);
                }
                while (randomNumbers.Contains(randomNumber));
                randomNumbers.Add(randomNumber);
            }
            return randomNumbers;
        }
        public static List<int> GetSetOfRandomNumbers(int min, int max, int length)
        {
            max = max + 1;
            if (length > (max - min))
                return new List<int>();
            List<int> randomNumbers = new List<int>();
            for (int i = 0; i < length; i++)
            {
                Random random = new Random();
            }
            return randomNumbers;
        }
    }
}
