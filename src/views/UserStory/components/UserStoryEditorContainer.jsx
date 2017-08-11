import React, { Component } from 'react';
import Components from 'react';

import SectionTitle from './SectionTitle';
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
    <div className="story-content">

        <SectionTitle title="Titolo"/>
        <TextEditor text={this.state.dataStory.title} size="title"></TextEditor>
        
        <SectionTitle title="Sottotitolo"/>
        <TextEditor text={this.state.dataStory.subtitle} size="subtitle"></TextEditor>
        <ProfileView></ProfileView>

        <SectionTitle title="Grafico"/>
        <GraphEditor graph={this.state.dataStory.graph}></GraphEditor>

        <SectionTitle title="La Tua Storia"/>
        <TextEditor text={this.state.dataStory.text} size="content"></TextEditor>

        <SectionTitle title="Immagine"/>
        <ImageEditor image_caption={this.state.dataStory.image_caption} image_url={this.state.dataStory.image_url}></ImageEditor>
        
        <SectionTitle title="Footer"/>
        <TextEditor text={this.state.dataStory.footer} size="footer"></TextEditor>
        
    </div>
    );
  }

}

export default UserStoryEditorContainer;
