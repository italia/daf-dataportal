import React from 'react';
import Boxable from './Boxable.jsx';
import Box from './Box.jsx';
import './MappingFileds.css';


export default class MappingFileds extends React.Component {
  render() {
    const { fields } = this.props
    return (
      <div className="drag_things_to_boxes">
        <h2>Campi del datataset caricato</h2>
        <div className="things_to_drag">
          {fields && fields.length >0 && fields.map((field, index) => {
            return(
              <Boxable targetKey="box" key={index} label={field.nome} />
            )
          })}
        </div>
        <h2>Campi del datataset standard</h2>
        <div className="boxes">
          <Box targetKey="box"/>
          <Box targetKey="box"/>
        </div>
        <div style={{clear: 'both'}}>&nbsp;</div>
      </div>
    )
  }
}