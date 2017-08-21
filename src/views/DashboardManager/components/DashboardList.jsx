import React, { Component } from 'react';
import Components from 'react';
import { Route, Link } from 'react-router-dom';

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
                <h2>
                  {dash.title}
                </h2>
              </Link>
            </div>
          })
        }
      </div>
    </Container>
    );
  }

}

export default DashboardList;
