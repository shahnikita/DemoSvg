using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DemoTestApplication.Controllers;
using System.Web.Http.Results;
using DemoTestApplication.Models;

namespace DemoTestApplicationTest
{
    [TestFixture]  
    public class ProductControllerTest
    {
        [Test]
        public void GetAllProducts_ShouldReturnALlProducts()
        {
            ProductController productController = new ProductController();
            var products = productController.GetAllProducts();
            Assert.IsNotNull(products);

        }
        [Test]
        public void GetProduct_ShouldReturnProduct()
        {
            ProductController productController = new ProductController();
            var product=productController.GetProduct(2);
            Assert.IsNotNull(product);
        }
        [Test]
        public void GetProduct_ShouldNotReturnProduct()
        {
            ProductController productController = new ProductController();

            var product = productController.GetProduct(999);
            Assert.IsNull(product);
        }

        [Test]
        public void AddProduct_ShouldAddProduct()
        {
            ProductController productController = new ProductController();
            Product product = new Product { Name = "testing", Category = "Hardware", Price = 16.99M };
            var result = productController.AddProduct(product);
            Assert.IsNotNull(result);
        }
         [Test]
        public void AddProduct_ShouldNotAddProduct()
        {
            ProductController productController = new ProductController();
            Product product = new Product {  Category = "Hardware", Price = 16.99M };
           var result = productController.AddProduct(product);
            Assert.IsNull(result);
        }

         [Test]
         public void RemoveProduct_ShouldRemoveProduct()
         {
             //added new product
           ProductController productController = new ProductController();
             Product product = new Product { Name = "testing", Category = "Hardware", Price = 16.99M };
             product = productController.AddProduct(product);
            
             //delete product
             var result=productController.RemoveProduct(product.Id);
             Assert.AreEqual(result, true);
         }

         [Test]
         public void RemoveProduct_ShouldNotRemoveProduct()
         {          
             ProductController productController = new ProductController();
             var result = productController.RemoveProduct(99999);
             Assert.AreEqual(result, false);
         }

         [Test]
         public void UpdateProduct_ShouldUpdateProduct()
         {
             ProductController productController = new ProductController();
             Product product = new Product { Id = 2, Name = "testing", Category = "Toys", Price = 3.75M };
             var result = productController.Update(product);
             Assert.AreEqual(result, true);
         }

         [Test]
         public void UpdateProduct_ShouldNotUpdateProduct()
         {
             ProductController productController = new ProductController();
             Product product = new Product { Id = 99999, Name = "testing", Category = "Toys", Price = 3.75M };
             var result = productController.Update(product);
             Assert.AreEqual(result, false);
         }
    }
}
