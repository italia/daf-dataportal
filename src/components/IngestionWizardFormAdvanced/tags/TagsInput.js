import React from 'react';
import './style.css';
import { WithOutContext as ReactTags } from 'react-tag-input';

class TagsInput extends React.Component {
    
    constructor(props) {
        super(props);
 
        this.state = {
            tags: [],
            suggestions: []
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
    }
 
    handleDelete(i) {
        let tags = this.state.tags;
        tags.splice(i, 1);
        this.setState({tags: tags});
        this.props.addTagsToForm(tags);
    }
 
    handleAddition(tag) {
        let tags = this.state.tags;
        tags.push({
            id: tags.length + 1,
            text: tag
        });
        this.setState({tags: tags});
        this.props.addTagsToForm(tags);
    }
 
     handleDrag(tag, currPos, newPos) {
        let tags = this.state.tags;
 
        // mutate array 
        tags.splice(currPos, 1);
        tags.splice(newPos, 0, tag);
 
        // re-render 
        this.setState({ tags: tags });
        this.props.addTagsToForm(tags);
    } 
 
    render() {
        const { tags, suggestions } = this.state;
        return (
                <ReactTags tags={tags}
                    suggestions={suggestions}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                    handleDrag={this.handleDrag} 
                    placeholder=""
                    name={this.props.name}
                    autofocus= {false} 
                    />
        )
    }
}

export default TagsInput 
 
