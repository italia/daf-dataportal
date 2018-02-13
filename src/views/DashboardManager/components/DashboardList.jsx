import React, { Component } from 'react';
import Components from 'react';
import { Route, Link } from 'react-router-dom';
import ListBar from './bar/ListBar';
import Dimensions from 'react-dimensions'

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
    this.state={ 
      isOpen: false,
    };
    this.load();

    this.filter = this.filter.bind(this);
  }
  
  /**
   * Method called for load dashboard list
   */
  load = (config) => {
    this.state = {
      dashboards: [],
      isLoading: true
    };
    
    let response = dashboardService.list();
    response.then((list) => {
      
      this.originalDashboard = list;
      this.setState({
        dashboards: list,
        isLoading: false
      });
    });
  }

  /**
   * Execute filter
   */
  filter = (e) => {
    let key = e.target.value.toLowerCase();
    this.setState({
      dashboards: this.originalDashboard.filter((item) => item.title.toLowerCase().indexOf(key) != -1)
    });
  }

  /**
   * Render Function
   */
  render() {

    const iframeStyle = {
      width: '100%',
      height: '300px',
      border: '0'
    }

    return (
    <Container>
      <Header title="Le Mie Dashboards" />
      
      <ListBar onChange={this.filter} history={this.props.history} ></ListBar>
      
      <div className="row">
        {
          this.state.dashboards.map((dash, index) => {
            let chartUrl = undefined
            if ((dash.widgets && dash.widgets !== '{}') && (dash.layout && dash.layout !== '{}')){
              const dashLayout = JSON.parse(dash.layout)
              let firstLayout = ''
              
              let righe = dashLayout.rows
              for(let i = 0; i<righe.length; i++){
                let colonne = righe[i].columns;
                for(let j = 0; j<colonne.length; j++) {
                  let wids = colonne[j].widgets
                  wids.map((index) => {
                   /*  if (!index.key.startsWith('TextWidget')) { */
                    if (index.key.indexOf('TextWidget')==-1) {
                      firstLayout = index.key
                    }
                  })
                  if (firstLayout != '')
                    break
                }
                if (firstLayout != '')
                  break
              }

              const dashWidgets = JSON.parse(dash.widgets)
              if(firstLayout!= ''){
                const firstWidget = dashWidgets[firstLayout];
                chartUrl = firstWidget['props']['url']
              }
            }
            return (
              <div className="col-sm-4" key={index}>
                <div className="card text-center">
                    <div className="card-body">
                    <div className="row">
                        <div className="col-sm-11">
                          <Link to={"/dashboard/list/" + dash.id}>
                            <h4 className="card-title">{dash.title}</h4>
                          </Link>
                          <h6 className="card-subtitle mb-2 text-muted">{dash.subtitle}</h6>
                        </div>
                    </div>
                    { chartUrl && <iframe
                      ref="iframe"
                      frameBorder={'0'}
                      style={iframeStyle}
                      src={chartUrl}
                    />
                    }
                    {dash.pvt==1 &&
                    <div className="badge badge-danger pull-left mt-20"><i className="fa fa-lock fa-lg m-t-2"></i> PRIVATA</div>
                    }
                    {
                      dash.status==1 &&
                      <div className="badge badge-success pull-right mt-20">PUBBLICATO</div>
                    }
                    {
                      dash.status == 2 &&
                      <div className="badge badge-info pull-right mt-20">CONDIVISO</div>
                    }
                    {
                      !dash.status &&
                      <div className="badge badge-secondary pull-right mt-20">IN BOZZA</div>
                    }
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
      
      {
        this.state.dashboards && this.state.dashboards.length == 0 && this.state.isLoading === true &&
        <p>
          <b className="ml-20">Caricamento delle dashboard in corso...</b>
        </p>
      }
      {
        this.state.dashboards && this.state.dashboards.length == 0 && this.state.dashboards.isLoading === false &&
        <p>
          <b className="ml-20">Nessuna dashboard trovata</b>
        </p>
      }
     
    </Container>
    );
  }

}

export default DashboardList;
