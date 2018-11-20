export const config = 
{
  'info':{
    'titolo': '<p>Il titolo deve essere univoco nel DAF.</p><p>Il valore di default sarà il nome del file.</p><p>Un servizio controllerà l\'univocita del titolo.</p>',
    'nome' : '<p>Il campo nome verrà calcolato automaticamente dal sistema.</p>',
    'modalitacaricamento': '<h4> Caricamento SFTP Push</h4><p className="text-justify">Carica un file di esempio minore di 1MB nella drop-area. Inserisci le informazioni seguendo la procedura guidata. Il file vero e proprio lo dovrai caricare all\'indirizzo <b>SFTP</b> che ti abbiamo comunicato </p><h4> Caricamento Web Service Pull</h4><p>Inserisci l\'url dei dati da caricare. Inserisci le informazioni seguendo la procedura guidata. Il caricamento del file parte in automatico a intervalli regolari. Per ulteriori informazioni clicca <a href="http://daf-docs.readthedocs.io/en/latest/datamgmt/index.html" target="_blank">qui</a></p><h4> Caricamento Web Service Push</h4><p className="text-justify">Carica un file di esempio minore di 1MB nella drop-area. Inserisci le informazioni seguendo la procedura guidata. Il file vero e proprio lo dovrai caricare successivamente chiamando l\'API comunicata o attraverso la drop-area nella scheda di dettaglio del dataset. Dimensione massima 100MB. </p>',
    'strategiamerge':'<h4> Concatena </h4><p className="text-justify">Concatena i nuovi dati a quelli già presenti (ad esempio per eventi in serie)</p><h4> Deduplica e concatena </h4><p className="text-justify">Concatena i nuovi dati se non sono già presenti (il controllo viene effettuato su tutto il record)</p><h4> Aggiorna per chiave primaria</h4><p className="text-justify">Concatena i nuovi dati se la chiave non è presente. Altrimenti li aggiorna. </p><h4> Sincronizza </h4><p className="text-justify">Sostituisce i dati precedenti con i nuovi</p>',
    'gruppoproprietario':'<p>Potrai aggiungere i permessi per gli altri gruppi in seguito nella scheda del dataset</p>'
  },
  'dafvoc-ingform-dataset_visibility': [
      {
        "uid": "open",
        "name": {"ita": "Open Data", "eng": "Open Data", "default": "Open Data"},
        "desc": {
          "ita": "Dataset aperto a chiunque.",
          "eng": "Open data dataset, everybody can see and use it.",
          "default": "Open data dataset"
        }
      },
      {
        "uid": "private",
        "name": {"ita": "Dataset Privato", "eng": "Private Dataset", "default": "Private Dataset"},
        "desc": {
          "ita": "Dataset privato, con accesso controllato da owner.",
          "eng": "Private dataset, with controlled access by owner.",
          "default": "Private dataset, with controlled access by owner."
        }
      }
  ],
  'dafvoc-ingform-template': [
    {
      "uid": "ordinary_base",
      "name": {"ita": "Ordinario base", "eng": "Base Ordinary", "default": "Base Ordinary"},
      "desc": {
        "ita": "Ordinary Dataset di base.",
        "eng": "Plain vanilla Ordinary Dataset.",
        "default": "Plain vanilla Ordinary Dataset."
      },
      "actions": [
        {
          "ctx": "ingform",
          "action": "fill-variables",
          "variables": [
            {"name":"dataset_daf", "value": "ord"}  
          ]
        }
      ] 
    },
    {
      "uid": "voc_base",
      "name": {"ita": "Vocabolario Controllato base", "eng": "Base Controlled Vocabulary", "default": "Base Controlled Vocabulary"},
      "desc": {
        "ita": "Vocabolario Controllato di base.",
        "eng": "Plain vanilla Controlled Vocabulary",
        "default": "Plain vanilla Controlled Vocabulary"
      },
      "actions": [
        {
          "ctx": "ingform",
          "action": "fill-variables",
          "variables": [
            {"name":"dataset_daf", "value": "voc"}  
          ]
        }
      ] 
    }
  ],
  'dafvoc-ingform-filetype':[
    {
      "uid": "csv",
      "name": {"default": "csv"},
      "desc": {
        "ita": "Formato dati tabellare, campi separati da delimitatore parametrico, virgola di default.",
        "eng": "Tabular data format, fields are separated by parametric delimitator, comma by default.",
        "default": "Tabular data format, fields are separated by parametric delimitator, comma by default."
      }
    },
    {
      "uid": "json",
      "name": {"default": "json"},
      "desc": {
        "default": "JSON"
      }
    }
  ],
  'dafvoc-ingform-newtype': [
      {
        "uid": "primitive",
        "name": {"ita": "Dataset primitivo", "eng": "Primitive Dataset", "default": "Primitive Dataset"},
        "desc": {
          "ita": "Crea nuovo dataset da dati provenienti dall'esterno.", 
          "eng": "Create new dataset fromm data coming from outside.", 
          "default": "Create new dataset fromm data coming from outside."
        },
        "actions": [
          {
            "ctx": "ingform",
            "action": "add-form-elements",
            "elements":["select_file", "select_ingestion"]
          }
        ]
      },
      {
        "uid": "derived_sql",
        "name": {"ita": "Dataset derivato con SQL", "eng": "Derived Dataset - SQL", "default": "Derived Dataset - SQL"},
        "desc": {
          "ita": "Crea un dataset utilizzando una query SQL su dataset preesistenti.", 
          "eng": "Create dataset from existing ones, using SQL query.", 
          "default": "Create dataset from existing ones, using SQL query."
        },
        "actions": [
          {
            "ctx": "ingform",
            "action": "add-form-elements",
            "elements":["sql_input"]
          }
        ]
      }
/*       {
        "uid": "derived_procspark",
        "name": {"ita": "Dataset derivato con procedura Spark", "eng": "Derived Dataset - Spark Procedure", "default": "Derived Dataset - Spark Procedure"},
        "desc": {
          "ita": "Crea un dataset utilizzando una procedura Spark  su dataset preesistenti.", 
          "eng": "Create dataset from existing ones, using Spark procedure.", 
          "default": "Create dataset from existing ones, using Spark procedure."
        },
        "actions": [
          {
            "ctx": "ingform",
            "action": "add-form-elements",
            "elements":["select_sparkproc"]
          }
        ]
      } */
  ],
  'dafvoc-ingform-ingest_type' : [
    {
      "uid": "sftp",
      "name": {"default": "SFTP / API PUT"},
      "desc": {
        "ita": "Ingestion via SFTP. Path e altre informazioni saranno disponibili alla fine della procedura.",
        "eng": "SFTP ingestion. Path and other info will be profided at the end of the procedure.",
        "default": "SFTP ingestion. Path and other info will be provided at the end of the procedure."
      },
      "actions": [
        {
          "ctx": "ingform",
          "action": "add-form-elements",
          "elements": ["dragdrop"]
        }
      ]
    },
    {
      "uid": "webservice_pull",
      "name": {"default": "Webservice PULL"},
      "desc": {
        "ita": "Ingestion via Webservice. Inserisci le info necessarie e il DAF caricherà i dati dal servizio indicato.",
        "eng": "Ingestion via Webservice. Fill info below and we'll get data directly from there.",
        "default": "Ingestion via Webservice. Fill info below and we'll get data directly from there."
      },
      "actions": [
        {
          "ctx": "ingform",
          "action": "add-form-elements",
          "elements": ["dragdrop"]
        }
      ]
    }
  ],
  'tempoDiPollingOptions': [
    { 
      'uid': '0',
      "name": {"default": "Cron"}
    },
    { 
      'uid': '1',
      "name": {"default": "Timer"}
    }
  ],
  'timerUnita': [
    { 
      'uid': '0', 
      "name": {"ita": "Minuti", "default":"Minutes"}
    },
    { 
      'uid': '1', 
      "name": {"ita": "Ore", "default":"Hours"}
    },
    { 
      'uid': '2', 
      "name": {"ita": "Giorni", "default":"Days"}
    }
  ],
  'dafvoc-ingform-datastruct-type': [
    {
      "uid": "string",
      "name": {"default": "string"},
      "desc": {
        "ita": "Dati di tipo testuale.",
        "eng": "Textual type of data.",
        "default": "Textual type of data."
      }
    },
    {
      "uid": "date",
      "name": {"default": "date"},
      "desc": {
        "ita": "Dati di tipo data.",
        "eng": "Textual type of date.",
        "default": "Textual type of date."
      },
      "ctx_mapping": {
        "parquet": "string"
      }
    },
    {
      "uid": "int",
      "name": {"default": "int"},
      "desc": {
        "ita": "Dati di tipo numerico.",
        "eng": "Numeric type.",
        "default": "Numeric type."
      },
      "ctx_mapping": {
        "parquet": "int"
      }
    },
    {"uid":'bigint', "name": {"default": "bigint"}},
    {"uid":'binary', "name": {"default": "binary"}},
    {"uid":'boolean', "name": {"default": "boolean"}},
    {"uid":'decimal', "name": {"default": "decimal"}},
    {"uid":'double', "name": {"default": "double"}},
    {"uid":'float', "name": {"default": "float"}},
    {"uid":'timestamp', "name": {"default": "timestamp"}},
    {"uid":'tinyint', "name": {"default": "tinyint"}}
  ],
  'dafvoc-ingform-dataschema-metadata-field_type': [
    {
      "uid": "dim",
      "name": {
        "ita": "Dimensione",
        "eng": "Dimension",
        "default": "Dimension"
      },
      "desc": {
        "ita": "Variabile di tipo 'dimensione.'",
        "eng": "Field of type 'dimension'.",
        "default": "Field of type 'dimension'."
      }
    },
    {
      "uid": "metric",
      "name": {
        "ita": "Metrica",
        "eng": "Metric",
        "default": "Metric"
      },
      "desc": {
        "ita": "Variabile numerica di tipo 'metrica'.",
        "eng": "Numeric field of type 'metric'.",
        "default": "Numeric field of type 'metric'."
      }
    },
    {
      "uid": "desc",
      "name": {
        "ita": "Descrittivo",
        "eng": "Descriptive",
        "default": "Descriptive"
      },
      "desc": {
        "ita": "Variabile testuale di tipo 'descrittivo'.",
        "eng": "Textual field of type 'descriptive'.",
        "default": "Textual field of type 'descriptive'."
      }
    }
  ],
  'dafvoc-ingform-dataschema-metadata-format_std':[
    {
      "uid": "date",
      "name": {
        "ita": "Data",
        "eng": "Date",
        "default": "eng"
      },
      "desc": {
        "ita": "Formato standard di tipo 'Data'. Il parametro associato dovrà contenere il formato data ingerito che verrà convertito in quello DAF.",
        "eng": "Standard format of type 'Date'. The associated parameter must contain the format of the ingested date that will be translated into the DAF standard.",
        "default": "eng"
      }
    },
    {
      "uid": "address",
      "name": {
        "ita": "Indirizzo",
        "eng": "Address",
        "default": "eng"
      },
      "desc": {
        "ita": "Formato standard di tipo 'Indirizzo'. Il parametro associato dovrà contenere il formato indirizzo ingerito, usando le seguenti convenzioni: `t` per il tipo (i.e. via, piazza), `r` per nome via/piazza, `n` per numero civico, `z` per codice postale, `p` per provincia, `c` per regione, `s` per stato.",
        "eng": "Standard format of type 'Address'. The associated parameter may contain the format of the ingested address, using the following convention: `t` for address type, `r` for the road part, `n` for the number, `z` for the zip code, `p` for provincem, `c` for state/county, `s` for country. ",
        "default": "eng"
      }
    },
    {
      "uid": "url",
      "name": {
        "ita": "Indirizzo Web (url)",
        "eng": "Web Address (url)",
        "default": "eng"
      },
      "desc": {
        "ita": "Formato standard di tipo 'Indirizzo web (url).'",
        "eng": "Standard format of type 'Web Address (url).'",
        "default": "eng"
      }
    }
  ],
  "dafvoc-ingform-dataschema-metadata-format_std-conv":[
    {
      "uid": "null",
      "name": {
        "ita": "NULL",
        "eng": "NULL",
        "default": "eng"
      },
      "desc": {
        "ita": "Convenzione per la gestione dei valori di significato 'NULL'. L'applicazione della convenzione consiste nel sostituire con il valore NULL del DAF i valori passati come parametri.",
        "eng": "Convention to manage values with NULL meaning. It works by substituting the values contained in parameters with the NULL convention of DAF.",
        "default": "eng"
      },
      'fields': [{'label':'Input Null', 'val':'inputnull'}]
    },
    {
      "uid": "normvoc_default",
      "name": {
        "ita": "Normalizzazione con vocabolario di base.",
        "eng": "Normalization using default vocabulary.",
        "default": "eng"
      },
      "desc": {
        "ita": "Questa convenzione attiva la procedura di normalizzazione che utilizza il vocabolario di default per sostituzione di termini in esso contenuti.",
        "eng": "This convention activates normalization procedure that uses default vocabulary to substitute terms contained in it.",
        "default": "eng"
      }
    }
  ],
  "dafvoc-ingform-dataschema-metadata-field_profile-entity_extr":[
    {
      "uid": "date",
      "name": {
        "ita": "Data",
        "eng": "Date",
        "default": "eng"
      },
      "desc": {
        "ita": "Formato standard di tipo 'Data'. Il parametro associato dovrà contenere il formato data ingerito che verrà convertito in quello DAF.",
        "eng": "Standard format of type 'Date'. The associated parameter must contain the format of the ingested date that will be translated into the DAF standard.",
        "default": "eng"
      }
    },
    {
      "uid": "address",
      "name": {
        "ita": "Indirizzo",
        "eng": "Address",
        "default": "eng"
      },
      "desc": {
        "ita": "Formato standard di tipo 'Indirizzo'. Il parametro associato dovrà contenere il formato indirizzo ingerito, usando le seguenti convenzioni: `t` per il tipo (i.e. via, piazza), `r` per nome via/piazza, `n` per numero civico, `z` per codice postale, `p` per provincia, `c` per regione, `s` per stato.",
        "eng": "Standard format of type 'Address'. The associated parameter may contain the format of the ingested address, using the following convention: `t` for address type, `r` for the road part, `n` for the number, `z` for the zip code, `p` for provincem, `c` for state/county, `s` for country. ",
        "default": "eng"
      }
    },
    {
      "uid": "url",
      "name": {
        "ita": "Indirizzo Web (url)",
        "eng": "Web Address (url)",
        "default": "eng"
      },
      "desc": {
        "ita": "Formato standard di tipo 'Indirizzo web (url).'",
        "eng": "Standard format of type 'Web Address (url).'",
        "default": "eng"
      }
    }
  ],
  "dafvoc-ingform-dataschema-metadata-personal-cat":[
      {
        "uid": "pii",
        "name": {
          "ita": "Dati identificativi",
          "eng": "Personally identifiable information",
          "default": "eng"
        },
        "desc": {
          "ita": "Dati identificativi consentono l'identificazione diretta del soggetto.",
          "eng": "They allow the direttact identification of the person.",
          "default": "eng"
        }
      },
      {
        "uid": "spec_treat",
        "name": {
          "ita": "Dati trattamento speciale",
          "eng": "Special treatment data",
          "default": "Metric"
        },
        "desc": {
          "ita": "Dati per i quali GDPR prevede un trattamento speciale ex art. 9. Simili ai vecchi dati sensibili.",
          "eng": "Data information which GDPR dictates a special treatment ex art. 9.",
          "default": "Numeric field of type 'metric'."
        }
      }
  ],
  'dafvoc-ingform-dataschema-metadata-personal-processing':[
    {
      "uid": "hashmask",
      "name": {
        "ita": "Mascheramento univoco con chiave (Hash)",
        "eng": "Hash masking with key",
        "default": "eng"
      },
      "desc": {
        "ita": "Mascheramento con procedura di hash con chiave. Preserva univocità invormazione.",
        "eng": "Hash masking with key, preserving uniqueness of information.",
        "default": "eng"
      }
    },
    {
      "uid": "dummymask-lengh",
      "name": {
        "ita": "Mascheramento dummy preservando lunghezza campo",
        "eng": "Dummy masking, length preserving",
        "default": "eng"
      },
      "desc": {
        "ita": "Mascheramento di tipo dummy (ripetizione di una lettera, es. 'XXXXX'), preservando il la lunghezza del campo.",
        "eng": "Dummy masking (e.g. 'XXXX') which preserves field length.",
        "default": "eng"
      }
    },
    {
      "uid": "dummymask-fix",
      "name": {
        "ita": "Mascheramento dummy a lunghezza fissa",
        "eng": "Dummy masking, fixed length",
        "default": "eng"
      },
      "desc": {
        "ita": "Mascheramento di tipo dummy (ripetizione di una lettera, es. 'XXXXX'), di lunghezza prefissata.",
        "eng": "Dummy masking (e.g. 'XXXX') with prefixed length.",
        "default": "eng"
      }
    }
  ],
  'dafvoc-ingform-operational-dataset_proc-read_type':[
    {
      "uid": "last_update",
      "name": {
        "ita": "Ultimo aggiornamento",
        "eng": "Last Update",
        "default": "eng"
      },
      "desc": {
        "ita": "L'aggiornamento del dataset avviene attraverso l'invio di tutti i dati che corrispondono all'ultima versione dell'intero dataset",
        "eng": "The dataset update works by sending the entire dataset corresponding to the last version.",
        "default": "eng"
      }
    },
    {
      "uid": "time_series",
      "name": {
        "ita": "Time Series",
        "eng": "Time Series",
        "default": "eng"
      },
      "desc": {
        "ita": "Il dataset è composto da tutti i dati inviati negli intervalli di tempo.",
        "eng": "The dataset is made of all data sent through all updates.",
        "default": "eng"
      }
    }
  ],
  'dafvoc-ingform-operational-dataset_proc-dataset_type':[
    {
      "uid": "batch",
      "name": {
        "ita": "Batch",
        "eng": "Batch",
        "default": "eng"
      },
      "desc": {
        "ita": "Una ingestion di tipo batch avviene in modalità discreta e periodica nel tempo.",
        "eng": "A batch ingestion works in descrete and periodical time.",
        "default": "eng"
      }
    },
    {
      "uid": "stream",
      "name": {
        "ita": "Stream",
        "eng": "Stream",
        "default": "eng"
      },
      "desc": {
        "ita": "Ingestion di tipo 'streaming' o realtime (near realtime) accade nel continuo.",
        "eng": "Streaming ingestion or realtime (near real time) happens in continuum.",
        "default": "eng"
      }
    }
  ],
  'frequenzaaggiornamento': [
    { 
      'uid': '0 */3 * ? * *', 
      'name': { 
        'ita': '3 minuti' 
      } 
    },
    { 
      'uid': '0 */5 * ? * *', 
      'name': { 
        'ita': '5 minuti' 
      } 
    },
    { 
      'uid': '0 */10 * ? * *', 
      'name': { 
        'ita': '10 minuti' 
      } 
    },
    { 
      'uid': '0 */30 * ? * *', 
      'name': { 
        'ita': '30 minuti' 
      } 
    },
    { 
      'uid': '0 0 * ? * *', 
      'name': { 
        'ita': 'ora' 
      }
    },
    { 
      'uid': '0 0 0 * * ?', 
      'name': { 
        'ita': 'giorno' 
      } 
    }
  ],
  'strategiamerge': [
    { 
      'uid': 'merge', 
      'name': { 
      'ita':'Concatena' 
      }
    },
    { 
      'uid': 'dedupmerge', 
      'name': { 
        'ita':'Deduplica e concatena' 
      }
    },
    { 
      'uid': 'mergebypk', 
      'name': { 
        'ita':'Aggiorna per chiave primaria' 
      }
    },
    { 
      'uid': 'sync', 
      'name': { 
        'ita':'Sincronizza' 
      }
    }
  ],
  'permessiaccesso': [
    { 'uid': 'read', 
      'name': { 
        'ita':'Lettura' 
      }
    },
    { 'uid': 'write', 
      'name': { 
        'ita':'Scrittura' 
      }
    }
  ],
  'dafvoc-ingform-operational-ingestion_pipeline-name':  [
    {
      "uid": "ing-std",
      "name": {
        "ita": "DAF Ingestion Pipeline default",
        "eng": "DAF default Ingestion Pipeline",
        "default": "eng"
      },
      "desc": {
        "ita": "Pipeline di ingestion che applica normalizzazioni e standardizzazioni di default del DAF.",
        "eng": "Default ingestion pipeline performing normalization and standardization procedure, applying DAF base conventions.",
        "default": "eng"
      }
    }
  ],
  'sorgenti': [
    { 'uid': 'sftp', 
      'name': { 
        'ita':'SFTP' 
      },
      'fields': [
        {'label':'Url', 'val':'sftp_url'},
        {'label':'User', 'val':'sftp_user'},
        {'label':'Schedule', 'val':'sftp_schedule'}
      ]
    },
    { 'uid': 'srvPull', 
      'name': { 
        'ita':'Service Pull' 
      },
      'fields': [
        {'label':'Url', 'val':'srvpull_url'},
        {'label':'User', 'val':'srvpull_user'},
        {'label':'Token', 'val':'srvpull_token'},
        {'label':'Schedule', 'val':'srvpull_schedule'}
      ]
    },
    { 'uid': 'srvPush', 
      'name': { 
      'ita':'Service Push'
      },
      'fields': [
        {'label':'Url', 'val':'srvpull_url'},
        {'label':'User', 'val':'srvpull_user'},
        {'label':'Token', 'val':'srvpull_token'},
        {'label':'Schedule', 'val':'srvpull_schedule'}
      ]
    },
    { 'uid': 'dafdata', 
      'name': { 
        'ita':'DAF Data' 
      },
      'fields': [
        {'label':'dataset', 'val':'daf_dataset'},
        {'label':'Query', 'val':'daf_query'},
        {'label':'Procedura', 'val':'daf_procedura'},
        {'label':'Parametri', 'val':'daf_parametri'}
      ]
    }
  ],
  'vocabolariocontrollato': [
    { 
      'val': 'Luoghi', 
      'name': 'luoghi',
      'campo':  {'label':'Indirizzo Label', 'val':'indirizzolabel'} 
    }
  ],
  'storage':[
    { 'uid': 'hdfs', 
      'name': { 
        'ita':'HDFS' 
      },
      'fields': [
        {'label':'Path', 'val':'path'},
        {'label':'Param', 'val':'param'}
      ]
    },
    { 'uid': 'kudu', 
    'name': { 
      'ita':'KUDU' 
    },
    'fields': [
      {'label':'Table', 'val':'table'},
      {'label':'Param', 'val':'param'}
    ]
    },
    { 'uid': 'hbase', 
    'name': { 
      'ita':'HBASE' 
    },
    'fields': [
      {'label':'Param', 'val':'param'}
    ]
    },
    { 'uid': 'elastic', 
    'name': { 
      'ita':'Elastic' 
    },
    'fields': [
      {'label':'Param', 'val':'param'}
    ]
    },
    { 'uid': 'mongodb', 
    'name': { 
      'ita':'MongoDB' 
    },
    'fields': [
      {'label':'Param', 'val':'param'}
    ]
    }
  ],
  'standard':[
    { 'uid': 'isstandard', 
      'name': { 
        'ita':'E\' un dataset Standard' 
      }
    },
    { 'uid': 'seguestandard', 
      'name': { 
        'ita':'Segue uno Standard' 
      }
    },
  ]
}
