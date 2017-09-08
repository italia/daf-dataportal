import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

class Sidebar extends Component {

  handleClick(e) {
    e.preventDefault();
    e.target.parentElement.classList.toggle('open');
  }

  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';
  }

  // secondLevelActive(routeName) {
  //   return this.props.location.pathname.indexOf(routeName) > -1 ? "nav nav-second-level collapse in" : "nav nav-second-level collapse";
  // }

  render() {
    return (

      <div className="sidebar">
        <nav className="sidebar-nav mt-40">
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
                  <NavLink to={'/ingestionwizzard'} className="nav-link" activeClassName="active">  Carica</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/components/social-buttons'} className="nav-link" activeClassName="active"> Monitora</NavLink>
                </li>
              </ul>
            </li>
            <li className={this.activeRoute("/icons")}>
              <a className="nav-link nav-dropdown-toggle" href="#" onClick={this.handleClick.bind(this)}><i className="icon-star"></i> Standards</a>
              <ul className="nav-dropdown-items">
                <li className="nav-item">
                  <NavLink to={'/ontologies'} className="nav-link" activeClassName="active"> Ontologie</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/icons/simple-line-icons'} className="nav-link" activeClassName="active"> Vocabolari</NavLink>
                </li>
              </ul>
            </li>
        
            <li className="nav-item">
              <NavLink to={'/dashboard/list'} className="nav-link" activeClassName="active"><i className="icon-star"></i> Dashboard</NavLink>
            </li>
                
            <li className="nav-item">
              <NavLink to={'/user_story/list'} className="nav-link" activeClassName="active"><i className="icon-star"></i> Storie</NavLink>
            </li>

            <li className="nav-item">
              <NavLink to={'/charts'} className="nav-link" onClick={this.handleClick.bind(this)} activeClassName="active"><i className="icon-pie-chart"></i> Grafici</NavLink>
            </li>

            <li className="nav-item">
              <a href={'http://localhost:8088'} className="nav-link"  /* activeClassName="active" */><i className="icon-pie-chart"></i> Busness Intelligence</a>
            </li>
            <li className="nav-item">
              <a href={'http://localhost/jupyter'} className="nav-link"  /* activeClassName="active" */><i className="icon-pie-chart"></i> Data Science</a>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}

export default Sidebar;
