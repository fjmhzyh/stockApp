
const { Sequelize,DataTypes  } = require('sequelize');
const request = require('request-promise');

const sequelize = new Sequelize('stock', 'Pika', 'Jiazhu=69', {
  host: '116.62.226.6',
  dialect: 'mysql',
  port: '3306',
  logging: false,  
});


const StockModel = sequelize.define('Stock', {
	id: {
		type: DataTypes.INTEGER, 
		autoIncrement: true,
		primaryKey: true,
	},
  code: {
    type: DataTypes.STRING(32),
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(32),
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(6, 2),
    defaultValue: null
  },
  issue_time: {
    type: DataTypes.BIGINT,     
    allowNull: false,        
  },
  issue_days: {
    type: DataTypes.INTEGER,
    defaultValue: null
  },
  rise_rate: {
    type: DataTypes.INTEGER,   
    defaultValue: null          
  },
  three_year_average_rise: {
    type: DataTypes.DECIMAL(6, 2),
    defaultValue: null
  },
  five_year_average_rise: {
    type: DataTypes.DECIMAL(6, 2),
    defaultValue: null
  },
  stock_rise_2020: {
    type: DataTypes.DECIMAL(6, 2),
    defaultValue: null
  },
  stock_rank_2020: {
    type: DataTypes.INTEGER,   
    defaultValue: null          
  },
  stock_rise_2019: {
    type: DataTypes.DECIMAL(6, 2),
    defaultValue: null
  },
  stock_rank_2019: {
    type: DataTypes.INTEGER,   
    defaultValue: null          
  },
  stock_rise_2018: {
    type: DataTypes.DECIMAL(6, 2),
    defaultValue: null
  },
  stock_rank_2018: {
    type: DataTypes.INTEGER,   
    defaultValue: null          
  },
  stock_rise_2017: {
    type: DataTypes.DECIMAL(6, 2),
    defaultValue: null
  },
  stock_rank_2017: {
    type: DataTypes.INTEGER,   
    defaultValue: null          
  },
  stock_rise_2016: {
    type: DataTypes.DECIMAL(6, 2),
    defaultValue: null
  },
  stock_rank_2016: {
    type: DataTypes.INTEGER,   
    defaultValue: null          
  },
  stock_rise_2015: {
    type: DataTypes.DECIMAL(6, 2),
    defaultValue: null
  },
  stock_rank_2015: {
    type: DataTypes.INTEGER,   
    defaultValue: null          
  },
  stock_rise_2014: {
    type: DataTypes.DECIMAL(6, 2),
    defaultValue: null
  },
  stock_rank_2014: {
    type: DataTypes.INTEGER,   
    defaultValue: null          
  },
  stock_rise_2013: {
    type: DataTypes.DECIMAL(6, 2),
    defaultValue: null
  },
  stock_rank_2013: {
    type: DataTypes.INTEGER,   
    defaultValue: null          
  },
  stock_rise_2012: {
    type: DataTypes.DECIMAL(6, 2),
    defaultValue: null
  },
  stock_rank_2012: {
    type: DataTypes.INTEGER,   
    defaultValue: null          
  },
  stock_rise_2011: {
    type: DataTypes.DECIMAL(6, 2),
    defaultValue: null
  },
  stock_rank_2011: {
    type: DataTypes.INTEGER,   
    defaultValue: null          
  },
}, {
  tableName: 'stock',
  timestamps: false
});



const findUrl = 'http://www.iwencai.com/unifiedwap/unified-wap/v2/stock-pick/find';



const form = {
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
  condition:[{"chunkedResult":"2019涨跌幅排名","opName":"sort","opProperty":"从大到小排名","uiText":"2019年01月02日到2019年12月31日区间涨跌幅从大到小排名","sonSize":1,"queryText":"2019年01月02日到2019年12月31日区间涨跌幅从大到小排名","relatedSize":1},{"dateText":"2019年","indexName":"区间涨跌幅:前复权","indexProperties":["起始交易日期 20190102","截止交易日期 20191231"],"dateUnit":"年","source":"new_parser","type":"index","indexPropertiesMap":{"起始交易日期":"20190102","截止交易日期":"20191231"},"reportType":"TRADE_DAILY","dateType":"+区间","valueType":"_浮点型数值(%)","domain":"abs_股票领域","sonSize":0,"relatedSize":0,"tag":"[2019年]区间涨跌幅:前复权"}]
}



