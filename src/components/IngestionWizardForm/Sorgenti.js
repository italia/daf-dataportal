import React, {Component} from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
  } from 'reactstrap';

class Sorgenti extends Component {
    constructor(props){
        super(props)
        this.state = {
            isOpenSorgenti: false,
            sorgente: '',
            fields: [],
            erroMsg: undefined
        }
        this.openModalSorgenti = this.openModalSorgenti.bind(this)
        this.hideModalSorgenti = this.hideModalSorgenti.bind(this)
        this.handleSaveSorgente = this.handleSaveSorgente.bind(this)
        this.onChangeSorgente = this.onChangeSorgente.bind(this)
        this.handleRemoveSorgente = this.handleRemoveSorgente.bind(this)
    }

    openModalSorgenti = () => {
        this.setState({
            isOpenSorgenti: true,
            sorgente: '',
            fields: [],
            erroMsg: undefined
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
        const { fields } = this.state;
        const { addSorgenteToForm, index} = this.props
        var valoreSorgente=''
        if(fields && fields.length>0){
            for(var i=0;i<fields.length;i++){
                var valcampo = fields[i].val
                var labelcampo = fields[i].label
                console.log('value: ' + this.refs[valcampo].value)
                valoreSorgente = valoreSorgente + ' ' + labelcampo + '=' + this.refs[valcampo].value
            }
        }
        var sorgente = new Object()
        sorgente.index=index
        sorgente.tipo=this.state.sorgente
        sorgente.val=valoreSorgente
        console.log('Sorgente: ' + JSON.stringify(sorgente))
        addSorgenteToForm(sorgente, index)
        this.setState({
            isOpenSorgenti: false
        });
    }

    handleRemoveSorgente = (tipo, val, e) => {
        e.preventDefault()
        console.log('handleRemoveSorgente')
        console.log('tipo: ' + tipo)
        console.log('val: ' + val)
        const { deleteSorgenteToForm} = this.props
        deleteSorgenteToForm(tipo, val)
        this.setState({
            erroMsg:undefined
        });
    }

    onChangeSorgente(e, uid){
        const { config } = this.props
        var fields = []
        if(uid && config['sorgenti']){
          for(var i=0;i<config['sorgenti'].length;i++){
            if(config['sorgenti'][i].uid==uid){
              fields = config['sorgenti'][i].fields
            }
          }
        }
        this.setState({
            sorgente: uid,
            fields: fields
        });
    }

  render() {
    const { fields, sorgente } = this.state;
    const { listaSorgenti, config } = this.props;
    return (
      <div>
        <Modal isOpen={this.state.isOpenSorgenti} toggle={this.hideModalSorgenti}>
          <form>
            <ModalHeader toggle={this.hideModalSorgenti}>
              Aggiungi una sorgente
            </ModalHeader>
            <ModalBody>
            <div className="form-group">
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Sorgenti</label>
                    <div className="col-sm-10">
                        <select className="form-control" ref={(sorgente) => this.sorgente = sorgente} onChange= {(e) => this.onChangeSorgente(e, e.target.value)} id="sorgente" value={sorgente} >
                            <option value="" defaultValue></option>
                                {config['sorgenti'].map(value => <option value={value.uid} key={value.uid}>{value.name.ita?value.name.ita:value.name.default}</option>)}
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
                    <th scope="col">Valore</th>
                    <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {listaSorgenti.length>0?
                     listaSorgenti.map((sorgente, index) => {
                         return(<tr key={index}>
                                    <td>{sorgente.tipo}</td>
                                    <td>{sorgente.val}</td>
                                     
                                    {index>0?
                                    <td>
                                        <button type="button" className="btn btn-link float-right" title="Rimuovi Sorgente"  onClick={this.handleRemoveSorgente.bind(this, sorgente.tipo, sorgente.val)}>
                                            <i className="fa fa-minus-circle fa-lg m-t-2"></i>
                                        </button>
                                    </td>
                                    :
                                    <td></td>
                                    }
                                </tr>)
                    })
                    :
                    <div>Nessuna sorgente inserita</div>
                    }
                    <tr>
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