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
import VocabularyHierarchy from './VocabularyHierarchy.jsx'

const vocabularyError = 'Errore durante il caricamento del vocabolario'

const createVocabulary = vocabulary => {
  const voc = vocabulary
  return (
    <Row>
      <Col sm={2} />
      <Col sm={8}>
        <Card className="border-0">
          <CardHeader className="bg-danger text-white border-0">
            <strong>Vocabolario</strong>
          </CardHeader>
          <CardBody>
            <CardTitle className="text-danger">
              {voc.titles.map(title => title.value)}
            </CardTitle>

            <CardText className="text-muted">
              <strong>Descrizione:</strong>
              <br />
              {voc.descriptions.map(desc => desc.value)}
            </CardText>

            <CardText className="text-muted">
              <strong>URL:</strong>
              <br />
              {voc.url}
            </CardText>

            <CardText className="text-muted">
              <strong>Titolare:</strong>
              <br />
              {voc.owners.map(owner => (
                <div>{`${owner.value} (${owner.uri})`}</div>
              ))}
            </CardText>

            <CardText className="text-muted">
              <strong>Pubblicato da:</strong>
              <br />
              {voc.publishedBy.map(publisher => (
                <div>{`${publisher.value} (${publisher.uri})`}</div>
              ))}
            </CardText>

            <CardText className="text-muted">
              <strong>Creato da:</strong>
              <br />
              {voc.creators.map(creator => (
                <div>{`${creator.value} (${creator.uri})`}</div>
              ))}
            </CardText>

            <CardText className="text-muted">
              <strong>Data di creazione: </strong>
              {voc.creationDate}
            </CardText>

            <CardText className="text-muted">
              <strong>Data ultima modifica: </strong>
              {voc.lastEditDate}
            </CardText>

            <CardText className="text-muted">
              <strong>Versioni: </strong>
              {/* {voc.versions.map(version => version.number).join(' - ')} */}
            </CardText>

            <CardText className="text-muted">
              <strong>Licenza: </strong>
              {voc.licenses.map(license => license.value)}
            </CardText>

            <CardText className="text-muted">
              <strong>Lingue: </strong>
              {voc.langs.join(' - ')}
            </CardText>

            <CardText className="text-muted">
              <strong>TAG: </strong>
              <br />
              {voc.tags.map(tag => tag.value).join(' - ')}
            </CardText>

            <hr />

            {voc.hierarchy ? (
              <CardText className="text-muted mb-0">
                <strong>Gerarchia:</strong>
              </CardText>
            ) : null}
            <VocabularyHierarchy hierarchy={voc.hierarchy} />
          </CardBody>
        </Card>
      </Col>
      <Col sm={2} />
    </Row>
  )
}

export default class VocabularyDetail extends React.Component {
  componentWillMount() {
    this.props.fetchVocDetail(this.props.match.params.filter)
  }

  render() {
    return this.props.hasFetched ? (
      createVocabulary(this.props.data)
    ) : this.props.error ? (
      <Error msg={vocabularyError} />
    ) : null
  }
}
