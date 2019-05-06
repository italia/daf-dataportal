import React, { Component } from 'react'
import MessageService from '../../views/Messages/services/MessageService';
import { toastr } from "react-redux-toastr";

const messageService = new MessageService()

const card = {
    width: "20rem",
    height: "7rem"
}

export default class Messages extends Component {
    constructor(props) {
        super(props)

        this.state = {
            jsonMessages: [],
            stepStart: 0,
            stepEnd: 2
        }
    }

    loadData() {
        console.log("loadData")
        messageService
            .listMessagesPublic()
            .then(response => response.json())
            .then((response) => {

                this.setState({ jsonMessages: response })
            })
            .catch(error => {
                console.log('Errore nel recupero dei dati');
                toastr.error(messages.label.errore, error.message);
            });
    }

    componentDidMount() {
        this.loadData()
    }

    nextPrevSteps(isNextStep) {
        if (isNextStep) {
            this.setState({
                stepStart: this.state.stepStart + 3,
                stepEnd: this.state.stepEnd + 3
            })
        } else {
            this.setState({
                stepStart: this.state.stepStart - 3,
                stepEnd: this.state.stepEnd - 3
            })
        }
    }

    render() {
        return (
            <div>
                {this.state.jsonMessages.length > 0 &&
                    <div className="mt-0 py-3 container">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12 col-md-7 col-12">
                                <div className="row">
                                    <div className="col-lg-12 col-md-7 col-12">
                                        <h1 className="text-gray-600 font-weight-bold" style={{ fontSize: '1.5rem' }}>Comunicazioni</h1>
                                    </div>
                                </div>
                                <div className="row mx-auto m-0">
                                    {this.state.stepStart > 0 && <i title="Indietro" className="fas fa-chevron-left" style={{ cursor: "pointer", fontSize: "35px", marginTop: "30px" }} onClick={() => this.nextPrevSteps(false)}></i>}
                                    {
                                        this.state.jsonMessages.map((message, index) => {
                                            return (

                                                (index >= this.state.stepStart && index <= this.state.stepEnd) &&
                                                <div key={index} className="mx-auto">
                                                    <div className="card" style={card}>
                                                        <div className="card-header">
                                                            {message.info.title}
                                                        </div>
                                                        <div className="card-body" style={{ height: "100px", overflow: "auto" }}>
                                                            <p className="card-text">{message.info.description}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                    {this.state.stepEnd < this.state.jsonMessages.length - 1 && <i className="fas fa-chevron-right" title="Avanti" style={{ cursor: "pointer", fontSize: "35px", marginTop: "30px" }} onClick={() => this.nextPrevSteps(true)}></i>}
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}
