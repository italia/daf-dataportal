import React, {Component} from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
  } from 'reactstrap';

class Gerarchie extends Component {
    constructor(props){
        super(props)
        this.state = {
            isOpenGerarchie: false,
            gerarchia: '',
            erroMsg:''
        }
        this.openModalGerarchie = this.openModalGerarchie.bind(this)
        this.hideModalGerarchie = this.hideModalGerarchie.bind(this)
        this.handleSaveGerarchia = this.handleSaveGerarchia.bind(this)
        this.onChangeGerarchia = this.onChangeGerarchia.bind(this)
        this.handleRemoveGerarchia = this.handleRemoveGerarchia.bind(this)
    }

    openModalGerarchie = () => {
        if(this.refs.valoregerarchia)
            this.refs.valoregerarchia.value = ''
        this.setState({
            isOpenGerarchie: true,
            gerarchia:''
        });
    }

    hideModalGerarchie = () => {
        this.setState({
            isOpenGerarchie: false
        });
    }

    handleSaveGerarchia = (e) => {
        e.preventDefault()
        console.log('handleSaveGerarchia')
        const { addGerarchiaToForm, index, listaGerarchie} = this.props
        var errore=false
        var gerarchia = new Object()
        gerarchia.index=index
        gerarchia.tipo=this.state.gerarchia
        gerarchia.val=this.refs.valoregerarchia.value
        if(this.state.gerarchia && this.state.gerarchia=='column'){
            for(var i=0;i<listaGerarchie.length;i++){
                if(listaGerarchie[i].tipo=='column'){
                    errore=true
                    this.setState({erroMsg:'Il Campo colonna può essere inserito una sola volta.'})
                }
            }
            gerarchia.livello=0
        }else{
            var livello=1
            for(var i=0;i<listaGerarchie.length;i++){
                if(listaGerarchie[i].tipo=='parent')
                    livello+=1
            }
            gerarchia.livello=livello
        }
        if(!errore){
            console.log('Gerarchia: ' + JSON.stringify(gerarchia))
            addGerarchiaToForm(gerarchia, index)
            this.setState({
                isOpenGerarchie: false,
                erroMsg:undefined
            });
        }
    }

    handleRemoveGerarchia = (tipo, val, e) => {
        e.preventDefault()
        console.log('handleRemoveGerarchia')
        console.log('tipo: ' + tipo)
        console.log('val: ' + val)
        const { deleteGerarchiaToForm, index} = this.props
        deleteGerarchiaToForm(index, tipo, val)
        this.setState({
            erroMsg:undefined
        });
    }

    onChangeGerarchia(e, value){
        this.setState({
            gerarchia: value
        });
    }

  render() {
    const { gerarchia, erroMsg } = this.state;
    const { listaGerarchie, config } = this.props;
    return (
      <div>
        <Modal isOpen={this.state.isOpenGerarchie} toggle={this.hideModalGerarchie}>
          <form>
            <ModalHeader toggle={this.hideModalGerarchie}>
              Aggiungi una gerarchia
            </ModalHeader>
            <ModalBody>
            <div className="form-group">
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Livello</label>
                    <div className="col-sm-10">
                        <select className="form-control" ref={(gerarchia) => this.gerarchia = gerarchia} onChange= {(e) => this.onChangeGerarchia(e, e.target.value)} id="gerarchia" value={gerarchia} >
                            <option value="" defaultValue></option>
                                {config.gerarchie.map(value => <option value={value.val} key={value.val}>{value.name}</option>)}
                        </select>
                    </div>
                </div>
                {gerarchia && 
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Valore</label>
                    <div className="col-sm-10">
                        <input name='valoregerarchia' type='text' ref='valoregerarchia' className="form-control" />
                    </div>
                    </div>
                    
                }
                {erroMsg &&
                    <div>{erroMsg}</div>
                }
            </div>
            </ModalBody>
            <ModalFooter>
              <button type="button" className='btn btn-gray-200' onClick={this.hideModalGerarchie}>
                  Chiudi
              </button>
              <button type="button" className="btn btn-primary px-2" onClick={this.handleSaveGerarchia.bind(this)}>
                <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
                  Aggiungi
              </button>
            </ModalFooter>
          </form>
        </Modal>
        <div className="form-group row">
            <label className="col-sm-2 col-form-label">Gerarchie</label>
            <div className="col-sm-10">
            <table className="table table-sm">
                <thead>
                    <tr>
                    <th scope="col">Livello</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Valore</th>
                    <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {listaGerarchie.length>0?
                     listaGerarchie.map((gerarchia, index) => {
                         return(<tr key={index}>
                                    <td>{gerarchia.livello}</td>
                                    <td>{gerarchia.tipo}</td>
                                    <td>{gerarchia.val}</td>
                                    <td> <button type="button" className="btn btn-link float-right" title="Rimuovi Gerarchia"  onClick={this.handleRemoveGerarchia.bind(this, gerarchia.tipo, gerarchia.val)}>
                                            <i className="fa fa-minus-circle fa-lg m-t-2"></i>
                                        </button>
                                    </td>
                                </tr>)
                    })
                    :
                    <div>Nessuna gerarchia inserita</div>
                    }
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td> 
                            <button type="button" className="btn btn-link float-right" title="Aggiungi Gerarchia" onClick={this.openModalGerarchie.bind(this)}>
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
export default Gerarchie