import React, { Component } from 'react';
import { 
  ResponsiveContainer,
  AreaChart, 
  XAxis, 
  YAxis, 
  ZAxis,
  CartesianGrid, 
  Area, 
  Tooltip, 
  ReferenceLine, 
  Bar, 
  BarChart, 
  Legend, 
  LineChart, 
  Line,
  ComposedChart,
  Pie,
  PieChart,
  Cell,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  RadialBarChart,
  RadialBar,
  Label,
  LabelList,
  Scatter,
  ScatterChart,
  Treemap
} from 'recharts'

const colors = ['#4a8523','#68f5c8','#acadc1','#dd4c63','#b415ab','#c4aa30','#223373','#3523d1']

class Chart extends Component{
  constructor(props){
    super(props)

    this.conditionalChartRender = this.conditionalChartRender.bind(this)
  }

  conditionalChartRender(type, data, dataVisualization, xAxis){
    switch (type) {
      case 'areachart':
        return(
          <AreaChart width={800} height={274} data={data}
                margin={{top: 10, right: 30, left: 0, bottom: 0}}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey={xAxis}/>
            <YAxis/>
            <Tooltip/>
            {dataVisualization.map((elem, index)=> {
              return(
                <Area type='monotone' dataKey={elem.dataKey} stroke={elem.color} fill={elem.color} key={index}/>
                )
              })
            }
          </AreaChart>
        )
        break;
      case 'barchart':
        return(
          <BarChart width={800} height={274} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxis} />
            <YAxis />
            <Tooltip />
            <Legend />
            {dataVisualization.map((elem, index)=> {
              return(
                <Bar dataKey={elem.dataKey} fill={elem.color} key={index}/>
                )
              })
            }
          </BarChart>
        )
        break;
      case 'linechart':
          return(
            <LineChart width={800} height={274} data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xAxis} />
              <YAxis />
              <Tooltip />
              <Legend />
              {dataVisualization.map((elem, index)=> {
                return(
                  <Line type='monotone' dataKey={elem.dataKey} stroke={elem.color} key={index}/>
                  )
                })
              }
            </LineChart>
          )
          break;
      case 'composedchart':
          return(
            <ComposedChart width={800} height={274} data={data}>
              <XAxis dataKey={xAxis} />
              <YAxis />
              <Tooltip />
              <Legend />
              <CartesianGrid stroke="#f5f5f5" />
              <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
              <Bar dataKey="pv" barSize={20} fill="#413ea0" />
              <Line type="monotone" dataKey="uv" stroke="#ff7300" />
            </ComposedChart>
          )
          break;
      case 'piechart':
          return(
            <PieChart width={800} height={274}>
              <Pie data={data} dataKey={dataVisualization[0].dataKey} nameKey={xAxis} cx="50%" cy="50%" outerRadius={100}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index]}/>
                ))
                }
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          )
          break;
      case 'radarchart':
          return(
            <RadarChart outerRadius={90} width={800} height={274} data={data}>
              <PolarGrid />
              <PolarAngleAxis dataKey={xAxis} />
              <PolarRadiusAxis angle={30} domain={[0, 150]} />
              {dataVisualization.map((elem, index)=> {
                return(
                  <Radar name={elem.dataKey} dataKey={elem.dataKey} stroke={elem.color} fill={elem.color} fillOpacity={0.6} key={index}/>
                  )
                })
              }              
              <Legend />
            </RadarChart>
          )
          break;
      case 'radialbarchart':
          return(
            <RadialBarChart width={800} height={274} innerRadius="20%" outerRadius="90%" data={data} startAngle={180} endAngle={0}>
              <RadialBar minAngle={15} label={{ fill: '#666', position: 'insideStart' }} background clockWise={true} dataKey={dataVisualization[0].dataKey} >
              {
                data.map((entry, index) => (
                  <Cell  key={`cell-${index}`} fill={colors[index]}/>
                  ))
              }
              </RadialBar>
              <Legend iconSize={10} width={120} height={140} layout='horizontal' verticalAlign='middle' align="right" />
              <Tooltip />
            </RadialBarChart>
          )
          break;
      case 'scatterchart':
          return(
            <ScatterChart width={800} height={274}
              margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis dataKey="uv" />
              <ZAxis dataKey="amt" range={[64, 144]} name="amount" unit="MB" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Legend />
              <Scatter name="Pages weight" data={data} fill="#8884d8" />
            </ScatterChart>
          )
          break;
      case 'treemap':
          return(
            <Treemap
              width={800} 
              height={274}
              data={data}
              dataKey="amt"
              ratio={4 / 3}
              stroke="#fff"
              fill="#8884d8"
            >
            <Tooltip/>
            </Treemap>
          )
          break;
      default:
      return(
        <LineChart width={800} height={274} data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis />
          <YAxis />
          <Tooltip />
          <Legend />
        </LineChart>
      )
        break;
    }
  }

  render(){
    const { data, xAxis, dataVisualization, type } = this.props

    // var type = 'barchart'

    /* const data = [
      {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
      {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
      {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
      {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
      {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
      {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
      {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
    ] */

    return(
      <ResponsiveContainer width={800} height={274}>
        {this.conditionalChartRender(type, data, dataVisualization, xAxis)}
      </ResponsiveContainer>
    )
  }
}

export default Chart

/* chartOptions :{
  xAxis: type.String
  dataVisualization : [{datakey: type.String, color:type.String},...]
  scatterchart && scatterVisualization: {yAxis: type.String, zAxis: type.String}
  showCartesian: type.boolean
} */