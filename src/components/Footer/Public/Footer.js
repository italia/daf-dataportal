import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Footer extends Component {
  render() {
    return (
      <div className="section bg-footer clearfix">
        <footer className="container pt-5">
          <div className="row mb-5">
            <div className="col-12 row">
              <img src="https://teamdigitale.governo.it/images/loghi/governo.svg" alt="Logo Governo" title="Logo Governo" height='80px' className="mb-3 mr-3" />
              <img src="https://teamdigitale.governo.it/images/loghi/demo.png" alt="Logo Team" title="Logo Team" height='80px' className="mb-3 mr-3" />
              <h4 className="text-white pl-3" style={{ borderLeft: '1px solid white' }}>
                TEAM PER LA
                <br />
                TRASFORMAZIONE
                <br />
                DIGITALE
              </h4>
            </div>
            <div className="mt-3 col-12 col-sm-3">
              <h4 className="text-white font-weight-bold mb-3">Il DAF Italia</h4>
              <ul className="list-group list-group-flush">
                <li className="list-group-item bg-footer"><Link to={'/team'}>Chi Siamo</Link></li>
                <li className="list-group-item bg-footer"><Link to={'/missione'}>Missione</Link></li>
                <li className="list-group-item bg-footer"><Link to={'/gettingstarted'}>Getting started</Link></li>
                <li className="list-group-item bg-footer"><Link to={'/private'}>Area privata e strumenti</Link></li>
              </ul>
            </div>



            <div className="mt-3 col-12 col-sm-3">
              <h4 className="text-white font-weight-bold mb-3">DAF Community</h4>
              <ul className="list-group list-group-flush">
                <li className="list-group-item bg-footer"><Link to={'/userstory/list'}>Le storie</Link></li>
                <li className="list-group-item bg-footer"><Link to={'/notizie'}>Notizie</Link></li>
                <li className="list-group-item bg-footer"><Link to={'/faqs'}>Faqs</Link></li>
                <li className="list-group-item bg-footer">
                  <a href="https://forum.italia.it" target="_blank">Forum</a>
                </li>
              </ul>
            </div>
            <div className="mt-3 col-12 col-sm-3">
              <h4 className="text-white font-weight-bold mb-3">Open data in Italia</h4>
              <ul className="list-group list-group-flush">
                <li className="list-group-item bg-footer"><Link to={'/dataset/list'}>Il catalogo dei dataset</Link></li>
                {/* <li className="list-group-item bg-footer"><Link to={'/partecipa'}>Partecipa</Link></li> */}
              </ul>
            </div>
            <div className="mt-3 col-12 col-sm-3">
              <h4 className="text-white font-weight-bold mb-3">Seguici su</h4>
              <ul className="list-group list-group-flush">
                <li
                  className="list-group-item bg-footer social-links"
                >
                  <a className="bg-accento rounded-circle text-footer-social py-1 px-2" target="_blank" href="https://twitter.com/teamdigitaleIT?lang=it" title="Twitter"><i className="fab fa-twitter" /></a>
                  <a className="bg-accento rounded-circle text-footer-social py-1 px-2 mx-2" target="_blank" href="https://medium.com/team-per-la-trasformazione-digitale" title="Medium"><i className="fab fa-medium-m" /></a>
                </li>

              </ul>

            </div>
          </div>

          <div className="row">
            {/* <div className="col-12 col-sm-3">
              <h4 className="text-white font-weight-bold mb-3">Open data in Italia</h4>
              <ul className="list-group list-group-flush">
                <li className="list-group-item bg-footer"><a href="">Il catalogo nazionale</a></li>
                <li className="list-group-item bg-footer"><a href="">Tipologie</a></li>
                <li className="list-group-item bg-footer"><a href="">Qualità</a></li>
                <li className="list-group-item bg-footer"><a href="#/private">Faq</a></li>
              </ul>
            </div> */}

          </div>
          {/* <div className="row b-t-1 p-3">
            <Link className="mr-3 text-accento" to={'/policy'}>Privacy policy</Link>
            <Link className="mr-3 text-accento" to={'/termini'}>Termini e condizioni</Link>
          </div> */}
        </footer>
      </div>
    )
  }
}

export default Footer;
