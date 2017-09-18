export const serviceurl = {
  // DatasetBackend module configs
<<<<<<< HEAD
  /*apiURLDatiGov: "http://localhost:9000/dati-gov/v1", 
  apiURLCatalog: "http://localhost:9001/catalog-manager/v1",
  apiURLIngestion: "http://localhost:9002/ingestion-manager/v1",
  apiURLSecurity: "http://localhost:9001/catalog-manager/v1",
  */
  //MOCK
  /*apiURLDatiGov: "http://localhost:3001/dati-gov/v1", 
  apiURLCatalog: "http://localhost:3001/catalog-manager/v1",
  apiURLIngestion: "http://localhost:3001",
  apiURLSecurity: "http://localhost:3001/catalog-manager/v1",
*/
=======
  //apiURLDatiGov: "http://localhost:9000/dati-gov/v1", 
  //apiURLCatalog: "http://localhost:9001/catalog-manager/v1",
  //apiURLIngestion: "http://localhost:9002/ingestion-manager/v1",
  //apiURLSecurity: "http://localhost:9001/catalog-manager/v1",
  
  //MOCK

  //apiURLDatiGov: "http://localhost:3000/mock", 
  //apiURLCatalog: "http://localhost:9001",
  //apiURLIngestion: "http://localhost:9002",

>>>>>>> cc7ef70917692070fd9f5196245f0f5ecf63ab44
  // PRODUCTION
  apiURLDatiGov: "http://datipubblici.default.svc.cluster.local:9000/dati-gov/v1", 
  apiURLCatalog: "http://catalog-manager.default.svc.cluster.local:9000/catalog-manager/v1",
  apiURLIngestion: "http://localhost:9002",
  apiURLSecurity : "http://catalog-manager.default.svc.cluster.local:9000/catalog-manager/v1",
<<<<<<< HEAD
=======

>>>>>>> cc7ef70917692070fd9f5196245f0f5ecf63ab44
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