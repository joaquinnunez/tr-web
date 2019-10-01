import React, { Component } from 'react';
import './App.css';
import MultiLineChartLive from './MultiLineChartLive';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      exchange: 'binance',
      RSI: {},
      DIFF: {},
      ROC: {},
      VOLUME: {},
      CLOSE: {},
      selectedInterval: '5m'
    }
    var component = this
    this.socket = new WebSocket("ws://localhost:8080")
    //this.socket = new WebSocket("ws://ec2-34-229-193-101.compute-1.amazonaws.com:8080")
    this.socket.onmessage = function (event) {
      let eventData = JSON.parse(event.data)
      component.setState({ [eventData.variable]: eventData.data })
      // dirty shit
      if (eventData.variable === 'CLOSE')
        document.getElementsByTagName('title')[0].innerText = eventData.data['5m'].btcusdt
    }
    this.socket.onerror = console.log
  }

  setInterval(interval) {
    console.log(`Selecting interval ${interval}`)
    this.setState({selectedInterval: interval})
  }

  render() {
    const intervals = Object.keys(this.state.RSI).map(i => (<li key={i}><button onClick={()=>this.setInterval(i)}>{i}</button></li>))
    if (intervals.length === 0) return 'Loading...'
    return (
      <div className="App">
        <div className="Main">
          <div>Intervals: <ul>{intervals}</ul></div>
          <div className="Chart">
            <h5>{this.state.selectedInterval} candles RSI(14)</h5>
            <MultiLineChartLive exchange={this.state.exchange} data={this.state.RSI[this.state.selectedInterval]} range={[0, 100]} volume={this.state.VOLUME[this.state.selectedInterval]}/>
          </div>
          <div className="Chart">
            <h5>{this.state.selectedInterval} candles ROC(14)</h5>
            <MultiLineChartLive exchange={this.state.exchange} data={this.state.ROC[this.state.selectedInterval]} volume={this.state.VOLUME[this.state.selectedInterval]}/>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
