'use strict';

import React, { Component } from 'react';
import Layout from 'component/layout/blog';
import Header from 'component/header';
import '../../asset/css/blog.css'
import '../intro/index.css'
import request from '../../framework/request.js';
import eventBus from '../../framework/eventBus.js';
import { Chart, Axis, Tooltip, Geom, Legend } from 'bizcharts';

import { Table, Pagination, Form, Row, Col, Input, Button, Select, Radio,Modal, message   } from 'antd';
import 'antd/dist/antd.css';
import Sidebar from 'component/sidebar';

function renderRise(text) {
  var className = text>0?'red':'green';
  var content = text?`${text.toFixed(2)}%`:'-'
  return <span className={className}>{content}</span>
}


const scale = {
  value: { alias:'排名'  },
  year: { type: 'linear', tickCount: 10 },
};


const riseScale = {
  value: { 
    alias:'涨幅',
    formatter: (text)=>{
      return `${text}%`;
    }
  },
  year: { type: 'linear', tickCount: 10 },
};

class Intro extends Component {

  state={
    page: 1,
    pageSize: 30,
    list: [],
    sort:'three',
    type: 'one',
    marketType: 'all',
    time: 'all',
    code: '',
    total: 500,
    rank: '',
    visible:false,
    chartData: { rankData: [], riseData: [], stock:{} },
    market: null,
    rankChart:null,
    riseChart: null,
  }

  columns = [
    {
      title: '序',
      dataIndex: '',
      fixed: 'left',
      width: 40,
      render: (a,b, index)=>{
        return (this.state.page-1)*this.state.pageSize + index+1
      }
    },
    {
      title: '上市时间',
      dataIndex: 'issue_time',
      width: 100,
      fixed: 'left',
    },
    {
      title: '代码',
      dataIndex: 'code',
      width: 100,
      fixed: 'left',
    },
    {
      title: '股票名称',
      dataIndex: 'name',
      width: 120,
      fixed: 'left',
    },
    // {
    //   title: '当前股价',
    //   dataIndex: 'price',
    //   width: 100,
    //   fixed: 'left',
    // },
    {
      title: '近三年平均涨幅',
      width: 140,
      // fixed: 'left',
      dataIndex: 'three_year_average_rise',
      render: renderRise
    },
    {
      title: '近五年平均涨幅',
      width: 140,
      // fixed: 'left',
      dataIndex: 'five_year_average_rise',
      render: renderRise
    },
    {
      title: '近三年平均排名',
      width: 140,
      // fixed: 'left',
      dataIndex: 'three_year_average_rank',
      // render: renderRise
    },
    {
      title: '近五年平均排名',
      width: 140,
      // fixed: 'left',
      dataIndex: 'five_year_average_rank',
      // render: renderRise
    },
    {
      title: '2020涨幅',
      width: 100,
      dataIndex: 'stock_rise_2020',
      render: renderRise
    },
    {
      title: '2019涨幅',
      width: 100,
      dataIndex: 'stock_rise_2019',
      render: renderRise
    },
    {
      title: '2018涨幅',
      width: 100,
      dataIndex: 'stock_rise_2018',
      render: renderRise
    },
    {
      title: '2017涨幅',
      width: 100,
      dataIndex: 'stock_rise_2017',
      render: renderRise
    },
    {
      title: '2016涨幅',
      width: 100,
      dataIndex: 'stock_rise_2016',
      render: renderRise
    },
    {
      title: '2015涨幅',
      width: 100,
      dataIndex: 'stock_rise_2015',
      render: renderRise
    },
    {
      title: '2014涨幅',
      width: 100,
      dataIndex: 'stock_rise_2014',
      render: renderRise
    },
    {
      title: '2013涨幅',
      width: 100,
      dataIndex: 'stock_rise_2013',
      render: renderRise
    },
    {
      title: '2012涨幅',
      width: 100,
      dataIndex: 'stock_rise_2012',
      render: renderRise
    },
    {
      title: '2011涨幅',
      width: 100,
      dataIndex: 'stock_rise_2011',
      render: renderRise
    },
    {
      title: '操作',
      key: 'operation',
      fixed: 'right',
      width: 120,
      render: (text,item) => {
        var className = item.marked==1?'operation cancel':'operation mark';
        var title = item.marked==1?'点击取消自选':'点击加入自选';
        return(
          <div>
            <span className="operation" onClick={()=>{this.showModal(item)}}>详情</span>
            <span className={className} title={title}
              onClick={()=>{this.markStock(item)}}>{item.marked==1?'取消':'收藏'}</span>
          </div>
        )
      },
    },
  ];



