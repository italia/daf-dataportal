import React from 'react'
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText
} from 'reactstrap'

import Error from '../Error'
import Loading from '../Loading'

const ontologyError = `Errore durante il caricamento dell'ontologia`

const createOntology = ontology => {
  const ont = ontology
  return (
    <Row>
      <Col sm={1} />
      <Col sm={10}>
        <Card className="border-0">
          <CardHeader>
            <h2 className="text-primary title-dataset mb-0">
              {ont.titles.map(title => title.value)}
            </h2>
          </CardHeader>
          <CardBody style={{ font: "400 18px/23px Titillium Web" }}>
            <CardText>
              <strong>Descrizione:</strong>
              <br />
              {ont.descriptions.map(desc => desc.value)}
            </CardText>

            <CardText>
              <strong>URL:</strong>
              <br />
              {ont.url}
            </CardText>

            <CardText>
              <strong>Titolare:</strong>
              <br />
              {ont.owners.map(owner => (
                <span>{`${owner.value} (${owner.uri})`}</span>
                ))}
            </CardText>

            <CardText>
              <strong>Pubblicato da:</strong>
              <br />
              {ont.publishedBy.map(publisher => (
                <span>{`${publisher.value} (${publisher.uri})`}</span>
              ))}
            </CardText>

            <CardText>
              <strong>Creato da:</strong>
              <br />
              {ont.creators.map(creator => (
                <span>{`${creator.value} (${creator.uri})`}</span>
              ))}
            </CardText>

            <CardText>
              <strong>Data ultima modifica:</strong>
              <br />
              {ont.lastEditDate}
            </CardText>

            <CardText>
              <strong>Versioni:</strong>
              <br />
              {/* {ont.versions.map(version => version.number).join(' - ')} */}
            </CardText>

            <CardText>
              <strong>Licenza:</strong>
              <br />
              {ont.licenses.map(license => license.value).join(' ')}
            </CardText>

            <CardText>
              <strong>Lingue:</strong>
              <br />
              {ont.langs.join(' - ')}
            </CardText>

            <CardText>
              <strong>TAG:</strong>
              <br />
              {ont.tags.map(tag => tag.value).join(' - ')}
            </CardText>
          </CardBody>
        </Card>
      </Col>
      <Col sm={1} />
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
    ) : (
      <Loading />
    )
  }
}
