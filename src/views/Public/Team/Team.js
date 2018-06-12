import React, { Component } from 'react';

class Team extends Component{
  constructor(props){
    super(props)
    this.state = {}
  }

  render(){
    return(
      <div className="container paragrafo p-5 mt-2">
        <h1>Chi siamo</h1>
        <h5 className="">
        Il progetto nasce da un’iniziativa del <a href="https://teamdigitale.governo.it/" target="_blank" className="text-primary">Team per la Trasformazione Digitale</a> in collaborazione con <a href="https://www.agid.gov.it/" target="_blank" className="text-primary">l’Agenzia per l’Italia Digitale</a> della Presidenza del Consiglio dei Ministri. 
        Lo sviluppo delle varie componenti software utilizzate nel Dataportal è avvenuto grazie anche al supporto di:
        </h5>
        <ul className="my-4">
          <h5><li className="">Almaviva e Almawave SpA (aggiudicatarie dei lotti 3 e 4 della gara SPC Cloud e cooperazione applicativa, sull’interoperabilità, open data, big data e portali/servizi online);</li></h5>
          <h5><li className="">Istituto di Scienze e Tecnologie della Cognizione (ISTC) del CNR per la parte relativa alla standardizzazione e semantica dei dati;</li></h5>
          <h5><li className="">GeoSolutions srl per l’abilitazione della raccolta automatica dei dati nel catalogo CKAN, conformi al profilo di metadatazione nazionale DCAT-AP_IT</li></h5>
        </ul>
      </div>
    )
  }
}

export default Team