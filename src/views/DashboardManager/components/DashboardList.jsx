import React, { Component } from 'react';
import Components from 'react';
import { Route, Link } from 'react-router-dom';
import ListBar from './bar/ListBar';

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
    this.state={};

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
        dashboards: list
      });
    });
  }


  /**
   * Render Function
   */
  render() {
    return (
    <Container>
      <Header title="Le Mie Dashboards" />
      <div>
        {
          this.state.dashboards.map((dash, index) => {
            return <div key={index} className="dashboard-card">
              <Link to={"/dashboard/list/" + dash.id}>
                <h2 className="pull-left">
                  {dash.title}
                </h2>
              </Link>
              
              {
                dash.status==true &&
                <div className="badge badge-success pull-right mt-20">PUBBLICATO</div>
              }
              {
                !dash.status &&
                <div className="badge badge-default pull-right mt-20">IN BOZZA</div>
              }

              <div className="clearfix"></div>
            </div>
          })
        }
      </div>
      <ListBar></ListBar>
    </Container>
    );
  }

}

export default DashboardList;
