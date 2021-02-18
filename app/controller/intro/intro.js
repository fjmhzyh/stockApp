'use strict';
module.exports = app => {
  return class IntroController extends app.Controller {
    async index(ctx) {
    	// const list = this.service.article.getArtilceList();
      await ctx.render('intro.js');
    }

    async list(ctx){
  		const page = ctx.query.page;
      const pageSize = ctx.query.pageSize;
      const sort = ctx.query.sort;
      const type = ctx.query.type;
      // console.log('pageSize', ctx.query)
    	const result = await this.service.article.getStock(page, pageSize, sort, type);
    	this.ctx.body = result;
    }
  };
};