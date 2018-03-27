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
      // CNR
/*       semantics.forEach(function(entry) {
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
            }); */
        
        semantics.forEach(function(entry) {
          //if(regex.test(entry.label[0].value)){
          //console.log('value: ' + entry.label[0].value);
          //console.log('ontology: ' + entry['label.ontology'][0].value)

/*        var label = entry.label?entry.label[0].value:''
          var ontology = entry['label.ontology']?entry['label.ontology'][0].value:''
          entry.name = label + ' [' + ontology + ']'; */
            
          var ontology = entry.ontology.label[0].value
          var universe = entry.universe.domain.label[0].value
          var property = entry.universe.property.label[0].value
          var range = entry.universe.range.label[0].value

          var name = ontology + ';'+ universe +';'+ property +';'+ range
          entry.label='label'
          entry.name=name
            
            res.push(entry);
        //}
      });
      return res; 
}

class AutocompleteSemantic extends React.Component {

  state = {
    value: '',
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
        .map((item, index) =>( {'id': 'c_' + index, 'name' : item.name }))
        this.setSuggestion(test)
      })
  }

  setSuggestion(json){
    this.setState({ suggestions: json });
  }

  render() {
    return (
      <div className="form-group row">
      <label className="col-md-3 form-control-label">Concetto Semantico</label>
     <div className="col-md-9">
        <Autocomplete
          inputProps={{ id: 'states-autocomplete-semantic', name: this.props.input.name, type: 'text' }}
          wrapperStyle={{ position: 'relative', display: 'block' }}
          value={this.state.value}
          items={this.state.suggestions}
          getItemValue={(item) => item.name}
          onSelect={(value, item) => {
            this.setState({ value, suggestions: [ item ] })
            this.props.addSemanticToForm(value)
          }}
          onChange={(event, value) => {
            this.setState({ value })
            if(value!==''){
              var suggestion = this.getSuggestion(value);
            }else{ 
              this.setState({ suggestions: [] });
            }
          }}
          renderMenu={children => (
            <div className="menu">
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