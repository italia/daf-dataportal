import React, {Component} from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
  } from 'reactstrap';
  import MappingFileds from './Standard/MappingFields.jsx'

class MappingStandards extends Component {
    constructor(props){
        super(props)
        this.state = {
            isOpenMappingStandards: false,
            mapping: undefined,
            erroMsg: undefined
        }
        this.openModalMappingStandards = this.openModalMappingStandards.bind(this)
        this.hideModalMappingStandards = this.hideModalMappingStandards.bind(this)
        this.handleSaveMapping = this.handleSaveMapping.bind(this)
        this.onChangeMapping = this.onChangeMapping.bind(this)
        this.handleRemoveMapping = this.handleRemoveMapping.bind(this)
    }

    openModalMappingStandards = () => {
        this.setState({
            isOpenMappingStandards: true,
            mapping: undefined,
            erroMsg: undefined
        });
    }

    hideModalMappingStandards = () => {
        this.setState({
            isOpenMappingStandards: false
        });
    }

    handleSaveMapping = (e) => {
        e.preventDefault()
        console.log('handleSaveMapping')
            }

    handleRemoveMapping = (tipo, val, e) => {
        e.preventDefault()
        console.log('handleRemoveMapping')

    }

    onChangeMapping(e, value){
        console.log('onChangeMapping')
    }

  render() {
    const { mapping } = this.state;
    const { fields, datasetStdList, datasetstd } = this.props;
    return (
      <div>
        <Modal isOpen={this.state.isOpenMappingStandards} toggle={this.hideModalMappingStandards}>
          <form>
            <ModalHeader toggle={this.hideModalMappingStandards}>
              Aggiungi un mapping
            </ModalHeader>
            <ModalBody>
                <MappingFileds fields={fields} datasetStdList={datasetStdList} datasetstd={datasetstd}/>
            </ModalBody>
            <ModalFooter>
              <button type="button" className='btn btn-gray-200' onClick={this.hideModalMappingStandards}>
                  Chiudi
              </button>
              <button type="button" className="btn btn-primary px-2" onClick={this.handleSaveMapping.bind(this)}>
                <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
                  Aggiungi
              </button>
            </ModalFooter>
          </form>
        </Modal>
        <div className="form-group row">
            <label className="col-sm-2 col-form-label">Mapping</label>
            {mapping?
                <div className="col-sm-10">
                    <p>{mapping}</p>
                </div>
            :
                <div className="col-sm-10">
                    <p><label className="col-sm-10 col-form-label">Nessun mapping inserito</label></p>
                </div>
            }
            <label className="col-sm-2 col-form-label"></label>
            <div className="col-sm-10">
                <button type="button" className="btn btn-link float-right" title="Aggiungi Mapping" onClick={this.openModalMappingStandards.bind(this)}>
                    <i className="fa fa-plus-circle fa-lg m-t-2"></i>
                </button>
            </div>
        </div>
      </div>
    );
  }
}
export default MappingStandards