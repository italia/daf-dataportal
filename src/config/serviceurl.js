let backendDomain
const hostname = window && window.location && window.location.hostname

if(hostname.indexOf('.test')>-1){
    backendDomain = '.test'
}else if(hostname.indexOf('.it')>-1){
    backendDomain  = '.it'
}

export const serviceurl = {

    apiURLSSOManager: `https://api.daf.teamdigitale${backendDomain}/sso-manager`,
    urlApiOpen: `https://api.daf.teamdigitale${backendDomain}/sso-manager`,
    apiURLDatiGov: `https://api.daf.teamdigitale${backendDomain}/dati-gov/v1`,
    apiURLCatalog: `https://api.daf.teamdigitale${backendDomain}/catalog-manager/v1`,
    apiURLSecurity : `https://api.daf.teamdigitale${backendDomain}/security-manager/v1`,
    apiURLDataset : `https://api.daf.teamdigitale${backendDomain}/dataset-manager/v1`,
    apiURLHdfs: `https://api.daf.teamdigitale${backendDomain}/hdfs/proxy`,
    apiURLConfigurator: `https://api.daf.teamdigitale${backendDomain}/daf-configurator/v2`,
    apiCKAN: `https://api.daf.teamdigitale${backendDomain}/dati-gov/ckan_proxy`,
    apiMedium: `https://api.daf.teamdigitale${backendDomain}/dati-gov/medium`,
    urlSemantic: `https://api.daf.teamdigitale${backendDomain}/stanbol/ontonethub/ontologies/find`,
    urlMetabase: `https://graph.daf.teamdigitale${backendDomain}`,
    urlSuperset: `https://bi.dataportal.daf.teamdigitale${backendDomain}`,
    urlSupersetOpen: `https://bi.open.daf.teamdigitale${backendDomain}`,
    urlJupiter: `https://datascience.daf.teamdigitale${backendDomain}`,
    urlCkan: `https://ckan-geo.daf.teamdigitale${backendDomain}/dataset/`,
    domain: `.daf.teamdigitale${backendDomain}`,
    urlKatalod: "https://api.daf.teamdigitale.it/daf-semantic-katalod/kb/api/v1",
    urlSemanticValidator: "https://api.daf.teamdigitale.it/daf-semantic-validator/validator",
    vocabularyName: "dafvoc-ingestionform-option",
    urlCacher: "https://static.daf.teamdigitale.it/swift/v1/dafstatic/"
  }

