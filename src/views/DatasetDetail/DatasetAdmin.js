import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  getDatasetACL
} from '../../actions.js'

class DatasetAdmin extends Component{
  constructor(props){
    super(props)
    this.state={
      message: ''
    }
  }

  componentDidMount(){
    const { dispatch, dataset } = this.props
    dispatch(getDatasetACL(dataset.dcatapit.name))
    .then(json => {
      console.log(json)
      if(json.code === 1){
        this.setState({
          message: json.message
        })
      }
    })
  }

  render(){
    return(
      <div hidden={!this.props.showAdmin} className="col-12 card-text">
        <div className="col-12">
          <div className="row text-muted">
              <i className="text-icon fas fa-unlock fa-lg mr-3 mt-1" style={{ lineHeight: '1' }} /><h4 className="mb-3"><b>Permessi</b></h4>
          </div>
        </div>
        <div className="col-12">
          {this.state.message}
          <table className="table table-striped">
            <thead>
                <tr>
                <th scope="col">Organizzazione</th>
                <th scope="col">Ruolo</th>
                <th scope="col">Workgroup</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { dataset } = state.datasetReducer['obj'] || { isFetching: true, items: [], ope: '' }
  return { dataset }
}

export default connect(mapStateToProps)(DatasetAdmin)