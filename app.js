

// app.js or agent.js
class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  configWillLoad() {
    // Ready to call configDidLoad,
    // Config, plugin files are referred,
    // this is the last chance to modify the config.
  }

  configDidLoad() {
    // Config, plugin files have been loaded.
  }

  async didLoad() {
    // All files have loaded, start plugin here.
  }

  async willReady() {
    // All plugins have started, can do some thing before app ready
  }

  async didReady() {
    // Worker is ready, can do some things
    // don't need to block the app boot.
  }

  async serverDidReady() {

  }

  async beforeClose() {
   
  }
}

module.exports = AppBootHook;



var listUrl = 'http://ai.iwencai.com/urp/v7/landing/getDataList';
var findUrl = 'http://www.iwencai.com/unifiedwap/unified-wap/v2/stock-pick/find';


function createOptions(pageNo, options) {
  var opts = options?options:options2020
  var result = {...opts};
  result.data.page = pageNo;
  return result
}


function createFindOptions(code, options){
  var result = {...options};
  result.data.question = code;
  return result;  
}


async function updateStock(id){
  const stock = await this.app.mysql.get('stock', { id:id });
  const issueTime = stock.issue_time;
  const code = stock.code;

  const page2019 = await this.app.curl(findUrl, createFindOptions(code, options2019));
  this.app.logger.info('page2019', page2019.data);
  return;
  const stock2019 = page2019.data.data.datas[0];
  const page2018 = await this.app.curl(code, createFindOptions(code, options2018));
  const stock2018 = page2018.data.data.datas[0];

  const row = {
    id: stock.id,
    stock_rise_2019: stock2019['区间涨跌幅:前复权[20190102-20191231]'],
    stock_rank_2019: stock2019['区间涨跌幅:前复权排名名次[20190102-20191231]'],
    stock_rise_2018: stock2018['区间涨跌幅:前复权[20180102-20181228]'],
    stock_rank_2018: stock2018['区间涨跌幅:前复权排名名次[20180102-20181228]'],
  };


  if(issueTime>20170000){
    const page2017 = await this.app.curl(findUrl, createFindOptions(code, options2017));
    const stock2017 = page.data.data.datas[0];
    row['stock_rise_2017'] = stock2017['区间涨跌幅:前复权[20170103-20171229]'];
    row['stock_rank_2017'] = stock2017['区间涨跌幅:前复权排名名次[20170103-20171229]'];
  }

  if(issueTime>20160000){
    const page2016 = await this.app.curl(findUrl, createFindOptions(code, options2016));
    const stock2016 = page2016.data.data.datas[0];
    row['stock_rise_2016'] = stock2016['区间涨跌幅:前复权[20160104-20161230]'];
    row['stock_rank_2016'] = stock2016['区间涨跌幅:前复权排名名次[20160104-20161230]'];
  }

  if(issueTime>20150000){
    const page2015 = await this.app.curl(findUrl, createFindOptions(code, options2015));
    const stock2015 = page2015.data.data.datas[0];
    row['stock_rise_2015'] = stock2015['区间涨跌幅:前复权[20150105-20151231]'];
    row['stock_rank_2015'] = stock2015['区间涨跌幅:前复权排名名次[20150105-20151231]'];
  }

  if(issueTime>20140000){
    const page2014 = await this.app.curl(findUrl, createFindOptions(code, options2014));
    const stock2014 = page2014.data.data.datas[0];  
    row['stock_rise_2014'] = stock2014['区间涨跌幅:前复权[20140102-20141231]'];
    row['stock_rank_2014'] = stock2014['区间涨跌幅:前复权排名名次[20140102-20141231]'];
  }

  if(issueTime>20130000){
    const page2013 = await this.app.curl(findUrl, createFindOptions(code, options2013));
    const stock2013 = page2013.data.data.datas[0];;
    row['stock_rise_2013'] = stock2013['区间涨跌幅:前复权[20130104-20131231]'];
    row['stock_rank_2013'] = stock2013['区间涨跌幅:前复权排名名次[20130104-20131231]'];
  }

  if(issueTime>20120000){
    const page2012 = await this.app.curl(findUrl, createFindOptions(code, options2012));
    const stock2012 = page2012.data.data.datas[0];
    row['stock_rise_2012'] = stock2012['区间涨跌幅:前复权[20120104-20121231]'];
    row['stock_rank_2012'] = stock2012['区间涨跌幅:前复权排名名次[20120104-20121231]'];
  }


  if(issueTime>20110000){
    const page2011 = await this.app.curl(findUrl, createFindOptions(code, options2011));
    const stock2011 = page2011.data.data.datas[0];
    row['stock_rise_2011'] = stock2011['区间涨跌幅:前复权[20110104-20111230]'];
    row['stock_rank_2011'] = stock2011['区间涨跌幅:前复权排名名次[20110104-20111230]'];
  }

  const result = await this.app.mysql.update('stock', row); 

  // 判断更新成功
  if(result.affectedRows === 1){
    this.app.logger.info(`更新${stock.name}成功!`);
  } else {
    this.app.logger.error(`更新${stock.name}失败!`);
  }
}


