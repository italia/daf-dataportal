import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Components from 'react';
import { Route, Link } from 'react-router-dom';

class DashboardCard extends Component {
    constructor(props){
        super(props);
    }

    render(){
        const {dash, imageA, imageB } = this.props;
        const iframeStyle = {
            width: '100%',
            height: '160px',
        }

        return(
            <div className=".col-md-auto px-2">
                <div className="card b-a-1 b-t-3 bg-gray-100 card-dash">
                    <div className="card-img-top" style={iframeStyle}>
                        <div className="row m-0">
                            {imageA && <div className={"crop " + (imageB ? "pr-0 b-r-dash col-6" : "col-12")}><img className="bn-dash" src={"data:image/jpg;base64," + imageA} /></div>}
                            {imageB && <div className="crop col-6 pl-0"><img className="bn-dash" src={"data:image/jpg;base64," + imageB} /></div>}
                        </div>
                    </div>
                    <div className="card-body p-0 b-t-dash">
                        <div className="title-dash">
                            <Link to={"/dashboard/list/" + dash.id}>
                                <h3 className="card-title text-primary">{dash.title}</h3>
                            </Link>
                            {/* <h6 className="card-subtitle mb-2 text-muted">{dash.subtitle}</h6> */}
                        </div>
                        <div className="card-text row m-0 mt-3 ml-4">
                            <p className="col-8 pl-0 m-0">{dash.user}</p>
                            <div className="col-4 my-1">
                                {
                                    dash.status == 2 &&
                                    <span className="badge badge-pill badge-warning pull-right badge-dash" title="Pubblica"> </span>
                                }
                                {
                                    dash.status == 1 &&
                                    <span className="badge badge-pill badge-success pull-right badge-dash" title="Condivisa"> </span>
                                }
                                {
                                    dash.status == 0 &&
                                    <span className="badge badge-pill badge-secondary pull-right badge-dash" title="In bozza"> </span>
                                }
                            </div>
                        </div>
                        {dash.pvt == 1 &&
                            <div className="badge badge-danger pull-left mt-20"><i className="fa fa-lock fa-lg m-t-2"></i> PRIVATA</div>
                        }
                    </div>
                    <div className="b-t-1 py-2 bg-cards-2 footer-dash">
                        <div className="pt-1 row">
                            <div className="card-text col-8"><i className="fa fa-bar-chart text-secondary pr-2"></i> Widget</div>
                            <div className="col-4 my-1 pr-2"><span className="badge badge-pill badge-secondary pull-right" style={{ height: '16px' }}>{Object.keys(JSON.parse(dash.widgets)).length} </span></div>
                        </div>
                    </div>
                    <div className="b-t-1 py-2 bg-cards-2 footer-dash">
                        <div className="pt-1 row">
                            <div className="card-text col-8"><i className="fa fa-table text-secondary pr-2"></i> Dataset</div>
                            {/* <div className="col-4"><span className="badge badge-pill badge-secondary pull-right" style={{ height: '16px' }}>{Object.keys(JSON.parse(dash.widgets)).length} </span></div> */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DashboardCard