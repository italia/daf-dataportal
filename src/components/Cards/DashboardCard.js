import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Components from 'react';
import { Route, Link } from 'react-router-dom';
import { serviceurl } from "../../config/serviceurl";
import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faUser, faGlobe, faUsers, faSortDown } from '@fortawesome/fontawesome-free-solid'
import { isAdmin, isEditor } from '../../utility.js'

class DashboardCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            image1: '',
            image2: '',
            open: false,
            dropdownStyle: {width: '261px', left: 'auto', right: '0'},
            published: props.dash.status,
            saving: false
        }

        this.saveDash = this.saveDash.bind(this)
    }

    async loadImage(widget) {
        let url = serviceurl.apiURLDatiGov + '/plot/' + widget + '/330x280';
        const response = await fetch(url, {
            method: 'GET'
        })

        return response
    }

    /* componentDidMount(){
        const {widgetA, widgetB } = this.props
        const responseA = this.loadImage(widgetA)
        .then(response => {
            if (response.ok) {
                response.text().then(text => {
                    this.setState({
                        loading: false,
                        image1: text.replace(/"/g, '')
                    })
                });
            } else {
                this.setState({
                    loading: false,
                    image1: undefined
                })
            }
        })
        const responseB = this.loadImage(widgetB)
        .then(response => {
            if (response.ok) {
                response.text().then(text => {
                    this.setState({
                        loading: false,
                        image2: text.replace(/"/g, '')
                    })
                });
            } else {
                this.setState({
                    loading: false,
                    image2: undefined
                })
            }
        })
    } */

    openVisibility(){
        const { id } = this.props
        this.setState({
            open: !this.state.open
        })
        let dropdown = document.querySelector('#dropdown_'+id)
        let info = dropdown.getClientRects()
        if(info[0].bottom > 800)
            this.setState({
                dropdownStyle: {width: '261px', left: 'auto', right: '0', top: '0', transform: `translate(${0}px, ${-285}px)`}
            })
        else
            this.setState({
                dropdownStyle: {width: '261px', left: 'auto', right: '0'}
            })
    }

    async save(dashboard) {

        let id = dashboard.id || "save"
        dashboard['timestamp'] = new Date(); 
        console.log('Salvataggio dashboard: ' + dashboard);
        const response = await fetch( serviceurl.apiURLDatiGov + "/save/dashboards", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(dashboard)
        })
        
        return response.json();
    }

    saveDash(status){
        const { dash } = this.props
        dash.status = status
        let response = this.save(dash)
        this.setState({
            saving: true,
            open: !this.state.open
        })
        response.then(json => {
            this.setState({
                saving: false,
                published: status
            })
        })
    }

    render(){
        const { open, published, dropdownStyle } = this.state;
        const { dash, id, widgetA, widgetB, loggedUser } = this.props;
        const iframeStyle = {
            width: '100%',
            height: '160px',
        }

/*         let prima = imageA
        let seconda = imageB */

/*         if(imageA==='noimage' || !imageA)
            prima = image1
        if(imageB==='noimage' || !imageB && image2!=='noimage')
            seconda = image2 */
        

        var active = open? ' active' : ''
        var show = open? ' show': ''
        return(
            <div className="mx-auto">
                <div className="card b-a-1 b-t-3 bg-gray-100 card-dash">
                    <div className="card-img-top" style={iframeStyle}>
                        <div className="row m-0">
                            {widgetA && <div className={"crop " + (widgetB ? "pr-0 b-r-dash col-6" : "col-12")}><img className="bn-dash" src={serviceurl.urlCacher + widgetA+'.png'} /></div>}
                            {widgetB && <div className="crop col-6 pl-0"><img className="bn-dash" src={serviceurl.urlCacher +widgetB+'.png'} /></div>}
                        </div>
                    </div>
                    <div className="card-body p-0 b-t-dash">
                        <div className="title-dash">
                            <Link to={"/private/dashboard/list/" + dash.id}>
                                <h3 className="card-title text-primary">{dash.title}</h3>
                            </Link>
                            {/* <h6 className="card-subtitle mb-2 text-muted">{dash.subtitle}</h6> */}
                        </div>
                        <div className="card-text row m-0 mt-3 ml-4">
                            <p className="col-8 pl-0 m-0">{dash.user}</p>
                            <div className="col-4">
                                <div className={"fa-pull-right dropdown" + show }>
                                {this.state.saving ? <i className="fas fa-spin fa-circle-notch text-icon"/> :
                                    <button className={"btn-status bg-cards-2 text-icon text-center"+active} id={'dropdown_'+id} data-toggle="dropdown"  aria-haspopup="true" aria-expanded="false" onClick={this.openVisibility.bind(this)}>

                                        <FontAwesomeIcon icon={faSortDown} className="pull-left"/>
                                        
                                    {
                                        published == 2 &&
                                        //<span className="badge badge-pill badge-warning fa-pull-right badge-dash" title="Pubblica"> </span>
                                        //<i className="fa fa-globe fa-pull-right fa-lg text-icon" title='Pubblica'/>
                                        <span title="Open Data" className="ml-2"><FontAwesomeIcon icon={faGlobe} className="mx-auto" /></span>
                                    }
                                    {
                                        published == 1 &&
                                        //<span className="badge badge-pill badge-success fa-pull-right badge-dash" title="Condivisa"> </span>
                                        //<i className="fa fa-users fa-lg fa-pull-right text-icon" title="Condivisa"/>
                                        <span title="Organizzazione" className="ml-2"><FontAwesomeIcon icon={faUsers} className="mx-auto" /></span>
                                    }
                                    {
                                        published == 0 &&
                                        //<span className="badge badge-pill badge-secondary fa-pull-right badge-dash" title="In bozza"> </span>
                                        //<i className="fa fa-lock fa-lg fa-pull-right text-icon" title="In Bozza"/>
                                        <span title="Privata" className="ml-2"><FontAwesomeIcon icon={faUser} className="mx-auto"/></span>
                                    }

                                    </button>}
                                    <div className={"dropdown-menu dropdown-menu-right m-0" + show} style={dropdownStyle} aria-labelledby="dropdownMenuButton">
                                        <h6 className="dropdown-header bg-white"><b>CHI PUÒ VISUALIZZARE?</b></h6>
                                        <button className="dropdown-item bg-light b-l-pvt" onClick={this.saveDash.bind(this, 0)}>
                                            
                                            
                                            <div className="row">
                                                <h5 className="col-1 pl-0"><FontAwesomeIcon icon={faUser} className="mx-2"/></h5>
                                                <div className="row col-11 ml-1">
                                                    <div className="col-12 pl-1"><p className="mb-0"><b>Solo tu</b></p></div>
                                                    
                                                    <div className="col-12 pl-1">Contenuto privato</div>
                                                </div>
                                                
                                            </div>
                                            
                                        </button>
                                        <button className="dropdown-item bg-light b-l-org" onClick={this.saveDash.bind(this, 1)}>
                                            <div className="row">
                                                <h5 className="col-1 pl-0"><FontAwesomeIcon icon={faUsers} className="mx-2"/></h5>
                                                <div className="row col-11 ml-1">
                                                    <div className="col-12 pl-1"><p className="mb-0"><b>Organizzazione</b></p></div>
                                                    
                                                    <div className="col-12 pl-1">Contenuto visibile ai membri <br/>della tua organizzazione</div>
                                                </div>
                                            </div>
                                        </button>
                                        {dash.pvt!=1 &&(isEditor(loggedUser) || isAdmin(loggedUser)) && <button className="dropdown-item bg-light b-l-open" onClick={this.saveDash.bind(this, 2)}>
                                        
                                            <div className="row">
                                                <h5 className="col-1 pl-0"><FontAwesomeIcon icon={faGlobe} className="mx-2"/></h5>
                                                <div className="row col-11 ml-1">
                                                    <div className="col-12 pl-1"><p className="mb-0"><b>Open data</b></p></div>
                                                    
                                                    <div className="col-12 pl-1">Contenuto visibile a <br/>chiunque, visibile sul <br/>dataportal pubblico </div>
                                                </div>
                                            </div>
                                        </button>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* dash.pvt == 1 &&
                            <div className="badge badge-danger pull-left mt-20"><i className="fa fa-lock fa-lg m-t-2"></i> PRIVATA</div> */
                        }
                    </div>
                    <div className="b-t-1 py-2 bg-cards-2 footer-dash">
                        <div className="pt-1 row">
                            <div className="card-text col-8"><i className="fa fa-chart-bar text-secondary pr-2"></i> Widget</div>
                            <div className="col-4 my-1 pr-2"><span className="badge badge-pill badge-secondary fa-pull-right" style={{ height: '16px' }}>{Object.keys(JSON.parse(dash.widgets)).length} </span></div>
                        </div>
                    </div>
                    <div className="b-t-1 py-2 bg-cards-2 footer-dash">
                        <div className="pt-1 row">
                            <div className="card-text col-8"><i className="fa fa-table text-secondary pr-2"></i> Dataset</div>
                            {/* <div className="col-4"><span className="badge badge-pill badge-secondary fa-pull-right" style={{ height: '16px' }}>{Object.keys(JSON.parse(dash.widgets)).length} </span></div> */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DashboardCard