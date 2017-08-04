import React, { Component } from 'react'
import Autosuggest from 'react-autosuggest';
import ontologiesFile from '../../data/ontologies.js';

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value, ontologies, filterType) {
  const escapedValue = escapeRegexCharacters(value.trim());
  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');
  return ontologiesFilter(ontologies, regex);
}

function ontologiesFilter(ontologies, regex){
      var res = [];
      ontologies.forEach(function(entry) {
              //console.log('entry: ' + entry['http://www.w3.org/2000/01/rdf-schema#label']);
              var obj = entry['http://www.w3.org/2000/01/rdf-schema#label'];
              obj.forEach(function(lang) {
                //console.log('lang: ' + lang['xml:lang']);
                if(lang['xml:lang'] == 'it'){
                  //console.log('lang1: ' + lang['value']);
                  if(regex.test(lang['value'])){
                      //console.log('lang2: ' + lang['value']);
                      entry.name = lang['value'];
                      res.push(entry);
                  }
                }
              })
            });
      return res; 
}


function getSuggestionValue(suggestion) {
  return suggestion.name;
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.name}</span>
  );
}

class AutocompleteOntologies extends Component {
  constructor(props) {
    super(props);
    if(this.props.querystring)
      this.state = {
      value: this.props.querystring,
      suggestions: [],
      ontologies: []
    };    
    else
    this.state = {
      value: '',
      suggestions: [],
      ontologies: []
    };    
  }

  loadOntologies(newValue) {
    console.log('loadOntologies - newValue: ' + newValue);    
    var that = this;
    var url = 'http://stlab.istc.cnr.it/ontonethub/api/find';

    if(process.env.NODE_ENV=='development'){
      that.setState({ ontologies: ontologiesFile });
      }else {
        var details = {
            'name': newValue + '*',
            'lang': 'it'
        };
        var formBody = [];
        for (var property in details) {
          var encodedKey = encodeURIComponent(property);
          var encodedValue = encodeURIComponent(details[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        fetch(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: formBody
        })
        .then(function(response) {
          if (response.status >= 400) {
            throw new Error("Bad response from server");
          }
          return response.json();
        })
        .then(function(data) {
          that.setState({ ontologies: data.results });
        });
    }
  }

  onChange = (event, { newValue, method }) => {
    this.loadOntologies(newValue);
    this.setState({
      value: newValue
    });
  };
  
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value, this.state.ontologies, this.props.filterType)
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
      placeholder: "Inserisci criteri di ricerca",
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

export default AutocompleteOntologies