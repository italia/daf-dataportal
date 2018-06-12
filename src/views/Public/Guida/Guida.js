import React, { Component } from 'react';

class Guida extends Component{
  constructor(props){
    super(props)
    this.state = {}
  }

  render(){
    return(
      <div className="container paragrafo p-5 mt-2">
        <h1>Il progetto - Linee guida</h1>
        <h2>Documentazione</h2>          
        <h5 className="">
        Il progetto risponde a una specifica azione del Piano triennale per l'informatica nella PA (2017-2019) sull’”evoluzione di dati.gov.it”. 
        La documentazione tecnica che descrive le componenti del progetto, e come queste possono essere installate e usate, è disponibile in inglese online. 
        In linea generale, il Dataportal segue le raccomandazioni delle Linee guida per la valorizzazione del patrimonio informativo pubblico e richiede, 
        a tutti coloro che vogliano contribuire al progetto, di riferirsi alle specifiche azioni individuate nelle linee guida stesse.
        </h5>
        <h2 className="mt-4">Ontologie</h2>          
        <h5>
        Il Dataportal espone, tra gli altri, i dati che confluiranno nel Data & Analytics Framework (DAF). 
        I dati seguiranno precisi standard di modellazione definiti nell’ambito della rete di ontologie per la PA italiana chiamata OntoPA.
        </h5>
        <h2 className="mt-4">Come usare il Dataportal</h2>          
        <h5 className="">
        Per cercare i dati si può liberamente accedere alla parte pubblica del Dataportal. Per usufruire delle funzionalità di analisi/interrogazione dei dati, 
        di creazione di storie attorno ai dati e di dashboard specifiche, nonché a quelle di condivisione dei dati tra utenti, è necessario accedere all’area privata del Dataportal. 
        L’accesso all’area privata avviene previo login. Se un utente non possiede ancora un account presso il Dataportal, deve registrarsi e successivamente accedere all’area privata 
        mediante le informazioni scelte in fase di registrazione.
        </h5>
        <h2 className="mt-4">Come federare il proprio catalogo</h2>          
        <h5 className="">
        Il catalogo dei dati presente nel Dataportal è alimentato grazie al contributo di tutte le Amministrazioni pubbliche italiane che espongono un catalogo dati. 
        Il catalogo si basa su un noto sistema di catalogazione e gestione dei dati chiamato CKAN. Per mantenere costantemente aggiornato il catalogo si utilizzano 
        le funzioni di raccolta automatica (harvesting) fornite da CKAN. Qualunque pubblica amministrazione italiana che dispone di un catalogo dati può contribuire 
        ad alimentare il Dataportal in maniera automatica, al momento comunicando l’URL del proprio catalogo, l’amministrazione titolare del catalogo e i riferimenti 
        email e telefonici del titolare. Il Dataportal è in grado di effettuare harvesting di cataloghi che espongono:
        </h5>
        <ul className="my-4">
          <h5><li className="">Application Programming Interface (API) standard CKAN versione 3</li></h5>
          <h5><li className="">metadati conformi al profilo di metadatazione DCAT-AP_IT pubblicati secondo lo standard RDF - Resource Description Framework.</li></h5>
        </ul>
        <h5 className="">
        L’alimentazione e l'aggiornamento del catalogo nazionale sono processi che prevedono quindi la diretta collaborazione con l'Amministrazione titolare dei dati 
        che ha sempre una responsabilità diretta sui propri dati e metadati di descrizione dei dataset. Per le Amministrazioni titolari dei dati è possibile avvalersi 
        di un'altra Pubblica Amministrazione per le attività di alimentazione e aggiornamento del catalogo nazionale: ad esempio nel caso in cui il catalogo di una Regione 
        raccolga i dati delle amministrazioni locali. A tal proposito il Dataportal implementa la politica di raccolta dati come specificata nelle linee guida per la valorizzazione 
        del patrimonio informativo pubblico.
        </h5>
      </div>
    )
  }
}

export default Guida