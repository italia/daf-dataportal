import React, {Component} from 'react';
import { connect  } from 'react-redux';

import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
  } from 'reactstrap';

class Pipelines extends Component {
    constructor(props){
        super(props)
        this.state = {
            isOpenPipelines: false,
            allOrganizations: [],
            pipeline: '',
            parametro:'',
            erroMsg:''
        }
        this.openModalPipelines = this.openModalPipelines.bind(this)
        this.hideModalPipelines = this.hideModalPipelines.bind(this)
        this.handleSavePipeline = this.handleSavePipeline.bind(this)
        this.onChangePipeline = this.onChangePipeline.bind(this)
        this.handleRemovePipeline = this.handleRemovePipeline.bind(this)
    }

    openModalPipelines = () => {
        if(this.refs.pipeline)
            this.refs.pipeline.value = ''
        if(this.refs.parametro)
            this.refs.parametro.value = ''
        this.setState({
            isOpenPipelines: true,
            pipeline:'',
            parametro:''
        });
    }

    hideModalPipelines = () => {
        this.setState({
            isOpenPipelines: false
        });
    }

    
    handleSavePipeline = (e) => {
        e.preventDefault()
        console.log('handleSavePipeline')
        const { addPipelineToForm} = this.props
        var pipeline = new Object()
        pipeline.nome=this.state.pipeline
        pipeline.parametro=this.refs.parametro.value
        console.log('pipeline: ' + JSON.stringify(pipeline))
        addPipelineToForm(pipeline)
        this.setState({
            isOpenPipelines: false
        });
    }

    handleRemovePipeline = (nome, parametro, e) => {
        e.preventDefault()
        console.log('handleRemovePipeline')
        console.log('nome: ' + nome)
        console.log('parametro: ' + parametro)
        const { deletePipelineToForm } = this.props
        deletePipelineToForm(nome, parametro)
        this.setState({
            erroMsg:undefined
        });
    }

    onChangePipeline(e, value){
        this.setState({
            pipeline: value
        });
    }

    onChangeParametro(e, value){
        this.setState({
            parametro: value
        });
    }

  render() {
    const { pipeline, erroMsg } = this.state;
    const { listaPipelines, config } = this.props;
    return (
      <div>
         <Modal isOpen={this.state.isOpenPipelines} toggle={this.hideModalPipelines}>
          <form>
            <ModalHeader toggle={this.hideModalPipelines}>
              Aggiungi una pipeline
            </ModalHeader>
            <ModalBody>
            <div className="form-group">
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Pipelines</label>
                    <div className="col-sm-10">
                        <select className="form-control" ref={(pipeline) => this.pipeline = pipeline} onChange= {(e) => this.onChangePipeline(e, e.target.value)} id="pipeline" value={pipeline}>
                            <option value="" defaultValue></option>
                            {config['dafvoc-ingform-operational-ingestion_pipeline-name'].map(value => <option value={value.uid} key={value.uid}>{value.name.ita?value.name.ita:value.name.default}</option>)}
                        </select>
                    </div>
                </div>
                {pipeline &&
                 <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Parametro</label>
                        <div className="col-sm-10">
                            <input name='parametro' type='text' ref='parametro' className="form-control" />
                        </div>
                </div>
                }
                {erroMsg &&
                    <div>{erroMsg}</div>
                }
            </div>
            </ModalBody>
            <ModalFooter>
              <button type="button" className='btn btn-gray-200' onClick={this.hideModalPipelines}>
                  Chiudi
              </button>
              <button type="button" className="btn btn-primary px-2" onClick={this.handleSavePipeline.bind(this)}>
                <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
                  Aggiungi
              </button>
            </ModalFooter>
          </form>
        </Modal>
        <div className="form-group row">
            <label className="col-sm-2 col-form-label">Pipelines</label>
            {listaPipelines.length>0?
                <div className="col-sm-10">
                    <table className="table table-sm">
                        <thead>
                            <tr>
                            <th scope="col">Pipeline</th>
                            <th scope="col">Parametro</th>
                            <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaPipelines.map((pipeline, index) => {
                                return(<tr key={index}>
                                            <td>{pipeline.nome}</td>
                                            <td>{pipeline.parametro}</td>
                                            <td> <button type="button" className="btn btn-link float-right" title="Rimuovi Pipeline"  onClick={this.handleRemovePipeline.bind(this, pipeline.nome, pipeline.parametro)}>
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
                    <p><label className="col-sm-10 col-form-label">Nessuna pipline inserita</label></p>
                </div>
            }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
    const loggedUser = state.userReducer['obj']?state.userReducer['obj'].loggedUser:{ }
    return { loggedUser }
}
  
export default connect(mapStateToProps)(Pipelines);