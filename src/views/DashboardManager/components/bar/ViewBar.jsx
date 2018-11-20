import React from 'react';
import { Link } from 'react-router-dom';
import { toastr } from 'react-redux-toastr'

import { isEditor, isAdmin } from '../../../../utility'
import { Tooltip } from 'reactstrap';
import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faGlobe, faUsers, faSortDown, faUser } from '@fortawesome/fontawesome-free-solid'
import DashboardService from '../services/DashboardService';

const dashboardService = new DashboardService();

class ViewBar extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
        tooltipOpen: false,
        open: false,
        saving: false,
        status: props.dashboard.status,
        dropdownStyle: {width: '261px'},
      }

      this.toggle = this.toggle.bind(this);
      this.openVisibility = this.openVisibility.bind(this)
      this.condividi = this.condividi.bind(this)
      this.save = this.save.bind(this)
  }
  
  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }
  
  condividi(status) {

    const dash = this.props.dashboard

    this.setState({
      status: status,
      open: false
    });

    dash.status = status
    dash.layout = JSON.stringify(this.props.dashboard.layout)
    dash.widgets = JSON.stringify(this.props.dashboard.widgets)

    this.save(dash, true)
    
  }

  save(dash, shared) {
    this.setState({
      saving: true
    });
    
    dashboardService.save(dash, shared).then((data)=> {
      this.setState({
        saving: false,
      })
      toastr.success('Completato', 'Dashboard salvata con successo')
    })
  }

  openVisibility(){
    this.setState({
        open: !this.state.open
    })
    let dropdown = document.querySelector('#dropdown_story')
    let info = dropdown.getClientRects()
    
    if(info[0].bottom > 800 || window.location.hash === '#/home')
        this.setState({
            dropdownStyle: {width: '261px', transform: `translate(${0}px, ${-285}px)`}
        })
    else
        this.setState({
            dropdownStyle: {width: '261px'}
        })
  }

  render = function(){
    const { dropdownStyle } = this.state
    var show = this.state.open? ' show': ''
    var active = this.state.open? ' active' : ''
    return (
      <div>
        <div className="row">
          <div className="col-10 p-0">
            <h3 className="card-title">{this.props.title}</h3>
          </div>
          <div className="col-2">
            {this.props.pvt==1 &&
            <div className="badge badge-danger fa-pull-right mt-20"><i className="fa fa-lock fa-lg m-t-2"></i> PRIVATA</div>
            }
          </div>
        </div>
        <div className="row">
          <h7 className="card-title">{this.props.subtitle}</h7>
        </div>
        <div className="row mb-4">
        <div className={"fa-pull-right dropdown" + show }>
          {this.state.saving ? <i className="fa fa-spin fa-circle-notch text-icon"/> :
              <button className={"h-100 btn btn-light text-primary text-center"+active} id='dropdown_story' data-toggle="dropdown"  aria-haspopup="true" aria-expanded="false" onClick={this.openVisibility.bind(this)}>

                  <FontAwesomeIcon icon={faSortDown} className="pull-left"/>
                  
              {
                  this.state.status == 2 &&
                  //<span className="badge badge-pill badge-warning fa-pull-right badge-dash" title="Pubblica"> </span>
                  //<i className="fa fa-globe fa-pull-right fa-lg text-icon" title='Pubblica'/>
                  <span title="Open Data" className="ml-2"><FontAwesomeIcon icon={faGlobe} className="mx-auto" /></span>
              }
              {
                  this.state.status == 1 &&
                  //<span className="badge badge-pill badge-success fa-pull-right badge-dash" title="Condivisa"> </span>
                  //<i className="fa fa-users fa-lg fa-pull-right text-icon" title="Condivisa"/>
                  <span title="Organizzazione" className="ml-2"><FontAwesomeIcon icon={faUsers} className="mx-auto" /></span>
              }
              {
                  !this.state.status &&
                  //<span className="badge badge-pill badge-secondary fa-pull-right badge-dash" title="In bozza"> </span>
                  //<i className="fa fa-lock fa-lg fa-pull-right text-icon" title="In Bozza"/>
                  <span title="Privata" className="ml-2"><FontAwesomeIcon icon={faUser} className="mx-auto"/></span>
              }

              </button>}
              <div className={"dropdown-menu m-0" + show} style={dropdownStyle} aria-labelledby="dropdownMenuButton">
                  <h6 className="dropdown-header bg-white"><b>CHI PUÒ VISUALIZZARE?</b></h6>
                  <button className="dropdown-item bg-light b-l-pvt" onClick={this.condividi.bind(this, 0)}>
                      
                      
                      <div className="row">
                          <h5 className="col-1 pl-0"><FontAwesomeIcon icon={faUser} className="mx-2"/></h5>
                          <div className="row col-11 ml-1">
                              <div className="col-12 pl-1"><p className="mb-0"><b>Solo tu</b></p></div>
                              
                              <div className="col-12 pl-1">Contenuto privato</div>
                          </div>
                          
                      </div>
                      
                  </button>
                  <button className="dropdown-item bg-light b-l-org" onClick={this.condividi.bind(this, 1)}>
                      <div className="row">
                          <h5 className="col-1 pl-0"><FontAwesomeIcon icon={faUsers} className="mx-2"/></h5>
                          <div className="row col-11 ml-1">
                              <div className="col-12 pl-1"><p className="mb-0"><b>Organizzazione</b></p></div>
                              
                              <div className="col-12 pl-1">Contenuto visibile ai membri <br/>della tua organizzazione</div>
                          </div>
                      </div>
                  </button>
                  {this.props.pvt!=1 &&(isEditor() || isAdmin()) && <button className="dropdown-item bg-light b-l-open" onClick={this.condividi.bind(this, 2)}>
                  
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
          <div className="align-self-center ml-3">
          {this.props.pvt === "1" &&
            <div>
              <i className="fa text-primary fa-lock mr-3 pointer" id="DisabledAutoHideExample"/> {this.props.org}
              <Tooltip placement="bottom" isOpen={this.state.tooltipOpen} autohide={true} target="DisabledAutoHideExample" toggle={this.toggle}>
                La storia può essere condivisa solamente con gli utenti dell'organizzazione e non può essere vista da tutti gli iscritti a DAF
              </Tooltip>
            </div>
          }

          {this.props.pvt === "0" &&
            <div>
              <i className="fa text-primary fa-lock-open mr-3 pointer" id="DisabledAutoHideExample"/> {this.props.org}
              <Tooltip placement="bottom" isOpen={this.state.tooltipOpen} autohide={true} target="DisabledAutoHideExample" toggle={this.toggle}>
                La storia può essere condivisa con tutti gli iscritti a DAF e sul portale pubblico
              </Tooltip>
            </div>
            }
          </div>
          <div className="ml-auto">
          <div className="btn-toolbar float-right" role="toolbar" aria-label="Toolbar with button groups">
            <div className="btn-group mr-1" data-toggle="buttons" aria-label="First group">
{/*               <Link role="button" to="/private/dashboard/list">
                <button type="button" className="btn btn-link btn-xs" title="Torna alle mie Dashboard">
                  <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
                  <i className="fa fa-chevron-circle-left fa-lg m-t-2"></i>
                </button>
              </Link> */}

              <Link role="button" to={"/private/dashboard/list/" + this.props.id + "/edit"}>
                <button type="button" className="btn btn-link btn-xs" title="Modifica">
                  <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
                  <i className="fa fa-edit fa-lg m-t-2"></i>
                </button>
              </Link>
            </div>
          </div>
          </div>
          </div>
        </div>

    );
  }
};


/*
 <Link role="button" to="/dashboard/list">
          <button type="button" className="btn btn-link float-right" title="Torna alle mie Dashboard">
            <i className="icon-list icons font-2xl d-block m-t-2"></i>
          </button>
        </Link>

        <Link role="button" to={"/dashboard/list/" + this.props.id + "/edit"}>
        <button type="button" className="btn btn-link float-right" title="Modifica">
          <i className="icon-pencil icons font-2xl d-block m-t-2"></i>
        </button>
      </Link>
*/

export default ViewBar;
