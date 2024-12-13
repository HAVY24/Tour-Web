using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebBackendProject.Models.DTO
{
    public class UserRequest
    {
        public int User_Id {  get; set; }
        public string User_Name { get; set; }
        public DateTime Booking_Date { get; set; }
        public int Booking_Id { get; set; }
        public int TourPackage_Id { get; set; }
        public string TourPackage_Name { get; set; }
        public Decimal Total_Price { get; set; }
        public string Payment_Method { get; set; }
        public string Payment_Status { get; set; }

    }
}