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

    this.onChange = this.onChange.bind(this);
  }

  onChange = function(key, value) {
    this.state.dataStory[key] = value;
    if(this.props.onChange)
      this.props.onChange(this.state.dataStory);
  }

  /**
   * Render Function
   */
  render() {
    return (
    <div className="story-content">

        <SectionTitle title="Titolo"/>
        <TextEditor 
          keyValue="title"
          text={this.state.dataStory.title} 
          className="text-editor-title"
          onChange={this.onChange}
          placeholder="Title"
        ></TextEditor>
        
        <SectionTitle title="Sottotitolo"/>
        <TextEditor 
          keyValue="subtitle"
          text={this.state.dataStory.subtitle} 
          className="text-editor-subtitle"
          onChange={this.onChange}
          placeholder="Subitle"
        ></TextEditor>
        <ProfileView></ProfileView>

        <SectionTitle title="Grafico"/>
        <GraphEditor 
          keyValue="graph"
          graph={this.state.dataStory.graph}
          onChange={this.onChange}
        ></GraphEditor>

        <SectionTitle title="La Tua Storia"/>
        <TextEditor 
          keyValue="text"
          text={this.state.dataStory.text} 
          className="text-editor-content"
          onChange={this.onChange}
          placeholder="Tell your story..."
        ></TextEditor>

        <SectionTitle title="Immagine"/>
        <ImageEditor 
          keyValue="image"
          image={this.state.dataStory.image} 
          onChange={this.onChange}
        ></ImageEditor>
        
        <SectionTitle title="Footer"/>
        <TextEditor 
          keyValue="footer"
          text={this.state.dataStory.footer} 
          className="text-editor-footer"
          onChange={this.onChange}
          placeholder="Footer"
        ></TextEditor>
        
    </div>
    );
  }

}

export default UserStoryEditorContainer;
