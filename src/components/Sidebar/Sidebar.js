import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap'
import { toastr } from 'react-redux-toastr'
import {
  loadDatasets,
  search
} from '../../actions'
import { serviceurl } from '../../config/serviceurl.js'
import { isEditor, isAdmin, isSysAdmin } from '../../utility'

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
    this.props.history.push('/private/dataset');
    
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

  openModal(name, url, description){
    if(name!=='Jupyter'){
      const toastrConfirmOptions = {
        okText: 'Vai',
        cancelText: 'Annulla',
        onOk: () => this.hideModalAndRedirect(url),
        onCancel: () => console.log('CANCEL: clicked')
      };
      toastr.confirm('Stai per essere reindirizzato a ' + name + '. ' + description, toastrConfirmOptions);
    }else{
      const toastrConfirmOptions = {
        okText: 'Vai',
        cancelText: 'Annulla',
        onOk: () => this.hideModalAndRedirect('https://developersitalia.slack.com/messages/C760XQX9Q/'),
        onCancel: () => console.log('CANCEL: clicked')
      };
      toastr.confirm('Al momento Jupyter può essere usato solo da pubbliche amministrazione e utenti certificati. Se vuoi provarlo contattaci su slack developers.italia.it canale #daf', toastrConfirmOptions);
    }
  };
  
  hideModalAndRedirect(url){
    this.setState({
      isOpen: false
    });
    window.open(url);
  };

  hideModal = (e) => {
    e.preventDefault();
    this.setState({
      isOpen: false
    });
  };

  handleLoadDatasetClick(event) {
    event.preventDefault();
    const { dispatch } = this.props;
    let filter = {
      'text': '',
      'index': ['catalog_test'],
      'org': [],
      'theme':[],
      'date': "",
      'status': [],
      'order':"desc"
  }
    this.props.history.push('/private/dataset')
    dispatch(search('', filter, false))
  }

  createDash(){
    this.props.openModalDash();
  }

  createStory(){
    this.props.openModalStory();
  }

  createWidget(){
    this.props.openModalWidget();
  }

  render() {
    const { loggedUser } = this.props
    var crea = 'nav-link-light'
    var home = 'nav-link-light'
    let open = this.state.dropdownOpen ? "show" : "" 
    if(window.location.hash==='#/crea')
      crea = 'nav-link-primary'
    if(window.location.hash==='#/home')
      home = 'nav-link-primary'
    return (
      <div>
        <div className="sidebar ">
          <nav className="sidebar-nav b-t-1 b-r-1">
            <ul className="nav">
              <li className="nav-item b-r-1" onClick={(e) => { 
                e.preventDefault();
                document.body.classList.toggle('sidebar-mobile-show');}}>
                <NavLink to={'/private/home'} className={"nav-link "+home} activeClassName="nav-link-primary"><i className="fa fa-home fa-lg text-secondary"></i> Home</NavLink>
              </li>
              <li className="nav-item" onClick={(e) => {
                e.preventDefault();
                document.body.classList.toggle('sidebar-mobile-show');
              }}>
                <NavLink to={'/private/dataset'} className="nav-link" activeClassName="nav-link-primary" onClick={this.handleLoadDatasetClick.bind(this)}><i className="fa fa-table fa-lg text-secondary"></i> Dataset</NavLink>
              </li>
              <li className="nav-item" onClick={(e) => {
                e.preventDefault();
                document.body.classList.toggle('sidebar-mobile-show');
              }}>
                <NavLink to={'/private/widget'} className="nav-link" activeClassName="nav-link-primary"><i className="fa fa-chart-bar fa-lg text-secondary"></i> Widget</NavLink>
              </li>
              <li className="nav-item" onClick={(e) => {
                e.preventDefault();
                document.body.classList.toggle('sidebar-mobile-show');
              }}>
                <NavLink to={'/private/dashboard/list'} className="nav-link" activeClassName="nav-link-primary"><i className="fa fa-columns fa-lg text-secondary"></i> Dashboard</NavLink>
              </li>
              <li className="nav-item" onClick={(e) => {
                e.preventDefault();
                document.body.classList.toggle('sidebar-mobile-show');
              }}>
                <NavLink to={'/private/userstory/list'} className="nav-link" activeClassName="nav-link-primary"><i className="fa fa-font fa-lg text-secondary"></i> Storie</NavLink>
              </li>
              <li className="nav-title text-secondary">
                TOOLKIT
              </li>
{/*               <li className="nav-item " onClick={(e) => {
                e.preventDefault();
                document.body.classList.toggle('sidebar-mobile-show');
              }}>
                <NavLink to={'/crea'} className={"nav-link "+crea} activeClassName="nav-link-primary"><i className="fa fa-plus fa-lg text-secondary"></i> Crea</NavLink>
              </li> */}
              <li className="nav-item nav-dropdown b-r-1">
                <a className="nav-link nav-link-light nav-dropdown-toggle" onClick={this.handleClick.bind(this)}><i className="fa fa-plus fa-lg text-secondary"></i> Crea</a>
                <ul className="nav-dropdown-items bg-light">
                  {(isEditor(loggedUser) || isAdmin(loggedUser)) && <li className="nav-item" onClick={(e) => {
                    e.preventDefault();
                    document.body.classList.toggle('sidebar-mobile-show');
                  }}>
                    <Link to={'/private/ingestionwizzard'} className="nav-link"><i className="fas fa-table fa-lg text-secondary"/>  Nuovo Dataset</Link>
                  </li>}
                  <li className="nav-item" onClick={(e) => {
                    e.preventDefault();
                    document.body.classList.toggle('sidebar-mobile-show');
                  }}>
                    <a href className="nav-link " onClick={this.createWidget.bind(this)}><i className="fas fa-columns fa-lg text-secondary" />  Nuovo Widget</a>
                  </li>
                  <li className="nav-item" onClick={(e) => {
                    e.preventDefault();
                    document.body.classList.toggle('sidebar-mobile-show');
                  }}>
                    <a href className="nav-link " onClick={this.createDash.bind(this)}><i className="fas fa-columns fa-lg text-secondary" />  Nuova Dashboard</a>
                  </li>
                  <li className="nav-item" onClick={(e) => {
                    e.preventDefault();
                    document.body.classList.toggle('sidebar-mobile-show');
                  }}>
                    <a href className="nav-link" onClick={this.createStory.bind(this)}><i className="fas fa-font fa-lg text-secondary" />  Nuova Storia</a>
                  </li>
                </ul>
              </li>
              <li className="nav-item nav-dropdown b-r-1">
                <a className="nav-link nav-link-light nav-dropdown-toggle " onClick={this.handleClick.bind(this)}><i className="fa fa-wrench fa-lg text-secondary"></i> Strumenti</a>
                <ul className="nav-dropdown-items bg-light">
                  <li className="nav-item" onClick={(e) => {
                    e.preventDefault();
                    document.body.classList.toggle('sidebar-mobile-show');
                  }}>
                    <a href onClick={() => this.openModal('Metabase', serviceurl.urlMetabase)} className="nav-link"><i className="fa fa-chart-pie fa-lg text-secondary"/>  Metabase</a>
                  </li>
                  <li className="nav-item" onClick={(e) => {
                    e.preventDefault();
                    document.body.classList.toggle('sidebar-mobile-show');
                  }}>
                    <a href className="nav-link " onClick={() => this.openModal('Superset', serviceurl.urlSuperset, 'Potrai creare i tuoi widget partendo dai dataset privati condivisi con le tue organizzazioni.')}><i className="fa fa-database fa-lg text-secondary" />  Superset <span className="badge badge-light">Privato</span></a>
                  </li>
                  <li className="nav-item" onClick={(e) => {
                    e.preventDefault();
                    document.body.classList.toggle('sidebar-mobile-show');
                  }}>
                    <a href className="nav-link " onClick={() => this.openModal('Superset', serviceurl.urlSupersetOpen, 'Potrai creare i tuoi widget partendo dagli opendata presenti nel DAF.')}><i className="fa fa-database fa-lg text-secondary" />  Superset <span className="badge badge-light">Open</span></a>
                  </li>
                  <li className="nav-item" onClick={(e) => {
                    e.preventDefault();
                    document.body.classList.toggle('sidebar-mobile-show');
                  }}>
                    <a href className="nav-link" onClick={() => this.openModal('Jupyter', serviceurl.urlJupiter)}><i className="fa fa-sticky-note fa-lg text-secondary" />  Jupyter</a>
                  </li>
                </ul>
              </li>

              <li className="nav-item nav-dropdown b-r-1">
                <a className="nav-link nav-link-light nav-dropdown-toggle" onClick={this.handleClick.bind(this)}><i className="fa fa-sitemap fa-lg text-secondary"></i> Semantica</a>
                <ul className="nav-dropdown-items bg-light">
                  <li className="nav-item" onClick={(e) => {
                    e.preventDefault();
                    document.body.classList.toggle('sidebar-mobile-show');
                  }}>
                    <NavLink to={'/private/ontologies'} className="nav-link" activeClassName="nav-link-primary"><i className="fas fa-book fa-lg text-secondary" /> Ontologie</NavLink>
                  </li>
                  <li className="nav-item" onClick={(e) => {
                    e.preventDefault();
                    document.body.classList.toggle('sidebar-mobile-show');
                  }}>
                    <NavLink to={'/private/vocabularies'} className="nav-link" activeClassName="nav-link-primary"><i className="fas fa-book fa-lg text-secondary" /> Vocabolari</NavLink>
                  </li>
                  <li className="nav-item" onClick={(e) => {
                    e.preventDefault();
                    document.body.classList.toggle('sidebar-mobile-show');
                  }}>
                    <NavLink to={'/private/validator'} className="nav-link" activeClassName="nav-link-primary"><i className="fas fa-clipboard-check fa-lg text-secondary" /> Validatore</NavLink>
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
                <NavLink to={'#'} onClick={() => window.open('http://daf-dataportal.readthedocs.io/it/latest/')} className="nav-link" activeClassName="nav-link-primary"><i className="fa fa-info text-secondary"></i> Documentazione</NavLink>
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
                <NavLink to={'/userstory/list'} className="nav-link" activeClassName="active"><i className="icon-note"></i> Crea Storia</NavLink>
              </li> */}

              {(isAdmin(loggedUser) || isSysAdmin(loggedUser)) && <div>
              <li className="nav-title text-secondary">
                Amministrazione
              </li>
              {(isAdmin(loggedUser) || isSysAdmin(loggedUser)) &&
              <li className="nav-item" onClick={(e) => {
                e.preventDefault();
                document.body.classList.toggle('sidebar-mobile-show');
              }}>
                  <NavLink to={'/private/users'} className="nav-link nav-link-light" activeClassName="nav-link-light"><i className="fas fa-user-cog text-secondary"></i> Gestione Utenti</NavLink>
              </li>}
              <li className="nav-item" onClick={(e) => {
                e.preventDefault();
                document.body.classList.toggle('sidebar-mobile-show');
              }}>
                  <NavLink to={'/private/organizations'} className="nav-link nav-link-light" activeClassName="nav-link-light"><i className="fas fa-users text-secondary"></i> Organizzazioni</NavLink>
              </li>
              <li className="nav-item" onClick={(e) => {
                e.preventDefault();
                document.body.classList.toggle('sidebar-mobile-show');
              }}>
                  <NavLink to={'/private/settings'} className="nav-link nav-link-light" activeClassName="nav-link-light"><i className="fas fa-image text-secondary"></i> Interfaccia</NavLink>
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

function mapStateToProps(state) {
  const { loggedUser } = state.userReducer['obj'] || { }
  return { loggedUser }
}

export default connect(mapStateToProps)(Sidebar)
