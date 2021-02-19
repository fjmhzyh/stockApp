'use strict';
module.exports = app => {
  return class IntroController extends app.Controller {
    async index(ctx) {
    	// const list = this.service.article.getArtilceList();
      await ctx.render('intro.js');
    }

    async list(ctx){
      // console.log('pageSize', ctx.query)
    	const result = await this.service.article.getStock(ctx.query);
    	this.ctx.body = result;
    }

    async rank(ctx){
      await ctx.render('rank.js');
    }
  };
};