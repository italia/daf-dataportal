import React, { PropTypes } from 'react';
import { Route, Link } from 'react-router-dom';

import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap';

// SERVICES
import DashboardService from '../services/DashboardService';

const dashboardService = new DashboardService();


export default class ListBar extends React.Component {

  constructor(props) {
      super(props);
      this.props = props;

      this.state = {
        isOpen: false,
        validationMSg: 'Campo obbligatorio'
      }
  }

  
  openModal = () => {
    this.setState({
      isOpen: true
    });
  };
  
  hideModal = () => {
    this.setState({
      isOpen: false
    });
  };

  /**
  * Save Title
  */
  handleSave = (e) => {
    e.preventDefault()

    //save data
    let request = {
      title: this.title.value
    };
    
    dashboardService.save(request).then((data)=> {
        this.props.history.push('/dashboard/list/'+ data.message + '/edit');
    });

  }

  validate = (e) => {
    e.preventDefault()
    if(!this.title.value){
      this.setState({
        validationMSg: 'Campo obbligatorio'
      });
    }else{
      this.setState({
        validationMSg: null
      });
    }
  }
  
  /**
  * Save Dashboard
  */
  handleSave = (e) => {
    e.preventDefault()

    if(this.title.value){

      //prepara data
      let layout = { rows: [] };
      let widgets = {};
      let request = {
        title : this.title.value,
        subtitle : this.subtitle.value,
        layout : JSON.stringify(layout),
        widgets : JSON.stringify(widgets),
        status: 0
      };
      
      //save data
      dashboardService.save(request).then((data)=> {
          this.props.history.push('/dashboard/list/'+ data.message + '/edit');
      })
    } else {
      this.setState({
        validationMSg: 'Campo obbligatorio'
      });
    }
  }


  render = function(){

    return (
      <div>
        
        <Modal isOpen={this.state.isOpen} onRequestHide={this.hideModal}>
          <form onSubmit={this.save}>
            <ModalHeader>
              <ModalClose onClick={this.hideModal}/>
              <ModalTitle>Crea una Dashboard</ModalTitle>
            </ModalHeader>
            <ModalBody>
            <div className="form-group">
              <input type="text" className="form-control" ref={(title) => this.title = title} onChange={this.validate.bind(this)} id="title" placeholder="Titolo"/>
              {this.state.validationMSg && <span>{this.state.validationMSg}</span>}
            </div>
            <div className="form-group">
              <input type="text" className="form-control" ref={(subtitle) => this.subtitle = subtitle} id="subtitle" placeholder="Sottotitolo"/>
            </div>
            </ModalBody>
            <ModalFooter>
              <button className='btn btn-default' onClick={this.hideModal}>
                Close
              </button>
              <button type="button" className="btn btn-primary px-2" onClick={this.handleSave.bind(this)}>
                <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
                  Crea
              </button>
            </ModalFooter>
          </form>
        </Modal>


        <div className="container" ref="auto">
          <div className="row">
            <div className="col-10">
              <div className="input-prepend input-group mb-20">
                  <i className="fa fa-search input-group-addon transparent-frame"></i>
                  <input id="prependedInput" className="form-control transparent-frame" size="25" type="text" onChange={this.props.onChange} placeholder="Filtra la lista ..."/>
              </div>
            </div>
            <div className="col-md-2">
              <button type="button" className="btn btn-link float-right" title="Aggiungi Dashboard" onClick={this.openModal}>
                <i className="fa fa-plus-circle fa-lg m-t-2"></i>
              </button>
            </div>
          </div> 
        </div>


      </div>

    );
  }
};

