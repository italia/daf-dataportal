import React, { Component } from 'react'
import ReactTable from "react-table"

export default class ListMessages extends Component {
    constructor(props) {
        super(props)
      
        this.state = {
           jsonPreview: [
               {
                    title: 'prova titolo',
                    message: 'Prova Messaggio',
                    date: '25/02/2019',
                    actions: <div><button>Modifica</button><button>Cancella</button></div>
               }
            ],
           columns: [
                {
                    Header: "Titolo",
                    accessor: "title"
                },
                {
                    Header: "Messaggio",
                    accessor: "message"
                },
                {
                    Header: "Data",
                    accessor: "date"
                },
                {
                    accessor: "actions"
                }
            ]
        }
    };
    render() {
    return (
        <ReactTable 
            data={this.state.jsonPreview}
            columns={this.state.columns}
            defaultPageSize={10}
            className="-striped -highlight"
        />
    )
  }
}
