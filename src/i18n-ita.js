export const messages = {
            menu    :   {
                home            :   "Home",
                dataset         :   "Dataset",
                widget          :   "Widget",    
                dashboard       :   "Dashboard",    
                storie          :   "Storie",    
                toolkit         :   "TOOLKIT",    
                crea            :   "Crea",    // ---
                nuovoDataset    :   "Nuovo Dataset",    
                nuovaDashboard  :   "Nuova Dashboard",    
                nuovaStoria     :   "Nuova Storia",
                strumenti       :   "Strumenti",  // ----  
                superset        :   "Superset",
                open            :   "Open",
                privato         :   "Privato",
                semantica       :   "Semantica",//----
                ontologie       :   "Ontologie",
                vocabolari      :   "Vocabolari",
                validatore      :   "Validatore",
                info            :   "INFO",
                documentazione  :   "Documentazione",
                amministrazione :   "Amministrazione",
                gestioneUtenti  :   "Gestione Utenti",
                organizzazioni  :   "Organizzazioni",
                interfaccia     :   "Interfaccia",
                messaggi        :   "Messaggi",
                gestioneMessaggi:   "Gestione Messaggi",
                gestioneTTL     :   "Gestione TTL"
            },
            label   :   {
                modifica        :   "Modifica",    
                Success         :   "Success",
                Error           :   "Error",
                Info            :   "Info",
                System          :   "System",
                salvataggio     :   "Salvataggio",
                salvataggioOK   :   "Salvataggio effettuato con successo",
                errore          :   "Errore",
                salvataggioKO   :   "Impossibile effettuare il salvataggio",
                gettingStarted  :    "Getting started"
            },
            validazione : {
                campoObbligatorio       :   "Campo obbligatorio",
                soloNumeri              :   "Solo Numeri"
            },

    lineeGuida: [

        {
            step: 0,
            titolo: 'Step 1 - Scopri la piattaforma digitale nazionale dati.',
            // descrizione: '&lt;h1&gt;Hi there!&lt;/h1&gt;'
            descrizione: `La piattaforma PDND è aperta a tutti: pa, cittadini e imprese.
            Qui puoi consultare un elenco di risorse sulla PDND (partire da questo …)
            Iscriviti qui
            <a href="https://dataportal.daf.teamdigitale.it/#/register"> https://dataportal.daf.teamdigitale.it/#/register </a>
            e inizia ad esplorare le potenzialità del daf.`


        },

        {
            step: 1,
            titolo: 'Step 2 - Segnalaci il tuo interesse',
            descrizione: `Sei un’amministrazione pubblica o un ente di ricerca e vuoi iniziare ad utilizzare la Piattaforma Digitale Nazionale Dati per condividere dati con altri enti che già la utilizzano o all’interno della tua stessa organizzazione?
 

            • Invia una mail all’indirizzo:  <a href="mailto:pdnd@teamdigitale.governo.it"> pdnd@teamdigitale.governo.it </a> specificando queste informazioni:
                ◦ Subject:  “Adesione PDND”
        
        Nel corpo della mail indicare:
                ◦ Nome Ente - dipartimento 
                ◦ Indirizzo
                ◦ Nome e Cognome referente 
                ◦ Qualifica referente
                ◦ Indirizzo mail referente
                ◦ Breve descrizione sull’utilizzo che si intende fare della PDND
                ◦ Conosci già la PDND? Si, no
                ◦ Il tuo ente espone un portale open data? Si, no`
        },



        {
            step: 2,

            titolo: 'Step 3 - Conosciamoci',
            descrizione: `Concordiamo una webcall per confrontarci su come proseguire, 
            su che tipologia di dati intendete lavorare e se intendete condividere dei dataset con altre organizzazioni.
            In questa sessione vi verrà fatta una demo della piattaforma e delle sue funzionalità`
        },


        {
            step: 3,


            titolo: 'Step 4 - Creiamo la tua organizzazione',
            descrizione: `Una volta firmato il protocollo d’intesa, provvederemo a definire la tua organizzazione sulla PDND, 
    questo ti permetterà di creare dei gruppi di lavoro a cui aggiungere gli utenti della tua organizzazione e 
    condividere privatamente i dataset che andretecon loro.`


        },

        {
            step: 4,

            titolo: 'Step 5 - Popoliamo la tua organizzazione',
            descrizione: ``


        },

        {
            step: 5,

            titolo: 'Step 6 - Indica il tuo utente editor',
            descrizione: `Loggati con il tuo utente amministratore e promuovi ad editor l’utente prescelto per il ruolo.
    Ricorda che l’utente editor è l’unico che può creare dei nuovi flussi e dataset per la tua organizzazione. 
    Sara lui a doversi occupare di caricare i dati, una volta terminata la fase di metadatazione.`

        },

        {
            step: 6,

            titolo: 'Step 7 - Scambio chiave SSH',
            descrizione: `Al fine di poter inserire nella PDND dei flussi dati tramite FTP è necessario validare l’identità di chi carica i dati. 
    Per questo motivo devi fornirci una chiave pubblica SSH che utilizzerai con la tua utenza editor quando vorrai inviarci dei dataset.`

        },

        {
            step: 7,

            titolo: 'Step 8 - Crea il tuo primo flusso dati',
            descrizione: `Al fine di stabilire un flusso che gestisca e renda fruibile un dataset è necessario eseguire due operazioni:

            • METADATAZIONE: indicare alla PDND le caratteristiche del flusso legato al tuo dataset: attraverso il form di ingestion indica al sistema quali sono le informazioni contenute e le modalità cui cui verrà caricato
            • CARICAMENTO DATI: caricare il contenuto del dataset che hai precedentemente metadato secondo le modalità scelte nel form di ingestion
        
        Nota bene: i dati che intendi caricare devono rispettare i casi d’uso esplicitati nel protocollo d’intesa. Non si devono inserire dati personali.
        <a href = "https://docs.italia.it/italia/daf/daf-dataportal-it-docs/it/bozza/dataportal-privato/dataset.html"> https://docs.italia.it/italia/daf/daf-dataportal-it-docs/it/bozza/dataportal-privato/dataset.html <a/>
        `

        },

        {
            step: 8,

            titolo: 'Step 9 - Utilizza i tuoi dati',
            descrizione: `Una volta che i tuoi dataset sono stati metadatati e caricati puoi iniziare ad analizzare i tuoi dati 
            attraverso gli strumenti interni ed esterni di analisi.

            <a href="https://docs.italia.it/italia/daf/daf-dataportal-it-docs/it/bozza/dataportal-privato/dashboard.html"> https://docs.italia.it/italia/daf/daf-dataportal-it-docs/it/bozza/dataportal-privato/dashboard.html </a>
            
          <a href="https://docs.italia.it/italia/daf/daf-dataportal-it-docs/it/bozza/dataportal-privato/api.html"> https://docs.italia.it/italia/daf/daf-dataportal-it-docs/it/bozza/dataportal-privato/api.html </a>
        `

        },



        {
            step: 9,

            titolo: 'Step 10 - Condividi i tuoi dati',
            descrizione: ` Di default il dataset non è visibile a nessuno tranne all’utente editor che lo ha metadatato e caricato.
            E’ necessario abilitare manualmente la pubblicazione del dataset e la condivisione all’interno dei tuoi workgroup 
            dell’organizzazione.
            Nel caso si voglia condividere uno o più dataset con un’altra Pubblica Amministrazione è necessario stipulare una 
            convenzione tra le parti. A livello di sistema,  sarà cura del Referente Tecnico della Pubblica 
            Amministrazione Titolare dei dati attuare la configurazione necessaria, seguendo le procedure di condivisione. `

        },

        {
            step: 10,

            titolo: 'Step 11 - Segnalaci eventuali malfunzionamenti o features',
            descrizione: `Indicare come segnalarci bug,
            Github`

        },


    ]
}; 