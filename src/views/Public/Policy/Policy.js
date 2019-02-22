import React, { Component } from 'react';


class Policy extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="w-100">
        <div>
        </div>
        <div className="container p-5 mt-2">
          <div className="row mt-4">
            <div className="paragrafo col-12 mx-0">
              <h1 className="ml-0" id='pol-1'>1. Policy</h1>
            </div>
            <div className="paragrafo col-7 mx-0">

              <h5>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sed mauris quis massa scelerisque commodo. Sed at tempor massa.
            </h5>

              <h1 className="ml-0" id='pol-1.2'>1.2 Policy</h1>
            </div>
            <div className="col-md-3 mx-auto p-0">

              <p className="text-muted font-lg font-weight-bold pt-3">Sommario</p>

              <div className="nav">
                <ul>
                  <li><button className="btn btn-link text-primary" onClick={this.handleScroll.bind(this, 'pol-1')}>1. Policy </button></li>
                  <li><button className="btn btn-link text-primary" onClick={this.handleScroll.bind(this, 'pol-1.2')}>1.2 Policy </button></li>
                  <li><button className="btn btn-link text-primary" onClick={this.handleScroll.bind(this, 'pol-2')}>2. Policy </button></li>
                </ul>

              </div>
            </div>
            <div className="paragrafo col-7 mx-0">

              <h5>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sed mauris quis massa scelerisque commodo. Sed at tempor massa.
            </h5>


              <h1 className="ml-0" id='pol-2'>2. Policy</h1>
            </div>
            <div className="paragrafo col-7 mx-0">

              <h5>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sed mauris quis massa scelerisque commodo. Sed at tempor massa.
            </h5>

              <ol className="my-4">
                <h5><li className=""><b>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b> Vestibulum sed mauris quis massa scelerisque commodo.</li></h5>
                <h5><li className=""><b>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b> Vestibulum sed mauris quis massa scelerisque commodo.</li></h5>
                <h5><li className=""><b>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b> Vestibulum sed mauris quis massa scelerisque commodo.</li></h5>

              </ol>
              <h5>

                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sed mauris quis massa scelerisque commodo. Sed at tempor massa.
    
            </h5>
            </div>
          </div>
        </div>
      </div>
    )
  }



  handleScroll(id) {
    const item = document.getElementById(id);
    window.scrollTo(0, item.offsetTop);
  }


}

export default Policy