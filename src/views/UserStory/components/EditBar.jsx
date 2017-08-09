import React, { PropTypes } from 'react';
import ColumnSetWidth from './ColumnSetWidth';
import AddWidgetDialog from './AddWidgetDialog';

class EditBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        }

        this.addWidget = this.addWidget.bind(this)
        this.addRow = this.addRow.bind(this)
        this.onWidgetSelect = this.onWidgetSelect.bind(this)
    }

  addRow = function (widgetName) { 
    let columns = [{
        className: 'col-lg-12 col-md-12 col-sm-12 col-xs-12',
        widgets: [],
      }];
    
    if(widgetName && typeof widgetName == "string") {
      columns[0].widgets.push({key: widgetName});
    }

    let row = {columns: columns}

    this.props.layout.rows.unshift(row);
    this.props.setLayout(this.props.layout);
  }

  addWidget = function() {
    this.setState({
      isModalOpen: true
    });
  }

  onWidgetSelect = function(widgetName) {

    this.addRow(widgetName)
    this.onRequestClose();
  }

  onRequestClose = () => {
    this.setState({
      isModalOpen: false,
    });
  }

  render = function(){

    return (
      <div className="row edit-bar">

        <div className="box">
          <button type="button" className="btn btn-default btn-xs" onClick={this.addRow}>
            <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
              Add Row
          </button>
          
          <button type="button" className="btn btn-default btn-xs" onClick={this.addWidget}>
            <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
              Add Widget
          </button>

        </div>

        <AddWidgetDialog
          widgets={this.props.widgets}
          isModalOpen={this.state.isModalOpen}
          onWidgetSelect={this.onWidgetSelect}
          onRequestClose={this.onRequestClose}
        >
        </AddWidgetDialog>
      </div>

    );
  }
};

/* 
EditBar.propTypes = {
  onEdit: PropTypes.func,
  setLayout: PropTypes.func,
  layout: PropTypes.object,
  widgets: PropTypes.object
}; */

export default EditBar;
