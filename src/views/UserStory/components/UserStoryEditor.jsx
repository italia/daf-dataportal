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
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onPublish = this.onPublish.bind(this);
    
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

  save(value) {
    console.log(value);
  }

  /**
   * onChangeTitle
   */
  onChangeTitle(title){
    this.state.dataStory.title = title;
    this.save(this.state.dataStory);
  }

  /**
   * onPublish
   */
  onPublish(published){
    this.state.dataStory.published = published;
    this.save(this.state.dataStory);
  }

  /**
   * Render Function
   */
  render() {
    return (
    <Container>
      <Header />
      {
        this.state.dataStory &&
        <div>
          <EditBarTop 
              title={this.state.dataStory.title}
              onChange={this.onChangeTitle}
              onPublish={this.onPublish}
              id={this.state.dataStory.id}
              published={this.state.dataStory.published}
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
