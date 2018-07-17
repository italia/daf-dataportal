export default [{
  categoryLabel: 'Accesso',
  faqs: [{
    question: 'Caratteri non ammessi nel campo indirizzo mail in fase di creazione di nuova utenza:',
    answer: 'Non è possibile registrare un nuovo account utilizzando un indirizzo mail che contiene il carattere “+” al suo interno.'
  },{
    question: 'Lo stesso utente può essere usato contemporaneamente da più persone?',
    answer: 'Sì, al momento è possibile loggarsi da più postazioni con lo stesso utente.'
  },{
    question: 'Che durata ha il token di autenticazione?',
    answer: 'Il token di autenticazione ha una durata di 8 ore. Ogni volta che si termina la sessione di lavoro è necessario effettuare il logout. Nel caso si lasci il browser inutilizzato per un pò è buona norma riautenticarsi sloggandosi e riloggandosi'
  }]
},{
  categoryLabel: 'Metadatazione',
  faqs: [{
    question: 'Ci sono dei limiti di lunghezza per il titolo dataset?',
    answer: 'Consigliamo di utilizzare dei titoli con una lunghezza minore di 50 caratteri.'
  },{
    question: 'Come deve essere il sample di un dataset?',
    answer: 'Il sample che si utilizza in fase di metadatazione deve essere rappresentativo del contenuto del dataset che poi si andrà a inserire nella piattaforma. Si consiglia di limitare il sample, in caso di un csv, ad un massimo di 50 righe.'
  },{
    question: 'È necessario creare un sample di un dataset in formato geojson (a volte risulta difficile quando si ha a che fare con json con più livelli)? È possibile che il vincolo sul geojson di una riga sola valga solo per il sample?',
    answer: 'Se il geojson non è di dimensioni maggiori di 1 MB può essere usato anche come sample l’importante è che sia rappresentato su un’unica riga.'
  },{
    question: 'È possibile che il vincolo sul geojson di una riga sola valga solo per il sample? Non capisco il significato di alcuni campi (es. Definisce uno standard), dove posso trovare maggiori dettagli?',
    answer: 'Tutti i campi che non sono descritti nel manuale utente saranno oggetto di implementazioni future quindi al momento si consiglia di trascurarli.'
  }]
},{
  categoryLabel: 'Semantica',
  faqs: [{
    question: 'C’è una guida di riferimento per capire come valorizzarli correttamente?',
    answer: 'Sì, Ad esempio questa è quella sulle strutture ricettive navigabile online https://ontopia.daf.teamdigitale.it/lodview/onto/ACCO.html'
  },{
    question: 'Che relazione c’è tra il campo “categoria”, “dominio” e “sottodominio”? Dominio e sottodominio non sono vincolati? ',
    answer: 'No, sta al buon senso di chi metadata il dataset renderli coerenti.'
  },{
    question: 'Perchè, una volta caricato un dataset in formato csv lo si scarica in json?',
    answer: 'Ad oggi i dati sono mantenuti in un formato interno, l’export è implementato al momento in json indipendentemente dal formato caricato.'
  },{
    question: 'È possibile consultare la metadatazione effettuata per un dataset?',
    answer: 'No al momento non ancora, ma presto verrà resa disponibile questa funzionalità.'
  },{
    question: 'È possibile modificare una metadatazione esistente? È possibile aggiungere un nuovo campo ad un dataset precedentemente metadatato? È possibile cancellare la metadatazione e relativi dati di un dataset caricato?',
    answer: 'No, al momento non è possibile ma verrà implementata a breve la possibilità di modificare i metadati inseriti e successivamente di aggiungere nuovi campi.'
  }]
},{
  categoryLabel: 'Caricamento Dati',
  faqs: [{
    question: 'L’utenza che deve può effettuare l’invio dei dati deve appartenere ad un particolare profilo?',
    answer: 'Si, solo le utenze “editor” possono effettuare il trasferimento dei dati tramite SFTP ed è necessario aver fornito precedentemente la propria chiave di autenticazione pubblica che verrà installata sul server del daf per provare l’identità della PA trasmittente.'
  },{
    question: 'L’utente viene notificato con un feedback sull’esito del trasferimento dati mediante SFTP?',
    answer: 'No, è comunque in pipeline l’implementazione della gestione delle notifiche ed eccezioni.'
  },{
    question: 'È possibile avere accesso a Hue?',
    answer: 'Ad oggi non è possibile avere accesso alla console di HUE, si può valutare in futuro caso per caso.'
  },{
    question: 'È possibile avere accesso a Kylo?',
    answer: 'Ad oggi non è possibile avere accesso alla console di Kylo, si può valutare in futuro caso per caso.'
  }]
},{
  categoryLabel: 'Modello Business',
  faqs: [{
    question: 'A regime quale sarà il modello di business del DAF? Sarà possibile utilizzarlo in modo gratuito?',
    answer: 'La modalità che ci si immagina è quella del modello Freemium, per chi farà un utilizzo massiccio dei dati/chiamate API verrà applicata una fee necessaria per coprire i costi dell’infrastruttura.'
  }]
}]