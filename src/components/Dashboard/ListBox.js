import React, { Component } from 'react';

export default class ListBox extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: "title",
            list: [],
            noResult: "Nessun risultato",
            ...props
        };

    }

    render(){
        return (

        <div className="card">
            <div className="card-header">
                {this.state.title}
            </div>
            <div className="card-block">
                {

                    !(!this.state.list || this.state.list.length == 0 )?
                    <div className="row mb-20">
                        <div className="col-8">
                        
                        </div>
                        <div className="col-2">
                        <i className="icon-eye"></i>
                        </div>
                        <div className="col-2">
                        <i className="icon-speech"></i>
                        </div>
                    </div>
                    :""
                }

                {
                    this.state.list.map((item, index ) => {
                        <div className="row">
                            <div className="col-8">
                                {item.name}
                            </div>
                            <div className="col-2">
                                {item.views}
                            </div>
                            <div className="col-2">
                                {item.comment}
                            </div>
                        </div>
                    })
                }

                {
                    (!this.state.list || this.state.list.length == 0 )?
                    <h4>
                        {this.state.noResult}
                    </h4>
                    : ""
                }
            </div>
        </div>
        )
    }
}