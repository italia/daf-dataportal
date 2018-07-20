import React, { Component } from 'react';
import { Dropdown, DropdownMenu, DropdownItem } from 'reactstrap';
import PropTypes from 'prop-types'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faGlobe } from '@fortawesome/fontawesome-free-solid'
import {
	loadDatasets,
  logout,
  updateNotifications,
  fetchNotifications,
} from '../../actions'
import { createBrowserHistory } from 'history';
import AutocompleteDataset from '../Autocomplete/AutocompleteDataset.js'
import { isEditor, isAdmin } from '../../utility'

const history = createBrowserHistory();

class Header extends Component {

		constructor(props) {
			super(props);
			this.handleChange = this.handleChange.bind(this);
			this.handleLoadDatasetClick = this.handleLoadDatasetClick.bind(this);
			this.toggle = this.toggle.bind(this);
			this.toggleSearch = this.toggleSearch.bind(this)
			this.toggleCrea = this.toggleCrea.bind(this)
			this.mobileSidebarToggle = this.mobileSidebarToggle.bind(this)
			this.createDash = this.createDash.bind(this)
      this.createStory = this.createStory.bind(this)
      this.closeMenu = this.closeMenu.bind(this)
      this.toggleAsideMenu = this.toggleAsideMenu.bind(this)

			this.state = {
				mobile: false,
				revealed: false,
				dropdownOpen: false,
				crea: false,
				accento: false,
        value: '',
        unread : 0,
        unreadNotifications: []
			};
		}
  
    
    componentWillReceiveProps(nextProps){
      
      if(nextProps.notifications){
        var unreadNot = nextProps.notifications.filter(notification =>{
            return notification.status===0
        })

        console.log(unreadNot)

        this.setState({
          unread: unreadNot.length,
          unreadNotifications: unreadNot
        })
      }
    }
	
		toggleCrea(){
			this.setState({
				crea: !this.state.crea,
			}, () => {
        document.addEventListener('click', this.closeMenu);
      });
			if(this.state.revealed === true)
				this.props.openSearch();
		}

		toggle() {
			this.setState({
				dropdownOpen: !this.state.dropdownOpen,
			}, () => {
        document.addEventListener('click', this.closeMenu);
      });
			if(this.state.revealed === true)
				this.props.openSearch();
		}

