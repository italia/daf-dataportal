import React, { Component, PropTypes } from 'react'
import fetch from 'isomorphic-fetch';
import Select from 'react-select'
import 'react-select/dist/react-select.css';
 
class TestSelectDomain extends Component {
    constructor(props) {
        super(props)
        this.url = this.props.url
    }

    getOptions() {
      return fetch(this.url,{headers:  {'Authorization': 'Bearer ' + localStorage.getItem('token')}})
		.then((response) => response.json())
		.then((json) => {
            var result = json.map(function(item){
                return {value : item.key, label: item.value}
            })
            var result2 = json.map( x =>  ({value : x.key, label: x.value}))
			return { options: result2}
		});
        
    }
    onChange(event) {
        // console.log(event)
        if (this.props.input.onChange && event != null) {
            // To be aligned with how redux-form publishes its CHANGE action payload. The event received is an object with 2 keys: "value" and "label"
            this.props.input.onChange(event.value);
        } else {
            // Clear the input field
            this.props.input.onChange(null)
        }
    }
 
    render() {
        return ( 
            <Select.Async {...this.props }
            value = { this.props.input.value || '' }
            onBlur = {() => this.props.input.onBlur(this.props.input.value) }
            onChange = { this.onChange.bind(this) }
            loadOptions = { this.getOptions.bind(this) }
            />
        );
    }
}
 
export default TestSelectDomain;
