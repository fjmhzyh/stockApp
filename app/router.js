
module.exports = app => {
  const { router, controller } = app;
  router.get('/api/list', controller.intro.intro.list);
  router.get('/intro', controller.intro.intro.index);
  router.get('/*', controller.intro.intro.index);
  router.get('/api/list', controller.intro.intro.list);
};



var data =[
	{
		"chunkedResult":"2019涨幅最大前1500;_&_上市天数大于3年;",
		"opName":"and",
		"opProperty":"",
		"sonSize":3,
		"relatedSize":0
	},
	{
		"opName":"sort",
		"opProperty":"从大到小排名前1500",
		"uiText":"2019年01月02日到2019年12月31日区间涨跌幅从大到小排名前1500",
		"sonSize":1,
		"queryText":"2019年01月02日到2019年12月31日区间涨跌幅从大到小排名前1500",
		"relatedSize":1
	},
	{
		"dateText":"2019年",
		"indexName":"区间涨跌幅:前复权",
		"indexProperties":["起始交易日期 20190102","截止交易日期 20191231"],
		"dateUnit":"年",
		"source":"new_parser",
		"type":"index",
		"indexPropertiesMap":{"起始交易日期":"20190102","截止交易日期":"20191231"},
		"reportType":"TRADE_DAILY",
		"dateType":"+区间",
		"valueType":"_浮点型数值(%)",
		"domain":"abs_股票领域",
		"sonSize":0,
		"relatedSize":0,
		"tag":"[2019年]区间涨跌幅:前复权"
	},
	{
		"indexName":"上市天数",
		"indexProperties":["nodate 1","交易日期 20210210","(1096"],
		"source":"new_parser",
		"type":"index",
		"indexPropertiesMap":{
			"交易日期":"20210210",
			"(":"1096","nodate":"1"
		},
		"reportType":"TRADE_DAILY",
		"dateType":"交易日期",
		"valueType":"_整型数值(天|个)",
		"domain":"abs_股票领域",
		"uiText":"上市天数>1096天",
		"sonSize":0,
		"queryText":"上市天数>1096天",
		"relatedSize":0,
		"tag":"上市天数"
	}
]


var market = [
	{
		year: '2020',
		rise: 13.87
	},
	{
		year: '2019',
		rise: 22.30
	},
	{
		year: '2018',
		rise: -24.59
	},
	{
		year: '2017',
		rise: 6.56
	},	
	{
		year: '2016',
		rise: -12.31
	},
	{
		year: '2015',
		rise: 9.41
	},	
	{
		year: '2014',
		rise: 52.87
	},
	{
		year: '2013',
		rise: -6.75
	},	
	{
		year: '2012',
		rise: 3.17
	},
	{
		year: '2011',
		rise: -21.68
	}
]