using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TeduShop.Model.Models;
using TeduShop.Service;
using TeduShop.Web.Infrastructure.Core;
using TeduShop.Web.Infrastructure.Extension;
using TeduShop.Web.Models;

namespace TeduShop.Web.Api
{
    [RoutePrefix("api/ProductCategory")]
    public class ProductCategoryController : ApiControllerBase
    {
        private IProductCategoryService _productCategoryService;
        public ProductCategoryController(IErrorService errorService, IProductCategoryService productCategoryService) : base(errorService)
        {
            this._productCategoryService = productCategoryService;
        }

        [Route("GetAll")]
        [HttpGet]
        public HttpResponseMessage GetAll(HttpRequestMessage request,string keyword, int page, int pageSize = 20)
        {
            return CreateHttpResponse(request, () =>
            {
                int totalRow = 0;

                var model = _productCategoryService.GetAll(keyword);

                totalRow = model.Count();
                var query = model.OrderBy(i => i.CreatedDate).Skip(page * pageSize).Take(pageSize);

                var responseData = Mapper.Map<IEnumerable<ProductCategory>, IEnumerable<ProductCategoryViewModel>>(query);

                var paginationSet = new PaginationSet<ProductCategoryViewModel>()
                {
                    TotalCount = totalRow,
                    Items = responseData,
                    Page = page,
                    TotalPages = (int)Math.Ceiling((decimal)totalRow / pageSize)
                };

                var response = request.CreateResponse(HttpStatusCode.OK, paginationSet);

                return response;
            });
        }

        [Route("GetAllParents")]
        [HttpGet]
        public HttpResponseMessage GetAllParent(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () =>
            {
                var model = _productCategoryService.GetAll();

                var responseData = Mapper.Map<IEnumerable<ProductCategory>, IEnumerable<ProductCategoryViewModel>>(model);

                var response = request.CreateResponse(HttpStatusCode.OK, responseData);
                return response;
            });
        }

        [Route("GetById/{id:int}")]
        [HttpGet]
        public HttpResponseMessage GetById(HttpRequestMessage request, int id)
        {
            return CreateHttpResponse(request, () =>
            {
                var model = _productCategoryService.GetById(id);

                var resData = Mapper.Map<ProductCategory, ProductCategoryViewModel>(model);

                var res = request.CreateResponse(HttpStatusCode.OK, resData);

                return res;
            });
        }

        [Route("Update")]
        [HttpPut]
        public HttpResponseMessage Update(HttpRequestMessage request, ProductCategoryViewModel productCategoryVM)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                var productCategory = _productCategoryService.GetById(productCategoryVM.ID);

                productCategory.UpdateProductCategory(productCategoryVM);

                _productCategoryService.Update(productCategory);
                _productCategoryService.Save();

                var responseData = Mapper.Map<ProductCategory, ProductCategoryViewModel>(productCategory);

                response = request.CreateResponse(HttpStatusCode.Created, responseData);
                return response;
            });
        }

        [Route("Create")]
        [HttpPost]
        public HttpResponseMessage Create(HttpRequestMessage request, ProductCategoryViewModel productCategoryVM)
        {
            return CreateHttpResponse(request, () =>  {
                HttpResponseMessage response = null;

                if (!ModelState.IsValid)
                {
                    response = request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
                }
                else
                {
                    ProductCategory productCategory = new ProductCategory();
                    productCategory.UpdateProductCategory(productCategoryVM);

                    _productCategoryService.Add(productCategory);
                    _productCategoryService.Save();

                    var responseData = Mapper.Map<ProductCategory, ProductCategoryViewModel>(productCategory);

                    response = request.CreateResponse(HttpStatusCode.Created, responseData);
                }

                return response;
            });
        }
    }
}
