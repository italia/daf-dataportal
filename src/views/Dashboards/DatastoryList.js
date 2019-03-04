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
import { getAllDatastories } from '../../actions'
import UserstoryCard from '../../components/Cards/UserstoryCard'

class DatastoryList extends Component{
  constructor(props){
    super(props)
    this.state = {
      modalOpen: false,
      title: '',
      subtitle: '',
      org: '',
    }
  }

  componentDidMount(){
    const { dispatch } = this.props

    dispatch(getAllDatastories())
  }
  
  onSubmit(){
    const { title, subtitle, org } = this.state

    //save data
    let request = {
      title: title,
      subtitle: subtitle,
      org: org,
      layout: [],
      widgets: {},
      status: 0
    };

    this.setState({
      modalOpen: false,
    })

    this.props.history.push({
      'pathname':'/private/datastory/create',
      'story': request,
      'modified':true
    })
  }
 
  render(){
    const { isLoading, list, loggedUser } = this.props
    return(
      <div>
        <Modal isOpen={this.state.modalOpen} onRequestHide={()=>{this.setState({modalOpen: false})}}>
          <form>
            <ModalHeader>
              <ModalTitle>Crea una Data Story</ModalTitle>
              <ModalClose onClick={()=>{this.setState({modalOpen: false})}}/>
            </ModalHeader>
            <ModalBody>
            <div className="form-group">
                <div className="form-group row">
                  <label className="col-md-2 form-control-label">Titolo</label>
                  <div className="col-md-8">
                    <input type="text" className={"form-control "+this.state.title.length===0?'is-invalid':''} onChange={(e)=> this.setState({title: e.target.value})} value={this.state.title} placeholder="Titolo"/>
                    {this.state.title.length===0&&<span className="text-danger">Campo Obbligatorio</span>}
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-md-2 form-control-label">Sottotitolo</label>
                  <div className="col-md-8">
                    <input type="text" className="form-control" onChange={(e)=> this.setState({subtitle: e.target.value})} value={this.state.subtitle} placeholder="Sottotitolo"/>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-md-2 form-control-label">Organizzazione</label>
                  <div className="col-md-8">
                    <select className={"form-control "+this.state.org.length===0?'is-invalid':''} placeholder="Seleziona l'organizzazione" onChange= {(e) => this.setState({org: e.target.value})} value={this.state.org} >
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
              <button type="button" className='btn btn-gray-200' onClick={()=>{this.setState({modalOpen: false})}}>
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
          <div className="row">
            <i className="fas fa-font fa-lg m-2" style={{lineHeight:'1'}}/><h2>Data Story</h2>
            <div className="col-md-12">
              <button className="btn btn-link text-primary float-right" onClick={()=>this.setState({modalOpen: true})}><i className="fas fa-plus-circle fa-lg"/></button>
            </div>
          </div>
          {isLoading?<h1 className="text-center p-5"><i className="fas fa-circle-notch fa-spin mr-2" />Caricamento</h1> :
          <div className="row">
            {
              list && list.map((story, index) => {
                if ((story.widgets) && (story.layout && story.layout !== '{}')) {
                  const dashwidgets = Object.keys(story.widgets).filter(wid=>{
                    return wid.toLowerCase().indexOf('textwidget')<0
                  })

                  var firstLayout = dashwidgets.length>0?dashwidgets[0]:''

                  var time = 0
                  for (let k in story.widgets){
                    if(k.toLowerCase.indexOf('textwidget')!==-1){
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
                    widgetA={firstLayout}
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
