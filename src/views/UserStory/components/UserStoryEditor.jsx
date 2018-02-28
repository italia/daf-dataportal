import React, { Component } from 'react';
import Components from 'react';

// App components
import Header from './Header';
import Container from './Container';
import UserStoryEditorContainer from './UserStoryEditorContainer';
import EditBarTop from './bar/EditBarTop';
import IframeWidget from './widgets/IframeWidget';
import TextWidget from './widgets/TextWidget';

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
        let wids = JSON.parse(story.widgets)

        Object.keys(wids).map(wid => {
          if (wids[wid].props.wid_key.indexOf("TextWidget")!=-1){
            /* wids[wid].props.onSave = this.saveTextWidget.bind(this) */
            wids[wid].type = TextWidget
            wids[wid].props.readOnly = false
          }else
            wids[wid].type = IframeWidget
        })

        this.setState({
          dataStory: story,
          widgets: wids
        });
      });
    } else {
      this.state.dataStory= {};
    }
  }


  /**
   * Save text of TextWidget
   */
  saveTextWidget = function (key, html) {
    this.state.widgets[key].props.text = html;
    this.save();
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
    {this.state.dataStory &&
      <div>
      <Header title="La Tua Storia" org={this.state.dataStory.org} pvt={this.state.dataStory.pvt}/>
          <EditBarTop 
              title={this.state.dataStory.title}
              onPublish={this.onPublish}
              id={this.state.dataStory.id}
              status={this.state.dataStory.published}
              onRemove={this.onRemove}
              saving={this.state.saving}
              pvt={this.state.dataStory.pvt}
          ></EditBarTop>
          <UserStoryEditorContainer 
            dataStory={this.state.dataStory} 
            onChange={this.save}
            widgets={this.state.widgets}
            readonly={false}
          />
      </div>
      }    
    </Container>
  
    );
  }

}

export default UserStoryEditor;
