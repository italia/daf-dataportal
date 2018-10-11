import React from 'react'
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardText,
  Button
} from 'reactstrap'

import Error from '../Error'
import VocabularyHierarchy from './VocabularyHierarchy.jsx'
import Loading from '../Loading'
import { isEmpty } from '../../util/commonUtils'
import {
  maybePublicPadding
} from '../../util/containerUtils'

const mayBeURI = uri => uri && <a target="_blank" href={uri}>{`(${uri})`}</a>

const lodviewURL = url => url.replace(
  'https://w3id.org/italia/',
  'https://ontopia.daf.teamdigitale.it/lodview/'
)

const vocabularyError = 'Errore durante il caricamento del vocabolario'

const createVocabulary = vocabulary => {
  const voc = vocabulary
  return (
    <Row>
      <Col sm={1} />
      <Col className={maybePublicPadding()} sm={10}>
        <Card className="border-0">
          <CardHeader>
            <h2 className="text-primary title-dataset mb-0">
              {voc.titles.map(title => title.value)}
              <div className="float-right mt-1  ">
                <a target="_blank" href={lodviewURL(voc.url)} className="mr-1">
                  <Button outline color="primary">
                    <b>LodView</b>
                  </Button>
                </a>
              </div>
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
                <div>
                  {`${owner.value} `}
                  <br />
                  {mayBeURI(owner.uri)}
                </div>
              ))}
            </CardText>

            <CardText>
              <strong>Pubblicato da:</strong>
              <br />
              {voc.publishedBy.map(publisher => (
                <div>
                  {`${publisher.value} `}
                  <br />
                  {mayBeURI(publisher.uri)}
                </div>
              ))}
            </CardText>

            <CardText>
              <strong>Creato da:</strong>
              <br />
              {voc.creators.map(creator => (
                <div>
                  {`${creator.value} `}
                  <br />
                  {mayBeURI(creator.uri)}
                </div>
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

            {/*
            <CardText>
              <strong>Versioni:</strong>
              <br />
              {voc.versions.map(version => version.number).join(' - ')}
            </CardText>
            */}

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

            {!isEmpty(voc.hierarchy) &&
              <div>
                <hr />
                <CardText className="mb-0">
                  <strong>Esplora il vocabolario</strong>
                  <br />
                </CardText>
              </div>
            }
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
