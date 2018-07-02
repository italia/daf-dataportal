import React from 'react'
import {
  // Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Badge
} from 'reactstrap'

import LinkWrap from '../LinkWrap'
import Error from '../Error'

const ontologiesError = 'Errore durante il caricamento delle ontologie'

const mapOntologies = ontologies =>
  ontologies.map(ont => (
    <LinkWrap key={ont.id} to={`/private/ontologies/${ont.id}`} className="text-dark">
      <Card className="border-0">
        <CardBody>
          <CardTitle className="text-primary">
            {ont.titles.map(title => title.value)}
          </CardTitle>

          <CardText className="text-muted">{ont.url}</CardText>

          <CardText className="text-muted">
            <strong>Descrizione:</strong>
            <br />
            {ont.descriptions.map(desc => desc.value)}
          </CardText>

          <CardText className="text-muted">
            <strong>Data ultima modifica: </strong>
            {ont.lastEditDate}
          </CardText>

          <CardText className="text-muted">
            <Badge color="primary" className="px-3 py-2">
              Ontologia
            </Badge>
            <strong> TAG: </strong>
            {ont.tags.map(tag => tag.value).join(' - ')}
          </CardText>
        </CardBody>
      </Card>
    </LinkWrap>
  ))

const createOntologies = ontologies => {
  return (
    <Row>
      <Col sm={2} />
      <Col sm={8}>{mapOntologies(ontologies)}</Col>
      <Col sm={2}>
        <div className="callout callout-primary">
          <small className="text-muted">Risultato della ricerca</small>
          <br />

          <strong className="h4">{ontologies.length}</strong>
          <strong>{ontologies.length > 1 ? 'ontologie' : 'ontologia'}</strong>
        </div>
      </Col>
    </Row>
  )
}

export default class OntologiesList extends React.Component {
  componentWillMount() {
    this.props.fetchOntList()
  }

  render() {
    return this.props.hasFetched ? (
      createOntologies(this.props.data)
    ) : this.props.error ? (
      <Error msg={ontologiesError} />
    ) : null
  }
}
