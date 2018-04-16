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

        this.handleLoadDatasetClick = this.handleLoadDatasetClick.bind(this)
    }

    componentDidMount(){
        this.refs.auto.focus()
    }

    handleLoadDatasetClick(event) {
        event.preventDefault();
        const { dispatch, selectDataset } = this.props;
/*         dispatch(loadDatasets(this.refs.auto.value, 0, '', '', '', '', 'metadata_modified%20desc'))
        .then(json => {
            this.props.history.push('/dataset');
        }) */
        var dataset = window.location.hash.indexOf('dataset')!==-1
        if(this.refs.auto.value!==''){
            let filter = {
                'text': this.refs.auto.value.toLowerCase(),
                'index': dataset?['catalog_test']:[],
                'org': [],
                'theme':[],
                'date': "",
                'status': [],
                'order':""
            }

            dispatch(search(this.refs.auto.value, filter))
            .then(json => {
                if(!dataset) 
                    this.props.history.push('/search?q='+this.refs.auto.value);
                if(dataset)
                    this.props.history.push('/dataset?q='+this.refs.auto.value);
            })
        }
        /* this.props.history.push('/dataset?q='+this.refs.auto.value) */
    }

    render(){
        const { open } = this.props

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
    loggedUser: PropTypes.object,
    value: PropTypes.string
}

function mapStateToProps(state) {
    const { loggedUser } = state.userReducer['obj'] || {}
    return { loggedUser }
}

export default connect(mapStateToProps)(SearchBar)