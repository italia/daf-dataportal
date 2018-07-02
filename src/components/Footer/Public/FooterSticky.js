import React, { Component } from 'react';


class FooterSticky extends Component {
  constructor(props){
    super(props)

    this.state= {
      hidden: false
    }
  }
  
  onClick(){
    this.setState({
      hidden: true
    })
  }

  render() {
    const { hidden } = this.state
    return (
      <div hidden={hidden} className="footer">
        <div className="row h-100">
          <h4 className="ml-auto my-auto text-white font-weight-bold">Vuoi usare gli Open Data? Partecipa all'hackaton sui dati</h4>
          <a href="https://hack.data.italia.it" target="_blank" className="ml-auto my-auto p-3 btn btn-accento">Iscriviti ad Hack Data</a>
          <i className="fas fa-times fa-lg text-white my-auto ml-auto mr-5 pointer" onClick={this.onClick.bind(this)}/>
        </div>
      </div>
    )
  }
}

export default FooterSticky;