  showModal = (item) => {
    // console.log('item', item)
    var chartData = this.convertData(item);
    this.setState({visible: true, chartData: chartData}, ()=>{
      setTimeout(()=>{
        this.state.rankChart.forceFit();
        this.state.riseChart.forceFit()
      }, 100)
    })
  };

  hideModal = () => {
    this.setState({visible: false, })
  };

  markStock = (item) => {
    var content = item.marked == 1?'取消收藏':'加入收藏';
    request.get(`${window.location.origin}/api/mark?id=${item.id}&marked=${item.marked}`)
    .then(res=>{
      if(res.data.success){
        this.fetchData();
        message.success(`${content}成功!`)
      }else{
        message.success(`${content}失败!`)
      }
    })
  };

  componentDidMount(){
    // console.log('get', get)
    this.fetchData();
    eventBus.emit('page', this.props.page);
  }


  getRankChart = (chart) =>{
    this.setState({rankChart: chart})
    console.log('rankChart', chart)
  }


  getRiseChart = (chart) =>{
    this.setState({riseChart: chart})
  }

  convertData = (item)=>{
    var market = this.state.market;
    var rankData= [
      { type: item.name, year:2020, value: item.stock_rank_2020 },
      { type: item.name, year:2019, value: item.stock_rank_2019 },
      { type: item.name, year:2018, value: item.stock_rank_2018 },
      { type: item.name, year:2017, value: item.stock_rank_2017 },
      { type: item.name, year:2016, value: item.stock_rank_2016 },
      { type: item.name, year:2015, value: item.stock_rank_2015 },
      { type: item.name, year:2014, value: item.stock_rank_2014 },
      { type: item.name, year:2013, value: item.stock_rank_2013 },
      { type: item.name, year:2012, value: item.stock_rank_2012 },
      { type: item.name, year:2011, value: item.stock_rank_2011 },
    ];
    var riseData = [
      { type: item.name, year:2020, value: item.stock_rise_2020 },
      { type: item.name, year:2019, value: item.stock_rise_2019 },
      { type: item.name, year:2018, value: item.stock_rise_2018 },
      { type: item.name, year:2017, value: item.stock_rise_2017 },
      { type: item.name, year:2016, value: item.stock_rise_2016 },
      { type: item.name, year:2015, value: item.stock_rise_2015 },
      { type: item.name, year:2014, value: item.stock_rise_2014 },
      { type: item.name, year:2013, value: item.stock_rise_2013 },
      { type: item.name, year:2012, value: item.stock_rise_2012 },
      { type: item.name, year:2011, value: item.stock_rise_2011 },
      { type: market.name, year:2020, value: market.stock_rise_2020 },
      { type: market.name, year:2019, value: market.stock_rise_2019 },
      { type: market.name, year:2018, value: market.stock_rise_2018 },
      { type: market.name, year:2017, value: market.stock_rise_2017 },
      { type: market.name, year:2016, value: market.stock_rise_2016 },
      { type: market.name, year:2015, value: market.stock_rise_2015 },
      { type: market.name, year:2014, value: market.stock_rise_2014 },
      { type: market.name, year:2013, value: market.stock_rise_2013 },
      { type: market.name, year:2012, value: market.stock_rise_2012 },
      { type: market.name, year:2011, value: market.stock_rise_2011 },
    ]

    return { stock: item, rankData, riseData };
  }


  fetchData = ()=>{
    var { page, pageSize, sort, type, marketType, time, code} = this.state
    request
    .get(`${window.location.origin}/api/markedList?page=${page}&size=${pageSize}&sort=${sort}
      &type=${type}&marketType=${marketType}&time=${time}&code=${code}`)
    .then(res=>{
      this.setState({
        list:res.data.list,
        total: res.data.total,
        market: res.data.market
      })
    })
  }


  sortChange =(val)=>{
    this.setState({sort: val.trim(), code: ''}, ()=>{
      this.fetchData()
    })
  }

  typeChange =(event)=>{
    this.setState({type: event.target.value, code: ''}, ()=>{
      this.fetchData()
    })
  }  

