



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
  three_year_average_rank: {
    type: DataTypes.INTEGER,
    defaultValue: null
  },
  five_year_average_rank: {
    type: DataTypes.INTEGER,
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




const url = 'http://ai.iwencai.com/urp/v7/landing/getDataList';


var options = {
  query: '2020年涨跌幅排名 上市时间大于30天',
  urp_sort_way: 'desc',
  urp_sort_index: '区间涨跌幅:前复权[20200102-20201231]',
  page: 1,
  perpage: 100,
  codelist: '',
  logid: '7dfbcc97952d319ce21cd17695524a3d',
  ret: 'json_all',
  sessionid: '3805e34cef78a6c0ec27532ff724a4c0',
  'date_range[0]': '20200102',
  'date_range[1]': '20201231',
  'iwc_token': '0ac9571a16157894166633443',
  'urp_use_sort': '1',
  'user_id': '480517255',
  'uuids[0]': '24087',
  'query_type': 'stock',
  'comp_id': '5641531',
  'business_cat': 'soniu',
  'uuid': '24087',
  'condition': [{"chunkedResult":"2020年涨跌幅排名 _&_上市时间大于30天","opName":"and","opProperty":"","sonSize":3,"relatedSize":0},{"opName":"sort","opProperty":"从大到小排名","uiText":"2020年01月02日到2020年12月31日区间涨跌幅从大到小排名","sonSize":1,"queryText":"2020年01月02日到2020年12月31日区间涨跌幅从大到小排名","relatedSize":1},{"dateText":"2020年","indexName":"区间涨跌幅:前复权","indexProperties":["起始交易日期 20200102","截止交易日期 20201231"],"dateUnit":"年","source":"new_parser","type":"index","indexPropertiesMap":{"起始交易日期":"20200102","截止交易日期":"20201231"},"reportType":"TRADE_DAILY","dateType":"+区间","valueType":"_浮点型数值(%)","domain":"abs_股票领域","sonSize":0,"relatedSize":0,"tag":"[2020年]区间涨跌幅:前复权"},{"indexName":"上市天数","indexProperties":["nodate 1","交易日期 20210315","(30"],"source":"new_parser","type":"index","indexPropertiesMap":{"交易日期":"20210315","(":"30","nodate":"1"},"reportType":"TRADE_DAILY","dateType":"交易日期","valueType":"_整型数值(天|个)","domain":"abs_股票领域","uiText":"上市天数>30个","sonSize":0,"queryText":"上市天数>30个","relatedSize":0,"tag":"上市天数"}]
}


function createOptions(page) {
  var opt = {...options, page};
  return opt;
}


async function save(id){

  const page = await request.post(url, { form:createOptions(id), json: true } );
  const pageData = page.answer.components[0].data.datas;
  for(var item of pageData){
    const row = {
      code: item.code,
      name: item['股票简称'],
      price: item['最新价'],
      issue_time: item['新股上市日期'],
      issue_days: item['上市天数[20210210]'],
      stock_rise_2020: item['区间涨跌幅:前复权[20200102-20201231]'],
      stock_rank_2020: item['区间涨跌幅:前复权排名名次[20200102-20201231]']
    };
    try{
      await StockModel.create(row);
      console.log(`${row.stock_rank_2020}: 抓取${row.name}成功!`)
    }catch(ex){
      console.log(`${row.stock_rank_2020}: 抓取${row.name}失败!`)
    }
  }

  if(id<45){
    save(id + 1)
  } else {
    console.log('抓取完成!')
  }
}

async function test() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    save(1);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

test()