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
      filter: '',
      filtered: props.widgets,
      widgets: props.widgets
    }

    this.filter = this.filter.bind(this)
  }

  filter(value){
    const { widgets } = this.state
    // console.log('filter', widgets.filter((item) => item.title.toLowerCase().indexOf(value.toLowerCase()) != -1))
    this.setState({
      filtered: widgets.filter((item) => item.title.toLowerCase().indexOf(value.toLowerCase()) != -1),
      filter: value
    });
  }

  render() {
    const { isModalOpen, onRequestClose, onWidgetSelect } = this.props;
    const { filtered, filter } = this.state

    return (
    <Modal
      contentLabel="Add a widget"
      isOpen={isModalOpen}
      toggle={onRequestClose}>
      <div className="App">
        <div className="App-header">
          <button type="button" className="close" onClick={onRequestClose}>
          <span aria-hidden="true">&times;</span>
          <span className="sr-only">Chiudi</span>
          </button>
          <div className="inline mb-4">
            <h4 className="modal-title">Aggiungi un widget</h4>
          </div>
          <input className="form-control" placeholder="Filtra la lista" value={filter} onChange={(e) => this.filter(e.target.value)}/>
        </div>
        <List widgets={filtered}
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
