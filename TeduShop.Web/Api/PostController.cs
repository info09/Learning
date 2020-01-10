using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TeduShop.Data.Repositories;
using TeduShop.Service;
using TeduShop.Web.Infrastructure.Core;
using TeduShop.Web.Models;

namespace TeduShop.Web.Api
{
    [RoutePrefix("api/Post")]
    public class PostController : ApiControllerBase
    {
        private readonly IPostRepository _postRepository;

        public PostController(IPostRepository postRepository, IErrorService errorService) : base(errorService)
        {
            this._postRepository = postRepository;
        }

        [HttpGet]
        [Route("GetAll")]
        public HttpResponseMessage GetAll(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () =>
            {
                var listPost = _postRepository.GetAll();

                var listPostVm = Mapper.Map<List<PostViewModel>>(listPost);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, listPostVm);

                return response;
            });
        }

        [HttpGet]
        [Route("GetById/{id:int}")]
        public HttpResponseMessage GetAll(HttpRequestMessage request, int id)
        {
            return CreateHttpResponse(request, () =>
            {
                var post = _postRepository.GetSingleById(id);

                var postVM = Mapper.Map<PostViewModel>(post);

                HttpResponseMessage response = request.CreateResponse(HttpStatusCode.OK, post);

                return response;
            });
        }
    }
}
