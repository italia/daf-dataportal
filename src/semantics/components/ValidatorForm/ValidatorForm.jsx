
import React from 'react'
import {
  Row,
  Col,
  Button,
  FormGroup,
  Label,
  Input
} from 'reactstrap'

import showValidationFeedback from './ValidationFeedback.jsx'

export default class ValidatorForm extends React.Component {
  componentWillMount() {
    this.props.fetchValidatorsList()
  }

  performValidation (e) {
    e.preventDefault()

    const { formRef } = this
    const formValues = new FormData(formRef)
    const isInferenceChecked = formRef.elements.rdfsinf.checked ? 'true' : 'false'

    formValues.set('rdfsinf', isInferenceChecked)
    formValues.append('name', formRef.elements.rdfDocument.files[0].name)

    this.props.fetchValidationStatus(formValues)
  }

  render() {
    const { validatorsList, serverValidation } = this.props
    return (
      <Row>
        <Col sm={1}></Col>
        <Col sm={10}>
            <form ref={el => this.formRef = el} className="px-4">
              <FormGroup row>
                <Label for="rdfDocument">Carica RDF</Label>
                <Input
                  type="file"
                  id="rdfDocument"
                  name="rdfDocument"
                  required
                />
              </FormGroup>
              <FormGroup row>
                <Label for="validator">Seleziona Validatore</Label>
                <Input
                  type="select"
                  id="validator"
                  name="validator"
                  required
                >
                  {validatorsList.data.map((validator, index) => (
                    <option key={"validator" + index} value={validator.id}>
                      {validator.name}
                    </option>
                  ))}
                </Input>
              </FormGroup>
              <FormGroup row>
                <FormGroup className="pr-4">
                  <Label check for="rdfsinf">
                    Abilita Inferenza{' '}
                    <Input
                      type="checkbox"
                      id="rdfsinf"
                      name="rdfsinf"
                      className="ml-1"
                    />
                  </Label>
                </FormGroup>
                <FormGroup className="border-left pl-4">
                  <Button
                    onClick={e => this.performValidation(e)}
                    color="primary"
                    type="submit"
                    id="submitButton"
                    name="submitButton"
                  >
                    {
                      serverValidation.isFetching
                        ? <i className="fa fa-spinner fa-spin fa-lg" />
                        : 'Valida RDF'
                    }
                  </Button>
                </FormGroup>
              </FormGroup>
            </form>
            {serverValidation.isFetching ? null : serverValidation.hasFetched &&
               showValidationFeedback(serverValidation.data)}
        </Col>
        <Col sm={1}></Col>
      </Row>
    )
  }
}
