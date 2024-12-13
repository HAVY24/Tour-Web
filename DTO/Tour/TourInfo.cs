using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebBackendProject.Models.DTO
{
    public class TourInfo
    {
        public string Name { get; set; }
        public string Region { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string Image { get; set; }
        public TimeSpan? Opening { get; set; }
        public TimeSpan? Ending { get; set; }
    }
}