import React, { Component } from 'react';
import { connect } from 'react-redux'
import QueryBuild from '../../components/Widgets/QueryBuild'
import Chart from '../../components/Widgets/Chart'
import Collapse from 'rc-collapse'
import 'rc-collapse/assets/index.css'
import { GithubPicker } from 'react-color'
import { chartType } from '../../utility'

var Panel = Collapse.Panel;

const colors = ['#B80000','#DB3E00','#FCCB00','#008B02','#006B76','#1273DE','#004DCF','#5300EB',/* '#EB9694','#FAD0C3','#FEF3BD','#C1E1C5','#BEDADC','#C4DEF6','#BED3F3','#D4C4FB' */]

class CreateWidget extends Component{
  constructor(props){
    super(props)
    this.state = {
      nomeGrafico: '',
      chartType: '',
      xAxis: '',
      dataVisualization: [],
      chart: false
    }

    this.addNewDatakey = this.addNewDatakey.bind(this)
    this.changeDataVisualization = this.changeDataVisualization.bind(this)
    this.removeElement = this.removeElement.bind(this)
    this.createWidget = this.createWidget.bind(this)
  }

  addNewDatakey(){
    const { dataVisualization } = this.state
    
    var tmpArray = dataVisualization

    tmpArray.push({'dataKey':'', 'color':''})

    this.setState({
      dataVisualization: tmpArray
    })
  }
  
  removeElement(index){
    const { dataVisualization } = this.state

    var tmpArray = dataVisualization

    tmpArray.splice(index, 1)

    this.setState({
      dataVisualization: tmpArray
    })
  }

  changeDataVisualization(fieldKey, index, value){
    const { dataVisualization } = this.state
    var tmpArray = dataVisualization

    tmpArray[index][fieldKey] = value

    this.setState({
      dataVisualization: tmpArray
    })
  }

  createWidget(){
    this.setState({chart: false})

    setTimeout(()=>{
      this.setState({chart: true})
    }, 3000)
  }

  render(){
    const {queryLoading, queryResult, query } = this.props

    if(queryResult && queryResult.length > 0)
      var fields = Object.keys(queryResult[0])

    return(
      <div className="row my-5">
        <div className="col-md-5 col-12">
        <Collapse accordion={true} defaultActiveKey="0">
          <Panel header="Query Builder">
            <QueryBuild className=" "/>
          </Panel>
          <Panel header="Chart builder">
          {/* (queryResult===undefined || queryResult.length === 0)?<h3 className="text-center">Query non elaborata o risultato non disponibile, costruisci una query valida per creare il grafico</h3>: */
          <div>
            <div className="form-group row">
              <label className="col-md-4 form-control-label">Nome del grafico</label>
              <div className="col-md-8">
                <input className="form-control" placeholder="Definisci il nome del grafico" value={this.state.nomeGrafico} onChange={(e) => this.setState({nomeGrafico: e.target.value})}/>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-md-4 form-control-label">Scegli il tipo di grafico</label>
              <div className="col-md-8">
                <select className="form-control" placeholder="Definisci il nome del grafico" value={this.state.chartType} onChange={(e) => this.setState({chartType: e.target.value})}>
                  <option value=""></option>
                  {chartType.map((chart, index) => {
                    return(<option value={chart.val} key={index}>{chart.name}</option>)
                  })}
                </select>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-md-4 form-control-label">Valore di confronto</label>
              <div className="col-md-8">
                <select className="form-control" placeholder="Definisci il valore di confronto" value={this.state.xAxis} onChange={(e) => this.setState({xAxis: e.target.value})}>
                  <option value=""></option>
                  {fields&&fields.map((field, index) => {
                    return(<option value={field} key={index}>{field}</option>)
                  })}
                </select>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <label className="col-md-10 form-control-label">Dati da visualizzare</label>
                <div className="col-md-2">
                  <button className="btn btn-link text-primary float-right" title="Aggiungi un nuovo valore da visualizzare" onClick={this.addNewDatakey}>
                    <i className="fas fa-plus-circle fa-lg"/>
                  </button>
                </div>
              </div>
              {this.state.dataVisualization.map((data,index)=>{
                return(
                  <div className="row mb-3" key={index}>
                    <label className="col-md-5 mx-auto form-control-label">Valore {index+1}</label>
                    <label className="col-md-4 mx-auto form-control-label">Colore {index+1}</label>
                    <div className="col-md-1 mx-auto"></div>
                    <select className="col-md-5 mx-auto form-control"  value={data.dataKey} placeholder={"Valore nr. "+index} onChange={(e)=>{this.changeDataVisualization('dataKey', index, e.target.value)}}>
                      <option value=""></option>
                      {fields&&fields.map((field, index) => {
                        return(<option value={field}  key={index}>{field}</option>)
                      })}
                    </select>
                    <select className="col-md-4 mx-auto form-control"  value={data.color} onChange={(e)=>{this.changeDataVisualization('color', index, e.target.value)}}>
                      <option value=""></option>
                      {colors.map((color, index) => {
                        return(<option style={{backgroundColor: color, color:'#fff'}} value={color}  key={index}>{color}</option>)
                      })}
                    </select>
                    <div className="col-md-1 mx-auto">
                      <button className="btn btn-link text-primary" onClick={this.removeElement.bind(this, index)}><i className="fas fa-times fa-lg"/></button>
                    </div>
                  </div>
                  )
              })}
            </div>
          </div>}
          </Panel>
        </Collapse>
        </div>
        <div className="col-md-7 col-12">
          {this.state.chart && <Chart data={queryResult} dataVisualization={this.state.dataVisualization} xAxis={this.state.xAxis} type={this.state.chartType}/>}
        </div>
        <div className="col-12">
          <button className="btn btn-primary float-right" onClick={this.createWidget}>Crea grafico</button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const loggedUser = state.userReducer['obj']?state.userReducer['obj'].loggedUser:{ }
  const { query, queryLoading, queryResult } = state.queryReducer['query'] || { queryLoading: false, queryResult: [] }
  return { loggedUser, query, queryLoading, queryResult }
}

export default connect(mapStateToProps)(CreateWidget)

/* chartOptions :{
  xAxis: type.String
  dataVisualization : [{datakey: type.String, color:type.String},...]
  scatterchart && scatterVisualization: {yAxis: type.String, zAxis: type.String}
  showCartesian: type.boolean
} */