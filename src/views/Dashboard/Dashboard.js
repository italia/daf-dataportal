import React, { Component } from 'react';
import ListBox from '../../components/Dashboard/ListBox';
import Card from '../../components/Dashboard/Card';
//var LineChart = require("react-chartjs").Line;
import {ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';

class Dashboard extends Component {

  constructor (props) {
    super(props);

    this.state = {
      listDataset: [],
      listStories: [],
      listDashboards: [],
      
      data: [
        {date: '1', visite: 4000},
        {date: '2', visite: 3000},
        {date: '3', visite: 2000},
        {date: '4', visite: 2780},
        {date: '5', visite: 1890},
        {date: '6', visite: 2390},
        {date: '7', visite: 3490},
        {date: '8', visite: 3000},
        {date: '9', visite: 2000},
        {date: '10', visite: 2780},
        {date: '11', visite: 4000},
        {date: '12', visite: 3000},
        {date: '13', visite: 2000},
        {date: '14', visite: 2780},
        {date: '15'},
        {date: '16'},
        {date: '17'},
        {date: '18'},
        {date: '19'},
        {date: '20'},
        {date: '21'},
        {date: '22'},
        {date: '23'},
        {date: '24'},
        {date: '25'},
        {date: '26'},
        {date: '27'},
        {date: '28'},
        {date: '29'},
        {date: '30'},
        {date: '31'},
      ]

    }

  }

  render() {
    return (
      <div className="container" >

        {/* CARDS */}
        <div className="row">

          <div className="col-sm-6 col-md-2">
            <Card
              value = "340" 
            ></Card>
          </div>

          <div className="col-sm-6 col-md-2">
            <Card
              color = "card-inverse card-success"
              label = "Commenti"
              icon = "icon-speech"
              value = "34"
            ></Card>
          </div>

        </div>

        {/* GRAPH */}

        <div className="card">
            <div className="card-block">
                <div className="row mb-20">
                    <div className="col-5">
                        <h4 className="card-title">Visualizzazioni</h4>
                        <div className="small text-muted mt-20" >Novembre 2017</div>
                    </div>
                    <div className="col-7">
                        <div className="btn-toolbar pull-right" role="toolbar" aria-label="Toolbar with button groups">
                            <div className="btn-group" data-toggle="buttons" aria-label="First group">
                                <label className="btn btn-outline-secondary">
                                      Day
                                </label>
                                <label className="btn btn-outline-secondary">
                                      Month
                                </label>
                                <label className="btn btn-outline-secondary active">
                                      Year
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="chart-wrapper" >

                    <ResponsiveContainer aspect={4.0/1.0} width='100%'>
                  
                      <AreaChart data={this.state.data}>
                        <defs>
                          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#06c" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Area type="monotone" dataKey="visite" stroke="#8884d8" fillOpacity={0.6} fill="#06c" />
                      </AreaChart>
                    </ResponsiveContainer>

                </div>
            </div>
        </div>

        {/* BOXES */}


        <div className="row">

          <div className="col-sm-12 col-md-4">
            <ListBox 
              title="Datasets Recenti" 
              list={this.state.listDataset}
            ></ListBox>
          </div>

          <div className="col-sm-12 col-md-4">
            <ListBox 
              title="Storie Recenti" 
              list={this.state.listDataset}
            ></ListBox>
          </div>

          <div className="col-sm-12 col-md-4">
            <ListBox 
              title="Dashboards recenti" 
              list={this.state.listDataset}
            ></ListBox>
          </div>

        </div>

      </div>
    )
  }
}

export default Dashboard;
