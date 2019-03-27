import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap';
import { getAllDatastories, receiveDatastory } from '../../actions'
import UserstoryCard from '../../components/Cards/UserstoryCard'

class DatastoryList extends Component{
  constructor(props){
    super(props)
    this.state = {
      modalOpen: false,
      title: '',
      subtitle: '',
      org: '',
      list: [],
      filtered: []
    }
    this.filter = this.filter.bind(this)
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.list !== this.props.list){
      this.setState({
        list: nextProps.list,
        filtered: nextProps.list
      })
    }
  }

  componentDidMount(){
    const { dispatch } = this.props

    dispatch(getAllDatastories())
  }
  
  onSubmit(){
    const { title, subtitle, org } = this.state
    const { dispatch } = this.props

    if(title.length>0 && org.length>0){
      //save data
      let request = {
        title: title,
        subtitle: subtitle,
        org: org,
        layout: [],
        widgets: [],
        status: 0
      };
      dispatch(receiveDatastory(request))
      this.setState({
        modalOpen: false,
        title: '',
        subtitle: '',
        org: ''
      })

      this.props.history.push({
        'pathname':'/private/datastory/create',
        'modified':true
      })
    }
  }

  filter(value){
    const { list } = this.state

    this.setState({
      filtered: list.filter((item) => item.title.toLowerCase().indexOf(value.toLowerCase()) != -1),
      filter: value
    });
  }

 
  render(){
    const { isLoading, loggedUser } = this.props
    const { filtered } = this.state
    return(
      <div>
        <Modal isOpen={this.state.modalOpen} onRequestHide={()=>{this.setState({modalOpen: false, title: '', subtitle: '', org: ''})}}>
          <form>
            <ModalHeader>
              <ModalTitle>Crea una Datastory</ModalTitle>
              <ModalClose onClick={()=>{this.setState({modalOpen: false, title: '', subtitle: '', org: ''})}}/>
            </ModalHeader>
            <ModalBody>
            <div className="form-group">
                <div className="form-group row">
                  <label className="col-md-2 form-control-label">Titolo</label>
                  <div className="col-md-9">
                    <input type="text" className={"form-control "+(this.state.title.length===0?'is-invalid':'')} onChange={(e)=> this.setState({title: e.target.value})} value={this.state.title} placeholder="Titolo"/>
                    {this.state.title.length===0&&<span className="text-danger">Campo Obbligatorio</span>}
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-md-2 form-control-label">Sottotitolo</label>
                  <div className="col-md-9">
                    <input type="text" className="form-control" onChange={(e)=> this.setState({subtitle: e.target.value})} value={this.state.subtitle} placeholder="Sottotitolo"/>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-md-2 form-control-label">Organizzazione</label>
                  <div className="col-md-9">
                    <select className={"form-control "+(this.state.org.length===0?'is-invalid':'')} placeholder="Seleziona l'organizzazione" onChange= {(e) => this.setState({org: e.target.value})} value={this.state.org} >
                        <option value=""  key='organization' defaultValue></option>
                        {loggedUser.organizations && loggedUser.organizations.length > 0 && loggedUser.organizations.map(organization => {
                              return(
                                <option value={organization} key={organization}>{organization}</option>)
                          }
                        )}
                    </select>
                    {this.state.org.length===0 && <span className="text-danger">Campo Obbligatorio</span>}
                  </div>
                </div>
            </div>
            </ModalBody>
            <ModalFooter>
              <button type="button" className='btn btn-gray-200' onClick={()=>{this.setState({modalOpen: false, title: '', subtitle: '', org: ''})}}>
                Chiudi
              </button>
              <button type="button" className="btn btn-primary px-2" onClick={this.onSubmit.bind(this)}>
                <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
                  Crea
              </button>
            </ModalFooter>
          </form>
        </Modal>
        <div className="container">
          <div className="row mb-3">
            <i className="fas fa-font fa-lg m-2" style={{lineHeight:'1'}}/><h2>Datastory</h2>
            <div className="col-md-11 mt-3">
              <input className="form-control transparent-frame b-b-1" placeholder="Inserisci un titolo per filtrare la lista" value={this.state.filter} onChange={(e)=>this.filter(e.target.value)}/>
            </div>
            <div className="col-md-1 mt-3">
              <button className="btn btn-link text-primary float-right" onClick={()=>this.setState({modalOpen: true})}><i className="fas fa-plus-circle fa-lg"/></button>
            </div>
          </div>
          {isLoading?<h1 className="text-center p-5"><i className="fas fa-circle-notch fa-spin mr-2" />Caricamento</h1> :
          <div className="row mt-5">
            {
              filtered && filtered.map((story, index) => {
                if ((story.widgets) && (story.layout && story.layout !== '{}')) {
                  const dashwidgets = story.widgets.filter(wid=>{
                    return wid.identifier.toLowerCase().indexOf('textwidget')<0
                  })

                  var firstLayout = dashwidgets.length>0?dashwidgets[0]:''

                  var time = 0
                  for (let k = 0; k < story.widgets.length; k++){
                    if(story.widgets[k].identifier.toLowerCase().indexOf('textwidget')!==-1){
                      var text = story.widgets[k].text
                      var array = text?text.split(' '):[]
                      
                      time = time + (array.length/275)
                    }
                    else
                      time = time + 1 
                  }
                }
                return(
                  <UserstoryCard 
                    story = {story}
                    widgetA={firstLayout.identifier}
                    time = {time}
                    key = {index}
                    id = {index}
                    />
                )
              })
            }
          </div>
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const loggedUser = state.userReducer['obj']?state.userReducer['obj'].loggedUser:{ }
  const { list, isLoading } = state.datastoryReducer['datastories'] || {isLoading: false, list: []}
  return { loggedUser, list, isLoading }
}

export default connect(mapStateToProps)(DatastoryList)
