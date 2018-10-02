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
  'gerarchie': [
    { 
      'val': 'parent', 
      'name': 'Padre'
    },
    { 
      'val': 'column', 
      'name': 'Colonna'
    }
  ],
  'vocabolariocontrollato': [
    { 
      'val': 'Opzione1', 
      'name': 'Opzione1',
      'campo':  {'label':'Input Vocabolario', 'val':'inputvocabolario'}
    },
    { 
      'val': 'Luoghi', 
      'name': 'luoghi',
      'campo':  {'label':'Indirizzo Label', 'val':'indirizzolabel'} 
    }
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
    { 'val': 'agricoltura', 'name': 'Agricoltura' },
    { 'val': 'ambiente', 'name': 'Ambiente' },
    { 'val': 'istruzione_cultura_sport', 'name': 'Istruzione, Cultura e Sport' },
    { 'val': 'economia_finanze', 'name': 'Economia e Finanze' },
    { 'val': 'energia', 'name': 'Energia' },
    { 'val': 'giustizia', 'name': 'Giustizia, sistema giuridico e sicurezza pubblica' },
    { 'val': 'governo', 'name': 'Governo e settore pubblico' },
    { 'val': 'tematiche_internazionali', 'name': 'Tematiche Internazionali' },
    { 'val': 'regioni_citta', 'name': 'Regioni e Città' },
    { 'val': 'salute', 'name': 'Salute' },
    { 'val': 'scienza_tecnologia', 'name': 'Scienza e tecnologia' },
    { 'val': 'popolazione_societa', 'name': 'Popolazione e Società' },
    { 'val': 'trasporti', 'name': 'Trasporti' }
  ],
  'licenza': [
    {
      "val": "A.1.1",
      "name": "Creative Commons CC0 1.0 Universale - Public Domain Dedication (CC0 1.0)"
    },
    {
      "val": "A.1.2",
      "name": "ODC Public Domain Dedication and License (PDDL)"
    },
    {
      "val": "A.2.1",
      "name": "Creative Commons Attribuzione 4.0 Internazionale (CC BY 4.0)"
    },
    {
      "val": "A.2.10",
      "name": "Open Data Commons Attribution License (ODC_BY)"
    },
    {
      "val": "A.2.2",
      "name": "Creative Commons Attribuzione 3.0 Unported (CC BY 3.0)"
    },
    {
      "val": "A.2.3",
      "name": "Creative Commons Attribuzione Italia 3.0 (CC BY 3.0 IT)"
    },
    {
      "val": "A.2.4",
      "name": "Creative Commons Attribuzione 2.5 Generica (CC BY 2.5)"
    },
    {
      "val": "A.2.5",
      "name": "Creative Commons Attribuzione 2.5 Italia (CC BY 2.5 IT)"
    },
    {
      "val": "A.2.6",
      "name": "Creative Commons Attribuzione 2.0 Generica (CC BY 2.0)"
    },
    {
      "val": "A.2.7",
      "name": "Creative Commons Attribuzione 2.0 Italia (CC BY 2.0 IT)"
    },
    {
      "val": "A.2.8",
      "name": "Creative Commons Attribuzione 1.0 Generica (CC BY 1.0)"
    },
    {
      "val": "A.2.9",
      "name": "Italian Open Data License 2.0 (IODL 2.0)"
    },
    {
      "val": "A.3.1",
      "name": "Creative Commons Attribuzione-Condividi allo stesso modo 4.0 Internazionale (CC BY-SA 4.0)"
    },
    {
      "val": "A.3.10",
      "name": "Open Data Commons Open Database License 1.0 (ODbL)"
    },
    {
      "val": "A.3.11",
      "name": "GNU Free Documentation License 1.3 (GFDL 1.3)"
    },
    {
      "val": "A.3.2",
      "name": "Creative Commons Attribuzione-Condividi allo stesso modo 3.0 Unported (CC BY-SA 3.0)"
    },
    {
      "val": "A.3.3",
      "name": "Creative Commons Attribuzione-Condividi allo stesso modo 3.0 Italia (CC BY-SA 3.0 IT)"
    },
    {
      "val": "A.3.4",
      "name": "Creative Commons Attribuzione-Condividi allo stesso modo 2.5 Generica (CC BY-SA 2.5)"
    },
    {
      "val": "A.3.5",
      "name": "Creative Commons Attribuzione-Condividi allo stesso modo 2.5 Italia (CC BY-SA 2.5 IT)"
    },
    {
      "val": "A.3.6",
      "name": "Creative Commons Attribuzione-Condividi allo stesso modo 2.0 Generica (CC BY-SA 2.0)"
    },
    {
      "val": "A.3.7",
      "name": "Creative Commons Attribuzione-Condividi allo stesso modo 2.0 Italia (CC BY-SA 2.0 IT)"
    },
    {
      "val": "A.3.8",
      "name": "Creative Commons Attribuzione-Condividi allo stesso modo 1.0 Generica (CC BY-SA 1.0)"
    },
    {
      "val": "A.3.9",
      "name": "Italian Open Data License 1.0 (IODL 1.0)"
    },
    {
      "val": "A.4.1",
      "name": "Against DRM (2.0)"
    },
    {
      "val": "B.1.1",
      "name": "Creative Commons Attribuzione-Non Commerciale 4.0 Internazionale (CC BY-NC 4.0)"
    },
    {
      "val": "B.1.10",
      "name": "Creative Commons Attribuzione-Non Commerciale-Condividi allo stesso modo 3.0 Unported (CC BY-NC-SA 3.0)"
    },
    {
      "val": "B.1.11",
      "name": "Creative Commons Attribuzione-Non Commerciale-Condividi allo stesso modo 3.0 Italia (CC BY-NC-SA 3.0 IT)"
    },
    {
      "val": "B.1.12",
      "name": "Creative Commons Attribuzione-Non Commerciale-Condividi allo stesso modo 2.5 Generica (CC BY-NC-SA 2.5)"
    },
    {
      "val": "B.1.13",
      "name": "Creative Commons Attribuzione-Non Commerciale-Condividi allo stesso modo 2.5 Italia (CC BY-NC-SA 2.5 IT)"
    },
    {
      "val": "B.1.14",
      "name": "Creative Commons Attribuzione-Non Commerciale-Condividi allo stesso modo 2.0 Generica (CC BY-NC-SA 2.0)",
    },
    {
      "val": "B.1.15",
      "name": "Creative Commons Attribuzione-Non Commerciale-Condividi allo stesso modo 2.0 Italia (CC BY-NC-SA 2.0 IT)"
    },
    {
      "val": "B.1.16",
      "name": "Creative Commons Attribuzione-Non Commerciale-Condividi allo stesso modo 1.0 Generica (CC BY-NC-SA 1.0)"
    },
    {
      "val": "B.1.2",
      "name": "Creative Commons Attribuzione-Non Commerciale 3.0 Unported (CC BY-NC 3.0)"
    },
    {
      "val": "B.1.3",
      "name": "Creative Commons Attribuzione-Non Commerciale 3.0 Italia (CC BY-NC 3.0 IT)"
    },
    {
      "val": "B.1.4",
      "name": "Creative Commons Attribuzione-Non Commerciale 2.5 Generica (CC BY-NC 2.5)"
    },
    {
      "val": "B.1.5",
      "name": "Creative Commons Attribuzione-Non Commerciale 2.5 Italia (CC BY-NC 2.5 IT)"
    },
    {
      "val": "B.1.6",
      "name": "Creative Commons Attribuzione-Non Commerciale 2.0 Generica (CC BY-NC 2.0)"
    },
    {
      "val": "B.1.7",
      "name": "Creative Commons Attribuzione-Non Commerciale 2.0 Italia (CC BY-NC 2.0 IT)"
    },
    {
      "val": "B.1.8",
      "name": "Creative Commons Attribuzione-Non Commerciale 1.0 Generica (CC BY-NC 1.0)"
    },
    {
      "val": "B.1.9",
      "name": "Creative Commons Attribuzione-Non Commerciale-Condividi allo stesso modo 4.0 Internazionale (CC BY-NC-SA 4.0)"
    },
    {
      "val": "B.2.1",
      "name": "Creative Commons Attribuzione-Non Opere Derivate 4.0 Internazionale (CC BY-ND 4.0)"
    },
    {
      "val": "B.2.2",
      "name": "Creative Commons Attribuzione-Non Opere Derivate 3.0 Unported (CC BY-ND 3.0)"
    },
    {
      "val": "B.2.3",
      "name": "Creative Commons Attribuzione-Non Opere Derivate 3.0 Italia (CC BY-ND 3.0 IT)"
    },
    {
      "val": "B.2.4",
      "name": "Creative Commons Attribuzione-Non Opere Derivate 2.5 Generica (CC BY-ND 2.5)"
    },
    {
      "val": "B.2.5",
      "name": "Creative Commons Attribuzione-Non Opere Derivate 2.5 Italia (CC BY-ND 2.5 IT)"
    },
    {
      "val": "B.2.6",
      "name": "Creative Commons Attribuzione-Non Opere Derivate 2.0 Generica (CC BY-ND 2.0)"
    },
    {
      "val": "B.2.7",
      "name": "Creative Commons Attribuzione-Non Opere Derivate 2.0 Italia (CC BY-ND 2.0 IT)"
    },
    {
      "val": "B.2.8",
      "name": "Creative Commons Attribuzione-Non Opere Derivate 1.0 Generica (CC BY-ND 1.0)"
    },
    {
      "val": "B.2.9",
      "name": "Creative Commons Attribuzione-Non Opere Derivate-Non Commerciale 1.0 Generica (CC BY-ND-NC 1.0)"
    },
    {
      "val": "C.1.1",
      "name": "Licenza Sconosciuta"
    }
  ],
  'organizzazionetitolare': [
    { 'val': 'Opzione1', 'name': 'Opzione1' },
    { 'val': 'Opzione2', 'name': 'Opzione2' }
  ],
  'frequenzaaggiornamento': [
    {'val' : '0 */3 * ? * *', 'name' : '3 minuti'},
    {'val' : '0 */5 * ? * *', 'name' : '5 minuti'},
    {'val' : '0 */10 * ? * *', 'name' : '10 minuti'},
    {'val' : '0 */30 * ? * *', 'name' : '30 minuti'},
    {'val' : '0 0 * ? * *', 'name' : 'ora'},
    {'val' : '0 0 0 * * ?', 'name' : 'giorno'}
  ],
  'gruppoproprietario': [
    { 'val': 'Opzione1', 'name': 'Opzione1' },
    { 'val': 'Opzione2', 'name': 'Opzione2' }
  ],
  'gruppiaccesso': [
    { 'val': 'Opzione1', 'name': 'Opzione1' },
    { 'val': 'Opzione2', 'name': 'Opzione2' }
  ],
  'permessiaccesso': [
    { 'val': 'read', 'name': 'Lettura' },
    { 'val': 'write', 'name': 'Scrittura' }
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
