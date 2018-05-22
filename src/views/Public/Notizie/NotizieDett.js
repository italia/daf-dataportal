import React, { Component } from 'react'
import { serviceurl } from '../../../config/serviceurl.js'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class NotizieDetail extends Component {
    constructor(props) {
      super(props)
      this.state = {feed: undefined}
    }

    componentDidMount(){
        // ORIG URL  https://medium.com/feed/team-per-la-trasformazione-digitale
        // FINAL URL https://datipubblici.daf.teamdigitale.it/dati-gov/medium/medium.com/feed/team-per-la-trasformazione-digitale
        let url = serviceurl.apiMedium + this.props.properties.url
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
                <h1>Dettaglio Notizia</h1>
                <div className="row mt-4">
                    {this.state.item ? 
                    <div className="col-8">
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
                     :
                     <div className="col-8">
                         <h5>Caricamento... </h5>
                     </div>
                     }
                </div>
            </div>
        )
    }
}

NotizieDetail.propTypes = {
    properties: PropTypes.object
  }
  
  function mapStateToProps(state) {
    const { properties } = state.propertiesReducer['prop'] || {}
    return { properties }
  }
  
export default connect(mapStateToProps)(NotizieDetail);
