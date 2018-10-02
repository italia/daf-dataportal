import React, { Component } from 'react'
import { serviceurl } from '../../../config/serviceurl.js'
import { connect } from 'react-redux';


class NotizieDetail extends Component {
    constructor(props) {
      super(props)
      this.state = {feed: undefined}
    }

    componentDidMount(){
        // ORIG URL  https://medium.com/feed/team-per-la-trasformazione-digitale
        // FINAL URL https://datipubblici.daf.teamdigitale.it/dati-gov/medium/medium.com/feed/team-per-la-trasformazione-digitale
        //let url = serviceurl.apiMedium + this.props.properties.mediumURL
        let url = serviceurl.apiMedium + this.props.properties.notizieURL
        this.load(url, this.props.match.params.id);
    }
 
    load(url, id){
        fetch(url)
            .then(response => response.text())
            .then(xmlText => {
                var extractedData = "";
                var parseString = require('xml2js').parseString;
                parseString(xmlText, function (err, result) {
                    console.dir(result);
                    extractedData = result['rss']['channel'][0];
                })
                this.setFeedDetailRss(extractedData['item'][id])
            }).catch((error) => {console.log('error: ' + error)})
    }

    setFeedDetailRss(xml){
        this.setState({ item: xml });
    }
    
      render() {
        return (
			    <div className="container p-5 mt-2">
            {this.state.item ? 
            <div className="paragrafo">
                <div>
                    <h2 className="mt-4">
                        {this.state.item.title[0]}
                    </h2>
                    <h5 className="mt-4">
                        {this.state.item['dc:creator'][0]}
                    </h5>
                    <h5 className="mt-4">
                        {this.state.item.pubDate[0]}                            
                    </h5>
                    <p dangerouslySetInnerHTML={{__html: this.state.item['content:encoded'][0]}}></p>
                </div>
            </div>
              :<h3><i className="fa fa-spin fa-circle-notch mr-2"/>Caricamento... </h3>
              }
        </div>
        )
    }
}
  
  function mapStateToProps(state) {
    const { properties } = state.propertiesReducer['prop'] || {}
    return { properties }
  }
  
export default connect(mapStateToProps)(NotizieDetail);
