import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// react-timeline....
import { Timeline, TimelineEvent } from 'react-event-timeline'

// Services
import HomeService from './services/HomeService';

const homeService = new HomeService();

class Dashboard extends Component {


  constructor(props) {
    super(props);

    this.state = {
      //    listDataset: [],
        //  listStories: [],
          listDashboards: [],

    }

    this.loadDashboard();

  }

  loadDashboard = (config) => {
    this.state = {
      listDashboards: []
    };

    let response = homeService.dashboards();
    response.then((list) => {
      this.originalDashboard = list;
      this.setState({
        listDashboards: list
      });
    });
  }


  render() {

     const iframeStyle = {
      width: '100%',
      height: '300px',
      border: '0'
    }

    return (
      <div className="container" >

        {/* CARDS */}
        <div className="row">

          {/* GRAPH */}
          <h2> Ultime Dashboard </h2>

          {/* BOXES */}
          <div className="col-sm-12 col-md-12">


            <Timeline>
                      {
          this.state.listDashboards.slice(0,3).map((dash, index) => {
            let timestamp = "" 
            let chartUrl = undefined
            if (dash.widgets && dash.widgets !== '{}'){
              const dashJson = JSON.parse(dash.widgets)
              const firstWidget = dashJson[Object.keys(dashJson)[0]];
              chartUrl = firstWidget['props']['url']
            }
            if(dash.timestamp){
              timestamp = dash.timestamp.dayOfMonth+"-"+dash.timestamp.monthValue+"-"+dash.timestamp.year+" "+dash.timestamp.hour+":"+dash.timestamp.minute;
            }
            return (
              <TimelineEvent
                title={dash.user?dash.user:""}
                //createdAt="2016-09-12 10:06 PM"
                createdAt={timestamp}
                icon={<i />}
                iconColor="#6fba1c"
                key={dash.id}
              >
                <h6>
                  <Link to={"/dashboard/list/" + dash.id}>
                      <h4 className="card-title">{dash.title}</h4>
                    </Link></h6>
                <div>
                    { chartUrl && <iframe
                      ref="iframe"
                      frameBorder={'0'}
                      style={iframeStyle}
                      src={chartUrl}
                    />
                                      }
                </div>
              </TimelineEvent>)
          })
          }
            </Timeline>

          </div>

        </div>
      </div>
    )
  }
}


/* 
        <div className="row">

          <div className="col-sm-12 col-md-4">
            <ListBox 
              title="Datasets Recenti" 
              list={this.state.listDataset}
            ></ListBox>
          </div>

          <div className="col-sm-12 col-md-4">
            <ListBox 
              title="Storie Recenti" 
              list={this.state.listDataset}
            ></ListBox>
          </div>

          <div className="col-sm-12 col-md-4">
            <ListBox 
              title="Dashboards recenti" 
              list={this.state.listDataset}
            ></ListBox>
          </div>

        </div>
*/
export default Dashboard;