var options2020 =  {
  method: 'POST',
  data: {
    page: 1,
    perpage: 100,
    query: '2020年涨幅最大前500；上市时间大于2年',
    urp_sort_way: 'desc',
    urp_use_sort: 1,
    urp_sort_index: '区间涨跌幅:前复权[20200102-20201231]',
    codelist: '',
    logid: 'ab0a738b04a27b723a261f0bd6aeb8e3',
    ret: 'json_all',
    sessionid: '4a6cfb375e59881fbe9fab67ea062bac',
    'date_range[0]': '20200102',
    'date_range[1]': '20210210',
    iwc_token: '0ac952ac16133953270906092',
    user_id: '480517255',
    'uuids[0]': 24087,
    query_type: 'stock',
    comp_id: 5623539,
    business_cat: 'soniu',
    uuid: 24087,
    condition:[{"chunkedResult":"2020年涨幅最大前500;_&_上市时间大于2年","opName":"and","opProperty":"","sonSize":3,"relatedSize":0},{"opName":"sort","opProperty":"从大到小排名前500","uiText":"2020年01月02日到2020年12月31日区间涨跌幅从大到小排名前500","sonSize":1,"queryText":"2020年01月02日到2020年12月31日区间涨跌幅从大到小排名前500","relatedSize":1},{"dateText":"2020年","indexName":"区间涨跌幅:前复权","indexProperties":["起始交易日期 20200102","截止交易日期 20201231"],"dateUnit":"年","source":"new_parser","type":"index","indexPropertiesMap":{"起始交易日期":"20200102","截止交易日期":"20201231"},"reportType":"TRADE_DAILY","dateType":"+区间","valueType":"_浮点型数值(%)","domain":"abs_股票领域","sonSize":0,"relatedSize":0,"tag":"[2020年]区间涨跌幅:前复权"},{"indexName":"上市天数","indexProperties":["nodate 1","交易日期 20210210","(731"],"source":"new_parser","type":"index","indexPropertiesMap":{"交易日期":"20210210","(":"731","nodate":"1"},"reportType":"TRADE_DAILY","dateType":"交易日期","valueType":"_整型数值(天|个)","domain":"abs_股票领域","uiText":"上市天数>731天","sonSize":0,"queryText":"上市天数>731天","relatedSize":0,"tag":"上市天数"}]
  },
  dataType: 'json',
}

var options2019 = {
  method: 'POST',
  data: {
    query: '2019涨跌幅排名',
    question: 300677,
    perpage: 100,
    query_type: 'stock',
    comp_id: 5623539,
    source: 'Ths_iwencai_Xuangu',
    uuid:24087,
    sort_key: '区间涨跌幅:前复权[20190102-20191231]',
    sort_order: 'desc',
    iwc_token:'0ac952b516135454623488226',
    condition:[{"chunkedResult":"2019涨跌幅排名","opName":"sort","opProperty":"从大到小排名","uiText":"2019年01月02日到2019年12月31日区间涨跌幅从大到小排名","sonSize":1,"queryText":"2019年01月02日到2019年12月31日区间涨跌幅从大到小排名","relatedSize":1},{"dateText":"2019年","indexName":"区间涨跌幅:前复权","indexProperties":["起始交易日期 20190102","截止交易日期 20191231"],"dateUnit":"年","source":"new_parser","type":"index","indexPropertiesMap":{"起始交易日期":"20190102","截止交易日期":"20191231"},"reportType":"TRADE_DAILY","dateType":"+区间","valueType":"_浮点型数值(%)","domain":"abs_股票领域","sonSize":0,"relatedSize":0,"tag":"[2019年]区间涨跌幅:前复权"}],
  },
  dataType: 'json',
}

