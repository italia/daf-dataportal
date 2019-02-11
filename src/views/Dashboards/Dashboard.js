import React, { Component } from 'react';
//import GridLayout from 'react-grid-layout'
import { connect } from 'react-redux'
import { toastr } from 'react-redux-toastr'
import { Responsive, WidthProvider } from 'react-grid-layout';
import IframeWidget from '../DashboardManager/components/widgets/IframeWidget'
import TextWidget from '../DashboardManager/components/widgets/TextWidget'
import App from './InfinityScrollWidgets/App'
import { loadIframes } from '../../actions'

const ResponsiveGridLayout = WidthProvider(Responsive);

class Dashboard extends Component{
  constructor(props){
    super(props)

    this.state = {
      widgets: [],
      isOpen: false,
      keys: [], 
      layouts: {"lg":[], "md":[], "sm":[], "xs":[], "xxs":[]}
    }
    this.onLayoutChange = this.onLayoutChange.bind(this)
    this.newBox = this.newBox.bind(this)
    this.removeBox = this.removeBox.bind(this)
    this.onRequestClose = this.onRequestClose.bind(this)
  }

  onLayoutChange(layouts){
    console.log(layouts)
    this.setState({ layouts })
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
        for ( var i in tmpjson){
          tmpjson[i].push({"w":5,"h":5,"x":0,"y":Infinity,"i":tmpwidget.identifier,"minW":4, "minH":2,"moved":false,"static":false})
        }
        widget.identifier="textwidget"
      }else{
        tmparr.push(widget)
        for ( var i in tmpjson){
          tmpjson[i].push({"w":5,"h":5,"x":0,"y":Infinity,"i":widget.identifier,"minW":4, "minH":2,"moved":false,"static":false})
        }
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

  removeBox(id){
    const { keys, layouts } = this.state
    var tmparr = keys
    var tmpjson = layouts

    var resArr = tmparr.filter(widget => {
      return widget.identifier !== id
    })

    for ( var i in tmpjson){
      tmpjson[i] = tmpjson[i].filter(elem => {
        return elem.i!==id
      })
    }

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
          <ResponsiveGridLayout 
            className="layout" 
            layouts={layouts}
            breakpoints={{lg: 1200, sm: 768, xs: 575, xxs: 0}}
            cols={{lg: 12, sm: 10, xs: 4, xxs: 2}}
            onLayoutChange={(layout, layouts) =>{
              this.onLayoutChange(layouts)
            }}
            draggableHandle=".dragMe"
            >
            {this.state.keys.map((widget)=>{
              return(
                <div className="p-3 b-a-1" key={widget.identifier}>
                  <div className="row dragMe">
                    <button className="btn btn-link text-primary ml-auto" onClick={this.removeBox.bind(this, widget.identifier)}><i className="fa fa-times"/></button>
                  </div>
                  {widget.viz_type!=="textwidget"&&<IframeWidget identifier={widget.identifier} height="95%" url={widget.iframe_url}/>}
                  {widget.viz_type==="textwidget"&&<TextWidget text={widget.text} readOnly={false}/>}
                </div>
              )
            })}
          </ResponsiveGridLayout>
          <button className="btn btn-link text-primary float-right" onClick={()=>this.setState({isOpen:true})}><i className="fa fa-plus-circle fa-lg"/></button>
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