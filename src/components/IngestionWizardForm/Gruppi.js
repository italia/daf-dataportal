import React, {Component, PropTypes} from 'react';
import { ingestionFormOptions } from './const';
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalClose,
    ModalBody,
    ModalFooter
  } from 'react-modal-bootstrap';

class Gruppi extends Component {
    constructor(props){
        super(props)
        this.state = {
            isOpenGruppi: false,
            gruppo: '',
            permesso:'',
            erroMsg:''
        }
        this.openModalGruppi = this.openModalGruppi.bind(this)
        this.hideModalGruppi = this.hideModalGruppi.bind(this)
        this.handleSaveGruppo = this.handleSaveGruppo.bind(this)
        this.onChangeGruppo = this.onChangeGruppo.bind(this)
        this.handleRemoveGruppo = this.handleRemoveGruppo.bind(this)
    }

    openModalGruppi = () => {
        if(this.refs.gruppo)
            this.refs.gruppo.value = ''
        if(this.refs.permesso)
            this.refs.permesso.value = ''
        this.setState({
            isOpenGruppi: true,
            gruppo:'',
            permesso:''
        });
    }

    hideModalGruppi = () => {
        this.setState({
            isOpenGruppi: false
        });
    }

    
    handleSaveGruppo = (e) => {
        e.preventDefault()
        console.log('handleSaveGruppo')
        const { addGruppiToForm} = this.props
        var gruppo = new Object()
        gruppo.nome=this.state.gruppo
        gruppo.permesso=this.state.permesso
        console.log('gruppo: ' + JSON.stringify(gruppo))
        addGruppiToForm(gruppo)
        this.setState({
            isOpenGruppi: false
        });
    }

    handleRemoveGruppo = (nome, permesso, e) => {
        e.preventDefault()
        console.log('handleRemoveGruppo')
        console.log('nome: ' + nome)
        console.log('permesso: ' + permesso)
        const { deleteGruppiToForm } = this.props
        deleteGruppiToForm(nome, permesso)
        this.setState({
            erroMsg:undefined
        });
    }

    onChangeGruppo(e, value){
        this.setState({
            gruppo: value
        });
    }

    onChangePermesso(e, value){
        this.setState({
            permesso: value
        });
    }

  render() {
    const { gruppo, erroMsg } = this.state;
    const { listaGruppi } = this.props;
    return (
      <div>
         <Modal isOpen={this.state.isOpenGruppi} onRequestHide={this.hideModalGruppi}>
          <form>
            <ModalHeader>
              <ModalTitle>Aggiungi una gruppo</ModalTitle>
              <ModalClose onClick={this.hideModalGruppi}/>
            </ModalHeader>
            <ModalBody>
            <div className="form-group">
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Gruppi</label>
                    <div className="col-sm-10">
                        <select className="form-control" ref={(gruppo) => this.gruppo = gruppo} onChange= {(e) => this.onChangeGruppo(e, e.target.value)} id="gruppo" >
                            <option value="" defaultValue></option>
                                {ingestionFormOptions.gruppiaccesso.map(value => <option value={value.val} key={value.val}>{value.name}</option>)}
                        </select>
                    </div>
                </div>
                {gruppo &&
                 <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Permesso</label> 
                     <div className="col-sm-10">
                        <select className="form-control" ref={(permesso) => this.permesso = permesso} onChange= {(e) => this.onChangePermesso(e, e.target.value)} id="permesso" >
                            <option value="" defaultValue></option>
                                {ingestionFormOptions.permessiaccesso.map(value => <option value={value.val} key={value.val}>{value.name}</option>)}
                        </select>
                    </div>
                </div>
                }
                {erroMsg &&
                    <div>{erroMsg}</div>
                }
            </div>
            </ModalBody>
            <ModalFooter>
              <button type="button" className='btn btn-gray-200' onClick={this.hideModalGruppi}>
                  Chiudi
              </button>
              <button type="button" className="btn btn-primary px-2" onClick={this.handleSaveGruppo.bind(this)}>
                <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
                  Aggiungi
              </button>
            </ModalFooter>
          </form>
        </Modal>
        <div className="form-group row">
            <label className="col-sm-2 col-form-label">Altri Gruppi</label>
            <div className="col-sm-10">
            <table className="table table-sm">
                <thead>
                    <tr>
                    <th scope="col">Gruppo</th>
                    <th scope="col">Permesso</th>
                    <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                     {listaGruppi.length>0?
                     listaGruppi.map((gruppo, index) => {
                         return(<tr key={index}>
                                    <td>{gruppo.nome}</td>
                                    <td>{gruppo.permesso}</td>
                                    <td> <button type="button" className="btn btn-link float-right" title="Rimuovi Gruppo"  onClick={this.handleRemoveGruppo.bind(this, gruppo.nome, gruppo.permesso)}>
                                            <i className="fa fa-minus-circle fa-lg m-t-2"></i>
                                        </button>
                                    </td>
                                </tr>)
                    })
                    :
                    <div>Nessun gruppo inserito</div>
                    }
                    <tr>
                        <td></td>
                        <td></td>
                        <td><button type="button" className="btn btn-link float-right" title="Aggiungi Gruppo" onClick={this.openModalGruppi.bind(this)}>
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
export default Gruppi