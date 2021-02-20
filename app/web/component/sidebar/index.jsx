import React, { Component } from 'react';
import './index.css';
import eventBus from '../../framework/eventBus.js';



class Sidebar extends Component {
  
  render() {   
    var page = this.props.page;
    return (
      <div className="sidebar">
        <div className='sidebar-header'>StockApp</div>
        <div className={page=='list'?'sidebar-item active': 'sidebar-item'}><a href="/">股票分析</a></div>
        <div className={page=='collection'?'sidebar-item active': 'sidebar-item'}><a href="/collection">自选股</a></div>
      </div>
    );
  }
}


export default Sidebar;