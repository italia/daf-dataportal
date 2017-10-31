import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap';
import { serviceurl } from '../../config/serviceurl.js'

class Sidebar extends Component {
  constructor(props) {
      super(props);
      this.props = props;
      this.state = {
        isOpen: false,
        url: null,
        name: null
      }
  }

  handleClick(e) {
    e.preventDefault();
    e.target.parentElement.classList.toggle('open');
  }

  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';
  }

  openModal(name, url){
    this.setState({
      isOpen: true,
      url: url,
      name: name
    });
  };
  
  hideModalAndRedirect = (e) => {
    e.preventDefault();
    this.setState({
      isOpen: false
    });
    window.open(this.state.url);
  };

  hideModal = (e) => {
    e.preventDefault();
    this.setState({
      isOpen: false
    });
  };

  render() {
    return (
      <div>
        <Modal isOpen={this.state.isOpen} onRequestHide={this.hideModal}>
        <form>
          <ModalHeader>
            <ModalClose onClick={this.hideModal}/>
            <ModalTitle>Reindirizzamento</ModalTitle>
          </ModalHeader>
          <ModalBody>
          <div className="form-group">
            <p>Stai per essere renidirizzato nell'applicazione {this.state.name}.</p>
          </div>
          </ModalBody>
          <ModalFooter>
            <button className='btn btn-default' onClick={this.hideModal}>
              Chiudi
            </button>
            <button className='btn btn-default' onClick={this.hideModalAndRedirect}>
              Vai a {this.state.name}
            </button>
          </ModalFooter>
        </form>
      </Modal>
        <div className="sidebar">
          <nav className="sidebar-nav">
            <ul className="nav">
              <li className="nav-item">
                <NavLink to={'/home'} className="nav-link" activeClassName="active"><i className="icon-home"></i> Home</NavLink>
              </li>
              <li className="nav-title">
                Azioni
              </li>
              <li className={this.activeRoute("/components")}>
                <a className="nav-link nav-dropdown-toggle" href="#" onClick={this.handleClick.bind(this)}><i className="icon-puzzle"></i> Dataset</a>
                <ul className="nav-dropdown-items">
                  <li className="nav-item">
                    <NavLink to={'/ingestionwizzard'} className="nav-link" activeClassName="active">  Carica <span className="badge badge-danger">beta</span></NavLink>
                  </li>
                </ul>
              </li>

              <li className="nav-title">
                Standards
              </li>
              <li className={this.activeRoute("/icons")}>
                <a className="nav-link nav-dropdown-toggle" href="#" onClick={this.handleClick.bind(this)}><i className="icon-star"></i> Standards</a>
                <ul className="nav-dropdown-items">
                  <li className="nav-item">
                    <NavLink to={'/ontologies/list'} className="nav-link" activeClassName="active"> Ontologie</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to={'/vocabulary/list'} className="nav-link" activeClassName="active"> Vocabolari</NavLink>
                  </li>
                </ul>
              </li>
          
              <li className="nav-title">
                Strumenti
              </li>
              <li className="nav-item">
                <a onClick={() => this.openModal('Metabase', serviceurl.urlMetabase)} className="nav-link"  /* activeClassName="active" */><i className="icon-pie-chart"></i> Grafici</a>
              </li>
              <li className="nav-item">
                <a onClick={() => this.openModal('Superset', serviceurl.urlSuperset)} className="nav-link"  /* activeClassName="active" */><i className="icon-pie-chart"></i> Business Intelligence</a>
              </li>
              <li className="nav-item">
                <a onClick={() => this.openModal('Jupiter', serviceurl.urlJupiter)} className="nav-link" /* activeClassName="active" */><i className="icon-pie-chart"></i> Data Science</a>
              </li>

              <li className="nav-title">
                Dashboards
              </li>
              <li className="nav-item">
                <NavLink to={'/dashboard/list'} className="nav-link" activeClassName="active"><i className="icon-star"></i> Crea Dashboard</NavLink>
              </li>
                  
              <li className="nav-item">
                <NavLink to={'/user_story/list'} className="nav-link" activeClassName="active"><i className="icon-star"></i> Crea Storia</NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    )
  }
}

export default Sidebar;