  onMarketChange = (event)=>{
    this.setState({marketType: event.target.value, code: ''}, ()=>{
      this.fetchData()
    })
  }  

  onTimeChange = (event)=>{
    this.setState({time: event.target.value, code: ''}, ()=>{
      this.fetchData()
    })
  }

  onCodeChange = (event)=>{
    this.setState({code: event.target.value}, ()=>{
      if(!this.state.code){
        this.fetchData();
      }
    });
  }

  onSearch = (code)=>{
    if(code.trim()){
      this.fetchData()
    }
  }

  render() {

    const { list, sort ,type, marketType, time, code} = this.state;

    const chartData = this.state.chartData;

    var pagination = {
      current: this.state.page,
      total: this.state.total,
      pageSize: this.state.pageSize,
      onChange: (current)=>{
        this.setState({page: current}, ()=>{
          this.fetchData()
        })
      }
    }
    return <Layout>
      <Sidebar page={'collection'} />
      <div id="stock-app">
        <Modal title={`股票详情 - ${chartData.stock.name}`} width={'60%'} 
          visible={this.state.visible} centered footer={null} onCancel={this.hideModal}>
          <Chart height={300} padding={[ 20, 30, 60, 70]}
            data={chartData.rankData} scale={scale} forceFit onGetG2Instance={this.getRankChart} >
            <Axis name="year" />
            <Axis name="value" title={true} />
            <Legend />
            <Tooltip shared crosshairs={{ type: 'x' }} showCrosshairs={true} />
            <Geom type="line" position="year*value" size={2} color="type" />
            <Geom type="point" position="year*value" size={4} shape={'circle'} color="type" style={{ stroke: '#fff', lineWidth: 1 }}/>
          </Chart>

          <Chart height={300} padding={[ 20, 30, 60, 70]}
            data={chartData.riseData} scale={riseScale} forceFit onGetG2Instance={this.getRiseChart} >
            <Axis name="year" />
            <Axis name="value" title={true} />
            <Legend />
            <Tooltip shared crosshairs={{ type: 'x' }} showCrosshairs={true} />
            <Geom type="line" position="year*value" size={2} color="type" />
            <Geom type="point" position="year*value" size={4} shape={'circle'} color="type" style={{ stroke: '#fff', lineWidth: 1 }}/>
          </Chart>
        </Modal>
        <div className='stock-app-container'>  
          <div className="search-bar">
            <Select className='my-select' value={sort} onChange={this.sortChange} >
              <Select.Option value="one">近一年涨幅</Select.Option>
              <Select.Option value="three">近三年平均涨幅</Select.Option>
              <Select.Option value="five">近五年平均涨幅</Select.Option>
              <Select.Option value="rank3">近三年平均排名</Select.Option>
              <Select.Option value="rank5">近五年平均排名</Select.Option>
            </Select>

            <Radio.Group className="my-radio" buttonStyle="solid" value={type} onChange={this.typeChange}>
              <Radio.Button value="one">所有股票</Radio.Button>
              <Radio.Button value="three">近三年均为正收益</Radio.Button>
              <Radio.Button value="five">近五年均为正收益</Radio.Button>
            </Radio.Group>

            <Radio.Group className="my-radio" buttonStyle="solid" value={marketType} onChange={this.onMarketChange}>
              <Radio.Button value="all">所有股票</Radio.Button>
              <Radio.Button value="hu">沪市</Radio.Button>
              <Radio.Button value="shen">深市</Radio.Button>
            </Radio.Group>

            <Radio.Group className="my-radio" buttonStyle="solid" value={time} onChange={this.onTimeChange}>
              <Radio.Button value="all">所有股票</Radio.Button>
              <Radio.Button value="bleow5">上市五年以内</Radio.Button>
              <Radio.Button value="above5">上市五年以上</Radio.Button>
            </Radio.Group>

            <Input.Search className="my-search" placeholder="输入股票代码或名称"
              value={code} onChange={this.onCodeChange} onSearch={this.onSearch} />
            {/*<Input className="my-radio"  value={code} onChange={this.onCodeChange}/>*/}
          </div>
          <Table columns={this.columns} dataSource={list} pagination={pagination} rowKey={record => record.code} 
              scroll={{ x: 2000, y: 600}} sticky size='middle'/>
        </div>
      </div>

    </Layout>
  }
}

export default Intro