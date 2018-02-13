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
            <p>Stai per essere renidirizzato nell'applicazione {this.state.name}.</p>
          </div>
          </ModalBody>
          <ModalFooter>
            <button className='btn btn-default' onClick={this.hideModal}>
              Chiudi
            </button>
              <button className='btn btn-default' onClick={this.hideModalAndRedirect}>Scegli</button>
          </ModalFooter>
        </form>
      </Modal>
        <div className="sidebar">
          <div className="col-sm-12 d-lg-none" style={{marginBottom: '5px', marginTop: '5px'}}>
            <div className="input-group">
              <span className="input-group-btn">
                <button className="btn btn-default" type="submit" value="submit" onClick={this.handleLoadDatasetClick.bind(this)}>
                  <i className="fa fa-search"></i>
                </button>
              </span>
              <AutocompleteDataset ref="auto" className="form-control"/>
            </div>
          </div>
          <nav className="sidebar-nav">
            <ul className="nav">
              <li className="nav-item" onClick={(e) => { 
                e.preventDefault();
                document.body.classList.toggle('sidebar-mobile-show');}}>
                <NavLink to={'/home'} className="nav-link" activeClassName="active"><i className="icon-home"></i> Home</NavLink>
              </li>
              <li className="nav-title">
                Azioni
              </li>
              <li className={this.activeRoute("/components")}>
                <a className="nav-link nav-dropdown-toggle" href="#" onClick={this.handleClick.bind(this)}><i className="icon-puzzle"></i> Dataset</a>
                <ul className="nav-dropdown-items">
                  <li className="nav-item" onClick={(e) => {
                    e.preventDefault();
                    document.body.classList.toggle('sidebar-mobile-show');
                  }}>
                  {(true /* isEditor() || isAdmin() */) &&
                    <NavLink to={'/ingestionwizzard'} className="nav-link" activeClassName="active">  Carica</NavLink>
                  }
                  </li>
                  <li className="nav-item" onClick={(e) => {
                    e.preventDefault();
                    document.body.classList.toggle('sidebar-mobile-show');
                  }}>
                    <NavLink onClick={this.handleLoadMyDatasetClick.bind(this)} to={'/dataset'} className="nav-link" activeClassName="active">  I Miei Dataset</NavLink>
                  </li>
                </ul>
              </li>

              <li className="nav-title">
                Standards
              </li>
              <li className={this.activeRoute("/icons")}>
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
                <a onClick={() => this.openModal('Metabase', serviceurl.urlMetabase)} className="nav-link"  /* activeClassName="active" */><i className="icon-pie-chart"></i> Grafici</a>
              </li>
              <li className="nav-item">
                <a onClick={() => this.openModal('Superset', serviceurl.urlSuperset)} className="nav-link"  /* activeClassName="active" */><i className="icon-pie-chart"></i> Business Intelligence</a>
              </li>
              <li className="nav-item">
                <a onClick={() => this.openModal('Jupyter', serviceurl.urlJupiter)} className="nav-link" /* activeClassName="active" */><i className="icon-pie-chart"></i> Data Science</a>
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
              </li>
              {role && role != 'daf_viewers' && <div>
              <li className="nav-title">
                Impostazioni
              </li>
              {role && role === 'daf_admins' &&
              <li className="nav-item" onClick={(e) => {
                e.preventDefault();
                document.body.classList.toggle('sidebar-mobile-show');
              }}>
                <NavLink to={'/users'} className="nav-link" activeClassName="active"><i className="fa fa-user-plus"></i> Gestione Utenti</NavLink>
              </li>}
              <li className="nav-item" onClick={(e) => {
                e.preventDefault();
                document.body.classList.toggle('sidebar-mobile-show');
              }}>
                <NavLink to={'/organizations'} className="nav-link" activeClassName="active"><i className="fa fa-group"></i> Organizzazioni</NavLink>
              </li>
              <li className="nav-item" onClick={(e) => {
                e.preventDefault();
                document.body.classList.toggle('sidebar-mobile-show');
              }}>
                <NavLink to={'/settings'} className="nav-link" activeClassName="active"><i className="fa fa-picture-o"></i> Interfaccia</NavLink>
              </li>
              </div>}
            </ul>
          </nav>
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
