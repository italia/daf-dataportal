import React, { Component } from 'react';
import { Dropdown, DropdownMenu, DropdownItem } from 'reactstrap';
import PropTypes from 'prop-types'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import {
    loadDatasets,
    unloadDatasets,
    datasetDetail,
    logout,
    search
} from '../../actions'
import { createBrowserHistory } from 'history';
import AutocompleteDataset from '../Autocomplete/AutocompleteDataset.js'

class SearchBar extends Component{
    constructor(props){
        super(props)
        this.state={
            open: props.open
        }

        this.handleLoadDatasetClick = this.handleLoadDatasetClick.bind(this)
    }

    componentDidMount(){
        this.refs.auto.focus()
    }

    handleLoadDatasetClick(event) {
        event.preventDefault();
        const { dispatch, filter } = this.props;
        
        let newFilter = { }

        if(window.location.hash.indexOf('dataset')!==-1){
            newFilter = {
                'text': '',
                'index': [],
                'org': [],
                'theme':[],
                'date': "",
                'status': [],
                'order':"desc"
            }
        }else{
            newFilter = filter?filter:{
                'text': '',
                'index': [],
                'org': [],
                'theme':[],
                'date': "",
                'status': [],
                'order':"desc"
            }
        }

        newFilter.text = this.refs.auto.value.toLowerCase();
        this.props.history.push('/search?q='+this.refs.auto.value);
        dispatch(search(this.refs.auto.value, newFilter))
    }

    render(){
        const { open } = this.state

        let revealed = open ? "revealed" : ""

        return(
            <div className={"search-bar " + revealed}>
                <form onSubmit={this.handleLoadDatasetClick}>
                    <div className="input-group">
                        {/* <div className="input-group-prepend">
                            <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-expanded="false"></button>
                        </div> */}
                        <input className="search-input form-control" placeholder="Cosa stai cercando?" ref="auto" name="s" id="inlineFormInputGroup" type="text"/>
                    </div>
                </form>
            </div>
        )
    }
}

SearchBar.propTypes = {
    filter: PropTypes.object,
    query: PropTypes.string,
    results: PropTypes.array,
}

function mapStateToProps(state) {
    const { isFetching, results, query, filter } = state.searchReducer['search'] || { isFetching: false, results: []}
    return { filter }
}

export default connect(mapStateToProps)(SearchBar)