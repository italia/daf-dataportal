import React, { Component } from 'react';
import Components from 'react';
import { Route, Link } from 'react-router-dom';
import ListBar from './bar/ListBar';

// App components
import Header from './Header';
import Container from './Container';

// Services
import UserStoryService from './services/UserStoryService';

// Our styles
import '../styles/custom.css';


const userStoryService = new UserStoryService();

class UserStoryList extends Component {
  constructor(props) {
    super(props);
    this.state={};

    this.load();

    this.filter = this.filter.bind(this);
  }
  
  /**
   * Method called for load dashboard list
   */
  load = (config) => {
    this.state = {
      userStories: [],
      loading:true
    };
    
    let response = userStoryService.list();
    response.then((list) => {
      this.originalUserStories = list;
      this.setState({
        userStories: list,
        loading:false
      });
    });
  }

  /**
   * Execute filter
   */
  filter = (e) => {
    let key = e.target.value.toLowerCase();
    this.setState({
      userStories: this.originalUserStories.filter((item) => item.title.toLowerCase().indexOf(key) != -1)
    });
  }

  /**
   * Render Function
   */
  render() {

    const iframeStyle = {
      width: '100%',
      height: '160px',
      border: '0'
    }
    return this.state.loading === true ? <h1 className="text-center fixed-middle"><i className="fa fa-circle-o-notch fa-spin mr-2"/>Loading</h1> : (
    <Container>

      <Header title="Le Mie Storie" />
      
      <ListBar onChange={this.filter} history={this.props.history} ></ListBar>
      
      <div className="row">
        {
          this.state.userStories.map((story, index) => {
            let chartUrl = undefined
              if ((story.widgets && story.widgets !== '{}') && (story.layout && story.layout !== '{}')) {
                const dashLayout = JSON.parse(story.layout)
                let firstLayout = ''

                let righe = dashLayout.rows
                for (let i = 0; i < righe.length; i++) {
                  let colonne = righe[i].columns;
                  for (let j = 0; j < colonne.length; j++) {
                    let wids = colonne[j].widgets
                    wids.map((index) => {
                      /*  if (!index.key.startsWith('TextWidget')) { */
                      if (index.key.indexOf('TextWidget') == -1) {
                        firstLayout = index.key
                      }
                    })
                    if (firstLayout != '')
                      break
                  }
                  if (firstLayout != '')
                    break
                }
                const dashWidgets = JSON.parse(story.widgets)
                var imageA = undefined
                if (firstLayout != '') {
                  const firstWidget = dashWidgets[firstLayout];
                  imageA = firstWidget.image
                }
                var time = 0
                let widgets = Object.keys(dashWidgets)
                for (let k = 0; k < widgets.length; k++){
                  if(widgets[k].indexOf('TextWidget')!==-1){
                    var text = dashWidgets[widgets[k]].props.text
                    var array = text?text.split(' '):[]
                    
                    time = time + (array.length/275)
                  }
                  else
                    time = time + 1 
                }
              }
            return (
              <div className=".col-md-auto px-3" key={index}>
                <div className="card b-a-0 border-primary bg-white card-story">
                  <div className="card-img-top" style={iframeStyle}>
                    <div className="row m-0">
                      {/* chartUrl && <iframe
                      ref="iframe"
                      frameBorder={'0'}
                      style={iframeStyle}
                      src={chartUrl}
                    />
                    */}
                      { imageA && <div className="crop col-12"><img src={"data:image/jpg;base64," + imageA} /></div>}
                      {/* imageB && <div className="crop col-6 pl-0"><img className="bn-dash" src={"data:image/jpg;base64," + imageB} /></div> */}
                    </div>
                  </div>
                  <div className="card-body p-0">
                    <div className="title-dash">
                      <Link to={"/user_story/list/" + story.id}>
                        <h3 className="card-title text-primary">{story.title}</h3>
                      </Link>
                      {/* <h6 className="card-subtitle mb-2 text-muted">{dash.subtitle}</h6> */}
                    </div>
                    <div className="card-text row m-0 mt-3 ml-4">
                      <p className="col-8 pl-0 m-0">{story.user}</p>
                      <div className="col-4 my-1">
                        {
                          story.published == 2 &&
                          <span className="badge badge-pill badge-warning pull-right badge-dash" title="Pubblica"> </span>
                        }
                        {
                          story.published == 1 &&
                          <span className="badge badge-pill badge-success pull-right badge-dash" title="Condivisa"> </span>
                        }
                        {
                          !story.published &&
                          <span className="badge badge-pill badge-secondary pull-right badge-dash" title="In bozza"> </span>
                        }
                        {/* <span className="badge badge-pill badge-warning pull-right badge-dash"></span> */}
                      </div>
                    </div>
                    {story.pvt == 1 &&
                      <div className="badge badge-danger pull-left mt-20"><i className="fa fa-lock fa-lg m-t-2"></i> PRIVATA</div>
                    }
                  </div>
                  <div className="b-t-story py-2 footer-dash">
                    <div className="pt-1 row">
                      <div className="card-text col-8"><i className="fa fa-clock-o fa-lg text-secondary pr-2"></i> {Math.ceil(time)} min. di lettura</div>
                    </div>
                  </div>
                </div>
              </div>
/*               <div className="col-sm-4" key={index}>
                <div className="card text-center">
                    <div className="card-body">
                    <Link to={"/user_story/list/" + story.id}>
                      <h4 className="card-title">{story.title}</h4>
                    </Link>
                    <h6 className="card-subtitle mb-2 text-muted" dangerouslySetInnerHTML={{__html: story.subtitle}}></h6>
                      { chartUrl && <iframe
                      ref="iframe"
                      frameBorder={'0'}
                      style={iframeStyle}
                      src={chartUrl}
                    />
                    }
                    {story.pvt==1 &&
                    <div className="badge badge-danger pull-left mt-20"><i className="fa fa-lock fa-lg m-t-2"></i> PRIVATA</div>
                    }
                    {
                    story.published===1 &&
                    <div className="badge badge-success pull-right mt-20">PUBBLICATO</div>
                    }
                    {
                      story.published === 2 &&
                      <div className="badge badge-info pull-right mt-20">CONDIVISO</div>
                    }
                    {
                      !story.published &&
                      <div className="badge badge-secondary pull-right mt-20">IN BOZZA</div>
                    }
                  </div>
                </div>
              </div> */
            
            )
          })
        }
      </div>

      {
        this.state.userStories && this.state.userStories.length == 0 &&
        <p>
          <b>Nessuna storia trovata</b>
        </p>
      }
    </Container>
    );
  }

}

export default UserStoryList;
