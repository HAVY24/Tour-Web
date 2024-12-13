using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;

namespace WebBackendProject.Helpers
{
    public static class DbConfig
    {
        private static readonly string ConfigFilePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "dbconnection.txt");

        public static string GetConnectionString()
        {
            if (!File.Exists(ConfigFilePath))
                throw new FileNotFoundException($"Configuration file not found at {ConfigFilePath}");

            return File.ReadAllText(ConfigFilePath).Trim();
        }
    }
}