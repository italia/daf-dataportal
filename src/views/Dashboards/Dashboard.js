import React, { Component } from 'react';
import { connect } from 'react-redux'
import { toastr } from 'react-redux-toastr'
import { Prompt } from 'react-router-dom'
import { Responsive, WidthProvider } from 'react-grid-layout';
import IframeWidget from './components/widgets/IframeWidget'
import TextWidget from './components/widgets/TextWidget'
import TextEditor from './components/TextEditor'
import SectionTitle from './components/SectionTitle'
import Header from './components/Header'
import App from './InfinityScrollWidgets/App'
import { isPublic } from '../../utility'
import { loadWidgets, saveDatastory, getDatastory, deleteDatastory, receiveDatastory } from '../../actions'
import ModalWysiwig from './components/ModalWysiwig';

const ResponsiveGridLayout = WidthProvider(Responsive);

function getLayoutHeight(height){
  return Math.floor(((height + 110)/110))
}

function checkEditMode(location){
  if(location.indexOf('create')>-1 || location.indexOf('edit')>-1)
    return true
  else
    return false
}

class Dashboard extends Component{
  constructor(props){
    super(props)

    this.state = {
      modified: this.props.history.location.modified?this.props.history.location.modified:checkEditMode(window.location.hash),
      id: this.props.match.params.id?this.props.match.params.id:undefined,
      readOnly: !checkEditMode(window.location.hash),
      widgets: [],
      isOpen: false,
      isEditorOpen: false,
      editingWidget: {},
      loading: true,
      gridLayout: {},
      keys: this.props.datastory && this.props.datastory.widgets?this.props.datastory.widgets:[], 
      layout: this.props.datastory && this.props.datastory.layout?this.props.datastory.layout:[],
      title: this.props.datastory && this.props.datastory.title?this.props.datastory.title:'',
      subtitle: this.props.datastory && this.props.datastory.subtitle?this.props.datastory.subtitle:'',
      status: this.props.datastory && this.props.datastory.status?this.props.datastory.status:0
    }

    this.onLayoutChange = this.onLayoutChange.bind(this)
    this.onBreakpointChange = this.onBreakpointChange.bind(this)
    this.newBox = this.newBox.bind(this)
    this.removeBox = this.removeBox.bind(this)
    this.onSave = this.onSave.bind(this)
    this.onRequestClose = this.onRequestClose.bind(this)
    this.handleChangeTitle = this.handleChangeTitle.bind(this)
    this.handleChangeSubTitle = this.handleChangeSubTitle.bind(this)
    this.handleChangeText = this.handleChangeText.bind(this)
    this.editTextToggle = this.editTextToggle.bind(this)
    this.handleHeight = this.handleHeight.bind(this)
    this.onDelete = this.onDelete.bind(this)
    this.onStatusChange = this.onStatusChange.bind(this)
  }

  onLayoutChange(layouts){
    
    layouts.forEach(element => {
      if(element.i.indexOf('textwidget')>-1){
        var elemH = document.getElementById(element.i+'element')?document.getElementById(element.i+'element').offsetHeight:0
        element.h = element.h>getLayoutHeight(elemH)?element.h:getLayoutHeight(elemH)
      }
    });
    
    var gridLayout = { "lg": layouts, "md": layouts}

    this.setState({ layout: layouts, modified: checkEditMode(window.location.hash), gridLayout: gridLayout, modified: checkEditMode(window.location.hash) })
  }

  onBreakpointChange(breakpoint, cols) {
    console.log(breakpoint)
    console.log(cols)
    this.setState({
      breakpoints: breakpoint,
      cols: cols
    });
  }
  
  componentWillUnmount(){
    this.setState({
      layout: [],
      keys:[],
      widgets: []
    })
  }

