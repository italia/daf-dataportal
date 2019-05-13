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
      pubCheck: true,
      pvtCheck: true,
      filtered: props.widgets,
      widgets: props.widgets
    }

    this.filter = this.filter.bind(this)
    this.onPvtClick = this.onPvtClick.bind(this)
    // this.onPubClick = this.onPubClick.bind(this)

  }

  filter(value){
    const { widgets } = this.state
    // console.log('filter', widgets.filter((item) => item.title.toLowerCase().indexOf(value.toLowerCase()) != -1))
    this.setState({
      filtered: widgets.filter((item) => item.title.toLowerCase().indexOf(value.toLowerCase()) != -1),
      filter: value
    });
  }

  // onPubClick(){
  //   const { widgets } = this.state
  //   var tmp = []
  //
  //   if(!this.state.pubCheck === false){
  //     tmp = widgets.filter(widget => {
  //       return widget.pvt === true
  //     })
  //   }else{
  //     tmp = widgets
  //   }
  //   this.setState({
  //     filter: '',
  //     pubCheck: !this.state.pubCheck,
  //     filtered: tmp
  //   })
  // }

  onPvtClick(){
    const { widgets } = this.state
    var tmp = []

    if(!this.state.pvtCheck === false){
      tmp = widgets.filter(widget => {
        return widget.pvt === false
      })
    }else{
      tmp = widgets
    }
    this.setState({
      filter: '',
      pvtCheck: !this.state.pvtCheck,
      filtered: tmp
    })
  }

  render() {
    const { isModalOpen, onRequestClose, onWidgetSelect } = this.props;
    const { filtered, filter } = this.state
    const txtWid = {
      identifier: "textwidget",
      iframe_url: null,
      origin: "text",
      table: null,
      title: "Testo",
      viz_type: "textwidget",
      pvt: false
    }
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
          {/*<i className="fas fa-globe text-primary mr-2 fa-lg"/>
          <label className="switch switch-3d switch-primary mr-3 mb-4">
            <input type="checkbox" className="switch-input" checked={this.state.pubCheck} onClick={this.onPubClick}/>
            <span className="switch-label"></span>
            <span className="switch-handle"></span>
          </label>*/}
          <div className="row mb-3">
            <button className="btn btn-accento col-lg-3 col-md-4 col-7 mx-auto btn-lg" onClick={()=>onWidgetSelect(txtWid)}><i className="fa fa-font mr-2"/>Aggiungi un testo</button>
          </div>
          <p className="text-center mb-3 font-italic font-weight-light font-xl">Oppure</p>
          <i className="fas fa-lock text-primary mr-2 fa-lg"/>
          <label className="switch switch-3d switch-primary mr-3 mb-4" title={this.state.pvtCheck?"Mostra solo i widget Open Data":"Aggiungi i widget Privati"}>
            <input type="checkbox" className="switch-input" checked={this.state.pvtCheck} onClick={this.onPvtClick}/>
            <span className="switch-label"></span>
            <span className="switch-handle"></span>
          </label>
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
