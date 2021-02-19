'use strict';

import React, { Component } from 'react';
import Layout from 'component/layout/blog';
import Header from 'component/header'
import '../../asset/css/blog.css'
import './index.css'
import request from '../../framework/request.js';

import { Table, Pagination, Form, Row, Col, Input, Button, Select, Radio  } from 'antd';
import 'antd/dist/antd.css';



function renderRise(text) {
  var className = text>0?'red':'green';
  var content = text?`${text.toFixed(2)}%`:'-'
  return <span className={className}>{content}</span>
}

class Intro extends Component {

  state={
    page: 1,
    pageSize: 30,
    list: [],
    sort:'three',
    type: 'one',
    total: 500,
  }

  columns = [
    {
      title: '序号',
      dataIndex: '',
      fixed: 'left',
      width: 80,
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
      title: '股票名称',
      dataIndex: 'name',
      width: 100,
      fixed: 'left',
    },
    {
      title: '当前股价',
      dataIndex: 'price',
      width: 100,
      fixed: 'left',
    },
    {
      title: '近三年平均涨幅',
      width: 140,
      fixed: 'left',
      dataIndex: 'three_year_average_rise',
      render: renderRise
    },
    {
      title: '近五年平均涨幅',
      width: 140,
      fixed: 'left',
      dataIndex: 'five_year_average_rise',
      render: renderRise
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
    }
  ];


  componentDidMount(){
    // console.log('get', get)
    this.fetchData();
  }




  fetchData = ()=>{
    var page = this.state.page;
    var pageSize = this.state.pageSize;
    var sort = this.state.sort;
    var type = this.state.type;
    request.get(`${window.location.origin}/api/list?page=${page}&pageSize=${pageSize}&sort=${sort}&type=${type}`).then(res=>{
      this.setState({
        list:res.data.list,
        total: res.data.total
      })
    })
  }


  sortChange =(val)=>{
    this.setState({sort: val}, ()=>{
      this.fetchData()
    })
  }

  typeChange =(event)=>{
    this.setState({type: event.target.value}, ()=>{
      this.fetchData()
    })
  }  

  render() {
    const data = this.state.list;
    const sort = this.state.sort;
    const type = this.state.type;

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
      <div id="stock-app">
        <div className="search-bar">
          <Select className='my-select' value={sort} onChange={this.sortChange} >
            <Select.Option value="one">近一年涨幅</Select.Option>
            <Select.Option value="three">近三年平均涨幅</Select.Option>
            <Select.Option value="five">近五年平均涨幅</Select.Option>
          </Select>

          <Radio.Group className="my-radio" buttonStyle="solid" value={type} onChange={this.typeChange}>
            <Radio.Button value="one">所有股票</Radio.Button>
            <Radio.Button value="three">近三年均为正收益</Radio.Button>
            <Radio.Button value="five">近五年均为正收益</Radio.Button>
          </Radio.Group>
        </div>
        <Table columns={this.columns} dataSource={data} pagination={pagination} rowKey={record => record.code} 
            scroll={{ x: true, y: 600}} />
      </div>
    </Layout>
  }
}

export default Intro