async function test(argument) {
	try {
		// var str = await request.post(findUrl, {form:form})
		// var res = JSON.parse(str);
	  await sequelize.authenticate();
	  await sequelize.sync();
	  await updateStock()
	} catch (error) {
	  console.error('Unable to connect to the database:', error);
	}
}

var id = 1;
// test();


async function calcRise(){

	var three_year_average_rise = '';
	var five_year_average_rise = '';

	const stock = await StockModel.findOne({ where: { id: id } });
	const stock_rise_2020 = Number(stock.stock_rise_2020);
	const stock_rise_2019 = Number(stock.stock_rise_2019);
	const stock_rise_2018 = Number(stock.stock_rise_2018);
	const stock_rise_2017 = Number(stock.stock_rise_2017);
	const stock_rise_2016 = Number(stock.stock_rise_2016);


	if(stock_rise_2018){
		three_year_average_rise = (stock_rise_2018+stock_rise_2019+stock_rise_2020)/3;
	}else {
		three_year_average_rise = (stock_rise_2019+stock_rise_2020)/2;
		five_year_average_rise = null;
	}

	if(!stock_rise_2017){
		five_year_average_rise = null;
	}

	if(!stock_rise_2016){
		five_year_average_rise = null;
	}

	five_year_average_rise = (stock_rise_2016+stock_rise_2017+stock_rise_2018+stock_rise_2019+stock_rise_2020)/5;

	var row = {
		three_year_average_rise: three_year_average_rise,
		five_year_average_rise: five_year_average_rise
	}


console.log('stock_rise_2020', typeof stock_rise_2020)
console.log('stock_rise_2019', stock_rise_2019)
console.log('stock_rise_2018', stock_rise_2018)
console.log('row', row)
		console.log('row', row)

  try{
		await StockModel.update(row, {
		  where: { id: id }
		});
		console.log(`${id}: 更新${stock.name}成功!`)
	  id = id + 1;
	  if(id<502){
	  	calcRise()
	  } else {
	  	console.log('更新完成!')
	  }	
  }catch(ex){
		console.log(`${id}: 更新${stock.name}失败!`)
  }

}


calcRise();


