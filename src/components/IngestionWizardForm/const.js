export const publicOptions = [
    {'val' : 'PRIVATO', 'name' : 'Privato'},
    {'val' : 'PUBBLICO', 'name' : 'Open Data'}
]

export const tipodatasetOptions = [
    {'val' : 'primitive', 'name' : 'Dataset primitivo'},
    {'val' : 'derived_sql', 'name' : 'Dataset derivato con SQL'},
    {'val' : 'derived_procspark', 'name' : 'Dataset derivato con procedura Spark'}
]

export const modalitacaricamentoOptions = [
    {'val' : '1', 'name' : 'SFTP'},
    {'val' : '2', 'name' : 'Web Service'},
    {'val' : '3', 'name' : 'SFTP e Web Service'}
]

export const yesOrNoOptions = [
  {'val' : '1', 'name' : 'Si'},
  {'val' : '0', 'name' : 'No'}
]

export const tipodataset = [
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
    },
    {
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
    }
  ]
