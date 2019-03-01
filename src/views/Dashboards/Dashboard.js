import React, { Component } from 'react';
import { connect } from 'react-redux'
import { toastr } from 'react-redux-toastr'
import { Responsive, WidthProvider } from 'react-grid-layout';
import IframeWidget from '../DashboardManager/components/widgets/IframeWidget'
import TextWidget from '../DashboardManager/components/widgets/TextWidget'
import TextEditor from '../UserStory/components/editor/TextEditor'
import SectionTitle from '../UserStory/components/SectionTitle'
import App from './InfinityScrollWidgets/App'
import { loadIframes } from '../../actions'

const ResponsiveGridLayout = WidthProvider(Responsive);

function getLayoutHeight(height){
  return Math.floor(((height + 30)/30) + 1)
}

class Dashboard extends Component{
  constructor(props){
    super(props)

    this.state = {
      title: '',
      readOnly: false,
      widgets: [],
      isOpen: false,
      keys: [], 
      layouts: []
    }
    this.onLayoutChange = this.onLayoutChange.bind(this)
    this.onBreakpointChange = this.onBreakpointChange.bind(this)
    this.newBox = this.newBox.bind(this)
    this.removeBox = this.removeBox.bind(this)
    this.onRequestClose = this.onRequestClose.bind(this)
    this.handleChangeTitle = this.handleChangeTitle.bind(this)
    this.handleChangeText = this.handleChangeText.bind(this)
    this.handleChangeHeight = this.handleChangeHeight.bind(this)
  }

  onLayoutChange(layouts){
    console.log(this.state.layouts)
    console.log(layouts)

    this.setState({ layouts: layouts })
  }

  onBreakpointChange(breakpoint, cols) {
    console.log(breakpoint)
    console.log(cols)
    this.setState({
      breakpoints: breakpoint,
      cols: cols
    });
  }

  componentDidMount(){
    const { dispatch } = this.props

    dispatch(loadIframes('daf_data', '1'))
    .then(json => {
      var widgets = json
      let textWid = {
        identifier: "textwidget",
        iframe_url: null,
        origin: "text",
        table: null,
        title: "Testo",
        viz_type: "textwidget",
      }

      widgets.unshift(textWid)

      this.setState({
        widgets: widgets
      })
    })
  }

  newBox(widget){
    const { keys, layouts } = this.state
    var tmparr = keys
    var tmpjson = layouts

    var check = tmparr.filter(wid=>{
      return widget.identifier === wid.identifier
    }).length > 0

    if(!check){
      if(widget.identifier==="textwidget"){
        var idNo = tmparr.filter(wid=>{
          return wid.identifier.indexOf("textwidget")>-1
        }).length

        let tmpwidget = {
          identifier: widget.identifier+"_"+ idNo.toString(),
          iframe_url: widget.iframe_url,
          origin: widget.origin,
          table: widget.table,
          title: widget.title,
          viz_type: widget.viz_type,
          text: widget.text
        }

        tmparr.push(tmpwidget)
        // for ( var i in tmpjson){
          tmpjson.push({"w":1,"h":1,"x":0,"y":Infinity,"i":tmpwidget.identifier,"moved":false,"static":false})
        // }
        widget.identifier="textwidget"
      }else{
        tmparr.push(widget)
        // for ( var i in tmpjson){
          tmpjson.push({"w":1,"h":1,"x":0,"y":Infinity,"i":widget.identifier,"moved":false,"static":false})
        // }
      }

      this.setState({
        keys: tmparr,
        layouts: tmpjson,
        isOpen: false
      })
    }else{
      toastr.error("Errore", "Il widget selezionato è già presente nella dashboard")
    } 
  }

  handleChangeTitle(text){
    this.setState({
      title: text
    })
  }
  
  handleChangeText(key, value){
    const { keys } = this.state

    var tmpW = keys.map(elem => {
      if(elem.identifier===key)
        elem.text=value
      
      return elem
    })

    this.setState({
      keys: tmpW
    })
  }

  handleChangeHeight(key){
    const { layouts } = this.state

    var tmp = document.getElementById(key)

    var h = getLayoutHeight(tmp.offsetHeight)
    
    var tempL = {"lg":[], "md":[], "sm":[], "xs":[], "xxs":[]}

    for (var i in layouts){

      tempL[i] = layouts[i].map(e=>{
        e.i===key ? e.h = h : null
        return e
      })

    }

    this.setState({
      layouts: tempL
    })
    
  }

  removeBox(id){
    const { keys, layouts } = this.state
    var tmparr = keys
    var tmpjson = layouts

    var resArr = tmparr.filter(widget => {
      return widget.identifier !== id
    })

    
      tmpjson = tmpjson.filter(elem => {
        return elem.i!==id
      })
      

    this.setState({
      keys: resArr,
      layouts: tmpjson
    })
  }

  onRequestClose(){
    this.setState({
      isOpen: false
    })
  }

  render(){
    const { layouts, widgets, isOpen } = this.state

    return (
      <div>
        <App
          widgets={widgets}
          isModalOpen={isOpen}
          onRequestClose={this.onRequestClose}
          onWidgetSelect={this.newBox}
        />
        <div className="container">
          <button className="btn btn-link text-primary" onClick={()=>this.setState({readOnly:!this.state.readOnly})}><i className="fa fa-edit"/></button>
          <SectionTitle readonly={this.state.readOnly} title="Titolo"/>
          <TextEditor
            readonly={this.state.readOnly}
            keyValue="title"
            text={this.state.title} 
            className="text-editor-title"
            onChange={this.handleChangeTitle}
            placeholder="Title"
            disableHtml={true}>
          </TextEditor>
          <SectionTitle readonly={this.state.readOnly} title="Contenuto"/>
          <ResponsiveGridLayout 
            className="layout"
            isDraggable={!this.state.readOnly}
            isResizable={!this.state.readOnly}
            // layouts={layouts}
            rowHeight={100}
            cols={{ lg: 12, md: 10 }}
            breakpoints={{lg: 1200, md: 960}}
            // cols={this.state.cols}
            // breakpoints={this.state.breakpoints}
            onLayoutChange={this.onLayoutChange}
            onBreakpointChange={this.onBreakpointChange}
            draggableHandle=".dragMe"
            >
            {this.state.layouts.map((widget)=>{
              return(
                <div className={this.state.readOnly?"":"p-3 b-a-1"} key={widget.i} data-grid={widget}>
                  {!this.state.readOnly && <div className="row dragMe">
                    <button className="btn btn-link text-primary ml-auto" onClick={this.removeBox.bind(this, widget.identifier)}><i className="fa fa-times"/></button>
                  </div>}
                  {/* widget.viz_type!=="textwidget"&&<IframeWidget identifier={widget.identifier} height="95%" url={widget.iframe_url}/>}
                  {widget.viz_type==="textwidget"&&<TextWidget text={widget.text} readOnly={false} identifier={widget.identifier} onSave={this.handleChangeText} onChange={this.handleChangeHeight} readOnly={this.state.readOnly}/>} */}
                </div>
              )
            })}
          </ResponsiveGridLayout>
          {!this.state.readOnly && <button className="btn btn-link text-primary float-right" onClick={()=>this.setState({isOpen:true})}><i className="fa fa-plus-circle fa-lg"/></button>}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const loggedUser = state.userReducer['obj']?state.userReducer['obj'].loggedUser:{ }
  return { loggedUser }
}

export default connect(mapStateToProps)(Dashboard)