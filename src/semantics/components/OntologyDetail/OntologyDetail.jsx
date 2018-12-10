import React from "react";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardText,
  Button
} from "reactstrap";

import Error from "../Error";
import Loading from "../Loading";
import { isEmpty } from '../../util/commonUtils'
import { maybePublicPadding } from "../../util/containerUtils";

const mayBeURI = uri => uri && <a target="_blank" href={uri}>{`(${uri})`}</a>;

const lodviewURL = url => url.replace(
  'https://w3id.org/italia/',
  'https://ontopia.daf.teamdigitale.it/lodview/'
)

const lodeURL = url =>
  `http://ontopia.daf.teamdigitale.it/lode/extract?url=${url}&lang=it`;

const webvowlURL = url =>
  `http://ontopia.daf.teamdigitale.it/webvowl/#iri=${url}`;

const ontologyError = `Errore durante il caricamento dell'ontologia`;

const createOntology = ontology => {
  const ont = ontology;
  return (
    <Row>
      <Col sm={1} />
      <Col className={maybePublicPadding()} sm={10}>
        <Card className="border-0">
          <CardHeader>
            <h2 className="text-primary title-dataset mb-0">
              {isEmpty(ont.titles) ? 'Titolo non disponibile' : ont.titles.map(title => title.value)}
              <div className="float-right mt-1">
                <a target="_blank" href={lodviewURL(ont.url)} className="mr-1">
                  <Button outline color="primary">
                    <b>LodView </b>
                    <i className="fas fa-link" />
                  </Button>
                </a>
                <a target="_blank" href={lodeURL(ont.url)} className="mr-1">
                  <Button outline color="primary">
                    <b>LODE </b>
                    <i className="fas fa-link" />
                  </Button>
                </a>
                <a target="_blank" href={webvowlURL(ont.url)}>
                  <Button outline color="primary">
                    <b>WebVOWL </b>
                    <i className="fas fa-link" />
                  </Button>
                </a>
              </div>
            </h2>
          </CardHeader>
          <CardBody style={{ font: "400 18px/23px Titillium Web" }}>
            {!isEmpty(ont.descriptions) && <CardText>
              <strong>Descrizione:</strong>
              <br />
              {ont.descriptions.map(desc => desc.value)}
            </CardText>}

            {ont.url && <CardText>
              <strong>URL:</strong>
              <br />
              <a target="_blank" href={ont.url}>{ont.url}</a>
            </CardText>}

            {!isEmpty(ont.owners) && <CardText>
              <strong>Titolare:</strong>
              <br />
              {ont.owners.map(owner => (
                <div>
                  {`${owner.value} `}
                  <br />
                  {mayBeURI(owner.uri)}
                </div>
              ))}
            </CardText>}

            {!isEmpty(ont.publishedBy) && <CardText>
              <strong>Pubblicato da:</strong>
              <br />
              {ont.publishedBy.map(publisher => (
                <div>
                  {`${publisher.value} `}
                  <br />
                  {mayBeURI(publisher.uri)}
                </div>
              ))}
            </CardText>}

            {!isEmpty(ont.creators) && <CardText>
              <strong>Creato da:</strong>
              <br />
              {ont.creators.map(creator => (
                <div>
                  {`${creator.value} `}
                  <br />
                  {mayBeURI(creator.uri)}
                </div>
              ))}
            </CardText>}

            {ont.lastEditDate && <CardText>
              <strong>Data ultima modifica:</strong>
              <br />
              {ont.lastEditDate}
            </CardText>}

            {!isEmpty(ont.licenses) && <CardText>
              <strong>Licenza:</strong>
              <br />
              {ont.licenses.map(license => license.value).join(" ")}
            </CardText>}

            {!isEmpty(ont.langs) && <CardText>
              <strong>Lingue:</strong>
              <br />
              {ont.langs.map(lang => <i className={`mr-3 flag-icon flag-icon-${lang === 'en' ? 'gb' : lang}`} aria-hidden />)}
            </CardText>}

            {!isEmpty(ont.tags) && <CardText>
              <strong>TAG:</strong>
              <br />
              {ont.tags.map(tag => tag.value).join(" - ")}
            </CardText>}
          </CardBody>
        </Card>
      </Col>
      <Col sm={1} />
    </Row>
  );
};

export default class OntologyDetail extends React.Component {
  componentWillMount() {
    this.props.fetchOntDetail(this.props.match.params.filter);
  }

  render() {
    return this.props.isFetching ? (
      <Loading />
    ) : this.props.hasFetched ? (
      createOntology(this.props.data)
    ) : this.props.error ? (
      <Error msg={ontologyError} />
    ) : null;
  }
}
