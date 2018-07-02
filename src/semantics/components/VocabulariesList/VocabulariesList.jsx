import React from 'react'
import {
  Container,
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

const vocabulariesError = 'Errore durante il caricamento dei vocabolari'

const mapVocabularies = vocabularies =>
  vocabularies.map(voc => (
    <LinkWrap key={voc.id} to={`/private/vocabularies/${voc.id}`} className="text-dark">
      <Card className="border-0">
        <CardBody>
          <CardTitle className="text-danger">
            {voc.titles.map(title => title.value)}
          </CardTitle>

          <CardText className="text-muted">{voc.url}</CardText>

          <CardText className="text-muted">
            <strong>Descrizione:</strong>
            <br />
            {voc.descriptions.map(desc => desc.value)}
          </CardText>

          <CardText className="text-muted">
            <strong>Data ultima modifica: </strong>
            {voc.lastEditDate}
          </CardText>

          <CardText className="text-muted">
            <Badge color="danger" className="px-3 py-2">
              Vocabolario
            </Badge>
            <strong> TAG: </strong>
            {voc.tags.map(tag => tag.value).join(' - ')}
          </CardText>
        </CardBody>
      </Card>
    </LinkWrap>
  ))

const createVocabularies = vocabularies => (
  <Row>
    <Col sm={2} />
    <Col sm={8}>{mapVocabularies(vocabularies)}</Col>
    <Col sm={2}>
      <div className="callout callout-danger">
        <small className="text-muted">Risultato della ricerca</small>
        <br />

        <strong className="h4">{vocabularies.length}</strong>
        <strong>
          {vocabularies.length > 1 ? 'vocabolari' : 'vocabolario'}
        </strong>
      </div>
    </Col>
  </Row>
)

export default class VocabulariesList extends React.Component {
  componentWillMount() {
    this.props.fetchVocList()
  }

  render() {
    return this.props.hasFetched ? (
      createVocabularies(this.props.data)
    ) : this.props.error ? (
      <Error msg={vocabulariesError} />
    ) : null
  }
}
