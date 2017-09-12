import React, { Component } from 'react';
import Components from 'react';

// App components
import Header from './Header';
import Container from './Container';
import UserStoryEditorContainer from './UserStoryEditorContainer';
import EditBarTop from './bar/EditBarTop';

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
    this.save = this.save.bind(this);
    this.onPublish = this.onPublish.bind(this);
    this.onRemove = this.onRemove.bind(this);
    
    //load data
    if (this.state.id) {
      let response = userStoryService.get(this.state.id);
      response.then((story) => {
        this.setState({
          dataStory: story
        });
      });
    } else {
      this.state.dataStory= {};
    }
  }

  save(story) {

      this.setState({
        saving: true
      });
      
      userStoryService.save(story).then((data)=> {
        this.setState({
          saving: false
        })
      })

  }

  /**
   * onPublish
   */
  onPublish(published){
    this.state.dataStory.published = published;
    this.save(this.state.dataStory);
  }

  /**
   * onRemove
   */
  onRemove() {
    userStoryService.remove(this.state.dataStory.id).then(() => {
      window.location = '#/user_story/list';
    })
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
          <EditBarTop 
              title={this.state.dataStory.title}
              onPublish={this.onPublish}
              id={this.state.dataStory.id}
              status={this.state.dataStory.status}
              onRemove={this.onRemove}
              saving={this.state.saving}
          ></EditBarTop>
          <UserStoryEditorContainer 
            dataStory={this.state.dataStory} 
            onChange={this.save}
          />
        </div>
      }
    </Container>
    );
  }

}

export default UserStoryEditor;
