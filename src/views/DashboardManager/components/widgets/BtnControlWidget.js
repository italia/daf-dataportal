import React from 'react';
import { Bar } from 'react-chartjs';
import { getRandomInt } from './util';
import Modal from 'react-modal';
import AddWidgetDialog from '../AddWidgetDialog';
import App from '../InfinityScrollWidgets/App.js'

class BtnControlWidget extends React.Component {
    constructor() {
        super();
        this.state = {
            isModalAddOpen: false,
            isModalOpen: false
        }

        this.addWidgetOpenModal = this.addWidgetOpenModal.bind(this)
        this.addWidget = this.addWidget.bind(this)
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }

    moveDown = function(index) {
        let rows = this.props.layout.rows;
        let from = index;
        let to = index + 1;

        rows.splice(to, 0, rows.splice(from, 1)[0]);
        this.props.setLayout(this.props.layout);
    }

    moveUp = function(index) {
        let rows = this.props.layout.rows;
        let from = index;
        let to = index - 1;

        rows.splice(to, 0, rows.splice(from, 1)[0]);
        this.props.setLayout(this.props.layout);
    }

    removeCol = function () {
        let rows = this.props.layout.rows;
        rows.splice(this.props.index, 1);

        this.props.setLayout(this.props.layout);
    }

    openModal = function(e){
        e.stopPropagation();
        e.preventDefault();
        e.nativeEvent.stopImmediatePropagation();
        this.setState({
            isModalOpen: true
        })
    }
    
    closeModal = function (){
        this.setState({
            isModalOpen: false
        })
    }

    addWidgetOpenModal = function() {
        this.setState({
            isModalAddOpen: true
        });
    }

    addWidget = function(widgetName) {
        this.props.addWidget(widgetName, this.props.index);
        this.onRequestClose();
    }

    onRequestClose = () => {
        this.setState({
            isModalAddOpen: false,
        });
    }

    setCol = function (size, index, align) {

        let sizeClass = "col-xs-12"; 

        //set size class
        if (size == 1) {
            sizeClass = "col-lg-12 col-md-12 col-sm-12 col-xs-12"; 
        } else if (size == 2) {
            sizeClass = "col-lg-6 col-md-6 col-sm-6 col-xs-6"; 
        } else if (size == 3) {
            sizeClass = "col-lg-4 col-md-4 col-sm-4 col-xs-4"; 
        } else if (size == 4) {
            sizeClass = "col-lg-3 col-md-3 col-sm-3 col-xs-3"; 
        }

        //add or remove columns on row
        let max = size;
        if (max < this.props.layout.rows[index].columns.length) {
            max = this.props.layout.rows[index].columns.length;
        }

        let control = this.props.layout.rows[index].columns.pop();
        for(let i=0; i < max; i++) {

            //set column 30/70
            if (size == 2 && align == 1 && i == 0) {
                sizeClass = "col-lg-4 col-md-4 col-sm-4 col-xs-4"; 
            }
            if (size == 2 && align == 1 && i == 1) {
                sizeClass = "col-lg-8 col-md-8 col-sm-8 col-xs-8"; 
            }
            
            //set column 70/30
            if (size == 2 && align == 2 && i == 1) {
                sizeClass = "col-lg-4 col-md-4 col-sm-4 col-xs-4"; 
            }
            if (size == 2 && align == 2 && i == 0) {
                sizeClass = "col-lg-8 col-md-8 col-sm-8 col-xs-8"; 
            }


            if (i <= size) {
                //crea colonna
                if (!this.props.layout.rows[index].columns[i]) {
                    this.props.layout.rows[index].columns[i] = {
                        className: sizeClass,
                        widgets: []
                    }
                } else {
                //update size col
                    this.props.layout.rows[index].columns[i].className=sizeClass;
                }
            }

            //rimuovi colonna
            if (i >= size && this.props.layout.rows[index].columns[i]) {
                this.props.layout.rows[index].columns.splice(i);
            }
        }

        this.props.layout.rows[index].columns.push(control);

        this.props.setLayout(this.props.layout);
        this.closeModal();
    }

