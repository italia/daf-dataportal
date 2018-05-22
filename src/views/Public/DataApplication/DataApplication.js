import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { serviceurl } from '../../../config/serviceurl.js'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class NotizieList extends Component {
    constructor(props) {
        super(props)
        this.state = { datapplications: undefined }
    }

    componentDidMount(){
        let url = serviceurl.apiURLDatiGov + '/datapplications'
        fetch(url)
            .then(response => response.json())
            .then(json => {
                this.setState({datapplications : json})
            }).catch((error) => { console.log('error: ' + error) })
    }

    render() {
        return (

            <div className="container p-5 mt-2">
                <h1>Data Applications</h1>
                <div className="row mt-4">
                    {this.state.datapplications ? 
                    <div className="col-8">
                            {this.state.datapplications.map((app, index) => {
                                return (<div key={index}>
                                            <h2 className="mt-4">
                                                <Link to={app.url}>
                                                    {app.title}
                                                </Link>
                                            </h2>
                                            <h5 className="mt-4">
                                                {app.creator}
                                            </h5>
                                            <p>{app.description}</p>
                                        </div>)
                            })}
                    </div>
                     :
                     <div className="col-8">
                         <h5>Non è stata trovata nessuna data application. </h5>
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