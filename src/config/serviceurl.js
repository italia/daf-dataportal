export const serviceurl = {
  // Local
  
  //apiURLSSOManager: "http://localhost:9002/sso-manager",
  //apiURLDatiGov: "http://localhost:9000/dati-gov/v1", 
  //apiURLCatalog: "http://localhost:9001/catalog-manager/v1",
  //apiURLIngestion: "http://localhost:9002/ingestion-manager/v1",
  //apiURLSecurity: "http://localhost:9002/security-manager/v1",

  
  //MOCK
/*   apiURLDatiGov: "http://localhost:3001/dati-gov/v1", 
  apiURLCatalog: "http://localhost:3001/catalog-manager/v1",
  apiURLIngestion: "http://localhost:3001/ingestion-manager/v1",
  apiURLSecurity: "http://localhost:3001/catalog-manager/v1",
  apiURLSSOManager: "http://localhost:3001/sso-manager/v1",
 */
  // INTERNAL
 // apiURLSSOManager: "http://security-manager.default.svc.cluster.local:9000/security-manager/sso-manager",
 // apiURLDatiGov: "http://datipubblici.default.svc.cluster.local:9000/dati-gov/v1", 
 // apiURLCatalog: "http://catalog-manager.default.svc.cluster.local:9000/catalog-manager/v1",
 // apiURLSecurity : "http://security-manager.default.svc.cluster.local:9000/security-manager/v1",

  
 // EXTERNAL
 apiURLSSOManager: "https://api.daf.teamdigitale.it/sso-manager",
 apiURLDatiGov: "https://api.daf.teamdigitale.it/dati-gov/v1", 
 apiURLCatalog: "https://api.daf.teamdigitale.it/catalog-manager/v1",
 apiURLSecurity : "https://api.daf.teamdigitale.it/security-manager/v1",

 urlMetabase: 'https://graph.daf.teamdigitale.it',
 urlSuperset: 'https://bi.daf.teamdigitale.it',
 urlJupiter: 'https://datascience.daf.teamdigitale.it',

 // TEST
 //apiURLSSOManager: "http://datipubblici-private.integrazione.daf:9002/sso-manager",
 //apiURLDatiGov: "http://datipubblici-private.integrazione.daf:9000/dati-gov/v1", 
 //apiURLCatalog: "http://datipubblici-private.integrazione.daf:9001/catalog-manager/v1",
 //apiURLIngestion: "http://service:9002/ingestion-manager/v1",
 //apiURLSecurity: "http://datipubblici-private.integrazione.daf9002/security-manager/v1",
 

 //urlMetabase: 'http://metabase.integrazione.daf',
 //urlSuperset: 'http://superset.integrazione.daf',
 //urlJupiter: 'http://datascience.daf.teamdigitale.governo.it',

 // URL ONTONETHUB
 //urlSemantic: "http://localhost:8000/stanbol/ontonethub/ontologies/find",
 // URL CNR
 urlSemantic: 'http://stlab.istc.cnr.it/ontonethub/api/find',

 domain: ".daf.teamdigitale.it",
 //domain: ".integrazione.daf",
 auth: "dGVzdDp0dWxsaWFlYmxp",

 "DatasetBackend": {
    "Search": {
      "host": "catalog-manager.default.svc.cluster.local",
      "port": 9000,
      "nameSearch": "/catalog-manager/v1/ckan/searchDataset",
      "nameDetail": "/catalog-manager/v1/ckan/datasets/"
    }
  }
}