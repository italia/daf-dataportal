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
                    startDate: '25/02/2019',
                    endDate: '30/03/2019',
                    edit: <button>Edit</button>
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
                    Header: "Inizio",
                    accessor: "startDate"
                },
                {
                    Header: "Fine",
                    accessor: "endDate"
                },
                {
                    Header: "Modifica",
                    accessor: "edit"
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
