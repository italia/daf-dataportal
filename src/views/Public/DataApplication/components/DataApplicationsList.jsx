import React from "react";
import {
  Container,
  Row,
  Col,
  Alert,
  Jumbotron,
  Nav,
  NavLink,
  CardImg,
  Button
} from "reactstrap";

const DataApplication = props => {
  const {
    applicationURL,
    title,
    author,
    previewBase64,
    description,
    sharingLinks
  } = props;
  return (
    <Jumbotron className="alert-light pb-4">
      <Row>
        <Col sm={8}>
          <a href={applicationURL} target="_blank">
            <h1
              className="display-4"
              style={{
                font: "700 40px/48px Titillium Web",
                color: "rgb(21, 27, 30)"
              }}
            >
              {title}
            </h1>
          </a>
          <p className="lead">{author}</p>
          <hr />
          <p style={{ font: "400 21px/32px Titillium Web" }}>{description}</p>
          <hr />
          <Nav>
            {sharingLinks.github && (
              <NavLink href={sharingLinks.github} target="_blank">
                <span>
                  <i className="fab fa-github fa-2x" />
                  <span className="lead"> Github</span>
                </span>
              </NavLink>
            )}
            {sharingLinks.medium && (
              <NavLink href={sharingLinks.medium} target="_blank">
                <span>
                  <i className="fab fa-medium fa-2x" />
                  <span className="lead"> Medium</span>
                </span>
              </NavLink>
            )}
          </Nav>
        </Col>
        <Col sm={4}>
          <CardImg
            src={`data:image/jpg;base64,${previewBase64}`}
            alt={`Data Application ${title}`}
          />
        </Col>
      </Row>
    </Jumbotron>
  );
};

const mapDataApplications = dataApps =>
  dataApps.map((dataApp, index) => (
    <DataApplication key={index} {...dataApp} />
  ));

const createDataApplications = dataApps => (
  <Container className="pt-4">
    <Row>
      <Col>
        <h1
          className="display-4"
          style={{
            font: "700 40px/48px Titillium Web",
            color: "rgb(21, 27, 30)"
          }}
        >
          Data Applications
        </h1>
        <p style={{ font: "400 21px/32px Titillium Web" }}>
          Vuoi proporci una applicazione fatta utilizzando open data e scritta
          con codice o strumenti open source?<br />
          Contattaci su slack sul canale{" "}
          <a
            href="https://developersitalia.slack.com/archives/C760XQX9Q"
            target="_blank"
          >
            #daf
          </a>
        </p>
      </Col>
    </Row>
    {mapDataApplications(dataApps)}
  </Container>
);

class DataApplicationsList extends React.Component {
  componentDidMount() {
    this.props.requestDataApplicationsList();
  }

  render() {
    return this.props.hasFetched
      ? createDataApplications(this.props.data)
      : /* this.props.error ? (<Alert color="danger">Errore</Alert>) : */ null;
  }
}

export default DataApplicationsList;
