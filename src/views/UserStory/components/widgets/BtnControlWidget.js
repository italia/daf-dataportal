import React from 'react';
import { Bar } from 'react-chartjs';
import { getRandomInt } from './util';
import {Modal} from 'react-modal-bootstrap';

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
        let row = rows[this.props.index]
        let columns = row.columns;
        for(let i=0; i < columns.length; i++) {
            let column = columns[i];
            if(column.widgets){
                for(let j=0; j < column.widgets.length; j++) {
                    let widget = column.widgets[j];
                    if(widget.key !='BtnControlWidget_0'){
                        let widgetsArr = this.props.dashboardWidgets;
                        if(widgetsArr[widget.key]){
                            delete widgetsArr[widget.key];
                        }
                    }
                }
            }
        }
        rows.splice(this.props.index, 1);
        this.props.setLayout(this.props.layout);
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


    render() {
        return (
            <div className="btn-control-widget">
                <button type="button" className="btn btn-sm btn-gray-200" aria-label="Add Widget"
                    onClick={this.addWidgetOpenModal}>
                    <span className="fa fa-plus" aria-hidden="true"></span>
                </button>

                { this.props.index != 0 &&
                    <button type="button" className="btn btn-sm btn-gray-200" aria-label="Move Up"
                        onClick={() => this.moveUp(this.props.index)}>
                        <span className="fa fa-chevron-up" aria-hidden="true"></span>
                    </button>
                }
                { this.props.index != this.props.layout.rows.length - 1 &&
                    <button type="button" className="btn btn-sm btn-gray-200" aria-label="Move Down"
                        onClick={() => this.moveDown(this.props.index)}>
                        <span className="fa fa-chevron-down" aria-hidden="true"></span>
                    </button>
                }
                <button type="button" className="btn btn-sm btn-gray-200" aria-label="Remove"
                    onClick={() => this.removeCol()}>
                    <span className="fa fa-trash" aria-hidden="true"></span>
                </button>

                <App 
                widgets={this.props.widgets}
                isModalOpen={this.state.isModalAddOpen}
                onWidgetSelect={this.addWidget}
                onRequestClose={this.onRequestClose}
                    />

                {/*<AddWidgetDialog
                    widgets={this.props.widgets}
                    isModalOpen={this.state.isModalAddOpen}
                    onWidgetSelect={this.addWidget}
                    onRequestClose={this.onRequestClose}
                    >
                </AddWidgetDialog> */}

            </div>
        );
  }
}

export default BtnControlWidget;