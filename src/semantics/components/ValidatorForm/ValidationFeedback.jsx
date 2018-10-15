import React from 'react'
import {
  Alert,
  Collapse,
  ListGroup,
  ListGroupItem
} from 'reactstrap'

import { isEmpty } from '../../util/commonUtils'

const CollapseToggler = ({ isOpen = false, children }) => {
  const isCollapseOpen = isOpen ? "up" : "down"
  return (
    <h2 className="alert-heading my-0">
      <i className={`text-dark fas fa-angle-${isCollapseOpen}`} />
      {' '}{children}
    </h2>
  )
}

class CollapsibleItem extends React.Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = { collapse: this.props.isOpen || false }
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    const { togglerLabel, children } = this.props
    return (
      <div>

        <span className="mx-1" onClick={this.toggle}>
          <CollapseToggler isOpen={this.state.collapse}>
            {togglerLabel}

          </CollapseToggler>
        </span>
        <Collapse isOpen={this.state.collapse}>
          <div className="border-0 mb-0">{children}</div>
        </Collapse>
      </div>
    )
  }
}

const ErrorBlock = ({ counter, entries }) => (
  <ListGroupItem className="border-0 px-0">
    <Alert color="danger" className="mb-0">
      <CollapsibleItem
        isOpen={counter > 10 ? false : true}
        togglerLabel={
          <span className="my-0">
            <i className="fas fa-exclamation-circle" /> Errori {`(${counter})`}
          </span>
        }
      >
        <ListGroup>
          {entries.map((errorEntry, i) => (
            <ListGroupItem key={`error-${i}`} className="my-1 font-weight-bold">
              {errorEntry.ruleMessage}>
            </ListGroupItem>
          ))}
        </ListGroup>
      </CollapsibleItem>
    </Alert>
  </ListGroupItem>
)

const WarnBlock = ({ counter, entries }) => (
  <ListGroupItem className="border-0 px-0">
    <Alert color="warning" className="mb-0">
      <CollapsibleItem
        isOpen={counter > 10 ? false : true}
        togglerLabel={
          <span className="my-0">
            <i className="fas fa-exclamation-triangle" /> Raccomandazioni{" "}
            {`(${counter})`}
          </span>
        }
      >
        <ListGroup>
          {entries.map((warnEntry, i) => (
            <ListGroupItem key={`warn-${i}`} className="my-1 font-weight-bold">
              {warnEntry.ruleMessage}>
            </ListGroupItem>
          ))}
        </ListGroup>
      </CollapsibleItem>
    </Alert>
  </ListGroupItem>
)

const SuccessBlock = () => (
  <ListGroup>
    <ListGroupItem className="border-0 px-0">
      <Alert color="success" className="mb-0">
        <h2 className="alert-heading">
          <i className="fas fa-check-circle" />
          {' '}Validazione avvenuta con successo
        </h2>
      </Alert>
    </ListGroupItem>
  </ListGroup>
)

const ValidationDetails = ({detail = [], errors, warnings}) => {
  const warningEntries = detail.filter(detail => detail.ruleSeverity === 'warning')
  const errorEntries = detail.filter(detail => detail.ruleSeverity === 'error')

  return (
    <ListGroup>
      {!isEmpty(errorEntries) && <ErrorBlock entries={errorEntries} counter={errors}/>}
      {!isEmpty(warningEntries) && <WarnBlock entries={warningEntries} counter={warnings}/>}
    </ListGroup>
  )
}

const showValidationFeedback = validationData => {
  return validationData.result === 'OK'
    ? <SuccessBlock />
    : <ValidationDetails {...validationData} />
}

export default showValidationFeedback