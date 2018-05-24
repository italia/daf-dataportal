import React, { Component } from 'react';
import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/fontawesome-free-solid'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,

 } from 'reactstrap';
 import SearchBar from '../../SearchBar/SearchBar';


class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      navbar: false,
      dropdownOpen: false,
      isOpen: false,
      search: false,
      showMenu: false,
      community: false,
    }

    this.toggleDrop = this.toggleDrop.bind(this)
    this.closeMenu = this.closeMenu.bind(this)
  }

  openDrop(event){
    event.preventDefault();

    this.setState({
      open:!this.state.open
    }, () => {
      document.addEventListener('click', this.closeMenu);
    })
  }

  toggleDrop(){
    this.setState({
      dropdownOpen:!this.state.open
    })
  }

/*   toggle2(){
    this.setState({
      isOpen:!this.state.isOpen
    })
  } */

  openSearch(){
    this.setState({
      search: !this.state.search
    })
  }

  toggle() {
    this.setState({
      navbar: !this.state.navbar
    });
  }

  showMenu(event) {
    event.preventDefault();
    
    this.setState({ showMenu: !this.state.showMenu }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }

  community(event) {
    event.preventDefault();
    
    this.setState({ community: !this.state.community }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }

  closeMenu() {
    this.setState({ showMenu: false, community: false, open: false }, () => {
      document.removeEventListener('click', this.closeMenu);
    });
  }

  render(){
    const { scrolled, loggedUser } = this.props
    var jsscrolled = scrolled ? 'js-scrolled': ''
    var active = this.state.open?" active":""
    var show = this.state.open?" show":""
    return(
      <div className={"app-header " + jsscrolled}>
        <div className="upper-header">
          <div className="container">
            <h6 className="mx-5 px-1 mb-0">Agid + Team Digitale</h6>
          </div>
        </div>
        <div className="main-header container">
          <div className="h-100 bg-primary row">
            <div className="col-md-2 col-lg-1 col-sm-2 col-xs col-3 pt-2 h-auto">
              <Link to={'/'}>
                <img src='./img/DAF_pittogramma_FU.svg' alt="" className="logo-pub"/>
              </Link>
            </div>
            <div className="col-md col-lg col-sm col-xs col pt-2 h-auto">
              <div className="row mx-0">
                <Link className="text-white" to={'/'}>
                  <h2 className="mr-4 mb-0">{/* props.styleProps.headerSiglaTool */}<b>DAF Italia</b></h2>
                </Link>
                <span className="badge badge-pill mt-2 h-100" style={{backgroundColor: 'rgba(0,0,0,0.2)', height: 'max-content'}}>versione alpha 1.0</span>
              </div>
              <p className="d-sm-down-none">{/* props.styleProps.headerDescTool */}Data And Analytics Framework Italia</p>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-4 col h-auto">
              <div className="h-100 row">
                <p className="d-sm-down-none text-white mr-3">Seguici su</p>
                {/* <a className="social-button bg-white rounded-circle text-center mx-1 py-1"><i className="fab fa-facebook-f"/></a> */}
                <a className="d-sm-down-none social-button bg-white rounded-circle text-center text-primary mx-1 py-1" href="https://twitter.com/teamdigitaleIT?lang=it"><i className="fab fa-twitter"/></a>
                <a className="d-sm-down-none social-button bg-white rounded-circle text-center text-primary mx-1 py-1" href="https://medium.com/team-per-la-trasformazione-digitale"><i className="fab fa-medium-m"/></a>
                <div className="row col-12 px-4" style={{height: '56px'}}>
                  <button className={(this.state.search ? "btn-accento":"btn-header")+" h-100 btn"} style={{width: '56px'}} onClick={this.openSearch.bind(this)}><i className="fa fa-search fa-lg" /></button>
                    {loggedUser?
                    <div className={"dropdown" + show }>
                    <button className="h-100 btn btn-accento px-4" style={{marginLeft: '1px'}} id="dropdown" data-toggle="dropdown"  aria-haspopup="true" aria-expanded="false" onClick={this.openDrop.bind(this)}><h6 className="m-0 p-0 d-lg-down-none float-left">Area Pubblica</h6><i className="float-left fa fa-globe fa-lg d-xl-none"/> <i className="fa fa-sort-down ml-2 float-right"/></button>
                    <div className={"dropdown-menu dropdown-menu-right mt-0" +show} aria-labelledby="dropdownMenuButton">
                        <h6 className="dropdown-header bg-white"><b>VAI A</b></h6>
                        <button className="dropdown-item bg-light b-l-pvt border-primary pr-5" onClick={()=>{this.props.history.push('/private/home')}}>
                            <div className="row">
                                <h5 className="col-1 pl-0"><FontAwesomeIcon icon={faLock} className="mx-2"/></h5>
                                <div className="row col-11 ml-1">
                                    <div className="col-12 pl-1"><p className="mb-0"><b>Area privata e strumenti</b></p></div>
                                    <div className="col-12 pl-1">Piattaforma di gestione<br/>e analisi dati del DAF</div>
                                </div>
                                
                            </div>
                            
                        </button>
                      </div>
                    </div>
                    :<button className="h-100 btn btn-header btn-accedi" onClick={()=>{this.props.history.push('/login')}}><h6 className="m-0 p-0 d-sm-down-none">Accedi</h6><i className="d-md-none fa fa-sign-in-alt fa-lg" /></button>}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container public">
          {this.state.search && <SearchBar history={this.props.history} open={this.state.search}/>}
        </div>
        <div className="navi-header container">
          <Navbar color="primary" light  className="py-1 h-100">
          <NavbarToggler className="d-md-none text-white border-0" onClick={this.toggle.bind(this)} children={<i className="fa fa-bars"/>}/>
          <Nav className="d-sm-down-none bg-primary">
              <NavItem>
              <div className={"dropdown " + (this.state.showMenu ? "show":"")}>
                <a href='#' className={"dropdown-toggle nav-link font-weight-bold lead text-white "+ (this.state.showMenu ? "active":"")} id="dropdown" data-toggle="dropdown"  aria-haspopup="true" aria-expanded="false" onClick={this.showMenu.bind(this)}>Il progetto</a>
                <div className={"dropdown-menu " + (this.state.showMenu ? "show":"")} aria-labelledby="dropdownMenuButton">
                  <Link to={'/missione'} className="dropdown-item text-primary font-lg">Missione</Link>
                  <Link to={'/team'} className="dropdown-item text-primary font-lg">Chi siamo</Link>
                  <Link to={'/lineeguida'} className="dropdown-item text-primary font-lg">Linee guida</Link>
                </div>
              </div>
              </NavItem>
              <NavItem>
              <div className={"dropdown " + (this.state.community ? "show":"")}>
                <a href='#' className={"dropdown-toggle nav-link font-weight-bold lead text-white "+ (this.state.community ? "active":"")} id="dropdown" data-toggle="dropdown"  aria-haspopup="true" aria-expanded="false" onClick={this.community.bind(this)}>Community</a>
                <div className={"dropdown-menu " + (this.state.community ? "show":"")} aria-labelledby="dropdownMenuButton">
                  <Link to={'/userstory/list'} className="dropdown-item text-primary font-lg">Storie</Link>
                  <Link to={'/notizie'} className="dropdown-item text-primary font-lg">Notizie</Link>
                  <a href="https://forum.italia.it/" target="_blank" className="dropdown-item text-primary font-lg">Forum</a>
                </div>
              </div>
              </NavItem>
              <NavItem>
                <Link className="nav-link font-weight-bold lead text-white" to={'/partecipa'}>Partecipa</Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link font-weight-bold lead text-white" to={'/datapplication'}>Data Application</Link>
              </NavItem>
            </Nav>
          <Collapse isOpen={this.state.navbar} navbar>
            <Nav className="bg-primary ml-auto" navbar>
              <NavItem>
              <div className={"dropdown " + (this.state.showMenu ? "show":"")}>
                <a href='#' className={"dropdown-toggle nav-link font-weight-bold lead text-white "+ (this.state.showMenu ? "active":"")} id="dropdown" data-toggle="dropdown"  aria-haspopup="true" aria-expanded="false" onClick={this.showMenu.bind(this)}>Il progetto</a>
                <div className={"dropdown-menu " + (this.state.showMenu ? "show":"")} aria-labelledby="dropdownMenuButton">
                  <Link to={'/missione'} className="dropdown-item">Missione</Link>
                  <Link to={'/team'} className="dropdown-item">Chi siamo</Link>
                  <Link to={'/lineeguida'} className="dropdown-item">Linee guida</Link>
                </div>
              </div>
              </NavItem>
              <NavItem>
              <div className={"dropdown " + (this.state.community ? "show":"")}>
                <a href='#' className={"dropdown-toggle nav-link font-weight-bold lead text-white "+ (this.state.community ? "active":"")} id="dropdown" data-toggle="dropdown"  aria-haspopup="true" aria-expanded="false" onClick={this.community.bind(this)}>Community</a>
                <div className={"dropdown-menu " + (this.state.community ? "show":"")} aria-labelledby="dropdownMenuButton">
                  <Link to={'/userstory/list'} className="dropdown-item">Storie</Link>
                  <Link to={'/notizie'} className="dropdown-item">Notizie</Link>
                  <a href="https://forum.italia.it/" target="_blank" className="dropdown-item text-primary">Forum</a>
                </div>
              </div>
              </NavItem>
              <NavItem>
                <Link className="nav-link font-weight-bold lead text-white" to={'/partecipa'}>Partecipa</Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link font-weight-bold lead text-white" to={'/datapplication'}>Data Application</Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        </div>
      </div>
    )
  }
}

Header.propTypes = {
  loggedUser: PropTypes.object,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { loggedUser, authed } = state.userReducer['obj'] || {}
  return { loggedUser, authed }
}

export default connect(mapStateToProps)(Header);