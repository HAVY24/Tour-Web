using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebBackendProject.Models.DTO
{
    public class BookingInfo
    {
        public Booking Booking { get; set; }
        public Contact Contact { get; set; }
        public List<Traveler> Traveler { get; set; }

    }
}