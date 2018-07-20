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
import VocabularyHierarchy from './VocabularyHierarchy.jsx'
import Loading from '../Loading'

const vocabularyError = 'Errore durante il caricamento del vocabolario'

const createVocabulary = vocabulary => {
  const voc = vocabulary
  return (
    <Row>
      <Col sm={1} />
      <Col sm={10}>
        <Card className="border-0">
          <CardHeader>
            <h2 className="text-primary title-dataset mb-0">
              {voc.titles.map(title => title.value)}
            </h2>
          </CardHeader>
          <CardBody style={{ font: "400 18px/23px Titillium Web" }}>
            <CardText>
              <strong>Descrizione:</strong>
              <br />
              {voc.descriptions.map(desc => desc.value)}
            </CardText>

            <CardText>
              <strong>URL:</strong>
              <br />
              {voc.url}
            </CardText>

            <CardText>
              <strong>Titolare:</strong>
              <br />
              {voc.owners.map(owner => (
                <span>{`${owner.value} (${owner.uri})`}</span>
              ))}
            </CardText>

            <CardText>
              <strong>Pubblicato da:</strong>
              <br />
              {voc.publishedBy.map(publisher => (
                <span>{`${publisher.value} (${publisher.uri})`}</span>
              ))}
            </CardText>

            <CardText>
              <strong>Creato da:</strong>
              <br />
              {voc.creators.map(creator => (
                <span>{`${creator.value} (${creator.uri})`}</span>
              ))}
            </CardText>

            <CardText>
              <strong>Data di creazione:</strong>
              <br />
              {voc.creationDate}
            </CardText>

            <CardText>
              <strong>Data ultima modifica:</strong>
              <br />
              {voc.lastEditDate}
            </CardText>

            <CardText>
              <strong>Versioni:</strong>
              <br />
              {/* {voc.versions.map(version => version.number).join(' - ')} */}
            </CardText>

            <CardText>
              <strong>Licenza:</strong>
              <br />
              {voc.licenses.map(license => license.value)}
            </CardText>

            <CardText>
              <strong>Lingue:</strong>
              <br />
              {voc.langs.join(' - ')}
            </CardText>

            <CardText>
              <strong>TAG:</strong>
              <br />
              {voc.tags.map(tag => tag.value).join(' - ')}
            </CardText>

            <hr />

            {voc.hierarchy ? (
              <CardText className="mb-0">
                <strong>Gerarchia:</strong>
                <br />
              </CardText>
            ) : null}
            {<Loading /> && <VocabularyHierarchy hierarchy={voc.hierarchy} />}
          </CardBody>
        </Card>
      </Col>
      <Col sm={1} />
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
    ) : (
      <Loading />
    )
  }
}
