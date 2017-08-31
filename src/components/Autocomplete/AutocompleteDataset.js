import React, { Component } from 'react'
import Autosuggest from 'react-autosuggest';
import categoriesFile from '../../data/categories.js'

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value, categories, filterType) {
  const escapedValue = escapeRegexCharacters(value.trim());
  if (escapedValue === '') {
    return [];
  }
  const regex = new RegExp('^' + escapedValue, 'i');
  return categories.filter(category => regex.test(category.name));
}

function getSuggestionValue(suggestion) {
  return suggestion.title;
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.title}</span>
  );
}

class AutocompleteDataset extends Component {
  constructor(props) {
    super(props);
    if(this.props.querystring)
      this.state = {
      value: this.props.querystring,
      suggestions: [],
      categories: []
    };    
    else
    this.state = {
      value: '',
      suggestions: [],
      categories: []
    };    
  }

  loadCkanSuggestion(newValue) {
    console.log('loadCkanSuggestion - newValue: ' + newValue);    
    var that = this;
    var url = 'http://91.206.129.236:5000/api/3/action/package_autocomplete?q=' + newValue;

    if(process.env.NODE_ENV=='development'){
        that.setState({ categories: categoriesFile });
      }else {
        fetch(url, {
          method: 'GET'
        })
        .then(function(response) {
          if (response.status >= 400) {
            throw new Error("Bad response from server");
          }
          return response.json();
        })
        .then(function(data) {
          that.setState({ categories: data.result });
        });
    }
  }

  onChange = (event, { newValue, method }) => {
    console.log('onchange !!!')
    this.loadCkanSuggestion(newValue);
    this.setState({
      value: newValue
    });
  };
  
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value, this.state.categories, this.props.filterType)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Inserisci criteri",
      value,
      onChange: this.onChange
    };

    return (
           <Autosuggest 
              suggestions={suggestions}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={inputProps} />
 
    );
  }
}

export default AutocompleteDataset

