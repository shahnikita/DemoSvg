using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace DemoTestApplication.Models
{
    public class Product
    {
        public int Id { get; set; }
      [Required(ErrorMessage = "The Product Name is required")]
        public string Name { get; set; }
        public string Category { get; set; }
        public decimal Price { get; set; }
    }
}