		toggleNav() {
			this.setState({
				navigation: !this.state.navigation,
			}, () => {
        document.addEventListener('click', this.closeMenu);
      });
			if(this.state.revealed === true)
				this.props.openSearch();
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
			this.setState({
				mobile: !this.state.mobile
			})
			document.body.classList.toggle('sidebar-mobile-show');
			if(this.state.revealed === true)
				this.props.openSearch();
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
					this.props.history.push('/private/dataset');
				})
		}

		toggleSearch(e){
			this.setState({
				revealed: !this.state.revealed,
				accento: !this.state.accento,
				dropdownOpen: false,
				crea: false
			})
			if(this.state.mobile === true)
				this.mobileSidebarToggle(e);

			this.props.openSearch();
		}

		crea(){
			this.props.history.push('/private/crea')
		}

		createDash(){
			/* this.props.history.push({
				pathname: '/dashboard/list',
				state: { 'isOpen': true }
			}) */
			this.props.openModalDash();
			this.toggleCrea()
		}

		createStory(){
			/* this.props.history.push({
				pathname: '/userstory/list',
				state: { 'isOpen': true }
			}) */
			this.props.openModalStory();
			this.toggleCrea()
    }
    
    closeMenu() {
      if(this.state.revealed === true)
        this.props.openSearch();
      this.setState({ 
        mobile: false,
				revealed: false,
				dropdownOpen: false,
				crea: false,
        accento: false,
        navigation: false 
      }, () => {
        document.removeEventListener('click', this.closeMenu);
      });
    }

    toggleAsideMenu(){
      const { dispatch } = this.props
      document.body.classList.toggle('aside-menu-xl-show')
      document.body.classList.toggle('aside-menu-hidden');
      var unreadNot = this.state.unreadNotifications
      if(unreadNot.length>0){
        unreadNot.map(not => {
          not.status = 1
        })

        console.log(unreadNot)
        dispatch(updateNotifications(unreadNot))
        .then(json => {
          console.log(json)
          this.setState({
            isLoading: true,
            unreadNotifications: []
          })
          dispatch(fetchNotifications(localStorage.getItem('user')))
          .then(json => {
            console.log(json)
            this.setState({
              isLoading: false
            })
          })
        })
      }
    }

		render() {
			const { loggedUser, properties } = this.props
			let open = this.state.dropdownOpen ? "show" : "" 
			let revealed = this.state.revealed ? "btn-accento" : "btn-header"
			let crea = this.state.crea ? "show" : ""
			var navigation = this.state.navigation?" active":""
			var show = this.state.navigation?" show":"" 
			return (
				<header className="app-header navbar border-0">
				<button className="nav-link navbar-toggler sidebar-toggler d-lg-none" onClick={this.mobileSidebarToggle} type="button">&#9776;</button>
					{/* <button className="d-md-down-none nav-link navbar-toggler sidebar-toggler" type="button" onClick={this.sidebarMinimize}>&#9776;</button> */}
					
				<ul className="nav navbar-nav d-md-down-none mr-auto">
					<li className="nav-item brand">
						<Link className="h-100 font-2xl" to={'/private/home'}><img className="img-logo mb-1 pr-3" src="./img/DAF_pittogramma_FU.svg" alt=""/><span className="pl-3 font-weight-bold">DAF {properties.headerSiglaTool}</span></Link>
					</li>
	{/*           <div className={"search-bar " + revealed}>
							<form onSubmit={this.handleLoadDatasetClick}>
								<input className="search-input" placeholder="Cerca" ref="auto" name="s" id="search_mobile" tabindex="-1" type="text" />
							</form>
						</div> */}
				</ul>
				{/* <ul className="nav navbar-nav">
					<AutocompleteDataset ref="auto"/>
					<button className="btn btn-gray-200" onClick={this.handleLoadDatasetClick}><i className="fa fa-search fa-lg" /> Cerca</button>
				</ul> */}
				<ul className="navbar-nav ml-auto h-100 mr-2">
					<li className="nav-item h-100">
							<button className={"w-100 h-100 btn " + revealed} onClick={this.toggleSearch}><i className="fa fa-search fa-lg" /></button>
					</li>
					<li className="nav-item h-100 mr-3">
					<div className={"dropdown h-100 " + crea}>
								<button className="w-100 h-100 btn btn-header" onClick={/* this.crea.bind(this) */this.toggleCrea}><i className="fa fa-plus fa-lg"/></button>
								<div className={"dropdown-menu m-0 dropdown-menu-right "+ crea} aria-labelledby="dropdownMenuButton">
									<h6 className="dropdown-header text-center"><b>Crea</b></h6>
									{(isEditor(loggedUser) || isAdmin(loggedUser)) && <button className="dropdown-item" onClick={()=> { this.props.history.push('/private/ingestionwizzard'); this.toggleCrea}}><i className="fa fa-table"></i> Carica Dataset</button>}
									<button className="dropdown-item" onClick={this.createDash} ><i className="fa fa-columns"></i> Nuova Dashboard</button>
									<button className="dropdown-item" onClick={this.createStory} ><i className="fa fa-font"></i> Nuova Storia</button>
							</div>
						</div>
						{/* <button className="w-100 h-100 btn btn-header" onClick={this.crea.bind(this)}><i className="fa fa-plus fa-lg"/></button> */}
					</li>
				</ul>
        <ul className="navbar-nav mr-2">
					<li className="nav-item">
							<button className="btn btn-primary nav-link text-white" onClick={this.toggleAsideMenu}><i className={this.state.unread===0?"fa fa-bell fa-lg":"far fa-bell fa-lg"} /><span className="badge badge-white badge-pill text-primary">{this.state.unread===0?'':this.state.unread}</span></button>
					</li>
				</ul>
				<ul className="nav navbar-nav mr-2">
					<li className="nav-item">
						<div className={"dropdown " + open}>
							<a className="nav-link" role="button" id="dropdownMenuButton" data-toggle="dropdown" 
										aria-haspopup="true" aria-expanded="false" onClick={this.toggle}>
                    {/* <img src={'img/avatars/7.jpg'} className="img-avatar pointer" alt="admin@bootstrapmaster.com"/> */}
                    <i className="fas fa-user-circle fa-2x pointer text-white"/>
								</a>
								<div className={"dropdown-menu dropdown-menu-right "+ open} aria-labelledby="dropdownMenuButton">
									<h6 className="dropdown-header text-center"><b>{loggedUser ? loggedUser.givenname : ''}</b></h6>
									<a className="dropdown-item" href="/#/private/profile" onClick={this.toggle}><i className="fa fa-user"></i> Profilo</a>
									<a className="dropdown-item" onClick={() => { logout(); this.toggle }} href="/"><i className="fa fa-lock"></i> Logout</a>
							</div>
						</div>
					</li>
				</ul>
				<ul className="nav navbar-nav h-100">
					<li className="nav-item h-100">
						<div className={"h-100 dropdown " + show}>
						<button className={"h-100 btn btn-accento"+navigation} id="dropdown" data-toggle="dropdown"  aria-haspopup="true" aria-expanded="false" onClick={this.toggleNav.bind(this)}><p className="m-0 p-0 d-md-down-none float-left">Area Privata</p><i className="float-left fa fa-lock fa-lg d-lg-none"/> <i className="fa fa-sort-down ml-2 align-top"/></button>
							<div className={"dropdown-menu dropdown-menu-right m-0" + show} aria-labelledby="dropdownMenuButton">
								<h6 className="dropdown-header bg-white"><b>VAI A</b></h6>
								<button className="dropdown-item bg-light b-l-pvt border-primary pr-5" onClick={()=>this.props.history.push('/')}>
										<div className="row">
												<h5 className="col-1 pl-0"><FontAwesomeIcon icon={faGlobe} className="mx-2"/></h5>
												<div className="row col-11 ml-1">
														<div className="col-12 pl-1"><p className="mb-0"><b>Area pubblica</b></p></div>
														<div className="col-12 pl-1">Catalogo open data italiani</div>
												</div>
										</div>
								</button>
							</div>
						</div>
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
  const { properties } = state.propertiesReducer['prop'] || {}
  const { notifications } = state.notificationsReducer || {}
	return { loggedUser, properties, notifications }
}

export default connect(mapStateToProps)(Header)

