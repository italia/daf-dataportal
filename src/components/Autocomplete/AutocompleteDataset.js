import React from 'react'
import DOM from 'react-dom'
import Autocomplete from 'react-autocomplete'
import { serviceurl } from '../../config/serviceurl.js'

class AutocompleteDataset extends React.Component {

  state = {
    value: '',
    suggestions: [],
  }

  loadCkanSuggestion(newValue) {  
    var that = this;
    var token = '';
    var url = serviceurl.apiURLCatalog +'/ckan/autocompleteDataset?q=' + newValue;
    if(localStorage.getItem('username') && localStorage.getItem('token') &&
      localStorage.getItem('username') != 'null' && localStorage.getItem('token') != 'null'){
        token = localStorage.getItem('token')
      }
      return fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      }).then(response => response.json())
        .then(json => this.receiveAutocomplete(json))
  }

  receiveAutocomplete(json){
    this.setState({ suggestions: json });
  }

  render() {
    return (
        <Autocomplete
          inputProps={{ id: 'states-autocomplete' }}
          wrapperStyle={{ position: 'relative', display: 'inline-block' }}
          value={this.state.value}
          items={this.state.suggestions}
          getItemValue={(item) => item.name}
          onSelect={(value, item) => {
            // set the menu to only the selected item
            this.setState({ value, suggestions: [ item ] })
            // or you could reset it to a default list again
            // this.setState({ suggestions: getStates() })
          }}
          onChange={(event, value) => {
            console.log('value' + value)
            this.setState({ value })
            if(value!=='')
                this.loadCkanSuggestion(value);
            else this.setState({ suggestions: [] });
          }}
          renderMenu={children => (
            <div className="menu">
              {children}
            </div>
          )}
          renderItem={(item, isHighlighted) => (
            <div className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
              key={item.name}
            >{item.name}</div>
          )}
        />
    )
  }
}

export default AutocompleteDataset