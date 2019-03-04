import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getAllDatastories } from '../../actions'
import UserstoryCard from '../../components/Cards/UserstoryCard'

class DatastoryList extends Component{
  constructor(props){
    super(props)
    this.state = {}
  }

  componentDidMount(){
    const { dispatch } = this.props

    dispatch(getAllDatastories())
  }

  render(){
    const { isLoading, list } = this.props
    return(
      <div className="container">
        <div className="row">
          <i className="fas fa-font fa-lg m-2" style={{lineHeight:'1'}}/><h2>Data Story</h2>
        </div>
        {isLoading?<h1 className="text-center p-5"><i className="fas fa-circle-notch fa-spin mr-2" />Caricamento</h1> :
        <div className="row">
          <div className="col-md-3 ml-auto">
            <button className="btn btn-link text-primary float-right"><i className="fas fa-plus-circle fa-lg"/></button>
          </div>
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
    )
  }
}

function mapStateToProps(state) {
  const loggedUser = state.userReducer['obj']?state.userReducer['obj'].loggedUser:{ }
  const { list, isLoading } = state.datastoryReducer['datastories'] || {isLoading: false, list: []}
  return { loggedUser, list, isLoading }
}

export default connect(mapStateToProps)(DatastoryList)
