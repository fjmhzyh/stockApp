'use strict';
const egg = require('egg');
const Collection = require('../lib/db/collection');
const Query = require('../lib/db/query');



function getSort(sort) {
  var sort = sort?sort.trim():'one';
  return sortMap[sort]
}
const sortMap = {
  'one':  [ ['id','asc'] ],
  'three': [ ['three_year_average_rise','desc'] ],
  'five': [ ['five_year_average_rise','desc'] ],
  'rank3': [ ['three_year_average_rank','asc'] ],
  'rank5': [ ['five_year_average_rank','asc'] ],
}


function getSortForSql(sort) {
  var sort = sort?sort.trim():'one';
  var sortMapForSql = {
    'one':  'id ASC',
    'three': 'three_year_average_rise DESC',
    'five': 'five_year_average_rise DESC',
    'rank3': 'three_year_average_rank ASC',
    'rank5': 'five_year_average_rank ASC', 
  }
  return sortMapForSql[sort];
}

module.exports = class ArticeService extends egg.Service {
  constructor(ctx) {
    super(ctx);
    this.ctx = ctx;
    this.colllection = new Collection(ctx.db, 'article');
  }
  async getStock(params) {
    var { page, size, sort, type,marketType, time } = params;
    var pageSize = size?size:20;
    var offset = (page-1)*pageSize>0?(page-1)*pageSize-1: 0;
    const market = await this.app.mysql.get('stock', { id: 1 });

    var marketTypeFilter = '';
    var timeFilter = '';

    if(marketType == 'hu'){
      marketTypeFilter = "and code REGEXP '^6'";
    }

    if(marketType == 'shen'){
      marketTypeFilter = "and code REGEXP '^3|^0'";
    }

    if(time == 'above5'){
      timeFilter =  'and issue_time < 20160000';
    }

    if(time == 'bleow5'){
      timeFilter = 'and issue_time > 20160000';
    }

    if(type == 'three'){
      var sql = `select * from stock where stock_rise_2019>0 and stock_rise_2018>0 ${timeFilter} ${marketTypeFilter}
              ORDER BY ${getSortForSql(sort)} LIMIT ${offset}, ${page == 1?pageSize-1:pageSize};`
      var countSql = `select count(*) from stock where stock_rise_2019>0 and stock_rise_2018>0 ${timeFilter} ${marketTypeFilter};`
      const stockList = await this.app.mysql.query(sql);
      const total = await this.app.mysql.query(countSql);
      this.app.logger.info('------------three', total)
      return {
        market: market,
        list: stockList, //page == 1?[market, ...stockList]:stockList,
        total: total[0]['count(*)']
      }
    }

    if(type == 'five'){
      sql = `select * from stock where stock_rise_2019>0 and stock_rise_2018>0 and stock_rise_2017>0 and stock_rise_2016>0 
              ${marketTypeFilter} ${timeFilter} ORDER BY ${getSortForSql(sort)} LIMIT ${offset}, ${page == 1?pageSize-1:pageSize};`

      countSql = `select count(*) from stock where stock_rise_2019>0 and stock_rise_2018>0 and 
                  stock_rise_2017>0 and stock_rise_2016>0 ${marketTypeFilter} ${timeFilter};`
      const stockList = await this.app.mysql.query(sql);
      const total = await this.app.mysql.query(countSql);
      this.app.logger.info('------------five', total)
      return {
        market: market,
        list: stockList, // page == 1?[market, ...stockList]:stockList,
        total: total[0]['count(*)']
      }
    }

    const stockList = await this.app.mysql.select('stock', {
      orders: getSort(sort),
      limit: page == 1?pageSize-1:pageSize, // 返回数据量
      offset: offset, // 数据偏移量
    });
    // console.log('market', market)
    return {
      market: market,
      list: stockList, //page == 1?[market, ...stockList]:stockList,
      total: 500
    }
  }
  getArtilceList(json = {}) {
    const { title, categoryId, status, pageIndex, pageSize } = json;
    const query = new Query();
    query.where.categoryId = categoryId;
    query.where.status = status;
    query.like.title = title;
    query.pageIndex = pageIndex;
    query.pageSize = pageSize;
    return this.colllection.getPager(query);
  }
  getArticle(id) {
    return this.colllection.getByWhere({ id });
  }
  saveArticle(json) {
    if (json.id) {
      return this.colllection.update({ id: json.id }, json);
    }
    json.id = this.ctx.db.getUniqueId();
    this.colllection.add(json);
    return json.id;
  }
  deleteArticle(id) {
    return this.colllection.delete({ id });
  }
};