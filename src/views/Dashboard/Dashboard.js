import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import App from './components/InfinityScroll/App'
import InfiniteScroll from '../../components/InfinityScroll';

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
          items: 3,
          visibility: 'visible'
    }

    this.loadDashboard();

  }

  loadDashboard = (config) => {
/*     this.state = {
      listDashboards: []
    }; */

    let response = homeService.dashboards();
    response.then((list) => {
      this.originalDashboard = list;
      this.setState({
        listDashboards: list
      });
    });
    console.log(this.state.listDashboards.length)
  }

  loadMore = () => {
    if (this.state.isLoading) { return }
    var totitems = this.state.items + 2;
    this.setState({ items: totitems,
      visibility: 'hidden'
    });
  }

  handleScrollToBottom = () => this.loadMore()
  handleLoadMoreClick = () => this.loadMore()

  render() {

     const iframeStyle = {
      width: '100%',
      height: '300px',
      border: '0'
    }
    
    const { visibility, items, isLoading, listDashboards } = this.state;
    let visible = listDashboards.length<=items ? 'hidden':visibility;
    return (
      
      
      <div className="container">
        
        {/* CARDS */}
        <div className="row">

          {/* GRAPH */}
          <h2> Ultime Dashboard </h2>

          {/* BOXES */}
          <div className="col-sm-12 col-md-12">

          {/* <App listDashboards={this.state.listDashboards}/> */}
         
          
            <Timeline>
            <div className="App">
            <InfiniteScroll onScrollToBottom={this.handleScrollToBottom}>
            {listDashboards.slice(0,items).map((dash, index) => {
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
                </TimelineEvent>
              )
            })
          }
          </InfiniteScroll>
          </div>
            </Timeline>
            <button
              className="List-load-more-button"
              onClick={this.handleLoadMoreClick}
              disabled={isLoading} style={{visibility: visible }}>
              {isLoading ? 'Loading...' : 'Load more'}
            </button>
      

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
