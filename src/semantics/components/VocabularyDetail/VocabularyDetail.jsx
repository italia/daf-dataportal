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

import VocabularyHierarchy from "./components/VocabularyHierarchy.jsx";
import DistButtons from './components/DistButtons/DistButtons'
import Error from "../Error";
import Loading from "../Loading";
import { isEmpty } from "../../util/commonUtils";
import { maybePublicPadding } from "../../util/containerUtils";

const mayBeURI = uri => uri && <a target="_blank" href={uri}>{`(${uri})`}</a>;

const lodviewURL = url =>
  url.replace(
    "https://w3id.org/italia/",
    "https://ontopia.daf.teamdigitale.it/lodview/"
  );

const vocabularyError = "Errore durante il caricamento del vocabolario";

const createVocabulary = vocabulary => {
  const voc = vocabulary;

  const hasHierarchy = () => !isEmpty(voc.hierarchy);

  return (
    <Row>
      <Col sm={1} />
      <Col className={maybePublicPadding()} sm={10}>
        <Card className="border-0">
          <CardHeader>
            <h2 className="text-primary title-dataset mb-0">
              {isEmpty(voc.titles) ? 'Titolo non disponibile' : voc.titles.map(title => title.value)}
              <div className="float-right mt-1  ">
                <a target="_blank" href={lodviewURL(voc.url)} className="mr-1">
                  <Button outline color="primary">
                    <b>LodView </b>
                    <i className="fas fa-link" />
                  </Button>
                </a>
              </div>
            </h2>
          </CardHeader>
          <CardBody style={{ font: "400 18px/23px Titillium Web" }}>
            <Row>
              <Col sm={7}>
                {!isEmpty(voc.descriptions) && <CardText>
                  <strong>Descrizione:</strong>
                  <br />
                  {voc.descriptions.map(desc => desc.value)}
                </CardText>}

                {voc.url && <CardText>
                  <strong>URL:</strong>
                  <br />
                  <a target="_blank" href={voc.url}>{voc.url}</a>
                </CardText>}

                <DistButtons distributions={voc.distributions} />
                
                {!isEmpty(voc.owners) && <CardText>
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
}
                {!isEmpty(voc.publishedBy) && <CardText>
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
                }
                {!isEmpty(voc.creators) && <CardText>
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
                }
                {voc.creationDate && <CardText>
                  <strong>Data di creazione:</strong>
                  <br />
                  {voc.creationDate}
                </CardText>
                }
                {voc.lastEditDate && <CardText>
                  <strong>Data ultima modifica:</strong>
                  <br />
                  {voc.lastEditDate}
                </CardText>
                }

              {!isEmpty(voc.licenses) && <CardText>
                  <strong>Licenza:</strong>
                  <br />
                  {voc.licenses.map(license => license.value)}
                </CardText>
              }
               {!isEmpty(voc.langs) &&  <CardText>
                  <strong>Lingue:</strong>
                  <br />
                  {voc.langs.map(lang => (
                    <i
                      title={lang}
                      className={`mr-2 flag-icon flag-icon-${
                        lang === "en" ? "gb" : lang
                      }`}
                      aria-hidden
                    />
                  ))}
                </CardText>
               }
                {!isEmpty(voc.tags) && <CardText>
                  <strong>TAG:</strong>
                  <br />
                  {voc.tags.map(tag => tag.value).join(" - ")}
                </CardText>
                }
              </Col>
              {hasHierarchy() && (
                <Col sm={5} className="border-left">
                  <CardText className="mb-0">
                    <strong>Esplora il vocabolario</strong>
                    <br />
                  </CardText>
                  {<Loading /> && (
                    <VocabularyHierarchy hierarchy={voc.hierarchy} />
                  )}
                </Col>
              )}
            </Row>
          </CardBody>
        </Card>
      </Col>
      <Col sm={1} />
    </Row>
  );
};

export default class VocabularyDetail extends React.Component {
  componentDidMount() {
    this.props.fetchVocDetail(this.props.match.params.filter);
  }

  render() {
    return this.props.isFetching ? (
      <Loading />
    ) : this.props.hasFetched ? (
      createVocabulary(this.props.data)
    ) : this.props.error ? (
      <Error msg={vocabularyError} />
    ) : null;
  }
}
