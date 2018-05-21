import React, { Component } from 'react';

class Missione extends Component{
  constructor(props){
    super(props)
    this.state = {}
  }

  render(){
    return(
      <div className="container p-5 mt-2">
        <h1>Il progetto - Missione</h1>
        <div className="row mt-4">
          <div className="col-8">
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
          <div className="col-4">
            <div className="card card-accent-primary mb-3" style={{maxWidth: "18rem"}}>
              <div className="card-body">
                <h5 className="card-text font-italic">Il patrimonio informativo pubblico è vasto e articolato, costituito da diverse tipologie di dato. Il DAF e la sua componente Dataportal ti offrono l’opportunità di rendere disponibili i tuoi dati alle community, di esplorare e scoprire i dati di cui hai bisogno, di comprendere i dati più facilmente attraverso dashboard e strumenti di analisi e monitoraggio. Scopri come fare! Inizia a esplorare la ricchezza che i dati possono offrire!</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Missione