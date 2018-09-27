export const ingestionFormOptions = 
{
  'publicOptions': [
    { 'val': 'PRIVATO', 'name': 'Privato' },
    { 'val': 'PUBBLICO', 'name': 'Open Data' }
  ],
  'tipodatasetOptions': [
    { 'val': 'primitive', 'name': 'Dataset primitivo' },
    { 'val': 'derived_sql', 'name': 'Dataset derivato con SQL' },
    { 'val': 'derived_proc_spark', 'name': 'Dataset derivato con procedura Spark' }
  ],
  'modalitacaricamentoOptions': [
    { 'val': '1', 'name': 'SFTP' },
    { 'val': '2', 'name': 'Web Service' },
    { 'val': '3', 'name': 'SFTP e Web Service' }
  ],
  'yesOrNoOptions': [
    { 'val': '1', 'name': 'Si' },
    { 'val': '0', 'name': 'No' }
  ],
  'tempoDiPollingOptions': [
    { 'val': '0', 'name': 'Cron' },
    { 'val': '1', 'name': 'Timer' }
  ],
  'timerUnita': [
    { 'val': '0', 'name': 'Minuti' },
    { 'val': '1', 'name': 'Ore' },
    { 'val': '2', 'name': 'Giorni' }
  ],
  'tipodataset': [
    {
      "uid": "primitive",
      "name": { "ita": "Dataset primitivo", "eng": "Primitive Dataset", "default": "Primitive Dataset" },
      "desc": {
        "ita": "Crea nuovo dataset da dati provenienti dall'esterno.",
        "eng": "Create new dataset fromm data coming from outside.",
        "default": "Create new dataset fromm data coming from outside."
      },
      "actions": [
        {
          "ctx": "ingform",
          "action": "add-form-elements",
          "elements": ["select_file", "select_ingestion"]
        }
      ]
    },
    {
      "uid": "derived_sql",
      "name": { "ita": "Dataset derivato con SQL", "eng": "Derived Dataset - SQL", "default": "Derived Dataset - SQL" },
      "desc": {
        "ita": "Crea un dataset utilizzando una query SQL su dataset preesistenti.",
        "eng": "Create dataset from existing ones, using SQL query.",
        "default": "Create dataset from existing ones, using SQL query."
      },
      "actions": [
        {
          "ctx": "ingform",
          "action": "add-form-elements",
          "elements": ["sql_input"]
        }
      ]
    },
    {
      "uid": "derived_procspark",
      "name": { "ita": "Dataset derivato con procedura Spark", "eng": "Derived Dataset - Spark Procedure", "default": "Derived Dataset - Spark Procedure" },
      "desc": {
        "ita": "Crea un dataset utilizzando una procedura Spark  su dataset preesistenti.",
        "eng": "Create dataset from existing ones, using Spark procedure.",
        "default": "Create dataset from existing ones, using Spark procedure."
      },
      "actions": [
        {
          "ctx": "ingform",
          "action": "add-form-elements",
          "elements": ["select_sparkproc"]
        }
      ]
    }
  ],
  'tipoinformazione': [
    { 'val': 'Opzione1', 'name': 'Opzione1' },
    { 'val': 'Opzione2', 'name': 'Opzione2' }
  ],
  'standardformat': [
    { 'val': 'Opzione1', 'name': 'Opzione1' },
    { 'val': 'Opzione2', 'name': 'Opzione2' }
  ],
  'convenzioni': [
    { 
      'val': 'nullvalues', 
      'name': 'Null Values',
      'campi': [{'label':'Input Null', 'val':'inputnull'}]
    },
    { 
      'val': 'replace', 
      'name': 'Replace',
      'campi': [{'label':'Input Val', 'val':'inputval'},{'label':'Output Val', 'val': 'outputval'}]

    },
    { 
      'val': 'prova', 
      'name': 'Prova',
      'campi': [{'label':'Input Prova', 'val':'inputprova'}]
    }
  ],
  'vocabolariocontrollato': [
    { 'val': 'Opzione1', 'name': 'Opzione1' },
    { 'val': 'Opzione2', 'name': 'Opzione2' }
  ],
  'tipodatopersonale': [
    { 'val': 'Opzione1', 'name': 'Opzione1' },
    { 'val': 'Opzione2', 'name': 'Opzione2' }
  ],
  'tipomascheramento': [
    { 'val': 'Opzione1', 'name': 'Opzione1' },
    { 'val': 'Opzione2', 'name': 'Opzione2' }
  ],
  'tema': [
    { 'val': 'Opzione1', 'name': 'Opzione1' },
    { 'val': 'Opzione2', 'name': 'Opzione2' }
  ],
  'licenza': [
    { 'val': 'Opzione1', 'name': 'Opzione1' },
    { 'val': 'Opzione2', 'name': 'Opzione2' }
  ],
  'organizzazionetitolare': [
    { 'val': 'Opzione1', 'name': 'Opzione1' },
    { 'val': 'Opzione2', 'name': 'Opzione2' }
  ],
  'frequenzaaggiornamento': [
    { 'val': 'Opzione1', 'name': 'Opzione1' },
    { 'val': 'Opzione2', 'name': 'Opzione2' }
  ],
  'gruppoproprietario': [
    { 'val': 'Opzione1', 'name': 'Opzione1' },
    { 'val': 'Opzione2', 'name': 'Opzione2' }
  ],
  'gruppiaccesso': [
    { 'val': 'Opzione1', 'name': 'Opzione1' },
    { 'val': 'Opzione2', 'name': 'Opzione2' }
  ],
  'datasetstd': [
    { 'val': 'Opzione1', 'name': 'Opzione1' },
    { 'val': 'Opzione2', 'name': 'Opzione2' }
  ],
  'tiposalvataggio': [
    { 'val': 'Opzione1', 'name': 'Opzione1' },
    { 'val': 'Opzione2', 'name': 'Opzione2' }
  ],
  'tipoingestiondati': [
    { 'val': 'Opzione1', 'name': 'Opzione1' },
    { 'val': 'Opzione2', 'name': 'Opzione2' }
  ],
  'strategiamerge': [
    { 'val': 'Opzione1', 'name': 'Opzione1' },
    { 'val': 'Opzione2', 'name': 'Opzione2' }
  ]
}
