import React, { Component } from 'react';
import Components from 'react';

// App components
import Header from './Header';
import Container from './Container';
import ViewBar from './bar/ViewBar';
import UserStoryEditorContainer from './UserStoryEditorContainer';
import IframeWidget from './widgets/IframeWidget';
import TextWidget from './widgets/TextWidget';
import { isPublic } from '../../../utility'

// SERVICES
import UserStoryService from './services/UserStoryService';

const userStoryService = new UserStoryService();


class UserStoryEditor extends Component {
  constructor(props) {
    super(props);
    
    //init state
    this.state={
      id: this.props.match.params.id,
      loading: true,
    };

    //bind functions

    //load data
    let response = userStoryService.get(this.state.id);
    response.then((story) => {
      try{
      let wids = JSON.parse(story.widgets)

      Object.keys(wids).map(wid => {
        if (wids[wid].props.wid_key.indexOf("TextWidget") != -1){
          wids[wid].type = TextWidget
          wids[wid].props.readOnly = true
        }
        else
          wids[wid].type = IframeWidget
      })

      this.setState({
        dataStory: story,
        widgets: wids,
        loading: false,
      });
      /* this.setState({
        dataStory: story
      }); */
    }catch(error){console.log('error in getting story')}
    });

  }

  /**
   * Render Function
   */
  render() {
    console.log(this.state.dataStory)
    return (this.state.loading?<h1 className="text-center fixed-middle"><i className="fas fa-circle-notch fa-spin mr-2" />Caricamento</h1>:
    <Container>
      {
        this.state.dataStory &&
        <div>
        {/* <Header title="Storia" org={this.state.dataStory.org} pvt={this.state.dataStory.pvt}/> */}
          {!isPublic() &&
            <ViewBar title={this.state.dataStory.title} id={this.state.id}></ViewBar>
          }
          <UserStoryEditorContainer 
            dataStory={this.state.dataStory}
            widgets={this.state.widgets}
            readonly={true}
          />
        </div>
      }
    </Container>
    );
  }

}

export default UserStoryEditor;
