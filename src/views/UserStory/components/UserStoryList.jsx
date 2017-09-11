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
      
      <ListBar history={this.props.history} ></ListBar>

      <div className="row">
        {
          this.state.userStories.map((story, index) => {
            return (
              <div className="col-sm-4" key={index}>
                <div className="card text-center">
                    <div className="card-body">
                    <Link to={"/user_story/list/" + story.id}>
                      <h4 className="card-title">{story.title}</h4>
                    </Link>
                    <h6 className="card-subtitle mb-2 text-muted">Sottotitolo</h6>
                    <img className="card-img-bottom" src="../../../img/logo.png" alt="Card image cap"/>
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
    </Container>
    );
  }

}

export default UserStoryList;
