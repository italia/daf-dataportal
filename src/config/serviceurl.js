export const serviceurl = {
  // DatasetBackend module configs
  /*apiURLSSOManager: "http://localhost:9001/sso-manager/v1",
  apiURLDatiGov: "http://localhost:9000/dati-gov/v1", 
  apiURLCatalog: "http://localhost:9001/catalog-manager/v1",
  apiURLIngestion: "http://localhost:9002/ingestion-manager/v1",
  apiURLSecurity: "http://localhost:9002/security-manager/v1",
*/
  //MOCK
  /*apiURLDatiGov: "http://localhost:3001/dati-gov/v1", 
  apiURLCatalog: "http://localhost:3001/catalog-manager/v1",
  apiURLIngestion: "http://localhost:3001/ingestion-manager/v1",
  apiURLSecurity: "http://localhost:3001/catalog-manager/v1",
*/
  // PRODUCTION
  apiURLSSOManager: "http://security-manager.default.svc.cluster.local:9000/sso-manager",
  apiURLDatiGov: "http://datipubblici.default.svc.cluster.local:9000/dati-gov/v1", 
  apiURLCatalog: "http://catalog-manager.default.svc.cluster.local:9000/catalog-manager/v1",
  apiURLSecurity : "http://security-manager.default.svc.cluster.local:9000/security-manager/v1",
  
  urlMetabase: 'http://metabase.default.svc.cluster.local:3000',
  urlSuperset: 'http://superset.default.svc.cluster.local:3000',
  urlJupiter: 'http://jupiter.default.svc.cluster.local:3000',

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