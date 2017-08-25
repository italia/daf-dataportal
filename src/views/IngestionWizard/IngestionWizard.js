import React, { Component } from 'react';
import {createMetacatalog} from '../../helpers/TrasformFormToDcat.js'
import WizardForm from '../../components/IngestionWizard/WizardForm'
import {getJsonDataschema, sendPostDataMeta} from '../../components/IngestionWizard/inputform_reader.js'

const transformer = values => {
  var metacatalog = {}
  metacatalog = createMetacatalog(values, metacatalog)
  console.log(JSON.stringify(values))
  console.log(JSON.stringify(metacatalog))
  return metacatalog
}

const showResults = values =>{
  const transformed = transformer(values)
  sendPostDataMeta(transformed, undefined)
}
  //new Promise(resolve => {
  //  setTimeout(() => {
  //    const transformed = transformer(values)
  //    //console.log(JSON.stringify(transformed))
  //    window.alert(JSON.stringify(transformed))
  //    resolve()
  //  }, 500)
 // })


class IngestionForm extends Component {

  render() {
    return (
      <div className="animated fadeIn">
        <WizardForm onSubmit={showResults} />
      </div>
    )
  }
}

export default IngestionForm;
