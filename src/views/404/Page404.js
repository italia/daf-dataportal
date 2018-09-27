import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { Link } from 'react-router-dom'


class Page404 extends Component {
  render() {
    return (
      <div className="flex-row align-items-center pt-5">
        <Container className="pt-5">
          <Row className="pt-5 justify-content-center">
            <Col md="7">
              <div className="clearfix">
                <h1 className="float-left display-3 mr-4">404</h1>
                <h4 className="pt-3">Oops! Ti sei perso.</h4>
                <p className="text-muted float-left">La pagina che stavi cercando non è stata trovata.<Link className="text-primary" to='/home'>Torna alla homepage</Link></p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Page404;