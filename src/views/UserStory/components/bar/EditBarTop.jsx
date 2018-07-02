import React, { PropTypes } from 'react';
import { Route, Link } from 'react-router-dom';
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap'
import { isEditor, isAdmin } from '../../../../utility'
import { Tooltip } from 'reactstrap';

class EditBarTop extends React.Component {

  constructor(props) {
    super(props);
    //set init state
    this.state= {
      title : this.props.title,
      status : this.props.status || false,
      isOpen : false,
      pvt : this.props.pvt,
      tooltipOpen: false
    }

    // bind functions
    this.handleChange = this.handleChange.bind(this);
    this.pubblica = this.pubblica.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.condividi = this.condividi.bind(this);
    this.onSave = this.onSave.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      title : nextProps.title,
      id : nextProps.id
    });
  }

  handleChange(event) {
    this.setState({title: event.target.value});
    if(this.props.onChange)
      this.props.onChange(event.target.value);
  }

  openModal() {
    this.setState({
      isOpen: true
    })
  }

  pubblica() {
    let status = 1;

    this.setState({
      status: status,
      isOpen: false
    });

    if (this.props.onPublish)
      this.props.onPublish(status);
  }

  condividi() {
    let status = 2;

    this.setState({
      status: status,
      isOpen: false
    });

    if (this.props.onPublish)
      this.props.onPublish(status)
  }

  hideModal(e) {
    e.preventDefault();
    this.setState({
      isOpen: false
    });
  };

  onRemove() {
    this.props.onRemove();
  }
  
  onSave() {
    this.props.onSave();
  }

  render = function(){

    return (
      <div>
        <Modal isOpen={this.state.isOpen} onRequestHide={this.hideModal}>
          <form>
            <ModalHeader>
              <ModalTitle>Condivisione</ModalTitle>
              <ModalClose onClick={this.hideModal} />
            </ModalHeader>
            <ModalBody>
              <div className="form-group">
                <p>Come vuoi condividere la Storia <b>{this.state.title}</b>?</p>
              </div>
            </ModalBody>
            <ModalFooter>
              <button className='btn btn-gray-200' onClick={this.pubblica}>
                Condividi con la tua Organizzazione
                  </button>
              {this.state.pvt != 1 &&(isEditor() || isAdmin()) &&
                <button className='btn btn-gray-200' onClick={this.condividi}>
                Condividi con tutti
              </button>
              }
            </ModalFooter>
          </form>
        </Modal>
        {/* INFO BAR */}
        <div className="row">
        
          {
            !this.state.status &&

            <div className="col-sm-10">
              <div className="alert alert-warning" role="alert">
              <i className="fa fa-warning fa-lg m-t-2"></i> Attenzione la storia è in bozza, per pubblicarla cliccare sul tasto <i className="fa fa-paper-plane-o fa-lg m-t-2"></i> "Pubblica" qui in basso
              </div>
            </div>
          }
          {
            (this.state.status == 1) &&
            <div className="col-sm-10">
              <div className="alert alert-success" role="alert">
                <i className="fa fa-check-circle fa-lg m-t-2"></i> Storia correttamente pubblicata per la tua Organizzazione
                    </div>
            </div>

          }
          {
            (this.state.status == 2) &&
            <div className="col-sm-10">
              <div className="alert alert-info" role="alert">
                <i className="fa fa-check-circle fa-lg m-t-2"></i> Storia correttamente pubblicata e condivisa con tutti
                    </div>
            </div>

          }
          <div className="col-sm-2">
          {
            (!this.props.modified) ? <span className="badge badge-success float-right">Salvato</span> : <span className="badge badge-warning float-right">Modificato</span>
          }
          </div>
        </div>

        {/* BUTTON BAR */}          
        <div className="row">
{/*           <Link role="button" to="/private/userstory/list">
            <button type="button" className="btn btn-link" >
              <i className="fa fa-chevron-circle-left fa-lg m-t-2"></i>
            </button>
          </Link> */}
          {this.props.pvt === "1" && <div><button className="text-primary mr-auto btn btn-link" id="DisabledAutoHideExample"><i className="fa fa-lock fa-lg"/></button>
          <Tooltip placement="bottom" isOpen={this.state.tooltipOpen} autohide={true} target="DisabledAutoHideExample" toggle={this.toggle}>
            La storia è riservata per l'organizzazione {this.props.org}
          </Tooltip></div>}
          {this.props.pvt === "0" && <div><button className="text-primary mr-auto btn btn-link" id="DisabledAutoHideExample"><i className="fa fa-globe fa-lg"/></button>
          <Tooltip placement="bottom" isOpen={this.state.tooltipOpen} autohide={true} target="DisabledAutoHideExample" toggle={this.toggle}>
            La storia è aperta dall'organizzazione {this.props.org}
          </Tooltip></div>}
          <div className="ml-auto">           
            {isAdmin() || (this.props.loggedUser.uid===this.props.author) && (this.props.removing?<button type="button" className="btn btn-link" disabled={true} title="Salva">              
              <i className="fa fa-spin fa-circle-notch fa-lg m-t-2"></i>
            </button>:<button type="button" className="text-primary btn btn-link" onClick={() => this.onRemove()}>
                <i className="fa fa-trash fa-lg m-t-2"></i>
            </button>)}

            <Link role="button" to={"/private/userstory/list/" + this.props.id }>
              <button type="button" className="text-primary btn btn-link">              
                <i className="fa fa-eye fa-lg m-t-2"></i>
              </button>
            </Link>

            {
              (!this.state.status || this.state.status==false || this.state.status === 1) &&
              <button type="button" className="text-primary btn btn-link" onClick={() => this.openModal()}>
                <i className="fa fa-paper-plane fa-lg m-t-2"></i>
              </button>
            }
            {this.props.saving?<button type="button" className="btn btn-link" disabled={true} title="Salva" onClick={this.onSave}>              
              <i className="fa fa-spin fa-circle-notch fa-lg m-t-2"></i>
            </button>:<button type="button" className="text-primary btn btn-link" title="Salva" onClick={this.onSave}>              
              <i className="fa fa-save fa-lg m-t-2"></i>
            </button>}
          </div>
        </div>

        
      </div>

    );
  }
};

export default EditBarTop;
