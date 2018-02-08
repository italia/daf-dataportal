import React, { Component } from 'react';
import Components from 'react';

import SectionTitle from './SectionTitle';
import TextEditor from './editor/TextEditor';
import TextWidget from '../../DashboardManager/components/widgets/TextWidget';
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

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataStory : nextProps.dataStory
    });
  }

  onChange = function(key, value) {
    this.state.dataStory[key] = value;
    this.state.dataStory['timestamp'] = new Date(); 
    if(this.props.onChange)
      this.props.onChange(this.state.dataStory);
  }

  /**
   * Render Function
   */
  render() {
    return (
    <div className="story-content">
        <SectionTitle readonly={this.props.readonly} title="Titolo"/>
        <TextEditor 
          readonly={this.props.readonly}
          keyValue="title"
          text={this.state.dataStory.title} 
          className="text-editor-title"
          onChange={this.onChange}
          placeholder="Title"
          disableHtml={true}
        ></TextEditor>
        
        <SectionTitle readonly={this.props.readonly} title="Sottotitolo"/>
        <TextEditor 
          readonly={this.props.readonly}
          keyValue="subtitle"
          text={this.state.dataStory.subtitle} 
          className="text-editor-subtitle"
          onChange={this.onChange}
          placeholder="Subtitle"
        ></TextEditor>
        <ProfileView></ProfileView>

        <SectionTitle readonly={this.props.readonly} title="Grafico"/>
        <GraphEditor 
          readonly={this.props.readonly}
          keyValue="graph1"
          graph={this.state.dataStory.graph1}
          onChange={this.onChange}
          org={this.state.dataStory.org}
        ></GraphEditor>

        <SectionTitle readonly={this.props.readonly} title="La Tua Storia"/>
        <TextEditor 
          readonly={this.props.readonly}
          keyValue="text"
          text={this.state.dataStory.text} 
          className="text-editor-content"
          onChange={this.onChange}
          placeholder="Tell your story..."
        ></TextEditor>

        <SectionTitle readonly={this.props.readonly} title="Grafico"/>
        <GraphEditor 
          readonly={this.props.readonly}
          keyValue="graph2"
          graph={this.state.dataStory.graph2}
          onChange={this.onChange}
          org={this.state.dataStory.org}
        ></GraphEditor>

        <SectionTitle readonly={this.props.readonly} title="Footer"/>
        <TextEditor 
          readonly={this.props.readonly}
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