var options2018 = {
  method: 'POST',
  dataType: 'json',
  data: {
    query: '2018涨跌幅排名 上市时间大于2年',
    question: '',
    perpage: 100,
    comp_id: 5623539,
    uuid:'24087',
    sort_key: '区间涨跌幅:前复权[20180102-20181228]',
    sort_order: 'desc',
    query_type: 'stock',
    source: 'Ths_iwencai_Xuangu',
    iwc_token:'0ac9511816135421912623965',
    condition:[{"chunkedResult":"2018涨跌幅排名 _&_上市时间大于2年","opName":"and","opProperty":"","sonSize":3,"relatedSize":0},{"opName":"sort","opProperty":"从大到小排名","uiText":"2018年01月02日到2018年12月28日区间涨跌幅从大到小排名","sonSize":1,"queryText":"2018年01月02日到2018年12月28日区间涨跌幅从大到小排名","relatedSize":1},{"dateText":"2018年","indexName":"区间涨跌幅:前复权","indexProperties":["起始交易日期 20180102","截止交易日期 20181228"],"dateUnit":"年","source":"new_parser","type":"index","indexPropertiesMap":{"起始交易日期":"20180102","截止交易日期":"20181228"},"reportType":"TRADE_DAILY","dateType":"+区间","valueType":"_浮点型数值(%)","domain":"abs_股票领域","sonSize":0,"relatedSize":0,"tag":"[2018年]区间涨跌幅:前复权"},{"indexName":"上市天数","indexProperties":["nodate 1","交易日期 20210210","(731"],"source":"new_parser","type":"index","indexPropertiesMap":{"交易日期":"20210210","(":"731","nodate":"1"},"reportType":"TRADE_DAILY","dateType":"交易日期","valueType":"_整型数值(天|个)","domain":"abs_股票领域","uiText":"上市天数>731天","sonSize":0,"queryText":"上市天数>731天","relatedSize":0,"tag":"上市天数"}]
  }
}

var options2017 = {
  method: 'POST',
  dataType: 'json',
  data: {
    query: '2017涨跌幅排名 上市时间大于2年',
    question: '',
    perpage: 100,
    comp_id: 5623539,
    uuid:'24087',
    sort_key: '区间涨跌幅:前复权[20170103-20171229]',
    sort_order: 'desc',
    query_type: 'stock',
    source: 'Ths_iwencai_Xuangu',
    iwc_token:'0ac952ae16135427786066538',
    condition: [{"chunkedResult":"2017涨跌幅排名 _&_上市时间大于2年","opName":"and","opProperty":"","sonSize":3,"relatedSize":0},{"opName":"sort","opProperty":"从大到小排名","uiText":"2017年01月03日到2017年12月29日区间涨跌幅从大到小排名","sonSize":1,"queryText":"2017年01月03日到2017年12月29日区间涨跌幅从大到小排名","relatedSize":1},{"dateText":"2017年","indexName":"区间涨跌幅:前复权","indexProperties":["起始交易日期 20170103","截止交易日期 20171229"],"dateUnit":"年","source":"new_parser","type":"index","indexPropertiesMap":{"起始交易日期":"20170103","截止交易日期":"20171229"},"reportType":"TRADE_DAILY","dateType":"+区间","valueType":"_浮点型数值(%)","domain":"abs_股票领域","sonSize":0,"relatedSize":0,"tag":"[2017年]区间涨跌幅:前复权"},{"indexName":"上市天数","indexProperties":["nodate 1","交易日期 20210210","(731"],"source":"new_parser","type":"index","indexPropertiesMap":{"交易日期":"20210210","(":"731","nodate":"1"},"reportType":"TRADE_DAILY","dateType":"交易日期","valueType":"_整型数值(天|个)","domain":"abs_股票领域","uiText":"上市天数>731天","sonSize":0,"queryText":"上市天数>731天","relatedSize":0,"tag":"上市天数"}]
  }
}