    render() {
        return (
            <div className="btn-control-widget">
                <button type="button" className="btn btn-sm btn-default" aria-label="Add Widget"
                    onClick={this.addWidgetOpenModal}>
                    <span className="fa fa-plus" aria-hidden="true"></span>
                </button>

                { this.props.index != 0 &&
                    <button type="button" className="btn btn-sm btn-default" aria-label="Move Up"
                        onClick={() => this.moveUp(this.props.index)}>
                        <span className="fa fa-chevron-up" aria-hidden="true"></span>
                    </button>
                }
                { this.props.index != this.props.layout.rows.length - 1 &&
                    <button type="button" className="btn btn-sm btn-default" aria-label="Move Down"
                        onClick={() => this.moveDown(this.props.index)}>
                        <span className="fa fa-chevron-down" aria-hidden="true"></span>
                    </button>
                }
                <button type="button" className="btn btn-sm btn-default" aria-label="Remove"
                    onClick={() => this.removeCol()}>
                    <span className="fa fa-trash" aria-hidden="true"></span>
                </button>
                
                <button type="button" className="btn btn-sm btn-default" aria-label="Change witdh"
                    onClick={this.openModal}>
                    <span className="fa fa-pencil" aria-hidden="true"></span>
                </button>

                <App 
                widgets={this.props.widgets}
                isModalOpen={this.state.isModalAddOpen}
                onWidgetSelect={this.addWidget}
                onRequestClose={this.onRequestClose}
                    />*

                {/*<AddWidgetDialog
                    widgets={this.props.widgets}
                    isModalOpen={this.state.isModalAddOpen}
                    onWidgetSelect={this.addWidget}
                    onRequestClose={this.onRequestClose}
                    >
                </AddWidgetDialog> */}

                <Modal
                    contentLabel="Set width columns"
                    className="Modal__Bootstrap modal-dialog"
                    isOpen={this.state.isModalOpen}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" onClick={this.closeModal}>
                            <span aria-hidden="true">&times;</span>
                            <span className="sr-only">Close</span>
                            </button>
                            <h4 className="modal-title">Scegli il layout</h4>
                        </div>
                        <div className="modal-body">
                            <div className="row p-s-10">
                                <div className="layout-container col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                    
                                    <div className="row layout-box" onClick={() => this.setCol(1, this.props.index)}>
                                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                            100%
                                        </div>
                                    </div>

                                </div>
                                <div className="layout-container col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                    
                                    <div className="row layout-box" onClick={() => this.setCol(3, this.props.index)}>
                                        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            33%
                                        </div>
                                        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            33%
                                        </div>
                                        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            33%
                                        </div>
                                    </div>

                                </div>
                                <div className="layout-container col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                    
                                    <div className="row layout-box" onClick={() => this.setCol(4, this.props.index)}>
                                        <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                                            25%
                                        </div>
                                        <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                                            25%
                                        </div>
                                        <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                                            25%
                                        </div>
                                        <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                                            25%
                                        </div>
                                    </div>

                                </div>
                            </div>

                            
                            <div className="row p-s-10">
                                <div className="layout-container col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                    
                                    <div className="row layout-box" onClick={() => this.setCol(2, this.props.index, 1)}>
                                        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            30%
                                        </div>
                                        <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                                            70%
                                        </div>
                                    </div>

                                </div>
                                <div className="layout-container col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                    
                                    <div className="row layout-box" onClick={() => this.setCol(2, this.props.index)}>
                                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                            50%
                                        </div>
                                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                            50%
                                        </div>
                                    </div>

                                </div>
                                <div className="layout-container col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                    
                                    <div className="row layout-box" onClick={() => this.setCol(2, this.props.index, 2)}>
                                        <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                                            70%
                                        </div>
                                        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                            30%
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button onClick={this.closeModal} type="button" className="btn btn-default" >Chiudi</button>
                        </div>
                    </div>
                </Modal>
            </div>
        );
  }
}

export default BtnControlWidget;