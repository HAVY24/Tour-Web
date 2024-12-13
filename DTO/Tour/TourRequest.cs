using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebBackendProject.DTO.Tour
{
    public class TourRequest
    {
        public int page { get; set; }
        public int pageSize { get; set; }
        public string searchBy { get; set; }
        public string searchQuery { get; set; }
        public string sortBy { get; set; }
        public int?[] priceRange { get; set; }
        public string region { get; set; }
    }
}