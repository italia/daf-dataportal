import React, { Component } from 'react';
import { Dropdown, DropdownMenu, DropdownItem } from 'reactstrap';
import PropTypes from 'prop-types'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import {
  loadDatasets,
  unloadDatasets,
  datasetDetail,
  logout
} from '../../actions'
import { createBrowserHistory } from 'history';
import AutocompleteDataset from '../Autocomplete/AutocompleteDataset.js'

const history = createBrowserHistory();

class Header extends Component {

    constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleLoadDatasetClick = this.handleLoadDatasetClick.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this)

    this.state = {
      revealed: false,
      dropdownOpen: false,
      value: ''
    };
  }
  
   toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  sidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-hidden');
  }

  sidebarMinimize(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-minimized');
  }

  mobileSidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  }

  asideToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('aside-menu-hidden');
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleLoadDatasetClick(event) {
    console.log('Search Dataset for: ' + this.refs.auto.value);
    event.preventDefault();
    const { dispatch, selectDataset } = this.props;
    dispatch(loadDatasets(this.refs.auto.state.value, 0, '', '', '', '','metadata_modified%20desc'))
      .then(json => {
        this.props.history.push('/dataset');
      })
  }

  toggleSearch(){
    this.setState({
      revealed: !this.state.revealed
    })
  }

  render() {
    const { loggedUser } = this.props
    let open = this.state.dropdownOpen ? "show" : "" 
    let revealed = this.state.revealed ? "revealed" : ""
    return (
      <header className="app-header navbar">
      <button className="nav-link navbar-toggler sidebar-toggler d-lg-none" onClick={this.mobileSidebarToggle} type="button">&#9776;</button>
        {/* <button className="d-md-down-none nav-link navbar-toggler sidebar-toggler" type="button" onClick={this.sidebarMinimize}>&#9776;</button> */}
        
      <ul className="nav navbar-nav d-md-down-none mr-auto">
        <li className="nav-item brand">
          <a href=""><img className="img-logo" src="http://designer.italia.it/assets/icons/logo-it.png" alt=""/><span>  DAF  </span></a>
        </li>
        <li>
          {/* <button className="btn btn-gray-200" onClick={this.toggleSearch}><i className="fa fa-search fa-lg" /></button> */}
{/*           <div className={"search-bar " + revealed}>
            <form onSubmit={this.handleLoadDatasetClick}>
              <input className="search-input" placeholder="Cerca" ref="auto" name="s" id="search_mobile" tabindex="-1" type="text" />
            </form>
          </div> */}
        </li>
      </ul>
      <ul className="nav navbar-nav">
        <AutocompleteDataset ref="auto"/>
        <button className="btn btn-gray-200" onClick={this.handleLoadDatasetClick}>{/* <i className="fa fa-search fa-lg" /> */}Cerca</button>
      </ul>
      <ul className="nav navbar-nav ml-auto">
        <li className="nav-item">
{/*           <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <button onClick={this.toggle} className="nav-link dropdown-toggle" data-toggle="dropdown" type="button" aria-haspopup="true" aria-expanded={this.state.dropdownOpen}>
              <img src={'img/avatars/7.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com"/>
              <span className="d-md-down-none">{loggedUser?loggedUser.givenname:''}</span>
            </button>
            <DropdownMenu className="dropdown-menu-right">
              <DropdownItem header className="text-center"><strong>Menu utente</strong></DropdownItem>
              <DropdownItem><a className="nav-link" href="/#/profile"><i className="fa fa-user"></i> Profilo</a></DropdownItem>
              <DropdownItem><a className="nav-link" href="/#/settings"><i className="fa fa-gear"></i> Impostazioni</a></DropdownItem>
              <DropdownItem><a className="nav-link"  onClick={() => {logout()}} href="/"><i className="fa fa-lock"></i> Logut</a></DropdownItem>
            </DropdownMenu>
          </Dropdown> */}
          <div className={"dropdown " + open}>
              <a className="nav-link" role="button" id="dropdownMenuButton" data-toggle="dropdown" 
                aria-haspopup="true" aria-expanded="false" onClick={this.toggle}>
                <img src={'img/avatars/7.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                {/* <span className="d-md-down-none">{loggedUser ? loggedUser.givenname : ''}</span> */}
            </a>
              <div className={"dropdown-menu dropdown-menu-right "+ open} aria-labelledby="dropdownMenuButton">
                <h6 className="dropdown-header text-center">{loggedUser ? loggedUser.givenname : ''}</h6>
                <a className="dropdown-item" href="/#/profile" onClick={this.toggle}><i className="fa fa-user"></i> Profilo</a>
                <a className="dropdown-item" onClick={() => { logout(); this.toggle }} href="/"><i className="fa fa-lock"></i> Logout</a>
            </div>
          </div>
        </li>
        <li className="nav-item d-md-down-none">
          <a className="nav-link navbar-toggler aside-menu-toggler" href="#"></a>
        </li>
      </ul>
      </header>
    )
  }
}


/*
<header className="app-header navbar">
        <button className="navbar-toggler mobile-sidebar-toggler d-lg-none" onClick={this.mobileSidebarToggle} type="button">&#9776;</button>
        <a className="navbar-brand" href="#"></a>
        <ul className="nav navbar-nav d-md-down-none mr-auto">
          <li className="nav-item">
            <button className="nav-link navbar-toggler sidebar-toggler" type="button" onClick={this.sidebarToggle}>&#9776;</button>
          </li>
        </ul>
        <ul className="nav navbar-nav d-md-down-none">
          <AutocompleteDataset ref="auto"/>
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit" value="submit" onClick={this.handleLoadDatasetClick}>Cerca</button>
        </ul>
        <ul className="nav navbar-nav ml-auto">
          <li className="nav-item">
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <button onClick={this.toggle} className="nav-link dropdown-toggle" data-toggle="dropdown" type="button" aria-haspopup="true" aria-expanded={this.state.dropdownOpen}>
                <img src={'img/avatars/7.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com"/>
                <span className="d-md-down-none">{loggedUser?loggedUser.email:''}</span>
              </button>

              <DropdownMenu className="dropdown-menu-right">
                <DropdownItem header className="text-center"><strong>Settings</strong></DropdownItem>
                <DropdownItem><a className="nav-link" href="/#/profile"><i className="fa fa-user"></i> Profile</a></DropdownItem>
                <DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem>
                <DropdownItem divider />
                <DropdownItem> <a className="nav-link"  onClick={() => {
                logout()
                }} href="/"><i className="fa fa-lock"></i> Logut</a></DropdownItem>

              </DropdownMenu>
            </Dropdown>
          </li>
          
          <li className="nav-item hidden-md-down">
            <a className="nav-link navbar-toggler aside-menu-toggler" href="#"></a>
          </li>
        </ul>
      </header>
      */


/*
<form className="form-inline my-2 my-lg-0" onSubmit={this.handleSubmit}>
  <input className="form-control mr-sm-2" type="text" placeholder="Cerca Dataset" value={this.state.value} onChange={this.handleChange}/>
  <button className="btn btn-outline-success my-2 my-sm-0" type="submit" value="submit">Cerca</button>
</form>
*/

Header.propTypes = {
  loggedUser: PropTypes.object,
  value: PropTypes.string
}

function mapStateToProps(state) {
  const { loggedUser } = state.userReducer['obj'] || { }
  return { loggedUser }
}

export default connect(mapStateToProps)(Header)

