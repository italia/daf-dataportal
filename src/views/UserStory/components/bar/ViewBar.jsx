import React from 'react';
import { Link } from 'react-router-dom';
import { Tooltip } from 'reactstrap'
import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faGlobe, faUsers, faSortDown, faUser } from '@fortawesome/fontawesome-free-solid'
import { toastr } from 'react-redux-toastr'
import UserStoryService from '../services/UserStoryService';
import { isEditor, isAdmin } from '../../../../utility'

const userStoryService = new UserStoryService();

class ViewBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tooltipOpen: false,
      open: false,
      saving: false,
      status: props.story.published,
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

    const story = this.props.story

    this.setState({
      status: status,
      open: false
    });

    story.published = status

    this.save(story, true)
    
  }

  save(story, shared) {
    this.setState({
      saving: true
    });
    
    userStoryService.save(story, shared).then((data)=> {
      this.setState({
        saving: false,
      })
      toastr.success('Completato', 'Storia salvata con successo')
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
            dropdownStyle: {width: '261px', top: '0', transform: `translate(${0}px, ${-285}px)`}
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
      <div className="row">
{/* 
        <h2 className="pull-left">{this.props.title}</h2> 
*/}


{/*         <Link role="button" to="/private/userstory/list">
          <button type="button" className="btn btn-link btn-xs" >
              <i className="fa fa-chevron-circle-left fa-lg m-t-2"></i>
          </button>
        </Link> */}
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
        <Link role="button" className="ml-auto btn btn-link text-primary" to={"/private/userstory/list/" + this.props.id + "/edit"}>
          <i className="fa fa-edit fa-lg"></i> 
        </Link>

      </div>

    );
  }
};


export default ViewBar;
