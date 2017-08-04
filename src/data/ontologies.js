const ontologies = [
    {
      "id": "http://www.w3.org/ns/org#reportsTo",
      "http://www.w3.org/2000/01/rdf-schema#label": [
        {
          "type": "text",
          "xml:lang": "it",
          "value": "riporta a"
        },
        {
          "type": "text",
          "xml:lang": "fr",
          "value": "est subordonné à"
        },
        {
          "type": "text",
          "xml:lang": "en",
          "value": "reports to"
        },
        {
          "type": "text",
          "xml:lang": "es",
          "value": "responde ante"
        }
      ],
      "http://stanbol.apache.org/ontology/entityhub/query#score": [
        {
          "type": "value",
          "xsd:datatype": "xsd:float",
          "value": 8.01175
        }
      ]
    },
    {
      "id": "http://dati.beniculturali.it/cis/isRelatedToRiT",
      "http://www.w3.org/2000/01/rdf-schema#label": [
        {
          "type": "text",
          "xml:lang": "en",
          "value": "is related to role in time"
        },
        {
          "type": "text",
          "xml:lang": "it",
          "value": "è relativo a ruolo nel tempo"
        }
      ],
      "http://stanbol.apache.org/ontology/entityhub/query#score": [
        {
          "type": "value",
          "xsd:datatype": "xsd:float",
          "value": 4.5890594
        }
      ]
    },
    {
      "id": "http://www.w3.org/ns/org#basedAt",
      "http://www.w3.org/2000/01/rdf-schema#label": [
        {
          "type": "text",
          "xml:lang": "en",
          "value": "based At"
        },
        {
          "type": "text",
          "xml:lang": "es",
          "value": "trabaja en la sede"
        },
        {
          "type": "text",
          "xml:lang": "fr",
          "value": "basé à"
        },
        {
          "type": "text",
          "xml:lang": "it",
          "value": "basata a"
        }
      ],
      "http://stanbol.apache.org/ontology/entityhub/query#score": [
        {
          "type": "value",
          "xsd:datatype": "xsd:float",
          "value": 7.0102816
        }
      ]
    },
    {
      "id": "http://www.w3.org/ns/org#classification",
      "http://www.w3.org/2000/01/rdf-schema#label": [
        {
          "type": "text",
          "xml:lang": "it",
          "value": "classificazione"
        },
        {
          "type": "text",
          "xml:lang": "en",
          "value": "classification"
        },
        {
          "type": "text",
          "xml:lang": "es",
          "value": "pertenece a la clasificación"
        },
        {
          "type": "text",
          "xml:lang": "fr",
          "value": "classification"
        }
      ],
      "http://stanbol.apache.org/ontology/entityhub/query#score": [
        {
          "type": "value",
          "xsd:datatype": "xsd:float",
          "value": 5.665163
        }
      ]
    },
    {
      "id": "http://dati.beniculturali.it/cis/isInvolvedInProject",
      "http://www.w3.org/2000/01/rdf-schema#label": [
        {
          "type": "text",
          "xml:lang": "it",
          "value": "è coinvolto in progetto"
        },
        {
          "type": "text",
          "xml:lang": "en",
          "value": "is involved in a project"
        }
      ],
      "http://stanbol.apache.org/ontology/entityhub/query#score": [
        {
          "type": "value",
          "xsd:datatype": "xsd:float",
          "value": 5.7363243
        }
      ]
    },
    {
      "id": "http://www.w3.org/ns/org#linkedTo",
      "http://www.w3.org/2000/01/rdf-schema#label": [
        {
          "type": "text",
          "xml:lang": "en",
          "value": "linked to"
        },
        {
          "type": "text",
          "xml:lang": "fr",
          "value": "relié à"
        },
        {
          "type": "text",
          "xml:lang": "es",
          "value": "está relacionada con"
        },
        {
          "type": "text",
          "xml:lang": "it",
          "value": "collegato a"
        },
        {
          "type": "text",
          "xml:lang": "es",
          "value": "está relacionado con"
        }
      ],
      "http://stanbol.apache.org/ontology/entityhub/query#score": [
        {
          "type": "value",
          "xsd:datatype": "xsd:float",
          "value": 7.0102816
        }
      ]
    },
    {
      "id": "http://xmlns.com/foaf/0.1/mbox_sha1sum",
      "http://www.w3.org/2000/01/rdf-schema#label": [
        {
          "type": "text",
          "value": "sha1sum of a personal mailbox URI name"
        }
      ],
      "http://stanbol.apache.org/ontology/entityhub/query#score": [
        {
          "type": "value",
          "xsd:datatype": "xsd:float",
          "value": 4.3787246
        }
      ]
    },
    {
      "id": "http://dati.beniculturali.it/cis/reportsTo",
      "http://www.w3.org/2000/01/rdf-schema#label": [
        {
          "type": "text",
          "xml:lang": "it",
          "value": "riporta a"
        },
        {
          "type": "text",
          "xml:lang": "en",
          "value": "reports to"
        }
      ],
      "http://stanbol.apache.org/ontology/entityhub/query#score": [
        {
          "type": "value",
          "xsd:datatype": "xsd:float",
          "value": 9.178119
        }
      ]
    },
    {
      "id": "http://dati.beniculturali.it/cis/forAccessTo",
      "http://www.w3.org/2000/01/rdf-schema#label": [
        {
          "type": "text",
          "xml:lang": "en",
          "value": "for access to"
        },
        {
          "type": "text",
          "xml:lang": "it",
          "value": "per l'accesso a"
        }
      ],
      "http://stanbol.apache.org/ontology/entityhub/query#score": [
        {
          "type": "value",
          "xsd:datatype": "xsd:float",
          "value": 5.7363243
        }
      ]
    },
    {
      "id": "http://dati.gov.it/onto/iotapit/hasValueForObservationParameter",
      "http://www.w3.org/2000/01/rdf-schema#label": [
        {
          "type": "text",
          "xml:lang": "en",
          "value": "has value for observation parameter"
        },
        {
          "type": "text",
          "xml:lang": "it",
          "value": "ha valore per parametro di osservazione"
        },
        {
          "type": "text",
          "xml:lang": "en",
          "value": "This property links the Observation Parameter to the Observation Value."
        },
        {
          "type": "text",
          "xml:lang": "it",
          "value": "Questa proprietà connette l'attributo (parametro) dell'osservazione a rispettivo valore dell'osservazione."
        }
      ],
      "http://stanbol.apache.org/ontology/entityhub/query#score": [
        {
          "type": "value",
          "xsd:datatype": "xsd:float",
          "value": 3.7906787
        }
      ]
    },
    {
      "id": "http://www.w3.org/ns/org#resultingOrganization",
      "http://www.w3.org/2000/01/rdf-schema#label": [
        {
          "type": "text",
          "xml:lang": "en",
          "value": "resulted in"
        },
        {
          "type": "text",
          "xml:lang": "es",
          "value": "resulta en"
        },
        {
          "type": "text",
          "xml:lang": "it",
          "value": "risultato in"
        },
        {
          "type": "text",
          "xml:lang": "fr",
          "value": "a donné naissance à"
        }
      ],
      "http://stanbol.apache.org/ontology/entityhub/query#score": [
        {
          "type": "value",
          "xsd:datatype": "xsd:float",
          "value": 7.0102816
        }
      ]
    },
    {
      "id": "http://xmlns.com/foaf/0.1/",
      "http://www.w3.org/2000/01/rdf-schema#label": [
        {
          "type": "text",
          "value": "Friend of a Friend (FOAF) vocabulary"
        }
      ],
      "http://stanbol.apache.org/ontology/entityhub/query#score": [
        {
          "type": "value",
          "xsd:datatype": "xsd:float",
          "value": 4.3787246
        }
      ]
    }
]

export default ontologies;