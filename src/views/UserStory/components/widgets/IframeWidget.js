import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

class IframeWidget extends Component {

    constructor(props){
        super(props);
    }

  componentDidMount () {
    let iframe = ReactDOM.findDOMNode(this.refs.iframe)
    iframe.addEventListener('load', this.props.onLoad);

    //Previous code on dashboard
    /*
     var that = this;
    	fetch('http://localhost:9000/superset/iframes')//fetch(`https://api.github.com/search/users?q=${input}`)
		  .then((response) => response.json())
		  .then((json) => {
        const iframes = json.map((superset, index) => {
          const links = superset.slice_link;
          var href = links.match(/href="([^"]*)/)[1];
          // NB TODO url configurabili
          var url = 'http://localhost:8088' + href  + '&standalone=true'
          var title = superset.viz_type + index.toString()
          const iframeString = '<iframe width="100%"  height="350px" seamless frameBorder="0" scrolling="no" src="' + url + '"></iframe>'
          const iframe =  () => <Iframe iframe={iframeString}/>
          return { type : iframe, title : title}
        })
        var obj = iframes.slice(0,1).reduce(function(acc, cur, i) {
          acc[i] = cur
          return acc;
        }, {});
        
       var w =  {}
       iframes.slice(0,3).map((iframe, index) => w[iframe.title] = iframe)

       const widgetstest = Object.assign(that.state.widgets,  {widgets : obj})
      // that.setState({widgets : w})
      // that.setState(widgetstest)
			 that.setState({widgets :  {
        EngineTelemetricsWidget: {
          type: iframes[1].type,
          title : iframes[1].title,
        },
        PerformanceWidget: {
          type: iframes[17].type,
          title : iframes[17].title,
        },
        ShipVitalTelemetricsWidget: {
          type: iframes[7].type,
          title : iframes[7].title,
        },
        IframeTest : {
          type: iframes[0].type,
          title : iframes[0].title,
        }
      } 
      } 
      )  
    }); 
    */
  }

  render () {
    const iframeStyle = {
      width: '100%',
      height: '300px',
      border: '0'
    }

    return (
      <iframe
        ref="iframe"
        frameBorder={'0'}
        style={iframeStyle}
        src={this.props.url}
      />
    )
  }

}

export default IframeWidget