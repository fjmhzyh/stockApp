'use strict';
module.exports = app => {
  return class IntroController extends app.Controller {
    async index(ctx) {
    	// const list = this.service.article.getArtilceList();
      await ctx.render('intro.js', {page: 'list'});
    }

    async list(ctx){
    	const result = await this.service.article.getStock(ctx.query);
    	this.ctx.body = result;
    }

    async markedList(ctx){
      const result = await this.service.article.getMarkedStock(ctx.query);
      this.ctx.body = result;
    }

    async mark(ctx){
      const result = await this.service.article.markStock(ctx.query);
      this.ctx.body = result;
    }

    async collection(ctx){
      await ctx.render('collection.js', { page: 'collection' } );
    }
  };
};