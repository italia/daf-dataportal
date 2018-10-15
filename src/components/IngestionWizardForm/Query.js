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
        <Modal isOpen={this.state.isOpenQuery} onRequestHide={this.hideModalQuery}>
          <form>
            <ModalHeader>
              <ModalTitle>Dataset Derivato</ModalTitle>
              <ModalClose onClick={this.hideModalQuery}/>
            </ModalHeader>
            <ModalBody>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Query</label>
                    <div className="col-sm-10">
                    {/* <textarea type='text' className="form-control" ref='query' id="query" /> */}
                    <AutosuggestQuery className="form-control" query={query} setQuery={setQuery}/>
                </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label"></label>
                    <div className="col-sm-10">
                        <button type="button" className="btn btn-primary float-right" onClick={this.handleExecuteQuery.bind(this)}>
                            <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
                            Esegui
                        </button>
                    </div>
            </div>
            {resultQuery && 
                <div className="form-group row">
                <label className="col-sm-2 col-form-label">Risultato</label>
                <div className="col-sm-10">
                <table className="table table-sm">
                    <thead>
                        <tr>
                        <th scope="col">Campo1</th>
                        <th scope="col">Campo2</th>
                        <th scope="col">Campo3</th>
                        </tr>
                    </thead>
                    <tbody>
                       <tr>
                            <td>valore 1</td>
                            <td>valore 2</td>
                            <td>valore 3</td>
                        </tr>
                    </tbody>
                    </table>
                </div>
            </div>
            }
            </ModalBody>
            <ModalFooter>
              <button type="button" className='btn btn-gray-200' onClick={this.hideModalQuery}>
                  Chiudi
              </button>
              <button type="button" className="btn btn-primary px-2" onClick={this.handleSaveQuery.bind(this)}>
                <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
                  Aggiungi
              </button>
            </ModalFooter>
          </form>
        </Modal>
        <div className="form-group row">
            <label className="col-sm-2 col-form-label">Query</label>
            <div className="col-sm-8 col-form-label">
                <div>
                    {query?
                        <span className="text-primary">{query}</span>
                    :
                        <span className="text-danger">Per poter creare un Dataset Derivato è necessario specificare una query.</span>
                    }
                </div>
            </div>
            <div className="col-sm-2">
                <button type="button" className="btn btn-link float-right" title="Aggiungi Query" onClick={this.openModalQuery.bind(this)}>
                    {query?<i className="fa fa-edit fa-lg m-t-2"></i>:<i className="fa fa-plus-circle fa-lg m-t-2"></i>}
                </button>
            </div>
        </div>
      </div>
    );
  }
}
export default Query