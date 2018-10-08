import React from 'react';
import Autosuggest from 'react-autosuggest';

function getSuggestions(value) {

  return [
    { name: 'bandiegare2017' },
    { name: 'test_demo_1' },
    { name: 'test_post_armageddon_4' },
    { name: 'banca_dati_servizio_contratti_pubblici__scp__avvisi' },
    { name: 'test_post_armageddon_hdfs_1' },
    { name: 'test_new_security_webhdfs_105' },
  ];
}

function renderSuggestion(suggestion) {
  return <span>{suggestion.name}</span>;
}

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

export default class AutosuggestQuery extends React.Component {

  constructor() {
    super();
    this.state = {
      value: '',
      suggestions: [],
    };
  }

 /*  OnSuggestionHighlighted  = (event, { newValue }) =>{
    console.log('OnSuggestionHighlighted')
    } */

   onChange = (event, { newValue }) =>{
    this.setState({ value: newValue });
    const { setQuery } = this.props;
    setQuery(newValue)
  } 

  onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) =>{
    const { setQuery } = this.props;
    var queryStr = this.state.value + ' ' +  suggestionValue
    setQuery(queryStr)
    this.setState({
        value: queryStr
    })
  };
  
  onSuggestionsFetchRequested = ({ value }) => {
    if(value.toLowerCase().endsWith('from') || value.toLowerCase().endsWith('join')){
        this.setState({ suggestions: getSuggestions(value),
                        value: value
                        })
    }else{
        this.setState({ suggestions: [],
                        value: value
                        })
        }
    };
  
  onSuggestionsClearRequested = () =>
    this.setState({ suggestions: [] });

  render() {
    const { value, suggestions } = this.state;    
    const { query } = this.props; 
    const inputProps = {
      placeholder: '',
      onChange: this.onChange,
      value,
    };

    return (
        
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        onSuggestionSelected={this.onSuggestionSelected}
        value={query}
        style={{heigth: '100px'}}
        />
    );
  }
}