var options2016 = {
  method: 'POST',
  dataType: 'json',
  data: {
    query: '2016涨跌幅排名',
    question: '',
    perpage: 100,
    comp_id: 5623539,
    uuid:'24087',
    sort_key: '区间涨跌幅:前复权[20160104-20161230]',
    sort_order: 'desc',
    query_type: 'stock',
    source: 'Ths_iwencai_Xuangu',
    iwc_token:'0ac952af16135429258483706',
    condition: [{"chunkedResult":"2016涨跌幅排名","opName":"sort","opProperty":"从大到小排名","uiText":"2016年01月04日到2016年12月30日区间涨跌幅从大到小排名","sonSize":1,"queryText":"2016年01月04日到2016年12月30日区间涨跌幅从大到小排名","relatedSize":1},{"dateText":"2016年","indexName":"区间涨跌幅:前复权","indexProperties":["起始交易日期 20160104","截止交易日期 20161230"],"dateUnit":"年","source":"new_parser","type":"index","indexPropertiesMap":{"起始交易日期":"20160104","截止交易日期":"20161230"},"reportType":"TRADE_DAILY","dateType":"+区间","valueType":"_浮点型数值(%)","domain":"abs_股票领域","sonSize":0,"relatedSize":0,"tag":"[2016年]区间涨跌幅:前复权"}]
  }
}

var options2015 = {
  method: 'POST',
  dataType: 'json',
  data: {
    query: '2015涨跌幅排名',
    question: '',
    perpage: 100,
    comp_id: 5623539,
    uuid:'24087',
    sort_key: '区间涨跌幅:前复权[20150105-20151231]',
    sort_order: 'desc',
    query_type: 'stock',
    source: 'Ths_iwencai_Xuangu',
    iwc_token:'0ac952b116135433025843552',
    condition: [{"chunkedResult":"2015涨跌幅排名","opName":"sort","opProperty":"从大到小排名","uiText":"2015年01月05日到2015年12月31日区间涨跌幅从大到小排名","sonSize":1,"queryText":"2015年01月05日到2015年12月31日区间涨跌幅从大到小排名","relatedSize":1},{"dateText":"2015年","indexName":"区间涨跌幅:前复权","indexProperties":["起始交易日期 20150105","截止交易日期 20151231"],"dateUnit":"年","source":"new_parser","type":"index","indexPropertiesMap":{"起始交易日期":"20150105","截止交易日期":"20151231"},"reportType":"TRADE_DAILY","dateType":"+区间","valueType":"_浮点型数值(%)","domain":"abs_股票领域","sonSize":0,"relatedSize":0,"tag":"[2015年]区间涨跌幅:前复权"}]
  }
}

var options2014 = {
  method: 'POST',
  dataType: 'json',
  data: {
    query: '2014涨跌幅排名',
    question: '',
    perpage: 100,
    comp_id: 5623539,
    uuid:'24087',
    sort_key: '区间涨跌幅:前复权[20140102-20141231]',
    sort_order: 'desc',
    query_type: 'stock',
    source: 'Ths_iwencai_Xuangu',
    iwc_token:'0ac952a716135434690556732',
    condition: [{"chunkedResult":"2014涨跌幅排名","opName":"sort","opProperty":"从大到小排名","uiText":"2014年01月02日到2014年12月31日区间涨跌幅从大到小排名","sonSize":1,"queryText":"2014年01月02日到2014年12月31日区间涨跌幅从大到小排名","relatedSize":1},{"dateText":"2014年","indexName":"区间涨跌幅:前复权","indexProperties":["起始交易日期 20140102","截止交易日期 20141231"],"dateUnit":"年","source":"new_parser","type":"index","indexPropertiesMap":{"起始交易日期":"20140102","截止交易日期":"20141231"},"reportType":"TRADE_DAILY","dateType":"+区间","valueType":"_浮点型数值(%)","domain":"abs_股票领域","sonSize":0,"relatedSize":0,"tag":"[2014年]区间涨跌幅:前复权"}]
  }
}

var options2013 = {
  method: 'POST',
  dataType: 'json',
  data: {
    query: '2013涨跌幅排名',
    question: '',
    perpage: 100,
    comp_id: 5623539,
    uuid:'24087',
    sort_key: '区间涨跌幅:前复权[20130104-20131231]',
    sort_order: 'desc',
    query_type: 'stock',
    source: 'Ths_iwencai_Xuangu',
    iwc_token:'0ac952b616135436567754765',
    condition: [{"chunkedResult":"2013涨跌幅排名","opName":"sort","opProperty":"从大到小排名","uiText":"2013年01月04日到2013年12月31日区间涨跌幅从大到小排名","sonSize":1,"queryText":"2013年01月04日到2013年12月31日区间涨跌幅从大到小排名","relatedSize":1},{"dateText":"2013年","indexName":"区间涨跌幅:前复权","indexProperties":["起始交易日期 20130104","截止交易日期 20131231"],"dateUnit":"年","source":"new_parser","type":"index","indexPropertiesMap":{"起始交易日期":"20130104","截止交易日期":"20131231"},"reportType":"TRADE_DAILY","dateType":"+区间","valueType":"_浮点型数值(%)","domain":"abs_股票领域","sonSize":0,"relatedSize":0,"tag":"[2013年]区间涨跌幅:前复权"}]
  }
}

