import React from 'react'
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Badge
} from 'reactstrap'
import { Link } from 'react-router-dom'

import Error from '../Error'
import Loading from '../Loading'

const ontologiesError = 'Errore durante il caricamento delle ontologie'

const mapOntologies = ontologies =>
  ontologies.map(ont => (
    <Card key={`ontology-${ont.id}`}>
      <CardBody
        className="text-dark"
        style={{ font: "400 16px/23px Titillium Web" }}
      >
        <Link to={`/private/ontologies/${ont.id}`}>
          <CardTitle
            className="text-primary"
            style={{ font: "500 24.5px/29.4px Titillium Web" }}
          >
            {ont.titles.map(title => title.value)}
          </CardTitle>
        </Link>

        <CardText className="text-muted">{ont.url}</CardText>

        <CardText>
          <strong>Descrizione:</strong>
          <br />
          {ont.descriptions.map(desc => desc.value)}
        </CardText>

        <CardText>
          <strong>Data ultima modifica:</strong>
          <br />
          {ont.lastEditDate}
        </CardText>

        <CardText>
          <Badge color="primary" className="px-3 py-2">
            Ontologia
          </Badge>
          <strong> TAG: </strong>
          {ont.tags.map(tag => tag.value).join(' - ')}
        </CardText>
      </CardBody>
    </Card>
  ))

const createOntologies = ontologies => (
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

export default class OntologiesList extends React.Component {
  componentWillMount() {
    this.props.fetchOntList()
  }

  render() {
    return this.props.hasFetched ? (
      createOntologies(this.props.data)
    ) : this.props.error ? (
      <Error msg={ontologiesError} />
    ) : (
      <Loading />
    )
  }
}
