import React, { Component } from 'react';

// App components
import Container from './Container.jsx';
import ViewBar from './bar/ViewBar.jsx';
import UserStoryEditorContainer from './UserStoryEditorContainer.jsx';
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
      dataStory: undefined,
      widgets: undefined
    };

    //bind functions

    //load data
    

  }

  componentDidMount(){
    let response = isPublic()?userStoryService.getPbc(this.state.id):userStoryService.getPvt(this.state.id);
    response.then((story) => {
      try{
        console.log(story)
        var wids = JSON.parse(story.widgets)

        Object.keys(wids).map(wid => {
          if (wids[wid].props.wid_key.indexOf("TextWidget") != -1){
            wids[wid].type = TextWidget
            wids[wid].props.readOnly = true
          }
          else
            wids[wid].type = IframeWidget
        })

      }catch(error){console.log('error in getting story')}

      this.setState({
        dataStory: story,
        widgets: wids,
        loading: false,
      });

    });
  }

  /**
   * Render Function
   */
  render() {
    console.log(this.state.dataStory)
    return (this.state.loading?<h1 className="text-center fixed-middle"><i className="fas fa-circle-notch fa-spin mr-2" />Caricamento</h1>:
    <div className="container body">
      <div className="main_container">
      {
        this.state.dataStory &&
        <div>
          {!isPublic() &&
            <ViewBar
              story={this.state.dataStory} 
              pvt={this.state.dataStory.pvt} 
              org={this.state.dataStory.org} 
              title={this.state.dataStory.title} 
              id={this.state.id}>
            </ViewBar>
          }
          <UserStoryEditorContainer 
            dataStory={this.state.dataStory}
            widgets={this.state.widgets}
            readonly={true}
          />
        </div>
      }
      </div>
    </div>
    );
  }

}

export default UserStoryEditor;
