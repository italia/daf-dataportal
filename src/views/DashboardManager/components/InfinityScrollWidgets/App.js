import React, { Component } from 'react';
import List from './List';
import Modal from 'react-modal';

class App extends Component {
  constructor(props) {
    super(props);
}

  render() {
    const { widgets, isModalOpen, onRequestClose, onWidgetSelect } = this.props;
    return (
    <Modal
      contentLabel="Add a widget"
      className="Modal__Bootstrap modal-dialog modal-80"
      isOpen={isModalOpen}>
      <div className="App">
        <div className="App-header">
        <button type="button" className="close" onClick={onRequestClose}>
        <span aria-hidden="true">&times;</span>
        <span className="sr-only">Chiudi</span>
      </button>
      <h4 className="modal-title">Aggiungi un widget</h4>
        </div>
        <List widgets={this.props.widgets}
            isModalOpen={this.props.isModalOpen}
            onWidgetSelect={this.props.onWidgetSelect}
            onRequestClose={this.props.onRequestClose}/>
      </div>
    </Modal>

    );
  }
}

      /*<div className="App">
        <List widgets={this.props.widgets}
              isModalOpen={this.props.isModalOpen}
              onWidgetSelect={this.props.onWidgetSelect}
              onRequestClose={this.props.onRequestClose}/>
    </div>*/



export default App;
