import React from 'react'
import { Card, CardText, ListGroup, ListGroupItem, Collapse } from 'reactstrap'

import { isEmpty } from '../../util/commonUtils'

const replaceVocabularyURL = (URL) => URL.replace(
  'https://w3id.org/italia/',
  'https://ontopia.daf.teamdigitale.it/lodview/'
)

const CollapseToggler = ({isNotExtensible, isOpen = false}) => {
  const isNotExtensibleOrOpen =
    isNotExtensible
      ? ''
      : isOpen
        ? '-minus'
        : '-plus'

  return (
    <i className={`text-primary fa fa-sm fa${isNotExtensibleOrOpen}-square`} />
  )
}

const CollapseLabel = ({label, labelURL}) => (
  <a target="_blank" href={replaceVocabularyURL(labelURL)}>
    {label}
  </a>
)

class CollapsibleItem extends React.Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = { collapse: false }
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    const { isNotExtensible, togglerLabel, labelURL, children } = this.props
    return (
      <div>
        <CardText className="mb-0">
          <span className="mx-1" onClick={isNotExtensible ? null : this.toggle}>
            <CollapseToggler
              isNotExtensible={isNotExtensible}
              isOpen={this.state.collapse}
            />
          </span>
          <CollapseLabel label={togglerLabel} labelURL={labelURL} />
        </CardText>
        <Collapse isOpen={this.state.collapse}>
          <Card className="border-0 mb-0">{children}</Card>
        </Collapse>
      </div>
    )
  }
}

const treeview = hierarchy =>
  isEmpty(hierarchy) ? null : (
    <ListGroup>
      {hierarchy.map((node, index) => (
        <ListGroupItem
          className="border-0 px-4 py-1"
          key={`${node.label}-${index}`}
        >
          <CollapsibleItem
            isNotExtensible={isEmpty(node.children)}
            togglerLabel={node.label}
            labelURL={node.uri}
          >
            {isEmpty(node.children) ? null : treeview(node.children)}
          </CollapsibleItem>
        </ListGroupItem>
      ))}
    </ListGroup>
  )

export default props => (props.hierarchy ? treeview(props.hierarchy) : null)
