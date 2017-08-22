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
      this.setState({
        userStories: list
      });
    });
  }


  /**
   * Render Function
   */
  render() {
    return (
    <Container>
      <Header title="Le Mie Storie" />
      <div>
        {
          this.state.userStories.map((story, index) => {
            return (
              <div key={index} className="user-story-card">
                <Link to={"/user_story/list/" + story.id}>
                  <h2 className="pull-left">
                    {story.title}
                  </h2>
                </Link>

                {
                  story.published==true &&
                  <div className="badge badge-success pull-right mt-20">PUBBLICATO</div>
                }
                {
                  !story.published &&
                  <div className="badge badge-default pull-right mt-20">IN BOZZA</div>
                }

                <div className="clearfix"></div>
              </div>
            
            )
          })
        }
      </div>
      <ListBar></ListBar>
    </Container>
    );
  }

}

export default UserStoryList;
