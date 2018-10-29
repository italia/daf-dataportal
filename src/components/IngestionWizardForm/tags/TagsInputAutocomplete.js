import React from 'react'
import Autocomplete from '@celebryts/react-autocomplete-tags'

class TagsInputAutocomplete extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      suggestions: [],
      tags: []
    }
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
  }

  handleDelete(tag) {
        for(var i=0;i<this.state.tags.length;i++){    
            if(this.state.tags[i]==tag[0]) {
              this.state.tags.splice(i, 1);
            }
          }
        this.props.addTagsToForm(this.state.tags);
    }

    handleAddition(tag) {
        this.state.tags.push(tag.value);
        this.props.addTagsToForm(this.state.tags);
    }

  render(){
    return (
      <Autocomplete 
        className="autocomplete-tag-class"
        suggestions={this.state.suggestions}
        onChange={this.handleChange}
        onAdd={this.handleAddition}
        onDelete={this.handleDelete}
      />
    )
  }
}

export default TagsInputAutocomplete 
