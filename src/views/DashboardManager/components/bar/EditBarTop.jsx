import React, { PropTypes } from 'react';
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap'
import { isEditor, isAdmin } from '../../../../utility'
import { connect } from 'react-redux'
import { Tooltip } from 'reactstrap';
import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faGlobe, faUsers, faSortDown, faUser } from '@fortawesome/fontawesome-free-solid'

class EditBarTop extends React.Component {

  constructor(props) {
    super(props);
    this.state= {
      dashboard : this.props.dashboard,
      modified: this.props.modified,
      status : this.props.status,
      open : false,
      pvt : this.props.pvt,
      tooltipOpen: false,
      dropdownStyle: {width: '261px', left: 'auto', right: '0'},
    }

    this.save = this.save.bind(this)
    this.toggle = this.toggle.bind(this);
    this.condividi = this.condividi.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.dashboard)
      this.state.dashboard = nextProps.dashboard;
    if(nextProps.modified)
      this.state.modified = nextProps.modified
    if(nextProps.status)
      this.state.status = nextProps.status
  }

  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

  condividi(status) {

    this.setState({
      status: status,
      open: false
    });

    if (this.props.onPublish)
      this.props.onPublish(status)
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

  onRemove() {
    this.props.onRemove();
  }

  save(){
    this.props.onSave();
  }

  back(){
    this.props.onBack();
  }

  preview(){
    this.props.onPreview();
  }

  render = function(){
    const { dashboard, dropdownStyle } = this.state
    var show = this.state.open? ' show': ''
    var active = this.state.open? ' active' : ''

    return (
          <div>
          <div className="row mb-4">
            <div className="col-12 px-0">
              <h3 className="card-title">{this.state.dashboard.title}</h3>
            </div>
            <div className="col-12 px-0">
              <h7 className="card-title">{this.state.dashboard.subtitle}</h7>
            </div>
            <div className={"fa-pull-right dropdown" + show }>
          {this.props.saving ? <i className="fa fa-spin fa-circle-notch text-icon"/> :
              <button className={"h-100 btn btn-light text-primary text-center"+active} id='dropdown_story' data-toggle="dropdown"  aria-haspopup="true" aria-expanded="false" onClick={this.openVisibility.bind(this)}>

                  <FontAwesomeIcon icon={faSortDown} className="pull-left"/>
                  
              {
                  this.state.status == "2" &&
                  //<span className="badge badge-pill badge-warning fa-pull-right badge-dash" title="Pubblica"> </span>
                  //<i className="fa fa-globe fa-pull-right fa-lg text-icon" title='Pubblica'/>
                  <span title="Open Data" className="ml-2"><FontAwesomeIcon icon={faGlobe} className="mx-auto" /></span>
              }
              {
                  this.state.status == "1" &&
                  //<span className="badge badge-pill badge-success fa-pull-right badge-dash" title="Condivisa"> </span>
                  //<i className="fa fa-users fa-lg fa-pull-right text-icon" title="Condivisa"/>
                  <span title="Organizzazione" className="ml-2"><FontAwesomeIcon icon={faUsers} className="mx-auto" /></span>
              }
              {
                  this.state.status == "0" &&
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
                  
                  {this.state.dashboard.id &&
                  <button type="button" className="btn btn-link float-right" onClick={() => this.onRemove()} title="Elimina">
                    <i className="fa fa-trash fa-lg m-t-2"></i>
                  </button>
                  }

                  {
                   this.state.dashboard.id &&
                      <button type="button" className="btn btn-link float-right" title="Anteprima" onClick={this.preview.bind(this)}>
                        <i className="fa fa-eye fa-lg m-t-2"></i>
                      </button>
                  }
                    <button type="button" className="btn btn-link float-right" onClick={() => this.save()} title="Salva">
                    <i className="fas fa-save fa-lg m-t-2"></i>
                    </button>
                </div>
              </div>
            </div>
            <div className="align-self-center">
              {
                (!this.props.saving) ? <span className="badge badge-success float-right">Salvato</span> : <span className="badge badge-info float-right">Modificato</span>
              }
            </div>
          </div>
        </div>
    );
  }
};


function mapStateToProps(state) {
  const { loggedUser } = state.userReducer['obj'] || { }
  return { loggedUser }
}

export default connect(mapStateToProps)(EditBarTop);
