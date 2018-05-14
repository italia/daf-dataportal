import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <div className="section bg-footer clearfix">
        <footer className="container py-5">
          <div className="row mb-5">
            <div className="col-12">
              <img src="https://www.spid.gov.it/assets/img/agid-logo-bb.svg" alt="Logo Agid" title="Logo AGID" height='80px' className="mb-5"/>
            </div>
            <div className="col-12 col-sm-3">
              <h4 className="text-white font-weight-bold mb-3">Il DAF Italia</h4>
              <ul className="list-group list-group-flush">
                <li className="list-group-item bg-footer"><a href="">Chi Siamo</a></li>
                <li className="list-group-item bg-footer"><a href="">Il Progetto</a></li>
                <li className="list-group-item bg-footer"><a href="">Strategia</a></li>
                <li className="list-group-item bg-footer"><a href="#/private">Area privata e strumenti</a></li>                
              </ul>
            </div>
            <div className="col-12 col-sm-3">
              <h4 className="text-white font-weight-bold mb-3">Open data in Italia</h4>
              <ul className="list-group list-group-flush">
                <li className="list-group-item bg-footer"><a href="">Il catalogo nazionale</a></li>
                <li className="list-group-item bg-footer"><a href="">Tipologie</a></li>
                <li className="list-group-item bg-footer"><a href="">Qualità</a></li>
                <li className="list-group-item bg-footer"><a href="#/private">Faq</a></li>                
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-sm-3">
              <h4 className="text-white font-weight-bold mb-3">Open data in Italia</h4>
              <ul className="list-group list-group-flush">
                <li className="list-group-item bg-footer"><a href="">Il catalogo nazionale</a></li>
                <li className="list-group-item bg-footer"><a href="">Tipologie</a></li>
                <li className="list-group-item bg-footer"><a href="">Qualità</a></li>
                <li className="list-group-item bg-footer"><a href="#/private">Faq</a></li>                
              </ul>
            </div>
            <div className="col-12 col-sm-3">
              <h4 className="text-white font-weight-bold mb-3">Seguici su</h4>
              <ul className="list-group list-group-flush">
                <li className="list-group-item bg-footer social-links">
                  <a className="bg-accento rounded-circle text-footer-social py-1 px-2" href="https://twitter.com/teamdigitaleIT?lang=it" title="Twitter"><i className="fab fa-twitter"/></a>
                  <a className="bg-accento rounded-circle text-footer-social py-1 px-2 mx-2" href="https://medium.com/team-per-la-trasformazione-digitale" title="Medium"><i className="fab fa-medium-m"/></a>
                </li>               
              </ul>
            </div>
          </div>
        </footer>
      </div>
    )
  }
}

export default Footer;
