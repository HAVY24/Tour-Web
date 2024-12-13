using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebBackendProject.Models.DTO
{
    public class MyBooking
    {
        public int Id { get; set; }
        public int TourPackageId { get; set; }
        public string Name {  get; set; }
        public Decimal Price { get; set; }
        public string Status { get; set; }
        public int NumOfPeople { get; set; }
        public DateTime? DateOfTravel { get; set; }
    }
}