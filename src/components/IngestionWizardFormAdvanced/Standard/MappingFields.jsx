import React from 'react';
import Boxable from './Boxable.jsx';
import Box from './Box.jsx';
require('./MappingFileds.css');


export default class MappingFileds extends React.Component {
  constructor(props) {
    super(props);
    const { datasetStdList, datasetstd } = this.props
    var fields=undefined
    for(var i=0;i<datasetStdList.length>0;i++){
      let datasetStd = datasetStdList[i]
      if(datasetStd.name===datasetstd)
        fields = datasetStd.fields
    }
    this.state = {
      standardsFields: fields
    };
  }

  render() {
    const { fields, datasetstd } = this.props
    const { standardsFields } = this.state
    
    return (
      <div className="drag_things_to_boxes">
        <div className="row">
          <div className="col-5">
            <h2>Campi del datataset caricato</h2>
            <div className="things_to_drag">
              {fields && fields.length >0 && fields.map((field, index) => {
                return(
                  <Boxable targetKey="box" key={index} label={field.nome} />
                )
              })}
            </div>
          </div>
          <div className="col-7">
            <h2>Campi del datataset standard {datasetstd} </h2>
            <div className="boxes">
            {standardsFields && standardsFields.length >0 && standardsFields.map((standardsField, index) => {
                return(
                  <div className="form-group row" key={index}>
                    <label className="col-2 col-form-label mt-2">{standardsField}</label>    
                    <div className="col-10">
                      <Box className="row" targetKey="box"/>
                    </div>
                  </div>
                )
            })}
            </div>
            <div style={{clear: 'both'}}>&nbsp;</div>
          </div>
        </div>
      </div>
    )
  }
}