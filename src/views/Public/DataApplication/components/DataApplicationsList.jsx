import React from 'react'
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
} from 'reactstrap'

const DataApplication = props => {
  const { title, author, previewBase64, description, sharingLinks } = props
  return (
    <Jumbotron className="alert-secondary">
      <Row>
        <Col sm={8}>
          <h1 className="display-4" >{title}</h1>
          <p className="lead">{author}</p>
          <hr />
          <p>{description}</p>
          <hr />
          <Nav>
        <NavLink href={sharingLinks.github}>
          <i className="fab fa-github fa-lg" /> Vai al codice sorgente
        </NavLink>
        <NavLink href={sharingLinks.medium}>
          <i className="fab fa-medium fa-lg" /> Vai al post su Medium
        </NavLink>
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
  )
}

const mapDataApplications = dataApps =>
  dataApps.map(dataApp => <DataApplication {...dataApp} />)

const createDataApplications = dataApps => (
  <Container className="pt-4">{mapDataApplications(dataApps)}</Container>
)

class DataApplicationsList extends React.Component {
  componentDidMount() {
    this.props.requestDataApplicationsList()
  }

  render() {
    return this.props.hasFetched
      ? createDataApplications(this.props.data)
      : (this.props.error ? (<Alert color="danger">Errore</Alert>) : null)
  }
}

export default DataApplicationsList