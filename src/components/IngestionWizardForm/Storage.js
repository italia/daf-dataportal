import React, {Component} from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
  } from 'reactstrap';

class Storage extends Component {
    constructor(props){
        super(props)
        this.state = {
            isOpenStorage: false,
            stor: '',
            fields: [],
            erroMsg: undefined
        }
        this.openModalStorage = this.openModalStorage.bind(this)
        this.hideModalStorage = this.hideModalStorage.bind(this)
        this.handleSaveStorage = this.handleSaveStorage.bind(this)
        this.onChangeStorage = this.onChangeStorage.bind(this)
        this.handleRemoveStorage = this.handleRemoveStorage.bind(this)
    }

    openModalStorage = () => {
        this.setState({
            isOpenStorage: true,
            stor: '',
            fields: [],
            erroMsg: undefined
        });
    }

    hideModalStorage = () => {
        this.setState({
            isOpenStorage: false
        });
    }

    handleSaveStorage = (e) => {
        e.preventDefault()
        console.log('handleSaveStorage')
        const { fields } = this.state;
        const { addStorageToForm} = this.props
        var valoreStorage=''
        if(fields && fields.length>0){
            for(var i=0;i<fields.length;i++){
                var valcampo = fields[i].val
                var labelcampo = fields[i].label
                console.log('value: ' + this.refs[valcampo].value)
                valoreStorage = valoreStorage + ' ' + labelcampo + '=' + this.refs[valcampo].value
            }
        }
        var stor = new Object()
        stor.tipo=this.state.stor
        stor.val=valoreStorage
        console.log('Stor: ' + JSON.stringify(stor))
        addStorageToForm(stor)
        this.setState({
            isOpenStorage: false
        });
    }

    handleRemoveStorage = (tipo, val, e) => {
        e.preventDefault()
        console.log('handleRemoveStorage')
        console.log('tipo: ' + tipo)
        console.log('val: ' + val)
        const { deleteStorageToForm} = this.props
        deleteStorageToForm(tipo, val)
        this.setState({
            erroMsg:undefined
        });
    }

    onChangeStorage(e, uid){
        const { config } = this.props
        var fields = []
        if(uid && config['storage']){
          for(var i=0;i<config['storage'].length;i++){
            if(config['storage'][i].uid==uid){
              fields = config['storage'][i].fields
            }
          }
        }
        this.setState({
            stor: uid,
            fields: fields
        });
    }

  render() {
    const { fields, stor } = this.state;
    const { listaStorage, config } = this.props;
    return (
      <div>
        <Modal isOpen={this.state.isOpenStorage} toggle={this.hideModalStorage}>
          <form>
            <ModalHeader toggle={this.hideModalStorage}>
              Aggiungi uno Storage
            </ModalHeader>
            <ModalBody>
            <div className="form-group">
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Storage</label>
                    <div className="col-sm-10">
                        <select className="form-control" ref={(stor) => this.stor = stor} onChange= {(e) => this.onChangeStorage(e, e.target.value)} id="stor" value={stor} >
                            <option value="" defaultValue></option>
                                {config['storage'].map(value => <option value={value.uid} key={value.uid}>{value.name.ita?value.name.ita:value.name.default}</option>)}
                        </select>
                    </div>
                </div>
                {fields && fields.map((campo, index) => {
                    return(
                        <div className="form-group row" key={index}>
                            <label className="col-sm-2 col-form-label">{campo.label}</label>
                        <div className="col-sm-10">
                            <input name={campo.val} type='text' ref={campo.val} className="form-control" />
                        </div>
                    </div>
                    )
                    })
                }
            </div>
            </ModalBody>
            <ModalFooter>
              <button type="button" className='btn btn-gray-200' onClick={this.hideModalStorage}>
                  Chiudi
              </button>
              <button type="button" className="btn btn-primary px-2" onClick={this.handleSaveStorage.bind(this)}>
                <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
                  Aggiungi
              </button>
            </ModalFooter>
          </form>
        </Modal>
        <div className="form-group row">
            <label className="col-sm-2 col-form-label">Storage</label>
            {listaStorage.length>0?
            <div className="col-sm-10">
            <table className="table table-sm">
                <thead>
                    <tr>
                    <th scope="col">Tipo</th>
                    <th scope="col">Valore</th>
                    <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {listaStorage.map((stor, index) => {
                         return(<tr key={index}>
                                    <td>{stor.tipo}</td>
                                    <td>{stor.val}</td>
                                    {index>0?
                                    <td>
                                        <button type="button" className="btn btn-link float-right" title="Rimuovi Stor"  onClick={this.handleRemoveStorage.bind(this, stor.tipo, stor.val)}>
                                            <i className="fa fa-minus-circle fa-lg m-t-2"></i>
                                        </button>
                                    </td>
                                    :
                                    <td></td>
                                    }
                                </tr>)
                    })
                    }
                    <tr>
                        <td></td>
                        <td></td>
                        <td> 
                            <button type="button" className="btn btn-link float-right" title="Aggiungi Stor" onClick={this.openModalStorage.bind(this)}>
                                <i className="fa fa-plus-circle fa-lg m-t-2"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
                </table>
            </div>
            :
            <div className="col-sm-10">
            <p><label className="col-sm-10 col-form-label">Nessuno storage inserito</label>
                <button type="button" className="btn btn-link float-right" title="Aggiungi Convenzione" onClick={this.openModalStorage.bind(this)}>
                    <i className="fa fa-plus-circle fa-lg m-t-2"></i>
                </button>
                </p>
            </div>
            }
        </div>
      </div>
    );
  }
}
export default Storage