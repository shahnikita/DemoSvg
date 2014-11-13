using DemoTestApplication.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace DemoTestApplication.Controllers
{
    public class ProductController : ApiController
    {
        List<Product> products = new List<Product>
        { 
            new Product { Id = 1, Name = "Tomato Soup", Category = "Groceries", Price = 1 }, 
            new Product { Id = 2, Name = "Yo-yo", Category = "Toys", Price = 3.75M }, 
            new Product { Id = 3, Name = "Hammer", Category = "Hardware", Price = 16.99M } 
        };

        /// <summary>
        /// get all products
        /// </summary>
        /// <returns></returns>
        public IEnumerable<Product> GetAllProducts()
        {
            return products;
        }

        /// <summary>
        /// get product by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Product GetProduct(int id)
        {

            var product = products.FirstOrDefault((p) => p.Id == id);
           
            return product;
        }

        public Product AddProduct(Product item)
        {
            var validationContext = new ValidationContext(item, serviceProvider: null, items: null);
            var validationResults = new List<ValidationResult>();

            bool isValid = Validator.TryValidateObject(item, validationContext, validationResults, true);
            if (isValid)
            {
                item.Id = products.Count() + 1;
                products.Add(item);
                return item;
            }
            return null;
        }

        public bool RemoveProduct(int id)
        {
            Product product = GetProduct(id);
            if (product != null)
            {
                products.Remove(product);
                return true;
            }
            return false;
        }

        public bool Update(Product item)
        {
            int index = products.IndexOf(products.Where(x => x.Id == item.Id).FirstOrDefault());

          if (index != -1)
          {
              products.Insert(index, item);
              return true;
          }
            return false;
        }
    }
}
