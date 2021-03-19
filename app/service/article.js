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
    var { page, size, sort, type,marketType, time,code } = params;
    var pageSize = size?size:20;
    var offset = (page-1)*pageSize>0?(page-1)*pageSize-1: 0;
    const market = await this.app.mysql.get('stock', { id: 4192 });

    var marketTypeFilter = '';
    var timeFilter = '';


    if(code&&code.trim().length == 6){
      const stockList = await this.app.mysql.query(`select * from stock where code=${code}`);
      return { market: market, list: stockList, total: 1}
    }

    if(code&&code.trim().length < 6){
      const stockList = await this.app.mysql.query(`select * from stock where name='${code}'`);
      return { market: market, list: stockList, total: 1}
    }


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
              ORDER BY ${getSortForSql(sort)} LIMIT ${offset}, ${pageSize};`
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
              ${marketTypeFilter} ${timeFilter} ORDER BY ${getSortForSql(sort)} LIMIT ${offset}, ${pageSize};`

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

    sql = `select * from stock where id>0 ${marketTypeFilter} ${timeFilter} 
          ORDER BY ${getSortForSql(sort)} LIMIT ${offset}, ${pageSize};`
    countSql = `select count(*) from stock where id>0 ${marketTypeFilter} ${timeFilter};`
    const stockList = await this.app.mysql.query(sql);
    const total = await this.app.mysql.query(countSql);

    // const stockList = await this.app.mysql.select('stock', {
    //   orders: getSort(sort),
    //   limit: page == 1?pageSize-1:pageSize, // 返回数据量
    //   offset: offset, // 数据偏移量
    // });
    // console.log('market', market)
    return {
      market: market,
      list: stockList, //page == 1?[market, ...stockList]:stockList,
      total: total[0]['count(*)']
    }
  }

  async getMarkedStock(params){
    var { page, size, sort, type,marketType, time,code } = params;
    var pageSize = size?size:20;
    var offset = (page-1)*pageSize>0?(page-1)*pageSize-1: 0;
    const market = await this.app.mysql.get('stock', { id: 4192 });


var marketTypeFilter = '';
    var timeFilter = '';


    if(code&&code.trim().length == 6){
      const stockList = await this.app.mysql.query(`select * from stock where code=${code}`);
      return { market: market, list: stockList, total: 1}
    }

    if(code&&code.trim().length < 6){
      const stockList = await this.app.mysql.query(`select * from stock where name='${code}'`);
      return { market: market, list: stockList, total: 1}
    }


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
               and marked=1 ORDER BY ${getSortForSql(sort)} LIMIT ${offset}, ${pageSize};`
      var countSql = `select count(*) from stock where stock_rise_2019>0 and stock_rise_2018>0 and marked=1 ${timeFilter} ${marketTypeFilter};`
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
            and marked=1 ${marketTypeFilter} ${timeFilter} ORDER BY ${getSortForSql(sort)} LIMIT ${offset}, ${pageSize};`

      countSql = `select count(*) from stock where stock_rise_2019>0 and stock_rise_2018>0 and 
                  stock_rise_2017>0 and stock_rise_2016>0 and marked=1 ${marketTypeFilter} ${timeFilter};`
      const stockList = await this.app.mysql.query(sql);
      const total = await this.app.mysql.query(countSql);
      this.app.logger.info('------------five', total)
      return {
        market: market,
        list: stockList, // page == 1?[market, ...stockList]:stockList,
        total: total[0]['count(*)']
      }
    }

    sql = `select * from stock where  marked=1 ${marketTypeFilter} ${timeFilter} 
          ORDER BY ${getSortForSql(sort)} LIMIT ${offset}, ${pageSize};`
    countSql = `select count(*) from stock where  marked=1 ${marketTypeFilter} ${timeFilter};`
    const stockList = await this.app.mysql.query(sql);
    const total = await this.app.mysql.query(countSql);

    return {
      market: market,
      list: stockList, 
      total: total[0]['count(*)']
    }    
  }

  // 收藏/取消收藏
  async markStock(params){
    var { id,marked } = params;
    const row = {
      id: id,
      marked: marked==1?0:1,
    };
    const result = await this.app.mysql.update('stock', row); 
    const success = result.affectedRows === 1;
    return { success };
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