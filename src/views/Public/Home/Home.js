import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import CookieConsent from "react-cookie-consent";



import UserstoryCard from '../../../components/Cards/UserstoryCard';
import DatasetCard from '../../../components/Cards/DatasetCard';
import HomeService from '../../Home/services/HomeService';

import {
  search
} from '../../../actions'

import {
  isPublic
} from '../../../utility'
import Messages from '../../../components/Messages/Messages';

const homeService = new HomeService();

class Home extends Component{
  constructor(props){
    super(props)

    this.state = {
      listStories: [],
      listDataset: [],
      isLoading: true,
    }

    this.handleDatasetSearch = this.handleDatasetSearch.bind(this);

  }

  componentDidMount() {
    const {properties} = this.props
    var datasets = []
    var stories = []
    var org = undefined

    if(properties.domain!=='dataportal' && properties.domain!=='dataportal-private')
      org=properties.organization
    let home = homeService.publicHome(org);
      home.then(json =>{
        try{
          json.map((element, index)=>{
              switch(element.type){
                  case 'catalog_test':
                      datasets.push(element)
                      break;
                  case 'ext_opendata':
                      datasets.push(element)
                      break;
                  case 'datastory':
                      let story = JSON.parse(element.source)
                      stories.push(story)
                      break;
              }
          })
          this.setState({
            listDataset: datasets,
            listStories: stories,
            isLoading: false
          })
        }
        catch(error){console.log('error in getting elements')}
      })
    }

    handleDatasetSearch(){
      const { dispatch, properties } = this.props
      
      var org = []
      if(isPublic() && properties.domain!=='dataportal' && properties.domain!=='dataportal-private')
        org.push(properties.organization)
      
        let filter = {
          'text': '',
          'index': ['catalog_test','ext_opendata'],
          'org': org,
          'theme':[],
          'date': "",
          'status': [],
          'order':"desc"
      }
      this.props.history.push('/dataset/list');
      dispatch(search('', filter, isPublic()))
  }

  handleSearch(textValue, theme){
    const { dispatch, properties } = this.props
    var org = []
    if(isPublic() && properties.domain!=='dataportal' && properties.domain!=='dataportal-private')
      org.push(properties.organization)

    let filter = {
        'text': textValue?textValue:'',
        'index': [],
        'org': org,
        'theme':[],
        'date': "",
        'status': [],
        'order':""
    }
    this.props.history.push({pathname: '/search', search: '?q='+(textValue?textValue:''), state: theme?{ 'theme': true }:undefined})
    dispatch(search('', filter, isPublic()))
}

