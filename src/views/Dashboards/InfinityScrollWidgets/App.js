import React, { Component } from 'react';
import List from './List';
import {Modal} from 'reactstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      text: false,
      superset: false,
      metabase: false,
      query: '',
    }

  }

  render() {
    const { widgets, isModalOpen, onRequestClose, onWidgetSelect } = this.props;
    return (
    <Modal
      contentLabel="Add a widget"
      className="Modal__Bootstrap modal-dialog modal-80"
      isOpen={isModalOpen}
      toggle={onRequestClose}>
      <div className="App">
        <div className="App-header">
          <button type="button" className="close" onClick={onRequestClose}>
          <span aria-hidden="true">&times;</span>
          <span className="sr-only">Chiudi</span>
          </button>
          <div className="inline">
            <h4 className="modal-title">Aggiungi un widget</h4>
          </div>
        </div>
        <List widgets={widgets}
            isModalOpen={isModalOpen}
            onWidgetSelect={onWidgetSelect}
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