  componentWillReceiveProps(nextProps){
    const { dispatch, datastory } = this.props

    if(nextProps.history.location.pathname!==this.props.history.location.pathname){
      if(nextProps.history.location.pathname.indexOf('edit')>-1){
        this.setState({
          readOnly: false
        })
      }else if(nextProps.history.location.pathname.indexOf('edit')===-1){
        this.setState({
          readOnly: true
        })
      }
    }

    if(nextProps.datastory!==datastory){
      dispatch(loadWidgets(nextProps.datastory.org))
      .then(json => {

        if(json.code){
          var widgets = []
        }else{
          var widgets = json
        }

        let textWid = {
          identifier: "textwidget",
          iframe_url: null,
          origin: "text",
          table: null,
          title: "Testo",
          viz_type: "textwidget",
          pvt: false
        }
  
        widgets.unshift(textWid)
  
        this.setState({
          loading: false,
          widgets: widgets,
          keys: nextProps.datastory.widgets,
          layout: nextProps.datastory.layout,
          title: nextProps.datastory.title,
          subtitle: nextProps.datastory.subtitle,
          status: nextProps.datastory.status
        })

        this.forceUpdate()
      })
    }
  }

  componentDidMount(){
    const { dispatch, datastory } = this.props
    if(datastory && datastory.org){
      dispatch(loadWidgets(datastory.org))
      .then(json => {
        if(json.code){
          var widgets = []
        }else{
          var widgets = json
        }
        let textWid = {
          identifier: "textwidget",
          iframe_url: null,
          origin: "text",
          table: null,
          title: "Testo",
          viz_type: "textwidget",
          pvt: false
        }
  
        widgets.unshift(textWid)
  
        this.setState({
          widgets: widgets,
          loading: false
        })
      })
    }
    if(this.state.id && !datastory){
      dispatch(getDatastory(isPublic(), this.state.id))
    }
  }

  newBox(widget){
    const { keys, layout } = this.state
    var tmpk = keys
    var tmpjson = layout

    var check = tmpjson.filter(wid=>{
      return widget.identifier === wid.i
    }).length > 0

    console.log(JSON.stringify(widget))

    if(!check){
      if(widget.identifier==="textwidget"){
        let tmpW = Object.assign({}, widget)
        var idNo = tmpk.filter(wid=>{
          return wid.identifier.indexOf("textwidget")>-1
        }).length
        tmpW.identifier = widget.identifier+"_"+ idNo.toString()
        tmpk.push(tmpW) 
        tmpjson.push({
          "w":4,
          "h":4,
          "x":0,
          "y":Infinity,
          "i":tmpW.identifier,
          "isDraggable": true,
          "isResizable": true,
          "maxH": 1000000,
          "maxW": 12,
          "minH": 1,
          "minW": 1,
          "moved":false,
          "static":false
        })
      }else{
        tmpk.push(widget)
        tmpjson.push({
          "w":3,
          "h":3,
          "x":0,
          "y":Infinity,
          "i":widget.identifier,
          "isDraggable": true,
          "isResizable": true,
          "maxH": 1000000,
          "maxW": 12,
          "minH": 1,
          "minW": 1,
          "moved":false,
          "static":false
      })
      }

      this.setState({
        keys: tmpk,
        layout: tmpjson,
        isOpen: false,
        modified: true
      })
    }else{
      toastr.error("Errore", "Il widget selezionato è già presente nella dashboard")
    } 
  }

  handleChangeTitle(text){
    this.setState({
      title: text,
      modified: true
    })
  }
  
  handleChangeSubTitle(text){
    this.setState({
      subtitle: text,
      modified: true
    })
  }
  
  handleChangeText(key, value){
    const { keys } = this.state

    let pos = keys.map(elem => { return elem.identifier}).indexOf(key)

    keys[pos].text = value

    this.setState({
      modified: true,
      isEditorOpen: false,
      editingWidget: {},
      loading: true
    })

    setTimeout(()=>this.setState({loading: false}), 100)
  }

