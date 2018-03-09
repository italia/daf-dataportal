import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Route, Link } from 'react-router-dom';

class DatasetCard extends Component{
    constructor(props){
        super(props);
    }

    mesi = ['',' Gennaio ',' Febbraio ',' Marzo ',' Aprile ',' Maggio ',' Giugno ',' Luglio ',' Agosto ',' Settembre ',' Ottobre ', ' Novembre ', ' Dicembre ']

    render(){
        const { dataset, key } = this.props
        var sp = dataset.organization.created.split('T')
        var date = sp[0].split('-')
        var anno = date[0]
        var mese = this.mesi[date[1]]
        var giorno = date[2]
        return (
            <div className="pr-4" key={key}>
                <div className="card bg-gray-100 card-dataset">
                    <div className="header-dataset row m-0 b-b-card">
                        <div className="col-10 slug-dataset my-2 pl-3">
                            <div className="my-1">{dataset.name}</div>
                        </div>
                        <div className="col-2 my-2">
                            {
                                dataset.organization.name !== 'default_org' &&
                                <span className="badge badge-pill badge-danger pull-right badge-dash my-1" title="Il dataset è privato"> </span>
                            }
                            {
                                dataset.organization.name === 'default_org' &&
                                <span className="badge badge-pill badge-success pull-right badge-dash my-1" title="Il dataset è pubblico"> </span>
                            }
                        </div>
                    </div>
                    <div className="dataset-body b-b-card">
                        <div className="title-dash pl-3 ml-0">
                            <Link to={"/dataset/" + dataset.name}>
                                <h3 className="card-title text-primary">{dataset.title}</h3>
                            </Link>
                            {/* <h6 className="card-subtitle mb-2 text-muted">{dash.subtitle}</h6> */}
                        </div>
                        <div className="card-text row m-0 mt-3 ml-4">
                            <p className="col-8 pl-0 m-0">{dataset.organization.name}</p>
                        </div>
                    </div>
                    <div className="header-dataset row m-0 b-b-card">
                        <div className="col-3 my-2 pl-3">
                            <span className="badge badge-secondary my-1">JSON</span>
                        </div>
                        <div className="col-2 my-2">
                            <span className="badge badge-accento my-1">{dataset.tags[0].name} </span>
                        </div>
                    </div>
                    <div className="header-dataset row m-0">
                        <div className="col-2 my-2 text-center">
                            <i className="fa fa-calendar-o my-1"/>
                        </div>
                        <div className="col-10 my-2 p-0">
                            Creato il {giorno + mese + anno}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DatasetCard