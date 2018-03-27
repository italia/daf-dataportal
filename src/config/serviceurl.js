export const serviceurl = {
  // Lucal
/*   apiURLSSOManager: "http://10.100.208.161:9002/sso-manager",
  apiURLDatiGov: "http://10.100.208.161:9000/dati-gov/v1",
  apiURLCatalog: "http://10.100.208.161:9001/catalog-manager/v1",
  apiURLIngestion: "http://10.100.208.161:9002/ingestion-manager/v1",
  apiURLSecurity: "http://10.100.208.161:9002/security-manager/v1", */

  
  //MOCK
/*   apiURLDatiGov: "http://localhost:3001/dati-gov/v1", 
  apiURLCatalog: "http://localhost:3001/catalog-manager/v1",
  apiURLIngestion: "http://localhost:3001/ingestion-manager/v1",
  apiURLSecurity: "http://localhost:3001/catalog-manager/v1",
  apiURLSSOManager: "http://localhost:3001/sso-manager/v1", 
*/
  // INTERNAL
 //apiURLSSOManager: "http://security-manager.default.svc.cluster.local:9000/sso-manager",
 //apiURLDatiGov: "http://datipubblici.default.svc.cluster.local:9000/dati-gov/v1", 
 //apiURLCatalog: "http://catalog-manager.default.svc.cluster.local:9000/catalog-manager/v1",
 //apiURLSecurity : "http://security-manager.default.svc.cluster.local:9000/security-manager/v1", 
 //apiURLDataset : "http://storage-manager.default.svc.cluster.local:9000/dataset-manager/v1",
  
 // EXTERNAL
 apiURLSSOManager: "https://api.daf.teamdigitale.it/sso-manager",
 apiURLDatiGov: "https://api.daf.teamdigitale.it/dati-gov/v1", 
 apiURLCatalog: "https://api.daf.teamdigitale.it/catalog-manager/v1",
 apiURLSecurity : "https://api.daf.teamdigitale.it/security-manager/v1",
 apiURLDataset : "https://api.daf.teamdigitale.it/dataset-manager/v1",

/*  apiURLSSOManager: "https://security-manager.daf.teamdigitale.it/sso-manager",
 apiURLDatiGov: "https://datipubblici.daf.teamdigitale.it/dati-gov/v1",
 apiURLCatalog: "https://catalog-manager.daf.teamdigitale.it/catalog-manager/v1",
 apiURLSecurity : "https://security-manager.daf.teamdigitale.it/security-manager/v1",
 apiURLDataset : "https://dataset-manager.daf.teamdigitale.it/dataset-manager/v1",   */

 urlMetabase: 'https://graph.daf.teamdigitale.it',
 urlSuperset: 'https://bi.daf.teamdigitale.it',
 urlJupiter: 'https://datascience.daf.teamdigitale.it',

 // TEST
 //apiURLSSOManager: "http://datipubblici-private.integrazione.daf:9002/sso-manager",
 //apiURLDatiGov: "http://datipubblici-private.integrazione.daf:9000/dati-gov/v1", 
 //apiURLCatalog: "http://datipubblici-private.integrazione.daf:9001/catalog-manager/v1",
 //apiURLIngestion: "http://service:9002/ingestion-manager/v1",
 //apiURLSecurity: "http://datipubblici-private.integrazione.daf9002/security-manager/v1",

 //LUCAL
/*   apiURLSSOManager: "http://10.100.208.161:9002/sso-manager",
  apiURLDatiGov: "http://10.100.208.161:9000/dati-gov/v1",
  apiURLCatalog: "http://10.100.208.161:9001/catalog-manager/v1",
  apiURLSecurity: "http://10.100.208.161:9002/security-manager/v1", */


/*  urlMetabase: 'http://metabase.integrazione.daf',
 urlSuperset: 'http://superset.integrazione.daf',
 urlJupiter: 'http://datascience.daf.teamdigitale.governo.it', */

 // URL ONTONETHUB
 //urlSemantic: "https://api.daf.teamdigitale.it/stanbol/ontonethub/ontologies/find",
 urlSemantic: "http://localhost:8000/stanbol/ontonethub/ontologies/find",
 
 // URL CNR
 //urlSemantic: 'http://stlab.istc.cnr.it/ontonethub/api/find',

 domain: ".daf.teamdigitale.it"
 /* domain: ".integrazione.daf", */
}