import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { search } from '../../actions'
import { serviceurl } from '../../config/serviceurl'
import { boldMyWords } from '../../utility'

class DatasetList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            order_filter: props.history.location.state?props.history.location.state.order_filter:'metadata_modified%20desc',
            category_filter: props.history.location.state && props.history.location.state.category_filter,
            group_filter: props.history.location.state && props.history.location.state.group_filter,
            organization_filter: props.history.location.state && props.history.location.state.organization_filter,
        }
        this.searchAll = this.searchAll.bind(this)  
        this.handleLoadDatasetDetailClick = this.handleLoadDatasetDetailClick.bind(this)
    }

    componentDidMount() {
        const { query } = this.props
        this.searchAll(query)

    }

    searchAll(query){
        const { dispatch } = this.props
        dispatch(search(query))
    }

    handleLoadDatasetDetailClick(name, e) {
        e.preventDefault()
        this.setState({
          edit: false
        })
        const { dispatch, query } = this.props
        const { order_filter, category_filter, organization_filter, group_filter } = this.state
        this.props.history.push({
          pathname: '/dataset/'+name,
          state: {'query': query,
                  'category_filter': category_filter,
                  'organization_filter': organization_filter,
                  'order_filter': order_filter,
                  'group_filter': group_filter
          }
        })
      }

    render() {
        const { results, isFetching } = this.props
        return isFetching === true ? <h1 className="text-center fixed-middle"><i className="fa fa-circle-o-notch fa-spin mr-2" />Loading</h1> : (
            <div className="row u-textCenter u-padding-r-all u-textCenter">
                <div className="col-md-8">
                    {results.map((result, index) => {
                         switch(result.type){
                            case 0: return(
                                            <div className="card" key={index}>
                                                <div className="card-body">
                                                    <div className="row" >
                                                        <div className="col-md-1" >
                                                            <i className="fa fa-table fa-lg"></i>
                                                        </div>
                                                        <div className="col-md-9" >
                                                            {result.dcatapit.title}
                                                        </div>
                                                        <div className="col-md-2" >
                                                            {result.operational.group_own}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                    );
                                    break;
                            case 1: return(
                                        <div className="card" key={index}>
                                            <div className="card-body">
                                                <div className="row" >
                                                    <div className="col-md-1" >
                                                        <i className="fa fa-columns fa-lg"></i>
                                                    </div>
                                                    <div className="col-md-9" >
                                                        {result.title}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                    break;
                            case 2: return(
                                    <div className="card" key={index}>
                                        <div className="card-body">
                                            <div className="row" >
                                                <div className="col-md-1" >
                                                    <i className="fa fa-font fa-lg"></i>
                                                </div>
                                                <div className="col-md-9" >
                                                    {result.title}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    )
                            break;         
                            }
                        })
                    }
                </div>
            </div>
        )
    }
}

 /* return (
    <div className="card" key={result.dcatapit.title}>
        <div className="card-body">
            <div className="row" >
                <div className="col-md-1" >
                    <i className="fa fa-table fa-lg"></i>
                </div>
                <div className="col-md-9" >
                    {result.dcatapit.title}
                </div>
                <div className="col-md-2" >
                    {result.operational.group_own}
                </div>
            </div>
        </div>
    </div>
    ); */

DatasetList.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    results: PropTypes.array
}

function mapStateToProps(state) {
    const { isFetching, results } = state.searchReducer['search'] || { isFetching: true, results: [] }
    return { isFetching, results }
}

export default connect(mapStateToProps)(DatasetList)