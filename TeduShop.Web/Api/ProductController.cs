using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TeduShop.Service;
using TeduShop.Web.Infrastructure.Core;

namespace TeduShop.Web.Api
{
    public class ProductController : ApiControllerBase
    {
        private readonly IProductService _productService;

        public ProductController(IErrorService errorService, IProductService productService) : base(errorService)
        {
            this._productService = productService;
        }


    }
}