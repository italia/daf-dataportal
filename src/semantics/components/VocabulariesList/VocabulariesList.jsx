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
import { isEmpty } from '../../util/commonUtils'
import {
  privatePrefix,
  maybePublicPadding
} from '../../util/containerUtils'

const vocabulariesError = 'Errore durante il caricamento dei vocabolari'

const mapVocabularies = vocabularies =>
  vocabularies.map(voc => (
    <Card key={`vocabulary-${voc.id}`}>
      <CardBody
        className="text-dark"
        style={{ font: "400 16px/23px Titillium Web" }}
      >
        <Link to={`${privatePrefix()}/vocabularies/${voc.id}`}>
          <CardTitle
            className="text-primary"
            style={{ font: "500 24.5px/29.4px Titillium Web" }}
          >
            {isEmpty(voc.titles) ? 'Titolo non disponibile' : voc.titles.map(title => title.value)}
          </CardTitle>
        </Link>

        {!isEmpty(voc.url) && <CardText className="text-muted">{voc.url}</CardText>}

        {!isEmpty(voc.descriptions) && <CardText>
          <strong>Descrizione:</strong>
          <br />
          {voc.descriptions.map(desc => desc.value)}
        </CardText>}

        {!isEmpty(voc.lastEditDate) && <CardText>
          <strong>Data ultima modifica:</strong>
          <br />
          {voc.lastEditDate}
        </CardText>}

        {!isEmpty(voc.tags) && <CardText>
          {/* <Badge color="primary" className="px-3 py-2">
            Vocabolario
          </Badge> */}
          <strong> TAG: </strong>
          {voc.tags.map(tag => tag.value).join(' - ')}
        </CardText>}
      </CardBody>
    </Card>
  ))

const createVocabularies = vocabularies => (
  <Row className={maybePublicPadding()}>
    <Col sm={2} />
    <Col sm={8}>{mapVocabularies(vocabularies)}</Col>
    <Col sm={2}>
      <div className="callout callout-primary">
        {/* <small className="text-muted">Risultato della ricerca</small>
        <br /> */}

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
    ) : (
          <Loading />
        )
  }
}
