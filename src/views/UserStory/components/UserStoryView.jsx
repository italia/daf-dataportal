import React, { Component } from 'react';
import Components from 'react';

// App components
import Header from './Header';
import Container from './Container';
import ViewBar from './bar/ViewBar';
import UserStoryEditorContainer from './UserStoryEditorContainer';

// SERVICES
import UserStoryService from './services/UserStoryService';

const userStoryService = new UserStoryService();


class UserStoryEditor extends Component {
  constructor(props) {
    super(props);
    
    //init state
    this.state={
      id: this.props.match.params.id
    };

    //bind functions

    //load data
    let response = userStoryService.get(this.state.id);
    response.then((story) => {
      this.setState({
        dataStory: story
      });
    });

  }

  /**
   * Render Function
   */
  render() {
    return (
    <Container>
      <Header title="La Tua Storia" />
      {
        this.state.dataStory &&
        
        <div>
          <ViewBar title={this.state.dataStory.title} id={this.state.id}></ViewBar>
      
          <UserStoryEditorContainer 
            dataStory={this.state.dataStory}
            readonly={true}
          />
        </div>
      }
    </Container>
    );
  }

}

export default UserStoryEditor;