  removeBox(id){
    const { keys, layout } = this.state
    var tmpk = keys
    var tmpjson = layout

    
    tmpk = tmpk.filter(wid => {
      return wid.identifier!==id
    })
    
    tmpjson = tmpjson.filter(elem => {
      return elem.i!==id
    })
      
    console.log(tmpk)

    this.setState({
      keys: tmpk,
      layout: tmpjson,
      modified: true
    })
  }

  onRequestClose(){
    this.setState({
      isOpen: false
    })
  }

  handleHeight(identifier){
    const { layout } = this.state
    
    console.log('RESIZING')

    var newLayout = layout
    
    let pos = layout.map(elem => { return elem.i}).indexOf(identifier)
    var newH = 0

    newLayout.map(element => {
      if(element.i === identifier){
        var elemH = document.getElementById(identifier+'element')?document.getElementById(identifier+'element').offsetHeight:0
        element.h = getLayoutHeight(elemH)
        newH = getLayoutHeight(elemH)
      }
      return element
    })

    newLayout.map(element => {
      if(element.x === newLayout[pos].x && (element.y < (newLayout[pos].y + newH) && element.y > newLayout[pos].y)){
        element.y = newLayout[pos].y + newH
      }
      return element
    })

    var newGridLayout = {"lg": newLayout, "md": newLayout}

    this.setState({
      layout: newLayout,
      gridLayout: newGridLayout
    })
  }

  onSave(){
    const { dispatch, datastory, loggedUser } = this.props
    const { keys, layout, title, subtitle, status } = this.state

    let tmpStory = datastory

    tmpStory.widgets = keys
    tmpStory.layout = layout
    tmpStory.title = title
    tmpStory.subtitle = subtitle
    tmpStory.status = status

    if(tmpStory.user===''||tmpStory.user===undefined)
      tmpStory.user = loggedUser.uid

    if(layout.length === 0 || Object.keys(keys).length === 0){
      toastr.error('Impossibile salvare', 'Non è possibile salvare una Data Story senza alcun elemento')
    }else if(layout.length !== Object.keys(keys).length){
      toastr.error('Errore', 'C\'è stato un errore nella creazione della Data Story.')
    }else{
      // console.log(JSON.stringify(tmpStory))
      dispatch(saveDatastory(tmpStory))
      .then(response => {
        if(response.ok){
          response.json()
          .then(json => {
            toastr.success('Salvataggio completato', 'La storia è stata salvata correttamente')

            this.setState({
              modified: false,
            })
            if(window.location.hash.indexOf('create')>-1){
              this.setState({
                id: json.message
              })
              tmpStory.id = json.message
              dispatch(receiveDatastory(tmpStory))
              this.props.history.push('/private/datastory/list/'+json.message+'/edit')
            }
          })
        } else {
          response.json()
          .then(json => {
            toastr.error('Errore durante il salvataggio', json.message)
          })
        }
      })
    }
  }

  onDelete(){
    const { dispatch, datastory } = this.props

    dispatch(deleteDatastory(datastory.id))
    .then(response => {
      if(response.ok){
        toastr.success('Datastory eliminata con successo')
        this.props.history.push('/private/datastory/list')
        dispatch(receiveDatastory(undefined))
      }else{
        response.json()
        .then(json => {
          toastr.error('Errore durante la cancellazione', json.message)
        })
      }
    })
  }

  onStatusChange(value){
    this.setState({
      status: value,
      modified: true
    })
  }

  editToggle(){
    const { id } = this.state

    this.setState({
      readOnly:!this.state.readOnly,
      loading: true,
    })

    if(window.location.hash.indexOf('edit')>-1){
      this.props.history.push('/private/datastory/list/'+id)
    }else{
      this.props.history.push('/private/datastory/list/'+id+'/edit')
    }
    setTimeout(()=>this.setState({loading: false}), 500)
  }

  editTextToggle(identifier, text){

    this.setState({
      isEditorOpen: true,
      editingWidget: {
        'id': identifier,
        'text': text
      }
    })
  }