var options2012 = {
  method: 'POST',
  dataType: 'json',
  data: {
    query: '2012涨跌幅排名',
    question: '',
    perpage: 100,
    comp_id: 5623539,
    uuid:'24087',
    sort_key: '区间涨跌幅:前复权[20120104-20121231]',
    sort_order: 'desc',
    query_type: 'stock',
    source: 'Ths_iwencai_Xuangu',
    iwc_token:'0ac952b316135439043094799',
    condition: [{"chunkedResult":"2012涨跌幅排名","opName":"sort","opProperty":"从大到小排名","uiText":"2012年01月04日到2012年12月31日区间涨跌幅从大到小排名","sonSize":1,"queryText":"2012年01月04日到2012年12月31日区间涨跌幅从大到小排名","relatedSize":1},{"dateText":"2012年","indexName":"区间涨跌幅:前复权","indexProperties":["起始交易日期 20120104","截止交易日期 20121231"],"dateUnit":"年","source":"new_parser","type":"index","indexPropertiesMap":{"起始交易日期":"20120104","截止交易日期":"20121231"},"reportType":"TRADE_DAILY","dateType":"+区间","valueType":"_浮点型数值(%)","domain":"abs_股票领域","sonSize":0,"relatedSize":0,"tag":"[2012年]区间涨跌幅:前复权"}]
  }
}

var options2011 = {
  method: 'POST',
  dataType: 'json',
  data: {
    query: '2011涨跌幅排名',
    question: '',
    perpage: 100,
    comp_id: 5623539,
    uuid:'24087',
    sort_key: '区间涨跌幅:前复权[20110104-20111230]',
    sort_order: 'desc',
    query_type: 'stock',
    source: 'Ths_iwencai_Xuangu',
    iwc_token:'0ac952ae16135438508908296',
    condition: [{"chunkedResult":"2011涨跌幅排名","opName":"sort","opProperty":"从大到小排名","uiText":"2011年01月04日到2011年12月30日区间涨跌幅从大到小排名","sonSize":1,"queryText":"2011年01月04日到2011年12月30日区间涨跌幅从大到小排名","relatedSize":1},{"dateText":"2011年","indexName":"区间涨跌幅:前复权","indexProperties":["起始交易日期 20110104","截止交易日期 20111230"],"dateUnit":"年","source":"new_parser","type":"index","indexPropertiesMap":{"起始交易日期":"20110104","截止交易日期":"20111230"},"reportType":"TRADE_DAILY","dateType":"+区间","valueType":"_浮点型数值(%)","domain":"abs_股票领域","sonSize":0,"relatedSize":0,"tag":"[2011年]区间涨跌幅:前复权"}]
  }
}



// const page1 = await this.app.curl(listUrl, createOptions(1));
// const page2 = await this.app.curl(listUrl, createOptions(2));
// const page3 = await this.app.curl(listUrl, createOptions(3));
// const page4 = await this.app.curl(listUrl, createOptions(4));
// const page5 = await this.app.curl(listUrl, createOptions(5));

// const stock1 = page1.data.answer.components[0].data.datas;
// const stock2 = page2.data.answer.components[0].data.datas;
// const stock3 = page3.data.answer.components[0].data.datas;
// const stock4 = page4.data.answer.components[0].data.datas;
// const stock5 = page5.data.answer.components[0].data.datas;


// const arr = [...stock1, ...stock2, ...stock3, ...stock4, ...stock5];


// for(var item of arr){
//   const result = await this.app.mysql.insert('stock', {
//     code: item.code,
//     name: item['股票简称'],
//     price: item['最新价'],
//     issue_time: item['新股上市日期'],
//     issue_days: item['上市天数[20210210]'],
//     stock_rise_2020: item['区间涨跌幅:前复权[20200102-20201231]'],
//     stock_rank_2020: item['区间涨跌幅:前复权排名名次[20200102-20201231]']
//   }); 
//   if(result.affectedRows === 1){
//     this.app.logger.info(`写入${item['股票简称']}成功!`);
//   } else {
//     this.app.logger.error(`写入${item['股票简称']}失败!`);
//   }
// }




