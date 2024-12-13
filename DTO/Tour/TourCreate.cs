using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebBackendProject.Models;

namespace WebBackendProject.DTO.Tour
{
    public class TourCreate
    {
        public WebBackendProject.Models.Tour tour { get; set; }
        public List<TourPackage> tourPackages { get; set; }
        public int user_id { get; set; }
    }
}