using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApplication1
{
    class Program
    {
        public static String ReverseString(String str)
        {
            int word_length = 0;
            String result = "";
            for (int i = 0; i < str.Length; i++)
            {
                if (str[i] == ' ')
                {
                    result = " " + result;
                    word_length = 0;
                }
                else
                {
                    result = result.Insert(word_length, str[i].ToString());
                    word_length++;
                }
            }
            return result;
        }
        static void Main(string[] args)
        {
            string s = "there is a cat";
            string rs = ReverseString(s);
            Console.WriteLine(rs);
        }
    }
}
