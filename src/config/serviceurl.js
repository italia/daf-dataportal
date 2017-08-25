export const serviceurl = {
  // DatasetBackend module configs
 // apiURLDatiGov: "http://localhost:9000", 
 // apiURLCatalog: "http://localhost:9001",
 // apiURLIngestion: "http://localhost:9002",
  apiURLDatiGov: "http://datipubblici.default.svc.cluster.local:9000", 
  apiURLCatalog: "http://catalog-manager.default.svc.cluster.local:9000",
  apiURLIngestion: "http://localhost:9002",
  apiURL_dati_gov: "/dati-gov/v1",
  apiURL_mock: "http://localhost:3000/mock/",
  "DatasetBackend": {
    "Search": {
      "host": "localhost",
      "port": 9000,
      "nameSearch": "/dati-gov/v1/ckan/searchDataset",
      "nameDetail": "/dati-gov/v1/ckan/datasets/"
    }
  }
}