import React from 'react'
import DOM from 'react-dom'
import Autocomplete from 'react-autocomplete'
import { serviceurl } from '../../config/serviceurl.js'

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value, data) {
  const escapedValue = escapeRegexCharacters(value.trim());
  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');
  return ontologiesFilter(data, regex);
}

function ontologiesFilter(semantics, regex){
      var res = [];

        if(semantics.length>0){
          semantics.forEach(function(entry) {
              var domainId = entry.universe.value
              var domain = entry.universe.domain.label[0].value
              var property = entry.universe.property.label[0].value
              var range = entry.universe.range.label[0].value
              entry.name = '[' + domain +'] '+ property +'; ('+ range +')' 
              res.push(entry);
        });
      }
      return res; 
}

class AutocompleteSemantic extends React.Component {

  state = {
    value: '',
    id: '',
    suggestions: [],
  }

  getSuggestion(input) {  
    var that = this;
    var token = '';
    var url = serviceurl.urlSemantic;

    var details = {
      'name': input + '*',
      'lang': 'it'
    };
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    if(localStorage.getItem('username') && localStorage.getItem('token') &&
      localStorage.getItem('username') != 'null' && localStorage.getItem('token') != 'null'){
        token = localStorage.getItem('token')
      }
      return fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formBody
      }).then(response => response.json())
      .then(json => {
        var test = getSuggestions(input, json)
        .map((entry, index) => ( 
          {'id': entry.universe.value, 'name' : entry.name, 'context': entry.contexts, 'subject': entry.universe.domain.id, 'predicate': entry.universe.property.id, 'rdf_object': entry.universe.range.id, 'uri_voc': entry.universe.range.controlledVocabularies&&entry.universe.range.controlledVocabularies.length>0?entry.universe.range.controlledVocabularies[0]:''}
          )
        )
        this.setSuggestion(test)
      })
  }

  setSuggestion(json){
    this.setState({ suggestions: json });
  }

  render() {
    const { label } = this.props;
    return (
      <div className="form-group row">
      <label className="col-sm-2 col-form-label">{label}</label>
      <div className="col-sm-10">
        <Autocomplete
          inputProps={{ id: 'states-autocomplete-semantic', name: this.props.input.name, type: 'text' }}
          wrapperStyle={{ display: 'block' }}
          value={this.state.value}
          items={this.state.suggestions}
          getItemValue={(item) => item.name}
          onSelect={(value, item) => {
            this.setState({ value, id: item.id, suggestions: [ item ] })
            this.props.addSemanticToForm(value, item.id, item.context, item.subject, item.predicate, item.rdf_object, item.uri_voc, this.props.index, this.props.wizard, this.props.dispatchAction, this.props.aggiornaStato)
          }}
          onChange={(event, value) => {
            this.setState({ value })
            if(value!==''){
              var suggestion = this.getSuggestion(value);
            }else{ 
              this.setState({ suggestions: [] });
              this.props.addSemanticToForm('', '', '', '', '', '', '', this.props.index, this.props.wizard, this.props.dispatchAction, this.props.aggiornaStato)
            }
          }}
          renderMenu={(children, index) => (
            <div className="menu" key={index} style={{position: 'relative', zIndex: 9999}}>              
              {children}
            </div>
          )}
          
          renderItem={(item, isHighlighted) => (
            <div className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
              key={item.name}>
              {(item.name)}
            </div>
          )}
        />
        </div>
      </div>
    )
  }
}

export default AutocompleteSemantic