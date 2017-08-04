import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

class IframeWid extends Component {

    constructor(props){
        super(props);
    }

  componentDidMount () {
    let iframe = ReactDOM.findDOMNode(this.refs.iframe)
    iframe.addEventListener('load', this.props.onLoad);
  }

  render () {
    const iframeStyle = {
     // width: '100%',
     // height: '100%',
      border: '0',
      position: 'absolute',
    }

    return (
      <iframe
        ref="iframe"
        {...this.props}
        frameBorder={'0'}
        width='600'
        height='400'
        style={iframeStyle}
        src="http://localhost:8088/superset/explore/table/3/?form_data=%7B%22datasource%22%3A%223__table%22%2C%22viz_type%22%3A%22line%22%2C%22slice_id%22%3A20%2C%22granularity_sqla%22%3A%22ds%22%2C%22time_grain_sqla%22%3A%22Time+Column%22%2C%22since%22%3A%22100+years+ago%22%2C%22until%22%3A%22now%22%2C%22metrics%22%3A%5B%22sum__num%22%5D%2C%22groupby%22%3A%5B%22name%22%5D%2C%22limit%22%3A%2225%22%2C%22timeseries_limit_metric%22%3Anull%2C%22show_brush%22%3Afalse%2C%22show_legend%22%3Atrue%2C%22rich_tooltip%22%3Atrue%2C%22show_markers%22%3Afalse%2C%22x_axis_showminmax%22%3Atrue%2C%22line_interpolation%22%3A%22linear%22%2C%22contribution%22%3Afalse%2C%22x_axis_label%22%3A%22%22%2C%22x_axis_format%22%3A%22smart_date%22%2C%22y_axis_label%22%3A%22%22%2C%22y_axis_bounds%22%3A%5Bnull%2Cnull%5D%2C%22y_axis_format%22%3A%22.3s%22%2C%22y_log_scale%22%3Afalse%2C%22rolling_type%22%3A%22None%22%2C%22time_compare%22%3Anull%2C%22num_period_compare%22%3A%22%22%2C%22period_ratio_type%22%3A%22growth%22%2C%22resample_how%22%3Anull%2C%22resample_rule%22%3Anull%2C%22resample_fillmethod%22%3Anull%2C%22where%22%3A%22%22%2C%22having%22%3A%22%22%2C%22filters%22%3A%5B%5D%7D&standalone=true&height=400"
      />
    )
  }

}

export default IframeWid