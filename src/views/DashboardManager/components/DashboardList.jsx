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

  async loadImage(widget) {
    let url = 'https://datipubblici.daf.teamdigitale.it/dati-gov/v1/plot/' + widget + '/330x280';
    const response = await fetch(url, {
      method: 'GET'
    })

    return response
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
      height: '160px',
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
              let preview = []
              let righe = dashLayout.rows
              for(let i = 0; i<righe.length; i++){
                let colonne = righe[i].columns;
                for(let j = 0; j<colonne.length; j++) {
                  let wids = colonne[j].widgets
                  wids.map((index) => {
                   /*  if (!index.key.startsWith('TextWidget')) { */
                    if (index.key.indexOf('TextWidget')==-1) {
                      firstLayout = index.key
                      preview.push(index.key)
                    }
                  })
                  if (firstLayout != '')
                    if(preview.length===2)
                      break
                }
                if (firstLayout != '')
                  if (preview.length === 2)
                    break
              }

              const dashWidgets = JSON.parse(dash.widgets)
              console.log(dashWidgets)
              console.log(preview)
              var imageA = undefined;
              var imageB = undefined;
              
              if(preview.length!==0){
                imageA = dashWidgets[preview[0]].image
                if(preview[1])
                  imageB = dashWidgets[preview[1]].image
              }

              if(firstLayout!= ''){
                const firstWidget = dashWidgets[firstLayout];
                chartUrl = firstWidget['props']['url']
              }
            }
            return (
              <div className="col-sm-4" key={index}>
                <div className="card b-a-1 b-t-3 bg-gray-100 card-dash">
                  <div className="card-img-top" style={iframeStyle}>
                    <div className="row m-0">
                    {/* chartUrl && <iframe
                      ref="iframe"
                      frameBorder={'0'}
                      style={iframeStyle}
                      src={chartUrl}
                    />
                    */}
                      {imageA && <div className={"crop " + (imageB ? "pr-0 b-r-dash col-6" : "col-12")}><img className="bn-dash" src={"data:image/jpg;base64," + imageA} /></div>}
                      {imageB && <div className="crop col-6 pl-0"><img className="bn-dash" src={"data:image/jpg;base64," + imageB} /></div>}
                    </div>
                  </div>
                    <div className="card-body pb-0">
                      <div className="row title-dash">
                          <div className="col-sm-11">
                            <Link to={"/dashboard/list/" + dash.id}>
                              <h3 className="card-title">{dash.title}</h3>
                            </Link>
                            {/* <h6 className="card-subtitle mb-2 text-muted">{dash.subtitle}</h6> */}
                          </div>
                      </div>
                    <div className="card-text row">
                        <p className="col-8">{dash.user}</p>
                        <div className="col-4">
                          {
                            dash.status == 2 &&
                            <span className="badge badge-pill badge-success pull-right badge-dash" title="Pubblica"> </span>
                          }
                          {
                            dash.status == 1 &&
                            <span className="badge badge-pill badge-info pull-right badge-dash" title="Condivisa"> </span>
                          }
                          {
                            dash.status == 0 &&
                            <span className="badge badge-pill badge-warning pull-right badge-dash" title="In bozza"> </span>
                          }
                          {/* <span className="badge badge-pill badge-warning pull-right badge-dash"></span> */}
                        </div>
                      </div>
                      {dash.pvt==1 &&
                      <div className="badge badge-danger pull-left mt-20"><i className="fa fa-lock fa-lg m-t-2"></i> PRIVATA</div>
                      }
                    </div>
                    <div className="card-body py-2 b-t-1 bg-cards-2">
                      <div className="row">
                        <p className="card-text mb-0 col-8"><i className="fa fa-bar-chart text-secondary"></i> Widget</p>
                        <div className="col-4"><span className="badge badge-pill badge-secondary pull-right" style={{height: '16px'}}>{Object.keys(JSON.parse(dash.widgets)).length} </span></div>
                      </div>
                    </div>
                    <div className="card-body py-2 b-t-1 bg-cards-2">
                      <div className="row">
                        <p className="card-text mb-0 col-8"><i className="fa fa-table text-secondary"></i> Dataset</p>
                        {/* <div className="col-4"><span className="badge badge-pill badge-secondary pull-right" style={{ height: '16px' }}>{Object.keys(JSON.parse(dash.widgets)).length} </span></div> */}
                      </div>
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
