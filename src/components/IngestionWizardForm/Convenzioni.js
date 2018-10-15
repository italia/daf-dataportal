import React, {Component} from 'react';
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
            fields: [],
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
            fields: [],
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
        const { fields } = this.state;
        const { addConvenzioneToForm, index} = this.props
        var valoreConvenzione=''
        if(fields && fields.length>0){
            for(var i=0;i<fields.length;i++){
                var valcampo = fields[i].val
                var labelcampo = fields[i].label
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
        const { config } = this.props
        var fields = []
        var convenzioni = config['dafvoc-ingform-dataschema-metadata-format_std-conv']
        if(value && convenzioni && convenzioni.length>0){
          for(var i=0;i<convenzioni.length;i++){
            if(convenzioni[i].uid==value){
              fields = convenzioni[i].fields
            }
          }
        }
        this.setState({
            convenzione: value,
            fields: fields
        });
    }

  render() {
    const { fields, convenzione } = this.state;
    const { listaConvenzioni, config } = this.props;
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
                                {config['dafvoc-ingform-dataschema-metadata-format_std-conv'].map(value => <option value={value.uid} key={value.uid}>{value.name.ita?value.name.ita:value.name.default}</option>)}
                        </select>
                    </div>
                </div>
                {fields && fields.map((field, index) => {
                    return(
                        <div className="form-group row" key={index}>
                            <label className="col-sm-2 col-form-label">{field.label}</label>
                        <div className="col-sm-10">
                            <input name={field.val} type='text' ref={field.val} className="form-control" />
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
            {listaConvenzioni.length>0?
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
                        {listaConvenzioni.map((convenzione, index) => {
                            return(<tr key={index}>
                                        <td>{convenzione.tipo}</td>
                                        <td>{convenzione.val}</td>
                                        <td> <button type="button" className="btn btn-link float-right" title="Rimuovi Convenzione"  onClick={this.handleRemoveConvenzione.bind(this, convenzione.tipo, convenzione.val)}>
                                                <i className="fa fa-minus-circle fa-lg m-t-2"></i>
                                            </button>
                                        </td>
                                    </tr>)
                        })
                        }
                    </tbody>
                    </table>
                    </div>
                    :
                    <div className="col-sm-10">
                    <p><label className="col-sm-10 col-form-label">Nessuna convenzione inserita</label>
                        <button type="button" className="btn btn-link float-right" title="Aggiungi Convenzione" onClick={this.openModalConvenzioni.bind(this)}>
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
export default Convenzioni