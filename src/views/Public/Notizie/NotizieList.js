import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { serviceurl } from '../../../config/serviceurl.js'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class NotizieList extends Component {
    constructor(props) {
        super(props)
        this.state = { feed: undefined }
    }

    componentDidMount(){
        // ORIG URL  https://medium.com/feed/team-per-la-trasformazione-digitale
        // FINAL URL https://datipubblici.daf.teamdigitale.it/dati-gov/medium/medium.com/feed/team-per-la-trasformazione-digitale
        let url = serviceurl.apiMedium + this.props.properties.mediumURL
        this.load(url);
    }

    load(url) {
        fetch(url)
            .then(response => response.text())
            .then(xmlText => {
                var extractedData = "";
                var parseString = require('xml2js').parseString;
                parseString(xmlText, function (err, result) {
                    console.dir(result);
                    extractedData = result['rss']['channel'][0];
                })
                this.setFeedRss(extractedData)
            }).catch((error) => { console.log('error: ' + error) })
    }

    setFeedRss(xml) {
        this.setState({ feed: xml });
    }

    trunc(text, size) {
        if (text) {
            if (text.length > size) {
                text = text.substr(0, size);
                text += "...";
            }
        } else {
            text = "---"
        }

        return text;
    }

    render() {
        return (

            <div className="container p-5 mt-2">
                <h1>Notizie</h1>
                <div className="row mt-4">
                    {this.state.feed ? 
                    <div className="col-8">
                            {this.state.feed.item.map((article, index) => {
                                return (<div>
                                            <h2 className="mt-4">
                                                <Link to={"/notizie/" + index}>
                                                    {article.title[0]}
                                                </Link>
                                            </h2>
                                            <h5 className="mt-4">
                                                {article['dc:creator'][0]}
                                            </h5>
                                            <p dangerouslySetInnerHTML={{__html: this.trunc(article['content:encoded'][0], 50)}}></p>
                                        </div>)
                            })}
                    </div>
                     :
                     <div className="col-8">
                         <h5>Non è stata trovata nessuna notizia. </h5>
                     </div>
                     }
                </div>
            </div>
        )
    }
}

NotizieList.propTypes = {
  properties: PropTypes.object
}

function mapStateToProps(state) {
  const { properties } = state.propertiesReducer['prop'] || {}
  return { properties }
}

export default connect(mapStateToProps)(NotizieList);