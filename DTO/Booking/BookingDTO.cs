using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebBackendProject.Models.DTO;

namespace WebBackendProject.DTO.Booking
{
    public class BookingDTO
    {
        public BookingInfo info { get; set; }
        public int User_Id { get; set; }
    }
}