  render(){
    const { gridLayout, keys, widgets, isOpen, title, subtitle, id, status, loading, isEditorOpen } = this.state
    const { datastory, isFetching } = this.props

    return (
      (isFetching || loading)?<h1 className="text-center p-5"><i className="fas fa-circle-notch fa-spin mr-2" />Caricamento</h1>:<div className="mb-5">
        <App
          widgets={widgets}
          isModalOpen={isOpen}
          onRequestClose={this.onRequestClose}
          onWidgetSelect={this.newBox}
        />
        {isEditorOpen && <ModalWysiwig
          isEditorOpen={isEditorOpen}
          widget={this.state.editingWidget}
          onClose={()=>this.setState({isEditorOpen: false, editingWidget: {}})}
          onSave={this.handleChangeText}
        />}
        { (datastory && Object.keys(datastory).length>0) && <div className="container">
          <Header
            status={status}
            readOnly={this.state.readOnly}
            author={datastory.user}
            onDelete={this.onDelete}
            onStatusChange={this.onStatusChange}
            org={datastory.org}
            editToggle={this.editToggle.bind(this)}
            onSave={this.onSave}
          />
          <SectionTitle readonly={this.state.readOnly} title="Titolo"/>
          <TextEditor
            readonly={this.state.readOnly}
            keyValue="title"
            text={title} 
            className="text-editor-title"
            onChange={this.handleChangeTitle}
            placeholder="Title"
            disableHtml={true}>
          </TextEditor>
          <SectionTitle readonly={this.state.readOnly} title="Sottotitolo"/>
          <TextEditor
            readonly={this.state.readOnly}
            keyValue="subtitle"
            text={subtitle} 
            className="text-editor-subtitle"
            onChange={this.handleChangeSubTitle}
            placeholder="Sottotitolo"
            disableHtml={true}/>
          <SectionTitle readonly={this.state.readOnly} title="Contenuto"/>
          <ResponsiveGridLayout 
            className="layout"
            isDraggable={!this.state.readOnly}
            isResizable={!this.state.readOnly}
            rowHeight={110}
            cols={{ lg: 12, md: 12}}
            breakpoints={{lg: 1200, md: 960}}
            layouts={gridLayout}
            onLayoutChange={this.onLayoutChange}
            onBreakpointChange={this.onBreakpointChange}
            draggableHandle=".dragMe"
            >
            {this.state.layout.map((widget)=>{
              let pos = keys.map(elem => { return elem.identifier}).indexOf(widget.i)
              return(
                <div id={widget.i} className={this.state.readOnly?"":"p-3 b-a-1"} key={widget.i} data-grid={widget}>
                  {!this.state.readOnly && <div className="row dragMe">
                    <button className="btn btn-link text-primary ml-auto" onClick={this.removeBox.bind(this, widget.i)}><i className="fa fa-times"/></button>
                  </div>}
                  { keys[pos].viz_type!=="textwidget"&&<IframeWidget identifier={widget.i} height="95%" url={keys[pos].widget_url}/>}
                  { keys[pos].viz_type==="textwidget"&&<TextWidget handleHeight={this.handleHeight} text={keys[pos].text} identifier={widget.i} edit={this.editTextToggle} readOnly={this.state.readOnly}/>}
                </div>
              )
            })}
          </ResponsiveGridLayout>
          {!this.state.readOnly && <button className="mb-5 btn btn-link text-primary float-right" onClick={()=>this.setState({isOpen:true})}><i className="fa fa-plus-circle fa-lg"/></button>}
        </div>}
        <Prompt
            when={this.state.modified}
            message={'Ci sono delle modifiche non salvate, sei sicuro di voler lasciare la pagina?'}
          />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const loggedUser = state.userReducer['obj']?state.userReducer['obj'].loggedUser:{ }
  const { isFetching, datastory } = state.datastoryReducer['datastory'] || {isFetching: false, datastory: undefined}
  return { loggedUser, isFetching, datastory }
}

export default connect(mapStateToProps)(Dashboard)