  render(){
    const { listDataset, isLoading } = this.state
    const { properties } = this.props
    
    return(
      <div>
        <div className="py-5 w-100 bg-lightblue text-white">
          <div className="container">
            <div className="row h-100">
              <div className="col-lg-5 col-md-5 col-12">
                <img src={"./img/DAF_pittogrammaillustrazione_FU_"+properties.theme+".svg"} alt="Illustrazione" style={{width: '85%'}}/>
              </div>
              <div className="col-lg-5 col-md-7 col-8 mx-auto pt-3">
                <h1 style={{fontSize: '45px'}}><b>La piattaforma <br/> dei dati {properties.bodyIllustrazione}</b></h1>
                <h5 className="mt-5">Scopri tutto quello che c’è da sapere sul progetto</h5>
                <a href="https://docs.italia.it/italia/piano-triennale-ict/pianotriennale-ict-doc/it/2019-2021/05_dati-della-pubblica-amministrazione.html#piattaforma-digitale-nazionale-dati-pdnd" target="_blank"><button className="font-weight-bold btn btn-lg btn-outline-primary border-white-solid text-white mt-3 py-2 px-3">PIANO STRATEGICO</button></a>
              </div>
            </div>
          </div>
        </div>
        <Messages />
        <div className="mb-5 py-5 container">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-7 col-12">
                <h1 className="text-gray-600 font-weight-bold" style={{fontSize: '3rem'}}>Esplora gli opendata</h1>
                <h5 className="text-gray-600 mb-4">{properties.bodyEsplora}</h5>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-7 col-md-7 col-12 pr-0 my-3">              
                <div className="search-pub pl-0">
                    <form onSubmit={()=> this.handleSearch(this.refs.auto.value, undefined)}>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <button type="button" className="btn btn-accento px-3"><i className="fa fa-search fa-lg"/></button>
                            </div>
                            <input className="search-input form-control" placeholder="Cosa stai cercando?" ref="auto" name="s" id="inlineFormInputGroup" type="text"/>
                        </div>
                    </form>
                </div>
              </div>
              <h5 className="text-gray-600 align-self-center mx-4">oppure</h5>
              <button className="btn btn-accento my-3" onClick={()=> this.handleSearch(undefined, true)}>Esplora per categoria</button>            
            </div>
          </div>
        </div>
        <div className="py-3 bg-light">
          <div className="container body w-100">
            <div className="row mx-auto text-muted">
                <i className="fa fa-font fa-lg m-4" style={{ lineHeight: '1' }}/><h2 className="mt-3 mb-4">Datastory</h2>
            </div>
            {isLoading? <h4 className="text-center"><i className="fas fa-circle-notch fa-spin mr-2"/>Caricamento</h4>:
            <div className="row mx-auto m-0">
                { 
                    this.state.listStories.map((story, index) => {
                      if ((story.widgets) && (story.layout && story.layout !== '{}')) {
                        const dashwidgets = story.widgets.filter(wid=>{
                          return wid.identifier.toLowerCase().indexOf('textwidget')<0
                        })
      
                        var firstLayout = dashwidgets.length>0?dashwidgets[0]:''
      
                        var time = 0
                        for (let k = 0; k < story.widgets.length; k++){
                          if(story.widgets[k].identifier.toLowerCase().indexOf('textwidget')!==-1){
                            var text = story.widgets[k].text
                            var array = text?text.split(' '):[]
                            
                            time = time + (array.length/275)
                          }
                          else
                            time = time + 1 
                        }
                      }
                        return (
                            <UserstoryCard
                                story={story}
                                widgetA={firstLayout}
                                time={time}
                                id={index}
                                key={index}
                            />

                        )
                    })
                }
            </div>}
            <div className="w-100 text-center">
                <Link to={'/datastory/list'}>
                    <h4 className="text-primary"><u>Vedi tutte</u></h4>
                </Link>
            </div>
          </div>
        </div>
        <div className="py-3 container body w-100">
          <div className="row m-0 text-muted">
              <i className="fa fa-table fa-lg m-4" style={{lineHeight:'1'}} /><h2 className="mt-3 mb-4">Dataset</h2>
          </div>
          {isLoading ? <h4 className="text-center"><i className="fas fa-circle-notch fa-spin mr-2"/>Caricamento</h4>:
          <div className="row mx-auto m-0">
              {
                  listDataset&&Array.isArray(listDataset)&&listDataset.map((element, index) => {
                    var open = element.type==="ext_opendata"
                    var dataset = JSON.parse(element.source)
                    return (
                        <DatasetCard
                            open={open}
                            dataset={dataset}
                            key={index}
                        />
                    )
                  })
              }
          </div>}
          <div className="w-100 text-center">
              <a className="pointer" onClick={this.handleDatasetSearch.bind(this)}>
                  <h4 className="text-primary"><u>Vedi tutti</u></h4>
              </a>
          </div>
        </div>
        <div className="bg-lightblue" style={{height: '245px'}}>
          <div className="container h-100">
              <div className="row h-100">
                <div className="col-lg-3 h-100 position-relative">
                  <img src="./img/dataportaltools.png" alt="dataportal-tools" className="toolkit-img position-absolute" />
                </div>
                <div className="col-lg-5 text-white px-5 pt-3 mt-3">
                  <h1 className="font-weight-bold"></h1>
                  <h5><b>Sei un esperto di dati?</b> Scopri come sfruttare tutte le potenzialità: accedi e usa strumenti di analisi e storytelling integrati ed a portata di click</h5>
                </div>
                <div className="col-lg-3 align-self-center mx-auto">
                  <a href="/#/register"><button className="font-weight-bold btn btn-lg btn-outline-primary border-white-solid text-white py-2 px-3">RICHIEDI L'ACCESSO</button></a>
                </div>
              </div>
          </div>
        </div>
        <div className="bg-gray-600">
          <div className="container h-100">
              <div className="row h-100">
                <div className="col-lg-4 h-100 align-self-center">
                  <a href="https://teamdigitale.governo.it/it/contatti.htm" target="_blank"><button className="float-right font-weight-bold btn btn-lg btn-outline-gray-700 border-white-solid text-white py-2 px-3">CONTATTACI</button></a>
                </div>
                <div className="col-lg-5 text-white px-5 py-3 my-3">
                  <h1 className="font-weight-bold">DAF è per la PA</h1>
                  <h5><b>Sei una PA?</b> Scopri come accedere ai dataset e alle analisi delle pubbliche amministrazioni e come dare valore ai tuoi dati.</h5>
          
                </div>

                {/* <CookieConsent 
                  buttonClasses={"btn btn-accento"}
                  buttonStyle={{background:"#fffff",padding:"auto", border:"1px solid transparent"}}
                  buttonText={"Accetto"}
                >
    Questo sito fa uso di cookie per migliorare l’esperienza di navigazione degli utenti e per raccogliere informazioni sull’utilizzo del sito stesso. <a><Link to={'/policy'}>Privacy policy</Link> <Link to={'/termini'}>Termini e condizioni</Link></a>
</CookieConsent> */}
                
            


                <div className="col-lg-3 align-self-center mx-auto">
                  
                </div>
              </div>
          </div>
        </div>
        <div className="bg-grey-n">
          <div className="container py-4">
            <div className="row">
              <h5 className="ml-auto mr-4 align-self-center mb-0">Sei un Developer? Contribuisci su </h5> 
              <a className="btn btn-accento py-2 px-3 mr-auto font-lg" href='https://github.com/italia/?utf8=%E2%9C%93&q=daf&type=&language=' target="_blank">Github <i className="ml-4 fab fa-github fa-lg"/></a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


function mapStateToProps(state) {
  const { properties } = state.propertiesReducer['prop'] || {}

  return { properties }
}




export default connect(mapStateToProps)(Home);