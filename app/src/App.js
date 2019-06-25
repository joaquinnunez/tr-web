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
    }
    var component = this
    this.socket = new WebSocket("ws://localhost:8080")
    this.socket.onmessage = function (event) {
      let eventData = JSON.parse(event.data)
      component.setState({ [eventData.variable]: eventData.data })
    }
  }

  render() {
    return (
      <div className="App">
        <div className="Main">
          <div className="Chart">
            <h5>15' candles RSI(14)</h5>
            <MultiLineChartLive exchange={this.state.exchange} data={this.state.RSI} range={[0, 100]} volume={this.state.VOLUME}/>
          </div>
          <div className="Chart">
            <h5>15' candles ROC(14)</h5>
            <MultiLineChartLive exchange={this.state.exchange} data={this.state.ROC} volume={this.state.VOLUME}/>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
