import React from 'react'
import {
  Container,
  Row,
  Col,
  Card,
  CardText,
  ListGroup,
  ListGroupItem,
  Alert,
  Collapse
} from 'reactstrap'

import storedFaqs from './storedFaqs'

const CollapseToggler = ({isOpen = false}) => {
  const togglerIcon = isOpen ? 'up' : 'down'
  return (
    <i className={`text-primary fa fa-sm fa-angle-${togglerIcon}`} />
  )
}

class CollapsibleItem extends React.Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = { collapse: props.open || false}
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    const { togglerLabel, children } = this.props
    return (
      <div>
        <CardText
          className="mb-0"
          style={{ font: "400 21px/32px Titillium Web" }}
        >
          <span className="mx-1" onClick={this.toggle}>
            <CollapseToggler
              isOpen={this.state.collapse}
            />
            {' '}{togglerLabel}
          </span>
        </CardText>
        <Collapse isOpen={this.state.collapse}>
          <Card className="border-0 mb-0">{children}</Card>
        </Collapse>
      </div>
    )
  }
}

const FaqsList = ({faqs}) => (
  <ListGroup>
    {faqs.map((faq, index) => (
        <ListGroupItem
          key={`faqs-${faq}-${index}`}
          className="p-4"
        >
          <CollapsibleItem togglerLabel={faq.question}>
            <Alert
              color="primary"
              className="mb-0"
              style={{font: "400 16px/25px Titillium Web"}}
            >
              {faq.answer}
            </Alert>
          </CollapsibleItem>
        </ListGroupItem>
      ))}
  </ListGroup>
)

const FaqsItem = props => {
  const { categoryLabel, faqs } = props
  return (
    <ListGroupItem className="border-0">
      <CollapsibleItem open togglerLabel={<b>{categoryLabel}</b>}>
        <FaqsList faqs={faqs} />
      </CollapsibleItem>
    </ListGroupItem>
)}

const FaqsCategories = ({categories}) => (
  <ListGroup>
    {categories.map((faq, index) => (
      <FaqsItem key={`faqs-${faq}-${index}`} {...faq} />
    ))}
  </ListGroup>
)
const FaqsComponent = () => (
  <Container className="py-4">
    <Row>
      <Col>
        <h1
          className="display-4"
          style={{
            font: "700 40px/48px Titillium Web",
            color: "rgb(21, 27, 30)"
          }}
        >
          Faqs
        </h1>
        <p style={{ font: "400 21px/32px Titillium Web" }}>
          Hai un dubbio? consulta le nostre faqs!<br />
          Per qualsiasi altra domanda, contattaci sul nostro{' '}
          <a
            href="https://forum.italia.it"
            target="_blank"
          >
            forum
          </a>
          {' '}o sul canale slack{' '}
          <a
            href="https://developersitalia.slack.com/archives/C760XQX9Q"
            target="_blank"
          >
            #daf
          </a>
        </p>
      </Col>
    </Row>
    <Row>
      <FaqsCategories categories={storedFaqs} />
    </Row>
  </Container>
)

export default FaqsComponent
