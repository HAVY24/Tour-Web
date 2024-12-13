using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebBackendProject.Models;

namespace WebBackendProject.DTO.Post
{
    public class PostCreateDTO
    {
        public BlogPost post { get; set; }
        public int user_id { get; set; }
    }
}