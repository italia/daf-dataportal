import React, { Component } from 'react';

class Partecipa extends Component{
  constructor(props){
    super(props)
    this.state = {}
  }

  render(){
    return(
      <div className="w-100">
        <div className="header-story">
          <img src="./img/danilo-batista-334883-unsplash.jpg"/>
        </div>
        <div className="container paragrafo my-5">
          <h1 className="mt-3">Partecipa</h1>         
            <h5 className="">
            Sei un appassionato di dati e analytics e vuoi utilizzare attivamente il Data & Analytics Framework (DAF), dando il tuo contributo al paese? 
            Registrandoti al Dataportal! otrai accedere alle funzionalità di analisi e condivisione di informazioni disponibili nella sezione privata. 
            Avrai a disposizione un cruscotto da cui accedere a tool di analytics e data visualization e potrai scrivere DataStory per condividere con la community le tue analisi. 
            Inoltre, sul Forum dedicato al DAF potrai discutere con la community di nuove analisi e possibilità di sviluppo della piattaforma, unisciti a noi!
            </h5>
            <h2 className="mt-4">DataStory</h2>          
            <h5>
            Le DataStory sono dei blog post in cui descrivere un'analisi fatta sui dati del DAF. È possibile integrare dashboard e grafici creati con gli strumenti messi a disposizione 
            (Superset e Metabase) e condividere i risultati con la community. Le storie create verranno pubblicate nella relativa sezione pubblica del Dataportal.
            </h5>
            <h2 className="mt-4">Analytics e Data Visualization con Superset</h2>          
            <h5 className="">
            Superset è un tool open-souce di Business Intelligence sviluppato da AirBnB con cui è possibile creare grafici (‘slices’ nel gergo di Superset), dashboard ed eseguire query SQL. 
            Abbiamo integrato Superset con il DAF e il Dataportal per offrire agli utenti la possibilità di creare le proprie analisi e condividerle con la community in modalità self service. 
            L’integrazione con il Dataportal permette di creare DataStory e dashboard che integrano le analisi salvate in Superset. 
            </h5>
            <h2 className="mt-4">Data Visualization con Metabase</h2>          
            <h5 className="">
            Metabase è uno strumento di semplice utilizzo per creare visualizzazioni grafiche a partire dai dati presenti nel DAF. I risultati delle vostre analisi possono essere integrati nelle vostre DataStory.
            </h5>
            <h2 className="mt-4">Data Science con Jupyter & Spark</h2>          
            <h5 className="">
            Jupyter Notebook è un tool open-source che permette di eseguire codice in maniera interattiva. É diventato uno standard de facto per data science perché offre la possibilità di sviluppare analisi dati, 
            generare grafici, costruire modelli di machine learning e molto altro, con i tuoi linguaggi di programmazione preferiti.
            </h5>
        </div>
      </div>
    )
  }
}

export default Partecipa