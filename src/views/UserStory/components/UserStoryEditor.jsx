import React, { Component } from 'react';
import Components from 'react';

// App components
import Header from './Header';
import Container from './Container';
import UserStoryEditorContainer from './UserStoryEditorContainer';


class UserStoryEditor extends Component {
  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
  }

  dataStory = {
    title: "",
    subtitle: "",
    graph: {
      title: "",
      props: {
        url: null
      }
    },
    text: "",
    image: {
      url: "https://theclayblog.files.wordpress.com/2013/03/this-is-my-story-2.jpg",
      caption: ""
    },
    footer: ""
  }

  save(value) {
    console.log(value);
  }

  /**
   * Render Function
   */
  render() {
    return (
    <Container>
      <Header />
      <UserStoryEditorContainer 
        dataStory={this.dataStory} 
        onChange={this.save}
      />
    </Container>
    );
  }

}

export default UserStoryEditor;
