import React, { Component } from 'react';
import List from './List';
import {Modal} from 'react-modal-bootstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      text: false,
      superset: false,
      metabase: false,
      query: '',
      filteredWidget: this.props.widgets,
      searched: this.props.widgets
    }

    this.onTextClick = this.onTextClick.bind(this);
    this.onSupersetClick = this.onSupersetClick.bind(this);
    this.onMetabaseClick = this.onMetabaseClick.bind(this);
  }

  onTextClick(){
    this.setState({
      text: !this.state.text,
      superset: false,
      metabase: false,
      filteredWidget: this.state.text ? this.props.widgets : this.filterBy("textwidget"),
      searched: this.state.text ? this.props.widgets : this.filterBy("textwidget"),
    })
  }

  onSupersetClick() {
    this.setState({
      text: false,
      superset: !this.state.superset,
      metabase: false,
      filteredWidget: this.state.superset ? this.props.widgets : this.filterBy("superset"),
      searched: this.state.superset ? this.props.widgets : this.filterBy("superset"),
    })
  }

  onMetabaseClick() {
    this.setState({
      text: false,
      superset: false,
      metabase: !this.state.metabase,
      filteredWidget: this.state.metabase ? this.props.widgets : this.filterBy("metabase"),
      searched: this.state.metabase ? this.props.widgets : this.filterBy("metabase")
    })
  }

  filterBy(val) {
    const { widgets } = this.props
    var result = Object.keys(widgets).reduce(function (r, e) {
      if (e.toLowerCase().indexOf(val) != -1) {
        r[e] = widgets[e];
      } else {
        Object.keys(widgets[e]).forEach(function (k) {
          if (k.toLowerCase().indexOf(val) != -1) {
            var object = {}
            object[k] = widgets[e][k];
            r[e] = object;
          }
        })
      }
      return r;
    }, {})
    return result;
  }

  searchBy(val){
    const { filteredWidget } = this.state;
    var result = Object.keys(filteredWidget).reduce(function (r, e) {
      if (filteredWidget[e].title.toLowerCase().indexOf(val) != -1) {
        r[e] = filteredWidget[e];
      }
      return r;
    }, {})
    
    this.setState({
      query: val,
      searched: result 
    })
    return result;
  }

  render() {
    const { widgets, isModalOpen, onRequestClose, onWidgetSelect } = this.props;
    const { text, superset, metabase, filteredWidget, searched } = this.state;
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
          <div className="inline">
            <h4 className="modal-title">Aggiungi un widget</h4>
            <div className="pt-2 btn-group">
              <button type="button" className={"btn btn-" + (text ? "primary" : "default")} onClick={this.onTextClick}>Testuale</button>
              <button type="button" className={"btn btn-" + (superset ? "primary" : "default")} onClick={this.onSupersetClick}>Superset</button>
              <button type="button" className={"btn btn-" + (metabase ? "primary" : "default")} onClick={this.onMetabaseClick}>Metabase</button>
                <input className="pl-4 form-control" placeholder="Cerca la dashboard" value={this.state.query}
                  onChange={(e) => this.searchBy(e.target.value)} />
            </div>
          </div>
        </div>
        <List widgets={searched}
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
