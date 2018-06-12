import React, { Component } from 'react';

class Missione extends Component{
  constructor(props){
    super(props)
    this.state = {}
  }

  render(){
    return(
      <div className="container p-5 mt-2">
        <div className="row mt-4">
          <div className="paragrafo col-12 mx-0">
            <h1>Missione</h1>
          </div>
          <div className="paragrafo col-7 mx-0">
            <h5 className="">
            Il primo progetto nazionale di pubblicazione di dati delle Pubbliche Amministrazioni è stato lanciato nel 2011 con il portale dati.gov.it, divenuto nel tempo il riferimento nazionale per i dati aperti della Pubblica Amministrazione Italiana. Dati.gov.it nasceva con l’obiettivo di fornire, in un unico punto di accesso, le principali informazioni sui dati aperti esposti dalle Pubbliche Amministrazioni locali e centrali, facilitando così la ricerca dei dati e pertanto il loro potenziale riutilizzo.

            Il nuovo progetto Dataportal ha lo scopo di andare oltre la mera pubblicazione di un catalogo di dati aperti. Esso mira a rendere i dati delle pubbliche amministrazioni:
            </h5>
            <ol className="my-4">
              <h5><li className=""><b>facilmente scopribili:</b> esso rappresenta ancora un unico punto di accesso ai dati pubblici delle Pubbliche Amministrazioni;</li></h5>
              <h5><li className=""><b>rilevanti per lo sviluppo di servizi innovativi,</b> grazie anche a una maggiore standardizzazione dei dati e dei relativi metadati;</li></h5>
              <h5><li className=""><b>facilmente analizzabili e comprensibili</b> per via della disponibilità nel Dataportal di una serie di strumenti che consentono agli utenti di effettuare visualizzazioni dei dati e di descrivere storie attorno ai dati. fornendo così un’idea anche dell’impatto del loro riutilizzo sulla collettività.</li></h5>
            </ol>
            <h5>
            Il <b>Dataportal</b> è caratterizzato da una parte pubblica dove chiunque può navigare le data story, i grafici associati ai dati i dati presenti nel catalogo nazionale e da una sezione privata alla quale si accede previo login, dove gli utenti possono sfruttare le funzionalità di analisi/interrogazione sui dati e condivisione di informazioni tra utenti.
            </h5>
          </div>
          <div className="col-md-3 mx-auto p-0">
            <div className="card p-4 bg-primary mb-5">
              <div className="p-0 card-body">
                <h1 className="card-title font-weight-bold mb-4">Partecipa</h1>
                {/* <h5 className="card-text">Il patrimonio informativo pubblico è vasto e articolato, costituito da diverse tipologie di dato. Il DAF e la sua componente Dataportal ti offrono l’opportunità di rendere disponibili i tuoi dati alle community, di esplorare e scoprire i dati di cui hai bisogno, di comprendere i dati più facilmente attraverso dashboard e strumenti di analisi e monitoraggio. Scopri come fare! Inizia a esplorare la ricchezza che i dati possono offrire!</h5> */}
                <h5 className="card-text"><b>Sei un esperto di dati?</b> Scopri come sfruttare tutte le potenzialità: accedi e usa strumenti di analisi e storytelling integrati ed a portata di click</h5>

                <a href="#/login"><button className="font-weight-bold btn btn-lg btn-outline-primary border-white-solid text-white mt-5 py-2 px-3">RICHIEDI L’ACCESSO</button></a>
              </div>
            </div>
            <p className="text-muted font-lg font-weight-bold pt-3">LINK UTILI</p>
            <ul className="list-group list-group-flush">
              <li className="list-group-item"><h5><a className="text-primary" href="http://pianotriennale-ict.readthedocs.io/it/latest/doc/09_data-analytics-framework.html" target="_blank">Piano Strategico</a></h5></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Missione