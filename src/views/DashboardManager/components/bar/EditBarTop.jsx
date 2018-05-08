import React, { PropTypes } from 'react';
import AddWidgetDialog from '../AddWidgetDialog';
import { Route, Link } from 'react-router-dom';
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap'
import TextEditor from '../../../UserStory/components/editor/TextEditor'
import { isEditor, isAdmin } from '../../../../utility'
import { connect } from 'react-redux'

class EditBarTop extends React.Component {

  constructor(props) {
    super(props);
    this.state= {
      dashboard : this.props.dashboard,
      modified: this.props.modified,
      isOpen: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.save = this.save.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.dashboard)
      this.state.dashboard = nextProps.dashboard;
    if(nextProps.modified)
      this.state.modified = nextProps.modified
  }

  handleChange(event) {
    this.setState({title: event.target.value});
    if(this.props.onChange)
      this.props.onChange(event.target.value);
  }

  openModal(){
    this.setState({
      isOpen: true
    })
  }

  pubblica(){
    let status = 1;

    this.state.dashboard.status = status;
    this.setState({
      dashboard : this.state.dashboard,
      isOpen: false
    }); 
    
    if(this.props.onPublish)
      this.props.onPublish(status);
  }

  condividi(e){
    e.preventDefault();
    let status = 2;

    this.state.dashboard.status = status
    this.setState({
      dashboard: this.state.dashboard,
      isOpen: false
    });

    if (this.props.onPublish)
      this.props.onPublish(status)
  }

  hideModal(e){
    e.preventDefault();
    this.setState({
      isOpen: false
    });
  };

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
    const { dashboard } = this.state

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
                    <p>Come vuoi condividere la Dashboard <b>{this.state.dashboard.title}</b>?</p>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <button className='btn btn-gray-200' onClick={() => this.pubblica()}>
                    Condividi con la tua Organizzazione
                  </button>
                  {dashboard.pvt!=1 &&(isEditor() || isAdmin()) &&
                  <button className='btn btn-gray-200' onClick={() => this.condividi()}>
                    Condividi con tutti
                  </button>
                  }
                </ModalFooter>
              </form>
            </Modal>
            <div className="row">
            {
            (!this.state.dashboard.status) &&
                <div className="col-sm-10">
                  <div className="alert alert-warning" role="alert">
                  <i className="fa fa-warning fa-lg m-t-2"></i> Attenzione la dashboard è in bozza, per pubblicarla cliccare sul tasto <i className="fa fa-paper-plane-o fa-lg m-t-2"></i> "Pubblica" qui in basso
                  </div>
                </div>
              }
              {
                (this.state.dashboard.status==1) &&
                  <div className="col-sm-10">
                    <div className="alert alert-success" role="alert">
                      <i className="fa fa-check-circle fa-lg m-t-2"></i> Dashboard correttamente pubblicata per la tua Organizzazione
                    </div>
                  </div>
                
              }
              {
                (this.state.dashboard.status == 2) &&
                <div className="col-sm-10">
              <div className="alert alert-info" role="alert">
                    <i className="fa fa-check-circle fa-lg m-t-2"></i> Dashboard correttamente pubblicata e condivisa con tutti
                    </div>
                </div>

              }
              <div className="col-sm-2">
              {
                (!this.props.saving) ? <span className="badge badge-success float-right">Salvato</span> : <span className="badge badge-info float-right">Modificato</span>
              }
              </div>
              </div>
          <div className="row">
            <div className="col-sm-7">
            <h3 className="card-title">{this.state.dashboard.title}</h3>
            </div>
            <div className="col-sm-5 hidden-sm-down">
            {this.state.dashboard.pvt==1 &&
               <div className="badge badge-danger fa-pull-right mt-20"><i className="fa fa-lock fa-lg m-t-2"></i> PRIVATA</div>
            }
            </div>
            <div className="col-sm-7">
              <h7 className="card-title">{this.state.dashboard.subtitle}</h7>
            </div>
            <div className="col-sm-5 hidden-sm-down">
              <div className="btn-toolbar float-right" role="toolbar" aria-label="Toolbar with button groups">
                <div className="btn-group mr-1" data-toggle="buttons" aria-label="First group">
                  
                  <button type="button" className="btn btn-link float-right" title="Torna alla lista Dashboard" onClick={this.back.bind(this)}>
                    <i className="fa fa-chevron-circle-left fa-lg m-t-2"></i>
                  </button>
                  
                  {this.state.dashboard.id &&
                  <button type="button" className="btn btn-link float-right" onClick={() => this.onRemove()}  title="Elimina">
                    <i className="fa fa-trash fa-lg m-t-2"></i>
                  </button>
                  }

                  {
                   this.state.dashboard.id &&
                      <button type="button" className="btn btn-link float-right" title="Anteprima" onClick={this.preview.bind(this)}>
                        <i className="fa fa-eye fa-lg m-t-2"></i>
                      </button>
                  }
                  {
                  /* (!this.state.dashboard.status || this.state.dashboard.status == false || this.state.dashboard.status === 1) &&
                    <button type="button" className="btn btn-link float-right" onClick={() => this.openModal()} title="Pubblica">
                    <i className="fa fa-paper-plane fa-lg m-t-2"></i>
                    </button>
                   */}
                    <button type="button" className="btn btn-link float-right" onClick={() => this.save()} title="Salva">
                    <i className="fas fa-save fa-lg m-t-2"></i>
                    </button>
                </div>
              </div>
            </div>
            <div className="col-sm-7">
              <span className="badge badge-info">{this.props.org}</span>
            </div>
          </div>
        </div>
    );
  }
};

/*
      <div className="box text-right">
       <div className="pull-left text-left">
          <input 
            className="form-control"
            value={this.state.dashboard.title}
            placeholder="Inserisci un titolo"
            onChange={this.handleChange}
          />
          
          {
          this.state.dashboard.id &&
          <button type="button" className="btn btn-danger btn-xs mt-20" onClick={() => this.onRemove()}>
              Elimina
          </button>
          }
        </div>

        <Link role="button" to="/dashboard/list">
          <button type="button" className="btn btn-default btn-xs" >
              Torna a Le Mie Dashboards
          </button>
        </Link>

        {
          this.state.dashboard.id &&
          <Link role="button" to={"/dashboard/list/" + this.state.dashboard.id }>
            <button type="button" className="btn btn-primary btn-xs">
                Anteprima
            </button>
          </Link>
        }

        {
          this.state.dashboard.id &&
          <div className="mt-20">
            <span className="mr-20">
              <b className="mr-10">Stato</b>
              {
                (this.state.dashboard.status==0) &&
                <span>In bozza</span>
              }
              {
                (this.state.dashboard.status==1) &&
                <span>Pubblicato</span>
              }
            </span>

            {
              (!this.state.dashboard.status || this.state.dashboard.status==false) &&
              <button type="button" className="btn btn-success btn-xs" onClick={() => this.pubblica()}>
                  Pubblica
              </button>
            }

            {
              /* this.state.dashboard.status && this.state.dashboard.status==true &&
              <button type="button" className="btn btn-danger btn-xs" onClick={() => this.pubblica()}>
                  Spubblica
              </button> 
            }
          </div>
        }
      </div>
*/


function mapStateToProps(state) {
  const { loggedUser } = state.userReducer['obj'] || { }
  return { loggedUser }
}

export default connect(mapStateToProps)(EditBarTop);
