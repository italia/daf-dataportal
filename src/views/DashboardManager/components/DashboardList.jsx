import React, { Component } from 'react';
import Components from 'react';

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
      <Header title="List Dashboard" />
      <div>
        {
          this.state.dashboards.map((dash, index) => {
            return <div key={index} className="dashboard-card">
              <h2>
                <a href={"#/dashboard/list/" + dash.id}>
                  {dash.title}
                </a>
              </h2>
            </div>
          })
        }
      </div>
    </Container>
    );
  }

}

export default DashboardList;
