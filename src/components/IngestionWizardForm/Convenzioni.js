import React, {Component} from 'react';
import { ingestionFormOptions } from './const';
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalClose,
    ModalBody,
    ModalFooter
  } from 'react-modal-bootstrap';

class Convenzioni extends Component {
    constructor(props){
        super(props)
        this.state = {
            isOpenConvenzioni: false,
            convenzione: '',
            campi: [],
            erroMsg: undefined
        }
        this.openModalConvenzioni = this.openModalConvenzioni.bind(this)
        this.hideModalConvenzioni = this.hideModalConvenzioni.bind(this)
        this.handleSaveConvenzione = this.handleSaveConvenzione.bind(this)
        this.onChangeConvenzione = this.onChangeConvenzione.bind(this)
        this.handleRemoveConvenzione = this.handleRemoveConvenzione.bind(this)
    }

    openModalConvenzioni = () => {
        this.setState({
            isOpenConvenzioni: true,
            convenzione: '',
            campi: [],
            erroMsg: undefined
        });
    }

    hideModalConvenzioni = () => {
        this.setState({
            isOpenConvenzioni: false
        });
    }

    handleSaveConvenzione = (e) => {
        e.preventDefault()
        console.log('handleSaveConvenzione')
        const { campi } = this.state;
        const { addConvenzioneToForm, index} = this.props
        var valoreConvenzione=''
        if(campi && campi.length>0){
            for(var i=0;i<campi.length;i++){
                var valcampo = campi[i].val
                var labelcampo = campi[i].label
                console.log('value: ' + this.refs[valcampo].value)
                valoreConvenzione = valoreConvenzione + ' ' + labelcampo + '=' + this.refs[valcampo].value
            }
        }
        var convenzione = new Object()
        convenzione.index=index
        convenzione.tipo=this.state.convenzione
        convenzione.val=valoreConvenzione
        console.log('Convenzione: ' + JSON.stringify(convenzione))
        addConvenzioneToForm(convenzione, index)
        this.setState({
            isOpenConvenzioni: false
        });
    }

    handleRemoveConvenzione = (tipo, val, e) => {
        e.preventDefault()
        console.log('handleRemoveConvenzione')
        console.log('tipo: ' + tipo)
        console.log('val: ' + val)
        const { deleteConvenzioneToForm, index} = this.props
        deleteConvenzioneToForm(index, tipo, val)
        this.setState({
            erroMsg:undefined
        });
    }

    onChangeConvenzione(e, value){
        var campi = []
        if(value && ingestionFormOptions.convenzioni){
          for(var i=0;i<ingestionFormOptions.convenzioni.length;i++){
            if(ingestionFormOptions.convenzioni[i].val==value){
              campi = ingestionFormOptions.convenzioni[i].campi
            }
          }
        }
        this.setState({
            convenzione: value,
            campi: campi
        });
    }

  render() {
    const { campi, convenzione } = this.state;
    const { listaConvenzioni } = this.props;
    return (
      <div>
        <Modal isOpen={this.state.isOpenConvenzioni} onRequestHide={this.hideModalConvenzioni}>
          <form>
            <ModalHeader>
              <ModalTitle>Aggiungi una convenzione</ModalTitle>
              <ModalClose onClick={this.hideModalConvenzioni}/>
            </ModalHeader>
            <ModalBody>
            <div className="form-group">
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Convenzioni</label>
                    <div className="col-sm-10">
                        <select className="form-control" ref={(convenzione) => this.convenzione = convenzione} onChange= {(e) => this.onChangeConvenzione(e, e.target.value)} id="convenzione" value={convenzione} >
                            <option value="" defaultValue></option>
                                {ingestionFormOptions.convenzioni.map(value => <option value={value.val} key={value.val}>{value.name}</option>)}
                        </select>
                    </div>
                </div>
                {campi && campi.map((campo, index) => {
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
              <button type="button" className='btn btn-gray-200' onClick={this.hideModalConvenzioni}>
                  Chiudi
              </button>
              <button type="button" className="btn btn-primary px-2" onClick={this.handleSaveConvenzione.bind(this)}>
                <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
                  Aggiungi
              </button>
            </ModalFooter>
          </form>
        </Modal>
        <div className="form-group row">
            <label className="col-sm-2 col-form-label">Convenzioni</label>
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
                    {listaConvenzioni.length>0?
                     listaConvenzioni.map((convenzione, index) => {
                         return(<tr key={index}>
                                    <td>{convenzione.tipo}</td>
                                    <td>{convenzione.val}</td>
                                    <td> <button type="button" className="btn btn-link float-right" title="Rimuovi Convenzione"  onClick={this.handleRemoveConvenzione.bind(this, convenzione.tipo, convenzione.val)}>
                                            <i className="fa fa-minus-circle fa-lg m-t-2"></i>
                                        </button>
                                    </td>
                                </tr>)
                    })
                    :
                    <div>Nessuna convenzione inserita</div>
                    }
                    <tr>
                        <td></td>
                        <td></td>
                        <td> 
                            <button type="button" className="btn btn-link float-right" title="Aggiungi Convenzione" onClick={this.openModalConvenzioni.bind(this)}>
                                <i className="fa fa-plus-circle fa-lg m-t-2"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
                </table>
            </div>
        </div>
      </div>
    );
  }
}
export default Convenzioni