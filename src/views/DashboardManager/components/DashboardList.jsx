import React, { Component } from 'react';
import Components from 'react';
import { Route, Link } from 'react-router-dom';
import ListBar from './bar/ListBar';
import Dimensions from 'react-dimensions'
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap';

// App components
import Header from './Header';
import Container from './Container';

// Services
import DashboardService from './services/DashboardService';

// Our styles
import '../styles/custom.css';


const dashboardService = new DashboardService();

class DashboardList extends Component {
  constructor(props) {
    super(props);
    this.state={isOpen: false};
    this.load();
  }
  
  /**
   * Method called for load dashboard list
   */
  load = (config) => {
    this.state = {
      dashboards: []
    };
    
    let response = dashboardService.list();
    response.then((list) => {
      this.setState({
        dashboards: list,
        dashboard: {
          status: 0
        }
      });
    });
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
      let layout = { rows: [] };
      let widgets = {};
      let request = this.state.dashboard;
      request.title = this.title.value;
      request.subtitle = this.subtitle.value;
      const response = dashboardService.save(request);
      request.layout = JSON.stringify(layout);
      request.widgets = JSON.stringify(widgets);
      response.then((data)=> {
        if (!this.state.dashboard.id ) {
          this.state.dashboard.id = data.message;
          this.setState({
              // Widgets that are available in the dashboard
              widgets: {},
              // Layout of the dashboard
              layout: {
                rows: []
              },
              editMode: true,
              isModalOpen: false,
              dashboard: this.state.dashboard
          })
          
          this.state.saving = false;
          //this.save();
          this.props.history.push('/dashboard/list/'+ this.state.dashboard.id + '/edit');
        }
      })
    }

  /**
   * Render Function
   */
  render() {
    
    const width = 500;
    const searchStyle = {
      width: '50%',
      border: '0'
    }

    const modalStyle = {
      display: 'none'
    }

    var elem = [];
    for(var i = 0; i < this.state.dashboards.length; i+=3) {
      var dash = this.state.dashboards[i];
      var dash2 = this.state.dashboards[i + 1];
      var dash3 = this.state.dashboards[i + 2];
      elem.push(
        <div className="row" key={i}>
        <div className="col-sm-4">
          <div className="card text-center">
              <div className="card-body">
              <Link to={"/dashboard/list/" + dash.id}>
                <h4 className="card-title">{dash.title}</h4>
              </Link>
              <h6 className="card-subtitle mb-2 text-muted">Sottotitolo</h6>
              <img className="card-img-bottom" src="../../../img/logo.png" alt="Card image cap"/>
              {
              dash.status==true &&
              <div className="badge badge-success pull-right mt-20">PUBBLICATO</div>
              }
              {
                !dash.status &&
                <div className="badge badge-default pull-right mt-20">IN BOZZA</div>
              }
            </div>
          </div>
        </div>
        {dash2 &&
        <div className="col-sm-4">
          <div className="card text-center">
            <div className="card-body">
              <Link to={"/dashboard/list/" + dash2.id}><h4 className="card-title">{dash2.title}</h4></Link>
              <h6 className="card-subtitle mb-2 text-muted">Sottotitolo</h6>
              <img className="card-img-bottom" src="../../img/logo.png" alt="Card image cap"/>
              {
              dash2.status==true &&
              <div className="badge badge-success pull-right mt-20">PUBBLICATO</div>
              }
              {
                !dash2.status &&
                <div className="badge badge-default pull-right mt-20">IN BOZZA</div>
              }
            </div>
          </div>
        </div>
        }
        {dash3 &&
        <div className="col-sm-4">
          <div className="card text-center">
            <div className="card-body">
              <Link to={"/dashboard/list/" + dash3.id}><h4 className="card-title">{dash3.title}</h4></Link>
              <h6 className="card-subtitle mb-2 text-muted">Sottotitolo</h6>
              <img className="card-img-bottom" src="../../img/logo.png" alt="Card image cap"/>
              {
              dash3.status==true &&
              <div className="badge badge-success pull-right mt-20">PUBBLICATO</div>
              }
              {
                !dash3.status &&
                <div className="badge badge-default pull-right mt-20">IN BOZZA</div>
              }
            </div>
          </div>
        </div>
        }
      </div>
      );
    }

    return (
    <Container>
      <Header title="Le Mie Dashboards" />
      <Modal isOpen={this.state.isOpen} onRequestHide={this.hideModal}>
        <form onSubmit={this.save}>
          <ModalHeader>
            <ModalClose onClick={this.hideModal}/>
            <ModalTitle>Crea una Dashboard</ModalTitle>
          </ModalHeader>
          <ModalBody>
          <div className="form-group">
            <input type="text" className="form-control" ref={(title) => this.title = title} id="title" placeholder="Titolo"/>
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
        <div className="input-prepend input-group">
            <i className="fa fa-search"></i>
            <input id="prependedInput" style={searchStyle} className="form-control" size="25" type="text" placeholder="Filtra la lista ..."/>
        </div>
      </div>
        <div className="col-md-2">
          <button type="button" className="btn btn-link float-right" title="Aggiungi Dashboard" onClick={this.openModal}>
            <i className="fa fa-plus-circle fa-lg m-t-2"></i>
          </button>
        </div>
      </div> 
      {elem}
      </div>
     
    </Container>
    );
  }

}

export default DashboardList;
