import React, {Component} from 'react';
import AutosuggestQuery from './AutosuggestQuery'
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalClose,
    ModalBody,
    ModalFooter
  } from 'react-modal-bootstrap';
import QueryBuild from '../../views/Widgets/QueryBuild'

class Query extends Component {
    constructor(props){
        super(props)
        this.state = {
            isOpenQuery:false
        }
        this.handleSaveQuery = this.handleSaveQuery.bind(this)
        this.handleExecuteQuery = this.handleExecuteQuery.bind(this)
    }

    openModalQuery = () => {
        this.setState({
            isOpenQuery: true
        });
    }

    hideModalQuery = () => {
        this.setState({
            isOpenQuery: false
        });
    }

    handleSaveQuery = (e) => {
        e.preventDefault()
        this.setState({
            isOpenQuery: false
        });
    }

    handleExecuteQuery = (e) => {
        e.preventDefault()
        const { executeQuery, query } = this.props
        executeQuery(query)
    }

  render() {
    const { query, resultQuery, setQuery } = this.props;
    return (
      <div>
        
        <div className="form-group row">
            <label className="col-sm-2 col-form-label">Query</label>
            <div className="col-sm-10 col-form-label">
                {/* <div>
                    {query?
                        <span className="text-primary">{query}</span>
                    :
                        <span className="text-danger">Per poter creare un Dataset Derivato è necessario specificare una query.</span>
                    }
                </div> */}
                <QueryBuild onSubmit={setQuery} className=" "/>
            </div>
           {/*  <div className="col-sm-2">
                <button type="button" className="btn btn-link float-right" title="Aggiungi Query" onClick={this.openModalQuery.bind(this)}>
                    {query?<i className="fa fa-edit fa-lg m-t-2"></i>:<i className="fa fa-plus-circle fa-lg m-t-2"></i>}
                </button>
            </div> */}
        </div>
      </div>
    );
  }
}
export default Query