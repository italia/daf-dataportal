import React, { Component } from 'react'
import PropTypes from 'prop-types'
import WizardFormFirstPage from './WizardFormFirstPage'
import WizardFormSecondPage from './WizardFormSecondPage'
import WizardFormThirdPage from './WizardFormThirdPage'
import WizardOperational from './WizardOperational'
import WizardFormMetadata from './WizardFormMetadata'
import {getJsonDataschema} from './inputform_reader.js'
import { change } from 'redux-form';
import { connect } from 'react-redux'
import licenze from '../../data/licenze'

class WizardForm extends Component {
  constructor(props) {
    super(props)
    this.nextPage = this.nextPage.bind(this)
    this.nextPage2 = this.nextPage2.bind(this)
    this.previousPage = this.previousPage.bind(this)
    this.state = {
      page: 1,
      dataschema : {}
    }
  }

  nextPage() {
    this.setState({ page: this.state.page + 1
    })
  }

   nextPage2() {
    const dataschema = getJsonDataschema()
    this.setState({ page: this.state.page + 1,
       dataschema: dataschema
    })
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 })
  }

  getLicenze(liv,notation){
    console.log('liv: ' + liv);
    console.log('notation: ' + notation);
    var appo = [];
    licenze.map((lic, index) => {
      if(lic.rank==liv){
        if(notation){
          if(lic.notation.startsWith(notation))
            appo.push(lic);
        } else appo.push(lic);
      }
   })
   return appo;
  }

  render() {
    const { onSubmit, organizations } = this.props
    const { page } = this.state
    return (
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                {page === 1 &&
                <div><strong> Passo 1:</strong> Carica file e descrivi le colonne</div> 
                }
                {page === 2 &&
                <div><strong> Passo 2:</strong> Metadati </div> 
                }
              {page === 3 &&
                <div><strong> Passo 3: </strong> Modalitá di invio</div> 
                }
              </div>
              <div className="card-block">

                {page === 1 &&
                <WizardFormMetadata
                      onSubmit={this.nextPage}/>}
                {page ===2 &&  <WizardFormFirstPage
                      previousPage={this.previousPage}
                      onSubmit={this.nextPage}
                      organizations={organizations}
                      getLicenze={this.getLicenze}
                  />}
                {page === 3 &&
                    <WizardOperational
                      previousPage={this.previousPage}
                      onSubmit={onSubmit}
                    />}
              </div>
            </div>
        </div>
      </div>
    )
  }
}

WizardForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loggedUser: PropTypes.object,
  organizations: PropTypes.array
}

function mapStateToProps(state) {
    const organizations = state.userReducer['org'] ? state.userReducer['org'].organizations : [];
    const loggedUser = state.userReducer['obj'].loggedUser || { } 
    return { loggedUser, organizations }
}

export default connect(mapStateToProps)(WizardForm)
