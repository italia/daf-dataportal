import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WizardFormFirstPage from './WizardFormFirstPage';
import WizardFormSecondPage from './WizardFormSecondPage';
import WizardFormThirdPage from './WizardFormThirdPage';
import Steps, { Step } from 'rc-steps';
import themes from '../../data/themes'
import { connect  } from 'react-redux';
import { getSchema, getSystemNameKylo } from '../../actions';
import { change, reset } from 'redux-form'

import 'rc-steps/assets/index.css'
import 'rc-steps/assets/iconfont.css'

const steps = [{'title': 'Carica file'},{'title': 'Descrivi le colonne'},{'title': 'Aggiuungi i Metadati'},{'title': 'Modalità di invio'}]

class WizardForm extends Component {
  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.setUploading = this.setUploading.bind(this);
    this.onDropFunction = this.onDropFunction.bind(this) 
    this.addSemanticToForm = this.addSemanticToForm.bind(this)
    this.aggiornaStato = this.aggiornaStato.bind(this)
    this.setName = this.setName.bind(this)
    this.state = {
      page: 0,
      uploading: false,
      errorUpload: undefined,
      tipi: new Object(),
      context:[],
      uri_voc:[]
    };
  }

  addSemanticToForm(semantics, id, context, subject, predicate, rdf_object, uri_voc, index){
    console.log('addSemanticToForm')
    const { dispatch } = this.props
    this.aggiornaStato(context, uri_voc, index)
    dispatch(change('wizard', 'inferred['+index+'].id_concetto', id))
    dispatch(change('wizard', 'inferred['+index+'].subject', subject))
    dispatch(change('wizard', 'inferred['+index+'].predicate', predicate))
    dispatch(change('wizard', 'inferred['+index+'].rdf_object', rdf_object))
    dispatch(change('wizard', 'inferred['+index+'].uri_voc', uri_voc))
    dispatch(change('wizard', 'inferred['+index+'].concetto', semantics))
    //this.input.onChange(semantics)
  }

  aggiornaStato(context, uri_voc, index){
    var contextArray = this.state.context
    contextArray[index] = context
    
    var uri_vocArray = this.state.uri_voc
    uri_vocArray[index] = uri_voc
    
    this.setState({context: contextArray,
                   uri_voc: uri_vocArray
                  })
  }

  addTagsToForm(fieldName, tags){
    var tagString=""
    tags.map((tag) => {
      tagString=tagString==''?tagString.concat(tag.text):tagString.concat("," + tag.text)
    })
    this.onChange(tagString)
  }

  setTipi = (value) => {
    this.setState({
      tipi: value
    });
  }

  setUploading(valueUploading, valueError){
    this.setState({
      uploading: valueUploading,
      errorUpload: valueError
    });
  }

  nextPage() {
    this.setState({ page: this.state.page + 1 });
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }

  getCategoria(liv,domain){
    var appo = [];
    themes.map((theme, index) => {
      if(liv==1){
        appo.push({val: theme.theme_code, name: theme.theme_daf_ita});
      }else{
        if(theme.theme_code==domain){
          if(theme.subthemes && theme.subthemes.length>0){
            theme.subthemes.map((subtheme) => {
              appo.push({val: subtheme.subtheme_daf_code, name: subtheme.subtheme_daf_ita});
            })
          }
        }
      }
   })
   return appo;
  }

  setName(e){
    console.log(e.target.value)
    const { dispatch } = this.props;
    dispatch(getSystemNameKylo(e.target.value))
    .then(json => dispatch(change('wizard', 'nome', json.system_name)))
  }

  onDropFunction(fields, filesToUpload, e){
    console.log('props: ' + this.props)
    const { dispatch } = this.props
    this.setUploading(true, undefined);
    if(filesToUpload.length>0){
    this.setState({errorDrop:''})
    dispatch(getSchema(filesToUpload, 'csv'))//defaul value is csv
        .then(json => { this.calcDataFields(fields, JSON.parse(json))
                        this.setUploading(false, undefined);
                        dispatch(change('wizard', 'separator', json.separator))
                        dispatch(change('wizard', 'filesToUpload', filesToUpload))
                        dispatch(change('wizard', 'nomefile', filesToUpload[0].name))
                        this.nextPage()
                    })
        .catch(exception => {
                        console.log('Eccezione !!! ' + exception)
                        this.setUploading(false, 'Errore durante il caricamento. Si prega di riprovare più tardi.' );
                        })
    }else{
        setUploading(false, 'Dimensioni file non consentite. Il file non può superare 10MB');
    }
  }


  calcDataFields (fields, json) {
    const { dispatch } = this.props
    localStorage.setItem('kyloSchema', JSON.stringify(json));
    let inferred = json["fields"];
    var tipi = new Object()
    inferred.map((item, index) => {
      tipi[index] =  new Array(item.derivedDataType); //Only one type returned from the service !!!
      fields.push({nome : item.name, tipo : item.derivedDataType, concetto : '', 
      desc : '', required : 0, field_type : '' , cat : '', tag : '', 
      constr : [{"`type`": "","param": ""}], semantics : { id: '',context: '' },
      data :  item.sampleValues});
    })
    this.setTipi(tipi)
    dispatch(change('wizard', 'tipi', tipi))
  }

  render() {
    const { onSubmit } = this.props;
    const { page, tipi, context } = this.state;
    return (
      <div className="row mb-5">
        <div className="col-md-10">
        <Steps current={page}>
          {steps.map((s, i) => {
            return (
              <Step
                key={i}
                title={s.title}
              />)
            }
          )}
        </Steps>
        {page === 0 && 
          <WizardFormFirstPage 
            onSubmit={this.nextPage} 
            previousPage={this.previousPage}
            getCategoria={this.getCategoria}
            setUploading={this.setUploading}
            onDropFunction={this.onDropFunction}
            reset={reset}
            setName={this.setName}
          />}
        {page === 1 &&
          <WizardFormSecondPage
            previousPage={this.previousPage}
            onSubmit={this.nextPage}
            tipi={tipi}
            addTagsToForm={this.addTagsToForm}
            aggiornaStato={this.aggiornaStato}
            addSemanticToForm={this.addSemanticToForm}
            context={context}
          />}
        {page === 2 &&
          <WizardFormThirdPage
            previousPage={this.previousPage}
            onSubmit={onSubmit}
          />}
        {page === 3 &&
          <WizardFormFourthPage
            previousPage={this.previousPage}
            onSubmit={onSubmit}
          />}
        </div>
      </div>

    );
  }
}

WizardForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { properties } = state.propertiesReducer['prop'] || {}
  return { properties }
}

export default connect(mapStateToProps)(WizardForm)
