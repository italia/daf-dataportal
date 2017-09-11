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
    if(!this.state.saving) {

      if (!this.state.dataStory.id)
        this.state.saving = true;

      const response = userStoryService.save(story);

      response.then((data)=> {
        this.state.saving = false;
        
        if(!this.state.dataStory.id) {
          this.state.dataStory.id = data.message;
          this.setState({
            dataStory: this.state.dataStory
          })
        }

        if (this.state.resave ) {
          this.state.resave = false;
          this.save(this.state.dataStory);
        }
      })
    } else {
      this.state.resave = true;
    }

  }

  /**
   * onChangeTitle
   */
  onChangeTitle(title){
    this.state.dataStory.title = title;
    this.setState({
      dataStory: this.state.dataStory
    })
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
              onChange={this.onChangeTitle}
              onPublish={this.onPublish}
              id={this.state.dataStory.id}
              published={this.state.dataStory.published}
              onRemove={this.onRemove}
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