async function updateStock(){
  const stock = await StockModel.findOne({ where: { id: id } });
  const issueTime = stock.issue_time;
  const code = stock.code;

  //console.log('issueTime', issueTime)

  const page2019 = await request.post(findUrl, { form:createFindOptions(code, options2019), json: true } );
  // console.log('page2019', page2019)
  const stock2019 = page2019.data.data.datas[0];
  const page2018 = await request.post(findUrl, { form:createFindOptions(code, options2018), json: true  } );
  const stock2018 = page2018.data.data.datas[0];

  const row = {
    stock_rise_2019: stock2019['区间涨跌幅:前复权[20190102-20191231]'],
    stock_rank_2019: stock2019['区间涨跌幅:前复权排名名次[20190102-20191231]'],
    stock_rise_2018: stock2018['区间涨跌幅:前复权[20180102-20181228]'],
    stock_rank_2018: stock2018['区间涨跌幅:前复权排名名次[20180102-20181228]'],
  };


  if(issueTime<20180000){
    const page2017 = await request.post(findUrl, { form:createFindOptions(code, options2017), json: true  } );
    const stock2017 = page2017.data.data.datas[0];
    row['stock_rise_2017'] = stock2017['区间涨跌幅:前复权[20170103-20171229]'];
    row['stock_rank_2017'] = stock2017['区间涨跌幅:前复权排名名次[20170103-20171229]'];
  }

  if(issueTime<20170000){
    const page2016 = await request.post(findUrl, { form:createFindOptions(code, options2016), json: true  } );
    const stock2016 = page2016.data.data.datas[0];
    row['stock_rise_2016'] = stock2016['区间涨跌幅:前复权[20160104-20161230]'];
    row['stock_rank_2016'] = stock2016['区间涨跌幅:前复权排名名次[20160104-20161230]'];
  }

  if(issueTime<20160000){
    const page2015 = await request.post(findUrl, { form:createFindOptions(code, options2015), json: true  } );
    const stock2015 = page2015.data.data.datas[0];
    row['stock_rise_2015'] = stock2015['区间涨跌幅:前复权[20150105-20151231]'];
    row['stock_rank_2015'] = stock2015['区间涨跌幅:前复权排名名次[20150105-20151231]'];
  }

	if(issueTime<20150000){
    const page2014 = await request.post(findUrl, { form:createFindOptions(code, options2014), json: true  } );
    const stock2014 = page2014.data.data.datas[0];  
    row['stock_rise_2014'] = stock2014['区间涨跌幅:前复权[20140102-20141231]'];
    row['stock_rank_2014'] = stock2014['区间涨跌幅:前复权排名名次[20140102-20141231]'];
  }

  if(issueTime<20140000){
    const page2013 = await request.post(findUrl, { form:createFindOptions(code, options2013), json: true  } );
    const stock2013 = page2013.data.data.datas[0];;
    row['stock_rise_2013'] = stock2013['区间涨跌幅:前复权[20130104-20131231]'];
    row['stock_rank_2013'] = stock2013['区间涨跌幅:前复权排名名次[20130104-20131231]'];
  }

  if(issueTime<20130000){
    const page2012 = await request.post(findUrl, { form:createFindOptions(code, options2012), json: true  } );
    const stock2012 = page2012.data.data.datas[0];
    row['stock_rise_2012'] = stock2012['区间涨跌幅:前复权[20120104-20121231]'];
    row['stock_rank_2012'] = stock2012['区间涨跌幅:前复权排名名次[20120104-20121231]'];
  }


  if(issueTime<20120000){
    const page2011 = await request.post(findUrl, { form:createFindOptions(code, options2011), json: true  } );
    const stock2011 = page2011.data.data.datas[0];
    row['stock_rise_2011'] = stock2011['区间涨跌幅:前复权[20110104-20111230]'];
    row['stock_rank_2011'] = stock2011['区间涨跌幅:前复权排名名次[20110104-20111230]'];
  }

  //console.log('row', row);

  try{
		await StockModel.update(row, {
		  where: { id: id }
		});
		console.log(`${id}: 更新${stock.name}成功!`)
  }catch(ex){
		console.log(`${id}: 更新${stock.name}失败!`)
  }


  id = id + 1;
  if(id<502){
  	updateStock()
  } else {
  	console.log('更新完成!')
  }
}



function createFindOptions(question, options){
  var result = {...options, question};
  return result;  
}


var options2019 = {
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
}

var options2018 = {
  query: '2018涨跌幅排名',
  question: '',
  perpage: 100,
  query_type: 'stock',
  comp_id: 5623539,
  source: 'Ths_iwencai_Xuangu',
  uuid:'24087',
  sort_key: '区间涨跌幅:前复权[20180102-20181228]',
  sort_order: 'desc',
  iwc_token:'0ac9529d16135677655797812',
  condition:[{"chunkedResult":"2018涨跌幅排名","opName":"sort","opProperty":"从大到小排名","uiText":"2018年01月02日到2018年12月28日区间涨跌幅从大到小排名","sonSize":1,"queryText":"2018年01月02日到2018年12月28日区间涨跌幅从大到小排名","relatedSize":1},{"dateText":"2018年","indexName":"区间涨跌幅:前复权","indexProperties":["起始交易日期 20180102","截止交易日期 20181228"],"dateUnit":"年","source":"new_parser","type":"index","indexPropertiesMap":{"起始交易日期":"20180102","截止交易日期":"20181228"},"reportType":"TRADE_DAILY","dateType":"+区间","valueType":"_浮点型数值(%)","domain":"abs_股票领域","sonSize":0,"relatedSize":0,"tag":"[2018年]区间涨跌幅:前复权"}]
}

var options2017 = {
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

var options2016 = {
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

var options2015 = {
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

var options2014 = {
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

var options2013 = {
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

var options2012 = {
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

var options2011 = {
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
