import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    search
} from '../../actions'
import { isPublic } from '../../utility';

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
        const { dispatch, filter, properties } = this.props;
        
        let newFilter = { }
        var org = []
        if(isPublic() && properties.domain!=='dataportal' && properties.domain!=='dataportal-private')
          org.push(properties.organization)
        if(window.location.hash.indexOf('search')===-1){
            newFilter = {
                'text': '',
                'index': [],
                'org': org,
                'theme':[],
                'date': "",
                'status': [],
                'order':"score"
            }
        }else{
            newFilter = filter?filter:{
                'text': '',
                'index': [],
                'org': org,
                'theme':[],
                'date': "",
                'status': [],
                'order':"score"
            }
        }

        newFilter.text = this.refs.auto.value.toLowerCase();
        this.props.history.push(isPublic()?'/search?q='+this.refs.auto.value:'/private/search?q='+this.refs.auto.value);
        dispatch(search(this.refs.auto.value, newFilter, isPublic()))
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

function mapStateToProps(state) {
    const { isFetching, results, query, filter } = state.searchReducer['search'] || { isFetching: false, results: []}
    const { properties } = state.propertiesReducer['prop'] || {}    
    return { filter, properties }
}

export default connect(mapStateToProps)(SearchBar)