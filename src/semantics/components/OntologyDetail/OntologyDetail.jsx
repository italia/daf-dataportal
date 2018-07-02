import React from 'react'
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText
} from 'reactstrap'

import Error from '../Error'

const ontologyError = "Errore durante il caricamento dell'ontologia"

const createOntology = ontology => {
  const ont = ontology
  return (
    <Row>
      <Col sm={2} />
      <Col sm={8}>
        <Card className="border-0">
          <CardHeader className="bg-primary text-white border-0">
            <strong>Ontologia</strong>
          </CardHeader>
          <CardBody>
            <CardTitle className="text-primary">
              {ont.titles.map(title => title.value)}
            </CardTitle>

            <CardText className="text-muted">
              <strong>Descrizione:</strong>
              <br />
              {ont.descriptions.map(desc => desc.value)}
            </CardText>

            <CardText className="text-muted">
              <strong>URL:</strong>
              <br />
              {ont.url}
            </CardText>

            <CardText className="text-muted">
              <strong>Titolare:</strong>
              <br />
              {ont.owners.map((owner, index) => <div key={index}>{`${owner.value}`}</div>)}
            </CardText>

            <CardText className="text-muted">
              <strong>Pubblicato da:</strong>
              <br />
              {ont.publishedBy.map(publisher => (
                <div>{`${publisher.value}`}</div>
              ))}
            </CardText>

            <CardText className="text-muted">
              <strong>Creato da:</strong>
              <br />
              {ont.creators.map(creator => <div>{`${creator.value}`}</div>)}
            </CardText>

            <CardText className="text-muted">
              <strong>Data ultima modifica: </strong>
              {ont.lastEditDate}
            </CardText>

            <CardText className="text-muted">
              <strong>Versioni: </strong>
              {/* {ont.versions.map(version => version.number).join(' - ')} */}
            </CardText>

            <CardText className="text-muted">
              <strong>Licenza: </strong>
              {ont.licenses.map(license => license.value).join(' ')}
            </CardText>

            <CardText className="text-muted">
              <strong>Lingue: </strong>
              {ont.langs.join(' - ')}
            </CardText>

            <CardText className="text-muted">
              <strong>TAG: </strong>
              {ont.tags.map(tag => tag.value).join(' - ')}
            </CardText>
          </CardBody>
        </Card>
      </Col>
      <Col sm={2} />
    </Row>
  )
}

export default class OntologyDetail extends React.Component {
  componentWillMount() {
    this.props.fetchOntDetail(this.props.match.params.filter)
  }

  render() {
    return this.props.hasFetched ? (
      createOntology(this.props.data)
    ) : this.props.error ? (
      <Error msg={ontologyError} />
    ) : null
  }
}
