import React from 'react';
import {render} from 'react-dom';
import {getJsonCatalog} from './inputform_reader.js'
import {processInputFile, getFlatSchema} from './avroschema.js'
import DataInputForm from './data_form.js'
import $ from 'jquery';
import FormSectionDataSchema from './WizardFormCommon.js'

const data_dcatap = DataInputForm.getDcatap()
const data_dataschema = DataInputForm.getDataschema()
const data_dataschema_field = DataInputForm.getDataschemaField()
const data_dataschema_field_metadata = DataInputForm.getDataschemaFieldMetadata()
const data_operational = DataInputForm.getOperational()


class WizardDataSchema extends React.Component {
  render () {
    return <FormSectionDataSchema struct={this.props.dataschema} data="" />
  }
}

export default WizardDataSchema
