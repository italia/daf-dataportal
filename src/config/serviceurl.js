export const serviceurl = {
  // DatasetBackend module configs
  apiURLDatiGov: "http://localhost:9000/dati-gov/v1", 
  apiURLCatalog: "http://localhost:9001",
  apiURLIngestion: "http://localhost:9002",
  apiURLSecurity: "http://localhost:9001/catalog-manager/v1",
  
  //MOCK
  //apiURLDatiGov: "http://localhost:3000/mock", 
  //apiURLCatalog: "http://localhost:9001",
  //apiURLIngestion: "http://localhost:9002",
  //apiURLSecurity: "http://localhost:3000/mock",

  // PRODUCTION
  //apiURLDatiGov: "http://datipubblici.default.svc.cluster.local:9000", 
  //apiURLCatalog: "http://catalog-manager.default.svc.cluster.local:9000",
  //apiURLIngestion: "http://localhost:9002",
  //apiURLSecurity : "http://catalog-manager.default.svc.cluster.local:9000",
  
  
 "DatasetBackend": {
    "Search": {
      "host": "catalog-manager.default.svc.cluster.local",
      "port": 9000,
      "nameSearch": "/catalog-manager/v1/ckan/searchDataset",
      "nameDetail": "/catalog-manager/v1/ckan/datasets/"
    }
  }
}