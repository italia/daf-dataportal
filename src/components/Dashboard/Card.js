import React, { Component } from 'react';

export default class ListBox extends Component {

    constructor(props) {
        super(props);

        this.state = {
            color: "card-inverse card-info",
            value: 0,
            icon: "icon-eye",
            label: "Visitatori",
            ...props
        };

    }

    render(){
        return (

            <div className={"card " + this.state.color }>
              <div className="card-block">
                <div className="h1 text-muted text-right mb-2">
                  <i className={this.state.icon}></i>
                </div>
                <div className="h4 mb-0">{this.state.value}</div>
                <small className="text-muted text-uppercase font-weight-bold">{this.state.label}</small>
                <div className="progress progress-xs mt-1 mb-0">
                  <div className="progress-bar bg-info" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
            </div>

        )
    }
}