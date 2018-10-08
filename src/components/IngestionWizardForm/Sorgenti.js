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

class Sorgenti extends Component {
    constructor(props){
        super(props)
        this.state = {
            isOpenSorgenti: false,
            sorgente: '',
            erroMsg:'',
            tipo:'',
            url:'',
            chron:''
        }
        this.openModalSorgenti = this.openModalSorgenti.bind(this)
        this.hideModalSorgenti = this.hideModalSorgenti.bind(this)
        this.handleSaveSorgente = this.handleSaveSorgente.bind(this)
        this.onChangeSorgente = this.onChangeSorgente.bind(this)
        this.handleRemoveSorgente = this.handleRemoveSorgente.bind(this)
    }

    openModalSorgenti = () => {
        if(this.refs.valoresorgente)
            this.refs.valoresorgente.value = ''
        this.setState({
            isOpenSorgenti: true,
            sorgente:''
        });
    }

    hideModalSorgenti = () => {
        this.setState({
            isOpenSorgenti: false
        });
    }

    handleSaveSorgente = (e) => {
        e.preventDefault()
        console.log('handleSaveSorgente')
        const { addSorgenteToForm, index} = this.props
        var sorgente = new Object
        sorgente.tipo = this.refs.tipo.value
        sorgente.url = this.refs.url.value
        sorgente.user = localStorage.getItem('user').toLowerCase()
        sorgente.chron = this.refs.chron.value
        console.log('Sorgente: ' + JSON.stringify(sorgente))
        addSorgenteToForm(sorgente, index)
        this.setState({
            isOpenSorgenti: false
        });
    }

    handleRemoveSorgente = (tipo, url, user, chron, e) => {
        e.preventDefault()
        console.log('handleRemoveSorgente')
        const { deleteSorgenteToForm} = this.props
        deleteSorgenteToForm(tipo, url, user, chron)
        this.setState({
            erroMsg:undefined
        });
    }

    onChangeSorgente(e, value){
        this.setState({
            sorgente: value
        });
    }

  render() {
    const { sorgente, erroMsg } = this.state;
    const { listaSorgenti } = this.props;
    return (
      <div>
        <Modal isOpen={this.state.isOpenSorgenti} onRequestHide={this.hideModalSorgenti}>
          <form>
            <ModalHeader>
              <ModalTitle>Aggiungi una sorgente</ModalTitle>
              <ModalClose onClick={this.hideModalSorgenti}/>
            </ModalHeader>
            <ModalBody>
            <div className="form-group">
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Tipo</label>
                    <div className="col-sm-10">
                        <input name='tipo' type='text' ref='tipo' value={listaSorgenti[0].tipo} className="form-control" />   
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Url</label>
                    <div className="col-sm-10">
                        <input name='tipo' type='text' ref='url' className="form-control" />   
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Utente</label>
                    <div className="col-sm-10">
                        <input name='tipo' type='text' ref='user' className="form-control" />   
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Chron</label>
                    <div className="col-sm-10">
                        <input name='tipo' type='text' ref='chron' className="form-control" />   
                    </div>
                </div>
                {erroMsg &&
                    <div>{erroMsg}</div>
                }
            </div>
            </ModalBody>
            <ModalFooter>
              <button type="button" className='btn btn-gray-200' onClick={this.hideModalSorgenti}>
                  Chiudi
              </button>
              <button type="button" className="btn btn-primary px-2" onClick={this.handleSaveSorgente.bind(this)}>
                <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
                  Aggiungi
              </button>
            </ModalFooter>
          </form>
        </Modal>
        <div className="form-group row">
            <label className="col-sm-2 col-form-label">Sorgenti</label>
            <div className="col-sm-10">
            <table className="table table-sm">
                <thead>
                    <tr>
                    <th scope="col">Tipo</th>
                    <th scope="col">Url</th>
                    <th scope="col">Utente</th>
                    <th scope="col">Chron</th>
                    <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {listaSorgenti.length>0?
                     listaSorgenti.map((sorgente, index) => {
                         return(<tr key={index}>
                                    <td>{sorgente.tipo}</td>
                                    <td>{sorgente.url}</td>
                                    <td>{sorgente.user}</td>
                                    <td>{sorgente.chron}</td>
                                    <td> 
                                    {index>0 && <button type="button" className="btn btn-link float-right" title="Rimuovi Sorgente"  onClick={this.handleRemoveSorgente.bind(this, sorgente.tipo, sorgente.url, sorgente.user, sorgente.chron)}>
                                            <i className="fa fa-minus-circle fa-lg m-t-2"></i>
                                        </button>
                                    }
                                    </td>
                                </tr>)
                    })
                    :
                    <div>Nessuna sorgente inserita</div>
                    }
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td> 
                            <button type="button" className="btn btn-link float-right" title="Aggiungi Sorgente" onClick={this.openModalSorgenti.bind(this)}>
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
export default Sorgenti