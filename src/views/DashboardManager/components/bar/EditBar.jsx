import React, { PropTypes } from 'react';
import AddWidgetDialog from '../AddWidgetDialog';

class EditBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        }

        this.addWidgetOpenModal = this.addWidgetOpenModal.bind(this)
        this.addWidget = this.addWidget.bind(this)
    }

  

  addWidgetOpenModal = function() {
    this.setState({
      isModalOpen: true
    });
  }

  addWidget = function(widgetName) {
    this.props.addWidget(widgetName);
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
        
        <div className="box transparent">
          <button type="button" className="btn btn-link btn-xs float-right" onClick={this.addWidgetOpenModal} title="Aggiungi contenuto">
              <i className="fa fa-plus-circle fa-lg m-t-2"></i>
          </button>
        </div>

        <AddWidgetDialog
          widgets={this.props.widgets}
          isModalOpen={this.state.isModalOpen}
          onWidgetSelect={this.addWidget}
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
