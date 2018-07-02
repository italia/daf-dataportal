import React from 'react'
import { Card, CardText, ListGroup, ListGroupItem } from 'reactstrap'
import Collapsible from 'react-collapsible'

import { isEmpty } from '../../util/commonUtils'

const CollapseTrigger = props => {
  const isExtensibleOrOpen = isEmpty(props.node.children)
    ? ''
    : props.isOpen
      ? '-minus'
      : '-plus'
  return (
    <Card className="border-0 m-0">
      <CardText className="mb-0 text-muted">
        <i className={`fa fa-sm fa${isExtensibleOrOpen}-square`} />
        <span className="mx-1" />
        {props.node.label}
      </CardText>
    </Card>
  )
}

const treeview = hierarchy =>
  isEmpty(hierarchy) ? null : (
    <ListGroup>
      {hierarchy.map((node, index) => (
        <ListGroupItem className="border-0 px-4 py-1" key={index}>
          <Collapsible
            trigger={<CollapseTrigger node={node} />}
            triggerWhenOpen={<CollapseTrigger isOpen node={node} />}
          >
            {isEmpty(node.children) ? null : treeview(node.children)}
          </Collapsible>
        </ListGroupItem>
      ))}
    </ListGroup>
  )

export default props => (props.hierarchy ? treeview(props.hierarchy) : null)
