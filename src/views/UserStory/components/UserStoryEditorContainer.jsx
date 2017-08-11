import React, { Component } from 'react';
import Components from 'react';

import TextEditor from './editor/TextEditor';
import ProfileView from './editor/ProfileView';
import GraphEditor from './editor/GraphEditor';
import ImageEditor from './editor/ImageEditor';

class UserStoryEditorContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataStory: props.dataStory
    };

  }

  /**
   * Render Function
   */
  render() {
    return (
    <div>
        <TextEditor text={this.state.dataStory.title} size="title"></TextEditor>
        <TextEditor text={this.state.dataStory.subtitle} size="subtitle"></TextEditor>
        <ProfileView></ProfileView>
        <GraphEditor graph={this.state.dataStory.graph}></GraphEditor>
        <TextEditor text={this.state.dataStory.text} size="content"></TextEditor>
        <ImageEditor image_caption={this.state.dataStory.image_caption} image_url={this.state.dataStory.image_url}></ImageEditor>
        <TextEditor text={this.state.dataStory.footer} size="footer"></TextEditor>
    </div>
    );
  }

}

export default UserStoryEditorContainer;
