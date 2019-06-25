import React, { Component } from 'react';
import Plot from 'react-plotly.js';
import * as R from 'ramda';

const COLORS = {
'btc': '#F7931A',
'eth': '#333333',
'etc': '#038409',
'ltc': '#DADADA',
'neo': '#74BC2A',
'xrp': '#058BC3',
'xmr': '#FF6600',
'xem': '#6AB0E0',
'usdt': '#26A17B',
'tusd': '#26A17B',
'dash': '#0074B6',
'doge': '#BBA033',
};

const N = 36
const minVolume = 50

class MultiLineChartLive extends Component {

  render () {
    let data = this.props.data
    let volume = this.props.volume
    let range = this.props.range
    if (R.isEmpty(data) || R.isEmpty(volume)) return (<div className="alert alert-primary" role="alert">Loading...</div>)
    let traces = []
    let index = data['index'].slice(-1*N)
    let blacklist = ['index']
    for (let coinIndex in data) {
      console.log(coinIndex)
      if ((R.contains(coinIndex, blacklist) || volume[coinIndex] <= minVolume) && coinIndex!=='tusd') continue
      let coinName = coinIndex.split('btc')[0]
      if (coinName === '') coinName = 'btc'
      var line = {}
      if (R.has(coinName, COLORS)) {
        line['color'] = COLORS[coinName]
      }
      if (coinName === 'tusd' || coinName === 'btc') {
        line['width'] = 4
      }
      let trace1 = {
        x: index,
        y: data[coinIndex].slice(-1*N),
        mode: 'line',
        name: coinName,
        line
      };
      traces.push(trace1)
    }
    traces = R.sortBy(R.prop('name'), traces)
    let yaxis = R.isEmpty(range) ? {} : {range}
    let h = window.screen.innerHeight
    let w = window.screen.innerWidth
    w = w > 800 ? w * 0.8 : w
    return (
      <div>
      <Plot
        data={traces}
        layout={{
          width: w,
          height: h,
          margin: {t: 20, r: 20, l: 20, b: 20},
          hovermode: 'closest',
          yaxis,
        }}
        useResizeHandler={true}
        style={{width: "90%", height: "100%"}}
      />
      </div>
    );
  }
}

export default MultiLineChartLive;
