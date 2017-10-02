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
      userStories: []
    };
    
    let response = userStoryService.list();
    response.then((list) => {
      this.originalUserStories = list;
      this.setState({
        userStories: list
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
      height: '300px',
      border: '0'
    }
    return (
    <Container>
      <Header title="Le Mie Storie" />
      
      <ListBar onChange={this.filter} history={this.props.history} ></ListBar>

      <div className="row">
        {
          this.state.userStories.map((story, index) => {
            let chartUrl = undefined
            if (story.graph1){
              chartUrl = story.graph1['props']['url']
            }
            return (
              <div className="col-sm-4" key={index}>
                <div className="card text-center">
                    <div className="card-body">
                    <Link to={"/user_story/list/" + story.id}>
                      <h4 className="card-title">{story.title}</h4>
                    </Link>
                    <h6 className="card-subtitle mb-2 text-muted">Sottotitolo</h6>
                      { chartUrl && <iframe
                      ref="iframe"
                      frameBorder={'0'}
                      style={iframeStyle}
                      src={chartUrl}
                    />
                    }
                    {
                    story.status==true &&
                    <div className="badge badge-success pull-right mt-20">PUBBLICATO</div>
                    }
                    {
                      !story.status &&
                      <div className="badge badge-default pull-right mt-20">IN BOZZA</div>
                    }
                  </div>
                </div>
              </div>
            
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
