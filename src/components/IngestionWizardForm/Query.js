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
import QueryBuild from '../../components/Widgets/QueryBuild'

class Query extends Component {
  constructor(props){
    super(props)
    this.state = { }
  }

  render() {
    const { onDropFunction, setQuery, fields } = this.props;
    return (
      <div>
        
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Query</label>
          <div className="col-sm-10 col-form-label">
            <QueryBuild onDropFunction={onDropFunction} fields={fields} onSubmit={setQuery} className=" " limit={25}/>
          </div>
        </div>
      </div>
    );
  }
}
export default Query