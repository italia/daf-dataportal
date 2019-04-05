import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/fontawesome-free-solid'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
 } from 'reactstrap';
 import SearchBar from '../../SearchBar/SearchBar';
import { isValidToken } from '../../../actions';
import { serviceurl } from '../../../config/serviceurl'

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
      isSemanticsOpen: false,
      js_scrolled: false,
      authed: false
    }

    this.handleScroll = this.handleScroll.bind(this);
    this.toggleDrop = this.toggleDrop.bind(this)
    this.closeMenu = this.closeMenu.bind(this)
    this.pushToPrivate = this.pushToPrivate.bind(this)
  }

  componentDidMount() {
    const { dispatch } = this.props
    if(localStorage.getItem('token')){
      dispatch(isValidToken(localStorage.getItem('token')))
      .then(ok=>{
        if(ok){
          this.setState({
            authed: true
          })
          //è stato aggiunto per gestire il caso di chiusura browser e utente gia loggato
          document.forms['supset_open'].submit()
        }else{
          this.setState({
            authed: false
          })
        }
      })
    }
    window.addEventListener('scroll', this.handleScroll);
  };

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  };

  handleScroll(event) {
    if(window.scrollY > 80){
      this.setState({
        js_scrolled: true
      })
    }
    else{
      this.setState({
        js_scrolled: false
      })
    }
  };

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

  showSemantics(event) {
    event.preventDefault();

    this.setState({ isSemanticsOpen: !this.state.isSemanticsOpen }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }

  closeMenu() {
    this.setState({ showMenu: false, community: false, isSemanticsOpen: false, open: false }, () => {
      document.removeEventListener('click', this.closeMenu);
    });
  }

  pushToPrivate(){
    document.removeEventListener('click', this.closeMenu);
    this.props.history.push('/private/home')
  }

  render(){
    const { properties } = this.props
    var jsscrolled = this.state.js_scrolled ? 'js-scrolled': ''
    var show = this.state.open?" show":""

    return(
      <div className={"app-header " + jsscrolled}>
        <div className="upper-header" id="color-hp">
          <div className="container-fluid ">
          <div className="row">
    <div className="col-xs-2 mr-auto font-weight-bold text-white">
              <a className="font-weight-bold text-white" style={{ textDecoration: 'none' }} href="https://teamdigitale.governo.it/">Team Digitale</a>

        </div>

       <div className="col-xs-8 ml-auto">


            <ul className="list-inline m-0">
              <li className="list-inline-item">
                
                  <a className="color-text-header font-weight-bold ProvaSpazio" style={{ textDecoration: 'none' }} href="https://pianotriennale-ict.italia.it">Piano Triennale</a>
                
              </li>
              <li className="list-inline-item">
               
                  <a className="color-text-header font-weight-bold ProvaSpazio" style={{ textDecoration: 'none' }} href="https://developers.italia.it">Developers</a>
               
              </li>
              <li className="list-inline-item">
               
                  <a className="color-text-header font-weight-bold ProvaSpazio" style={{ textDecoration: 'none' }}  href="https://designers.italia.it">Designers</a>
                
              </li>
              <li className="list-inline-item">
               
                  <a className="color-text-header font-weight-bold" style={{ textDecoration: 'none' }} href="https://forum.italia.it">Forum</a>
               
              </li>
              <li className="list-inline-item">
                
                  <a className="color-text-header font-weight-bold" style={{ textDecoration: 'none' }} href="https://docs.italia.it">Docs</a>
                
              </li>
              <li className="list-inline-item">
              
                  <a className="color-text-header font-weight-bold a" style={{ textDecoration: 'none' }} href="https://github.com/italia">GitHub</a>
              
              </li>
            </ul>

          </div>
          </div>
          </div>
      
        </div>
        <div className="row color-row-header"></div>
        <div className="main-header container">
          <div className="h-100 bg-primary row">
            <div className='float-left'>
              <Link to={'/'}>
                <img src='./img/DAF_pittogramma_FU.svg' alt="" className="logo-pub mx-4"/>
                {properties.domain!=='dataportal' && properties.domain!=='dataportal-private' && <img src={properties.headerLogo} alt="" className="float-right logo-pub-pa mr-2"/>}
              </Link>
            </div>
            <div className="col-md col-lg col-sm col-xs col h-auto">
              <div className="row mx-0">
                <Link className="text-white" to={'/'}>
                  <h2 className="mr-4 mb-0">{/* props.styleProps.headerSiglaTool */}<b>PDND {properties.headerSiglaTool}</b></h2>
                </Link>
                <span className="d-sm-down-none badge badge-pill align-self-center h-100" style={{backgroundColor: 'rgba(0,0,0,0.2)', height: 'max-content'}}>versione alpha 1.0</span>
              </div>
              <p className="d-sm-down-none">{/* props.styleProps.headerDescTool */}{"Piattaforma Digitale Nazionale Dati Italiana ( in origine DAF )"} </p>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-4 col h-auto">
              <div className="h-100 row">
                <p className="d-sm-down-none text-white mr-3">Seguici su</p>
                {/* <a className="social-button bg-white rounded-circle text-center mx-1 py-1"><i className="fab fa-facebook-f"/></a> */}
                <a className="d-sm-down-none social-button bg-white rounded-circle text-center mx-1 py-1" href={properties.twitterURL} target="_blank"><i className="fab fa-twitter"/></a>
                <a className="d-sm-down-none social-button bg-white rounded-circle text-center mx-1 py-1" href={properties.mediumURL} target="_blank"><i className="fab fa-medium-m"/></a>
                <div className="row col-12 px-4" style={{height: '56px'}}>
                  <button className={(this.state.search ? "btn-accento":"btn-header")+" h-100 btn"} style={{width: '56px'}} onClick={this.openSearch.bind(this)}><i className="fa fa-search fa-lg" /></button>
                    {this.state.authed?
                    <div className={"dropdown" + show }>
                    <button className="h-100 btn btn-accento px-4" style={{marginLeft: '1px'}} id="dropdown" data-toggle="dropdown"  aria-haspopup="true" aria-expanded="false" onClick={this.openDrop.bind(this)}><h6 className="m-0 p-0 d-lg-down-none float-left">Area Pubblica</h6><i className="float-left fa fa-globe fa-lg d-xl-none"/> <i className="fa fa-sort-down ml-2 float-right"/></button>
                    <div className={"dropdown-menu dropdown-menu-right mt-0" +show} aria-labelledby="dropdownMenuButton">
                        <h6 className="dropdown-header bg-white"><b>VAI A</b></h6>
                        <button className="dropdown-item bg-light b-l-pvt border-primary pr-5" onClick={this.pushToPrivate}>
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
                </div>
              </div>
              </NavItem>
              <NavItem>
                <div className={"dropdown " + (this.state.showMenu ? "show" : "")}>
                  <Link className="nav-link font-weight-bold lead text-white" to={'/gettingstarted'}>Getting started</Link>
                </div>
              </NavItem>
              <NavItem>
              <div className={"dropdown " + (this.state.community ? "show":"")}>
                <a href='#' className={"dropdown-toggle nav-link font-weight-bold lead text-white "+ (this.state.community ? "active":"")} id="dropdown" data-toggle="dropdown"  aria-haspopup="true" aria-expanded="false" onClick={this.community.bind(this)}>Community</a>
                <div className={"dropdown-menu " + (this.state.community ? "show":"")} aria-labelledby="dropdownMenuButton">
                  <Link to={'/userstory/list'} className="dropdown-item text-primary font-lg">Storie</Link>
                  <Link to={'/notizie'} className="dropdown-item text-primary font-lg">Notizie</Link>
                  <Link to={'/faqs'} className="dropdown-item text-primary font-lg">Faqs</Link>
                  <a href="https://forum.italia.it/" target="_blank" className="dropdown-item text-primary font-lg">Forum</a>
                </div>
              </div>
              </NavItem>
              {/* <NavItem>
                <Link className="nav-link font-weight-bold lead text-white" to={'/partecipa'}>Partecipa</Link>
              </NavItem> */}
              <NavItem>
                <Link className="nav-link font-weight-bold lead text-white" to={'/data-applications'}>Data Application</Link>
              </NavItem>
              <NavItem>
              <div className={"dropdown " + (this.state.isSemanticsOpen ? "show":"")}>
                <a href='#' className={"dropdown-toggle nav-link font-weight-bold lead text-white "+ (this.state.isSemanticsOpen ? "active":"")} id="dropdown" data-toggle="dropdown"  aria-haspopup="true" aria-expanded="false" onClick={this.showSemantics.bind(this)}>Linked Data</a>
                <div className={"dropdown-menu " + (this.state.isSemanticsOpen ? "show":"")} aria-labelledby="dropdownMenuButton">
                  <Link to={'/ontologies'} className="dropdown-item text-primary font-lg">Ontologie</Link>
                  <Link to={'/vocabularies'} className="dropdown-item text-primary font-lg">Vocabolari</Link>
                  {/* <a disabled className="dropdown-item text-muted font-lg">SPARQL Endpoint</a> */}
                  {/* <a disabled className="dropdown-item text-muted font-lg">Knowledge Graph</a> */}
                </div>
              </div>
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
                  <Link to={'/gettingstarted'} className="dropdown-item">Linee guida</Link>
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
              {/* <NavItem>
                <Link className="nav-link font-weight-bold lead text-white" to={'/partecipa'}>Partecipa</Link>
              </NavItem> */}
              <NavItem>
                <Link className="nav-link font-weight-bold lead text-white" to={'/data-applications'}>Data Application</Link>
              </NavItem>
              <NavItem>
              <div className={"dropdown " + (this.state.isSemanticsOpen ? "show":"")}>
                <a href='#' className={"dropdown-toggle nav-link font-weight-bold lead text-white "+ (this.state.isSemanticsOpen ? "active":"")} id="dropdown" data-toggle="dropdown"  aria-haspopup="true" aria-expanded="false" onClick={this.showSemantics.bind(this)}>Linked Data</a>
                <div className={"dropdown-menu " + (this.state.isSemanticsOpen ? "show":"")} aria-labelledby="dropdownMenuButton">
                  <Link to={'/ontologies'} className="dropdown-item">Ontologie</Link>
                  <Link to={'/vocabularies'} className="dropdown-item">Vocabolari</Link>
                  {/* <a disabled className="dropdown-item text-muted">SPARQL Endpoint</a> */}
                  {/* <a disabled className="dropdown-item text-muted">Knowledge Graph</a> */}
                </div>
              </div>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        </div>
        <form id="supset_open" target="open_supset" action={serviceurl.urlApiOpen +'/managed/bi-open-login'} method="POST">
          <input name="Authorization" type="text" value={"Bearer "+localStorage.getItem('token')} readOnly hidden/>
        </form>
        <iframe name="open_supset" hidden/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { loggedUser, authed } = state.userReducer['obj'] || {}
  const { properties } = state.propertiesReducer['prop'] || {}

  return { loggedUser, authed, properties }
}

export default connect(mapStateToProps)(Header);