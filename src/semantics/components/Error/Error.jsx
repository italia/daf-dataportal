import React from 'react'
import { Row, Col, Alert } from 'reactstrap'

export default ({ msg }) => (
  <Row>
    <Col sm={2} />
    <Col sm={8}>
      <Alert color="danger">{msg}</Alert>
    </Col>
    <Col sm={2} />
  </Row>
)
