import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';



class Home extends Component{
  constructor(props){
    super(props)

    this.state = {}
  }

  render(){
    return(
      <div>
        <div className="py-5 w-100 bg-lightblue text-white">
          <div className="container">
            <div className="row h-100">
              <div className="col-lg-5 col-md-5 col-12">
                <img src="./img/DAF_pittogrammaillustrazione_FU.svg" alt="Illustrazione" style={{width: '85%'}}/>
              </div>
              <div className="col-lg-5 col-md-7 col-8 mx-auto pt-3">
                <h1 style={{fontSize: '45px'}}><b>La piattaforma <br/> dei dati italiani</b></h1>
                <h5 className="mt-5">Scopri tutto quello che c’è da sapere sul progetto</h5>
                <button className="font-weight-bold btn btn-lg btn-outline-primary border-white-solid text-white mt-3 py-2 px-3">PIANO STRATEGICO</button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3 py-5 container">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-7 col-12">
                <h1 className="text-gray-600 font-weight-bold" style={{fontSize: '3rem'}}>Esplora gli opendata</h1>
                <h5 className="text-gray-600 mb-4">Cerca tra i dataset, i widget e le storie basate su dati opendata della pubblica amministrazione italiana</h5>
              </div>
            </div>
            <div className="row mt-2 mb-3">
              <div className="col-lg-7 col-md-7 col-12 pr-0">              
                <div className="search-pub pl-0">
                    <form /* onSubmit={this.handleLoadDatasetClick} */>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <button type="button" className="btn btn-accento px-3"><i className="fa fa-search fa-lg"/></button>
                            </div>
                            <input className="search-input form-control" placeholder="Cosa stai cercando?" ref="auto" name="s" id="inlineFormInputGroup" type="text"/>
                        </div>
                    </form>
                </div>
              </div>
              <h5 className="text-gray-600 vertical-align-middle mx-4 my-3">oppure</h5>
              <button className="btn btn-accento">Esplora per categoria</button>            
            </div>
          </div>
        </div>
        <div className="py-3 bg-light">
          <div className="container body w-100">
            <div className="row mx-auto text-muted">
                <i className="fa fa-font fa-lg m-4" style={{ lineHeight: '1' }}/><h2 className="mt-3 mb-4">Storie</h2>
            </div>
            <div className="row mx-auto m-0">
                {/* 
                    this.state.listStories.slice(0, items).map((story, index) => {
                        let chartUrl = undefined
                        if ((story.widgets && story.widgets !== '{}') && (story.layout && story.layout !== '{}')) {
                            const dashLayout = JSON.parse(story.layout)
                            var firstLayout = ''

                            let righe = dashLayout.rows
                            for (let i = 0; i < righe.length; i++) {
                                let colonne = righe[i].columns;
                                for (let j = 0; j < colonne.length; j++) {
                                    let wids = colonne[j].widgets
                                    wids.map((index) => {
                                        if (index.key.indexOf('TextWidget') == -1) {
                                            firstLayout = index.key
                                        }
                                    })
                                    if (firstLayout != '')
                                        break
                                }
                                if (firstLayout != '')
                                    break
                            }
                            const dashWidgets = JSON.parse(story.widgets)
                            var imageA = undefined
                            if (firstLayout != '') {
                                const firstWidget = dashWidgets[firstLayout];
                                imageA = firstWidget.image
                            }
                            var time = 0
                            let widgets = Object.keys(dashWidgets)
                            for (let k = 0; k < widgets.length; k++) {
                                if (widgets[k].indexOf('TextWidget') !== -1) {
                                    var text = dashWidgets[widgets[k]].props.text
                                    var array = text ? text.split(' ') : []

                                    time = time + (array.length / 275)
                                }
                                else
                                    time = time + 1
                            }
                        }
                        return (
                            <UserstoryCard
                                story={story}
                                widgetA={firstLayout}
                                imageA={imageA}
                                time={time}
                                id={index}
                                key={index}
                            />

                        )
                    }) */
                }
            </div>
            <div className="w-100 text-center">
                <Link to={'/private/user_story/list'}>
                    <h4 className="text-primary"><u>Vedi tutte</u></h4>
                </Link>
            </div>
          </div>
        </div>
        <div className="py-3 container body w-100">
          <div className="row m-0 text-muted">
              <i className="fa fa-table fa-lg m-4" style={{lineHeight:'1'}} /><h2 className="mt-3 mb-4">Dataset</h2>
          </div>
          <div className="row mx-auto m-0">
              {/* 
                  datasets&&Array.isArray(datasets)&&datasets.slice(0, items).map((dataset, index) => {
                      return (
                          <DatasetCard
                              dataset={dataset}
                              key={index}
                          />
                      )
                  }) */
              }
          </div>
          <div className="w-100 text-center">
              <Link to={'/private/dataset'}>
                  <h4 className="text-primary"><u>Vedi tutti</u></h4>
              </Link>
          </div>
        </div>
        <div className="bg-lightblue" style={{height: '245px'}}>
          <div className="container h-100">
              <div className="row h-100">
                <div className="col-lg-3 h-100 position-relative">
                  <img src="./img/dataportaltools.png" alt="dataportal-tools" className="toolkit-img position-absolute" />
                </div>
                <div className="col-lg-5 text-white px-5 pt-3 mt-3">
                  <h1 className="font-weight-bold">Partecipa</h1>
                  <h5><b>Sei un esperto di dati?</b> Scopri come sfruttare tutte le potenzialità: accedi e usa strumenti di analisi e storytelling integrati ed a portata di click</h5>
                </div>
                <div className="col-lg-3 align-self-center mx-auto">
                  <button className="font-weight-bold btn btn-lg btn-outline-primary border-white-solid text-white py-2 px-3">RICHIEDI L'ACCESSO</button>
                </div>
              </div>
          </div>
        </div>
        <div className="bg-gray-600">
          <div className="container h-100">
              <div className="row h-100">
                <div className="col-lg-4 h-100 align-self-center">
                  <button className="float-right font-weight-bold btn btn-lg btn-outline-gray-700 border-white-solid text-white py-2 px-3">CONTATTACI</button>
                </div>
                <div className="col-lg-5 text-white px-5 py-3 my-3">
                  <h1 className="font-weight-bold">DAF è per la PA</h1>
                  <h5><b>Sei una PA?</b> Scopri come accedere ai dataset e alle analisi delle pubbliche amministrazioni e come dare valore ai tuoi dati.</h5>
                </div>
                <div className="col-lg-3 align-self-center mx-auto">
                  
                </div>
              </div>
          </div>
        </div>
        <div className="bg-grey-n">
          <div className="container py-4">
            <div className="row">
              <h5 className="ml-auto mr-4 align-self-center mb-0">Sei un Developer? Contribuisci su </h5> 
              <a className="btn btn-accento py-2 px-3 mr-auto font-lg" href='https://github.com/italia/'>Github <i className="ml-4 fab fa-github fa-lg"/></a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home;