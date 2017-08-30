export const serviceurl = {
  // DatasetBackend module configs
 // apiURLDatiGov: "http://localhost:9000", 
 // apiURLCatalog: "http://localhost:9001",
 // apiURLIngestion: "http://localhost:9002",
  apiURLDatiGov: "http://datipubblici.default.svc.cluster.local:9000", 
  apiURLCatalog: "http://catalog-manager.default.svc.cluster.local:9000",
  apiURLIngestion: "http://localhost:9002",
  apiURL_dati_gov: "/dati-gov/v1",
 // apiURL_mock: "http://localhost:3000/mock/",
  apiURL_mock: "http://data-portal.default.svc.cluster.local:5000/",
  "DatasetBackend": {
    "Search": {
   //   "host": "localhost",
   //   "port": 9000,
      "host": "catalog-manager.default.svc.cluster.local",
      "port": 9000,
      "nameSearch": "/catalog-manager/v1/ckan/searchDataset",
      "nameDetail": "/catalog-manager/v1/ckan/datasets/"
    }
  }
}