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
import UserStoryService from '../services/UserStoryService';

const userStoryService = new UserStoryService();


class ViewBar extends React.Component {

  constructor(props) {
      super(props);
      this.props = props;

      this.state = {
        isOpen: false
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
    
    userStoryService.save(request).then((data)=> {
        this.props.history.push('/user_story/list/'+ data.message + '/edit');
    });

  }
  
  render = function(){

    return (
      <div>
        
        <Modal isOpen={this.state.isOpen} onRequestHide={this.hideModal}>
          <form onSubmit={this.save}>
            <ModalHeader>
              <ModalClose onClick={this.hideModal}/>
              <ModalTitle>Crea una Storia</ModalTitle>
            </ModalHeader>
            <ModalBody>
            <div className="form-group">
              <input type="text" className="form-control" ref={(title) => this.title = title} id="title" placeholder="Titolo"/>
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

/* 
ViewBar.propTypes = {
  onEdit: PropTypes.func,
  setLayout: PropTypes.func,
  layout: PropTypes.object,
  widgets: PropTypes.object
}; */

export default ViewBar;
