import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap'
import {
  loadDatasets,
  unloadDatasets,
  datasetDetail,
  logout
} from '../../actions'
import PropTypes from 'prop-types'
import AutocompleteDataset from '../Autocomplete/AutocompleteDataset.js'
import { serviceurl } from '../../config/serviceurl.js'
import { isEditor, isAdmin } from '../../utility'

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

  handleLoadMyDatasetClick(event) {
    /* console.log('Serach Dataset for: ' + this.props.loggedUser.uid); */
    event.preventDefault();
    const { dispatch, selectDataset, loggedUser } = this.props;
    dispatch(loadDatasets('', 0, loggedUser.givenname));
    this.props.history.push('/dataset');
    
  }

  handleClick(e) {
    e.preventDefault();
    e.target.parentElement.classList.toggle('open');
  }

  handleMinimizer(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-minimized');
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

  handleLoadDatasetClick(event) {
    console.log('Search Dataset for: ' + this.refs.auto.state.value);
    event.preventDefault();
    const { dispatch, selectDataset } = this.props;
    dispatch(loadDatasets(this.refs.auto.state.value, 0, '', '', '', '', 'metadata_modified%20desc'));
    this.props.history.push('/dataset');
    document.body.classList.toggle('sidebar-mobile-show');
  }

  render() {
    const { loggedUser } = this.props
    let role = loggedUser.role 
    return (
      <div>
        <Modal isOpen={this.state.isOpen} onRequestHide={this.hideModal}>
        <form>
          <ModalHeader>
            <ModalTitle>Reindirizzamento</ModalTitle>
            <ModalClose onClick={this.hideModal}/>
          </ModalHeader>
          <ModalBody>
          <div className="form-group">
            {this.state.name==='Metabase' ? 
            <h3 className="text-center"><i className="fa fa-exclamation-triangle fa-lg"/> Lavori in corso! {this.state.name} sarà presto disponibile</h3>
            :
            <p>Stai per essere renidirizzato nell'applicazione {this.state.name}.</p>}
          </div>
          </ModalBody>
          <ModalFooter>
            <button className='btn btn-gray-200' onClick={this.hideModal}>
              Chiudi
            </button>
              {this.state.name !== 'Metabase' && <button className='btn btn-gray-200' onClick={this.hideModalAndRedirect}>Scegli</button>}
          </ModalFooter>
        </form>
      </Modal>
        <div className="sidebar">
          <nav className="sidebar-nav">
            <ul className="nav">
              <li className="nav-item" onClick={(e) => { 
                e.preventDefault();
                document.body.classList.toggle('sidebar-mobile-show');}}>
                <NavLink to={'/home'} className="nav-link nav-link-light" activeClassName="nav-link-light"><i className="fa fa-home fa-lg text-secondary"></i> Home</NavLink>
              </li>
              <li className="nav-item" onClick={(e) => {
                e.preventDefault();
                document.body.classList.toggle('sidebar-mobile-show');
              }}>
                <NavLink to={'/dataset'} className="nav-link" activeClassName="nav-link-primary"><i className="fa fa-table fa-lg text-secondary"></i> Dataset</NavLink>
              </li>
              <li className="nav-item" onClick={(e) => {
                e.preventDefault();
                document.body.classList.toggle('sidebar-mobile-show');
              }}>
                <NavLink to={'/widget'} className="nav-link" activeClassName="nav-link-primary"><i className="fa fa-bar-chart fa-lg text-secondary"></i> Widget</NavLink>
              </li>
              <li className="nav-item" onClick={(e) => {
                e.preventDefault();
                document.body.classList.toggle('sidebar-mobile-show');
              }}>
                <NavLink to={'/dashboard/list'} className="nav-link" activeClassName="nav-link-primary"><i className="fa fa-columns fa-lg text-secondary"></i> Dashboard</NavLink>
              </li>
              <li className="nav-item" onClick={(e) => {
                e.preventDefault();
                document.body.classList.toggle('sidebar-mobile-show');
              }}>
                <NavLink to={'/user_story/list'} className="nav-link" activeClassName="nav-link-primary"><i className="fa fa-font fa-lg text-secondary"></i> Storie</NavLink>
              </li>
              <li className="nav-title text-secondary">
                TOOLKIT
              </li>
              <li className="nav-item " onClick={(e) => {
                e.preventDefault();
                document.body.classList.toggle('sidebar-mobile-show');
              }}>
                <NavLink to={'/crea'} className="nav-link nav-link-light " activeClassName="nav-link-primary"><i className="fa fa-plus fa-lg text-secondary"></i> Crea</NavLink>
              </li>
              <li className="nav-item nav-dropdown">
                <a className="nav-link nav-link-light nav-dropdown-toggle " onClick={this.handleClick.bind(this)}><i className="fa fa-wrench fa-lg text-secondary"></i> Strumenti</a>
                <ul className="nav-dropdown-items bg-light">
                  <li className="nav-item" onClick={(e) => {
                    e.preventDefault();
                    document.body.classList.toggle('sidebar-mobile-show');
                  }}>
                    <a href onClick={() => this.openModal('Metabase', serviceurl.urlMetabase)} className="nav-link"><i className="fa fa-pie-chart fa-lg text-secondary"/>  Metabase</a>
                  </li>
                  <li className="nav-item" onClick={(e) => {
                    e.preventDefault();
                    document.body.classList.toggle('sidebar-mobile-show');
                  }}>
                    <a href className="nav-link " onClick={() => this.openModal('Superset', serviceurl.urlSuperset)}><i className="fa fa-database fa-lg text-secondary" />  Superset</a>
                  </li>
                  <li className="nav-item" onClick={(e) => {
                    e.preventDefault();
                    document.body.classList.toggle('sidebar-mobile-show');
                  }}>
                    <a href className="nav-link" onClick={() => this.openModal('Jupiter', serviceurl.urlJupiter)}><i className="fa fa-sticky-note fa-lg text-secondary" />  Jupyter</a>
                  </li>
                </ul>
              </li>

              <li className="nav-title text-secondary">
                INFO
              </li>
              <li className="nav-item" onClick={(e) => {
                e.preventDefault();
                document.body.classList.toggle('sidebar-mobile-show');
              }}>
                <NavLink to={'/vocabulary/list'} className="nav-link" activeClassName="nav-link-primary"><i className="fa fa-book text-secondary"></i> Dizionari e standard</NavLink>
              </li>
              <li className="nav-item" onClick={(e) => {
                e.preventDefault();
                document.body.classList.toggle('sidebar-mobile-show');
              }}>
                <NavLink to={'#'} onClick={() => window.open('http://daf-docs.readthedocs.io')} className="nav-link" activeClassName="nav-link-primary"><i className="fa fa-info text-secondary"></i> Documentazione</NavLink>
              </li>
              {/* <li className={this.activeRoute("/icons")}>
                <a className="nav-link nav-dropdown-toggle" href="#" onClick={this.handleClick.bind(this)}><i className="icon-star"></i> Standards</a>
                <ul className="nav-dropdown-items">
                  <li className="nav-item" onClick={(e) => {
                    e.preventDefault();
                    document.body.classList.toggle('sidebar-mobile-show');
                  }}>
                    <NavLink to={'/ontologies/list'} className="nav-link" activeClassName="active"> Ontologie</NavLink>
                  </li>
                  <li className="nav-item" onClick={(e) => {
                    e.preventDefault();
                    document.body.classList.toggle('sidebar-mobile-show');
                  }}>
                    <NavLink to={'/vocabulary/list'} className="nav-link" activeClassName="active"> Vocabolari</NavLink>
                  </li>
                </ul>
              </li>
          
              <li className="nav-title">
                Strumenti
              </li>
              <li className="nav-item">
                <a onClick={() => this.openModal('Metabase', serviceurl.urlMetabase)} className="nav-link"><i className="icon-pie-chart"></i> Grafici</a>
              </li>
              <li className="nav-item">
                <a onClick={() => this.openModal('Superset', serviceurl.urlSuperset)} className="nav-link"><i className="icon-pie-chart"></i> Business Intelligence</a>
              </li>
              <li className="nav-item">
                <a onClick={() => this.openModal('Jupyter', serviceurl.urlJupiter)} className="nav-link"><i className="icon-pie-chart"></i> Data Science</a>
              </li>

              <li className="nav-title">
                Dashboards
              </li>
              <li className="nav-item" onClick={(e) => {
                e.preventDefault();
                document.body.classList.toggle('sidebar-mobile-show');
              }}>
                <NavLink to={'/dashboard/list'} className="nav-link" activeClassName="active"><i className="icon-graph"></i> Crea Dashboard</NavLink>
              </li>
                  
              <li className="nav-item" onClick={(e) => {
                e.preventDefault();
                document.body.classList.toggle('sidebar-mobile-show');
              }}>
                <NavLink to={'/user_story/list'} className="nav-link" activeClassName="active"><i className="icon-note"></i> Crea Storia</NavLink>
              </li> */}
              {role && role != 'daf_viewers' && <div>
              <li className="nav-title text-secondary">
                Amministrazione
              </li>
              {role && role === 'daf_admins' &&
              <li className="nav-item" onClick={(e) => {
                e.preventDefault();
                document.body.classList.toggle('sidebar-mobile-show');
              }}>
                  <NavLink to={'/users'} className="nav-link nav-link-light" activeClassName="nav-link-light"><i className="fa fa-user-plus text-secondary"></i> Gestione Utenti</NavLink>
              </li>}
              <li className="nav-item" onClick={(e) => {
                e.preventDefault();
                document.body.classList.toggle('sidebar-mobile-show');
              }}>
                  <NavLink to={'/organizations'} className="nav-link nav-link-light" activeClassName="nav-link-light"><i className="fa fa-group text-secondary"></i> Organizzazioni</NavLink>
              </li>
              <li className="nav-item" onClick={(e) => {
                e.preventDefault();
                document.body.classList.toggle('sidebar-mobile-show');
              }}>
                  <NavLink to={'/settings'} className="nav-link nav-link-light" activeClassName="nav-link-light"><i className="fa fa-picture-o text-secondary"></i> Interfaccia</NavLink>
              </li>
              </div>}
            </ul>
          </nav>
          <button className="sidebar-minimizer brand-minimizer bg-secondary" type="button" onClick={this.handleMinimizer.bind(this)}/>
        </div>
      </div>
    )
  }
}

Sidebar.propTypes = {
  loggedUser: PropTypes.object,
  value: PropTypes.string
}

function mapStateToProps(state) {
  const { loggedUser } = state.userReducer['obj'] || { }
  return { loggedUser }
}

export default connect(mapStateToProps)(Sidebar)
