import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Select from 'react-select';
import fetch from 'isomorphic-fetch';
import { serviceurl } from '../../config/serviceurl.js'

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
      // CNR
      //ontologies.forEach(function(entry) {
      //        //console.log('entry: ' + entry['http://www.w3.org/2000/01/rdf-schema#label']);
      //        var obj = entry['http://www.w3.org/2000/01/rdf-schema#label'];
      //        obj.forEach(function(lang) {
      //          //console.log('lang: ' + lang['xml:lang']);
      //          if(lang['xml:lang'] == 'it'){
      //            //console.log('lang1: ' + lang['value']);
      //            if(regex.test(lang['value'])){
      //                //console.log('lang2: ' + lang['value']);
      //                entry.name = lang['value'];
      //                res.push(entry);
      //            }
      //          }
      //        })
      //      });
      
      ontologies.forEach(function(entry) {
        console.log('entry: ' + entry.label[0].value);
        if(regex.test(entry.label[0].value)){
            //console.log('value: ' + entry.label[0].value);
            //console.log('ontology: ' + entry['label.ontology'][0].value)
            entry.name = entry.label[0].value + ' [' + entry['label.ontology'][0].value + ']';
            res.push(entry);
        }
      });
      
      return res; 
}


const TestSelect2 = createClass({
	displayName: 'Ontologies',
	propTypes: {
		label: PropTypes.string,
	},
	getInitialState () {
		return {
			backspaceRemoves: true,
			multi: false
		};
	},
	onChange (value) {
		this.setState({
			value: value,
		});
	},
	switchToMulti () {
		this.setState({
			multi: true,
			value: [this.state.value],
		});
	},
	switchToSingle () {
		this.setState({
			multi: false,
			value: this.state.value ? this.state.value[0] : null
		});
	},
	getUsers (input) {
		if (!input) {
			return Promise.resolve({ options: [] });
		}

		return fetch(`https://api.github.com/search/users?q=${input}`)//fetch(`https://api.github.com/search/users?q=${input}`)
		.then((response) => response.json())
		.then((json) => {
			return { options: json.items };
		});
    },
   loadOntologies(input) {
    if (!input) {
		return Promise.resolve({ options: [] });
	}
    console.log('loadOntologies - newValue: ' + input);    
    var that = this;
    var url = serviceurl.urlSemantic;

   // if(process.env.NODE_ENV=='development'){
   //   that.setState({ ontologies: ontologiesFile });
   //   }else {
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

        return fetch(url, {
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
          var test = getSuggestions(input, data.results)
            .map((item, index) =>( {'id': 'c_' + index, 'login' : item.name }))
          return { options: test };
        });
 //   }
  },
	gotoUser (value, event) {
		window.open(value.html_url);
	},
	toggleBackspaceRemoves () {
		this.setState({
			backspaceRemoves: !this.state.backspaceRemoves
		});
	},
	toggleCreatable () {
		this.setState({
			creatable: !this.state.creatable
		});
	},
	render () {
		const AsyncComponent = this.state.creatable
			? Select.AsyncCreatable
			: Select.Async;

		return (
              <div className="form-group row">
    <label className="col-md-3 form-control-label">Concetto Semantico</label>
   <div className="col-md-9">
                <AsyncComponent multi={this.state.multi} 
                value={this.state.value} 
                onChange={this.onChange} 
                onValueClick={this.gotoUser}
                onBlur = {() => this.props.input.onBlur(this.state.value) } 
                valueKey="id" 
                labelKey="login" 
               // loadOptions={this.getUsers} 
                loadOptions={this.loadOntologies}
                backspaceRemoves={this.state.backspaceRemoves} />
                </div>
                </div>
		);
	}
});

export default TestSelect2