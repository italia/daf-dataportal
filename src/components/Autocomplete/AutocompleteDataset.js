import React, { Component } from 'react'
import Autosuggest from 'react-autosuggest';
import categoriesFile from '../../data/categories.js'
import { serviceurl } from '../../config/serviceurl.js'

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
    var that = this;
    var encodedString = '';
    var url = serviceurl.apiURLSecurity +'/ckan/autocompleteDataset?q=' + newValue;
    if(localStorage.getItem('username') && localStorage.getItem('encodedString') &&
      localStorage.getItem('username') != 'null' && localStorage.getItem('encodedString') != 'null'){
        encodedString = localStorage.getItem('encodedString')
      }
      return fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + encodedString
        }
      }).then(response => response.json())
        .then(json => this.receiveAutocomplete(json))
  }
  
  receiveAutocomplete(json){
    this.setState({ categories: json });
  }

  onChange = (event, { newValue, method }) => {
    this.loadCkanSuggestion(newValue);
    this.setState({
      value: newValue
    });
  };
  
  onSuggestionsFetchRequested = ({ value }) => {
    if(this.state.categories && this.state.categories.length >0)
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

