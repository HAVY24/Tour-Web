using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebBackendProject.Models.DTO
{
    public class PostInfoUpdate
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public string Hashtags { get; set; }
        public string Image { get; set; }
    }
}