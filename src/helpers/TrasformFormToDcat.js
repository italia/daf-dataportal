import { getKyloSchema, getCurrentDate } from '../utility'

export function createOperational (values, data) {
  var operational = 'operational'
  data[operational] = {}
  data[operational]['group_own'] = localStorage.getItem('user').toLowerCase() //values.ownership
  data[operational]['theme'] = values.domain
  data[operational]['subtheme'] = values.subdomain
  data[operational]['read_type'] = values.read_type

//properties:
  data[operational]['dataset_proc'] = { 
     "merge_strategy" : values.merge_strategy,
     "cron" : values.cron,
     "dataset_type" : "batch",  
     "read_type" : (values.read_type) ? values.read_type : 'update'
    }
  if (!values.read_type){
      data[operational]['read_type'] = 'update'
  }
  var input_src = 'input_src'
  if(values.modalitacaricamento==1){
    var param = "format=".concat(values.filetype?values.filetype:'csv')
    var url = "/home/".concat(localStorage.getItem('user').toLowerCase()).concat("/").concat(values.domain).concat("/").concat(values.subdomain).concat("/").concat(values.nome)
    data[operational][input_src] = {"sftp": [{
        "name": "sftp_local",
        "url": url,
        "username": localStorage.getItem('user').toLowerCase(),
        "param": param
      }]
    }
  }
  if(values.modalitacaricamento==2){
      data[operational][input_src] = {"srv_pull": [{
        "name": "ws_remote",
        "url": values.ws_url,
        "username": "test",
        "password": "test",
        "param": ""
      }]
    }
  }
  data[operational]['storage_info'] = 
    {
			"hdfs": {
				"name": "hdfs_daf"
			}
    }

  data[operational]['logical_uri'] = "test1"  //values.uri
  data[operational]['dataset_type'] = (values.dataset_type) ? values.dataset_type  : 'batch'
  data[operational]['is_std'] = (values.is_std === 'true')
  //data[operational]['std_schema'] = null
  //if (data[operational]['is_std']){
  // var std_schema = 'std_schema'
  // data[operational][std_schema] = {}
  // data[operational][std_schema]['std_uri'] = values.uri_associato
  //}
  //data[operational]['push'] = values.pushOrPull
  //data[operational]['ftporws'] = values.ftporws
  //data[operational]['connection'] = values.dest_uri
  //var separator = values.separator
  /*
  if(values.sfpts){
    data[operational][input_src]['sftp'] = []
    values.sfpts.map(function(sto){
       data[operational][input_src]['sftp'].push(sto)
  })
  }
  if (values.wss){
    data[operational][input_src]['srv_pull'] = []
    data[operational][input_src]['srv_push'] = []
    values.wss.map((ws) => {
      console.log(ws)
      if(ws.push === 'false'){
        var objPull = {}
        objPull.name = ws.name
        objPull.url = ws.url
        objPull.username = ws.username
        objPull.password = ws.password
        data[operational][input_src]['srv_pull'].push(objPull)
      }
       if(ws.push === 'true'){
        var objPull = {}
        objPull.name = ws.name
        objPull.url = ws.url
        objPull.username = ws.username
        objPull.password = ws.password
        data[operational][input_src]['srv_pull'].push(objPull)
      }  
    })
  }
  if (values.dafs){
    data[operational][input_src]['dataset_uri'] = []
    values.dafs.map((daf) => {
    console.log(daf);
    var datasetUri = {}
    datasetUri['sql'] = daf.sql
    datasetUri['param'] = daf.param
    datasetUri['uris'] = daf.uris.map(uri =>  { return uri.dataset_uri})
    data[operational][input_src]['dataset_uri'].push(datasetUri)
    })
  }
  if (values.storages){
    data[operational]['storage_info'] = {}
    values.storages.map(storage => {
      const db = storage.db
      const storageObj = {name : storage.name, path : storage.path, param : storage.param}
      data[operational]['storage_info'][db] = storageObj
    })
  }
  if(values.accesses){
    data[operational]['group_access'] = []
    values.accesses.map((grs) => {
      var group = {}
      group['name'] = grs.name
      group['role'] = grs.role
      data[operational]['group_access'].push(group)
    })
  } */
  return data
}


export function createDcat (values, data) {
  var dcatapit = 'dcatapit'
  data[dcatapit] = {}
  data[dcatapit]['privatex'] = values.private==1?true:false
  data[dcatapit]['name'] = values.nome
  data[dcatapit]['title'] = values.title
  data[dcatapit]['author'] = localStorage.getItem('user').toLowerCase()
  data[dcatapit]['identifier'] = values.nome //values.identifier
  data[dcatapit]['alternate_identifier'] = values.nome //values.identifier
  data[dcatapit]['notes'] = values.notes
  data[dcatapit]['theme'] =  (values.theme) ? values.theme  : 'ECON'
  data[dcatapit]['publisher_name'] = values.ownership //values.publisher_editor
  data[dcatapit]['publisher_editor'] = values.ownership //values.publisher_editor
  data[dcatapit]['publisher_identifier'] = values.ownership //values.publisher_editor
  data[dcatapit]['modified'] = getCurrentDate() //values.creation_date
  data[dcatapit]['holder_name'] = values.ownership  //values.holder_name
  data[dcatapit]['holder_identifier'] = values.ownership  //values.holder_identifier
  data[dcatapit]['license_title'] = values.license1 //values.license_title
  data[dcatapit]['license_id'] = values.license1//values.license_identifier
  data[dcatapit]['organization'] = null // values.ownership
  data[dcatapit]['owner_org'] = values.ownership
  data[dcatapit]['frequency'] = 'unknown'//Not in form
  data[dcatapit]['creation_date'] = getCurrentDate() //Not in form
  data[dcatapit]["groups"] = []
  data[dcatapit]["resources"] = []
  data[dcatapit]["relationships_as_object"] = []
  data[dcatapit]["relationships_as_subject"] = []
  data[dcatapit]["tags"] = (values.theme) ? [{
    "name": values.theme,
    "state": "active",
    "vocabulary_id": null,
    "display_name": values.theme,
    "id": "f5feb374-3e24-417a-969e-17f00d7e6458"
  }]  : [{
    "name": "ECON",
    "state": "active",
    "vocabulary_id": null,
    "display_name": "ECON",
    "id": "f5feb374-3e24-417a-969e-17f00d7e6458"
  }]
  return data
}

export function createDataschema (values, data) {
  var dataschema = 'dataschema'
  var avro = 'avro'
  var kyloSchema= 'kyloSchema'
  var flatSchema = 'flatSchema'
  var theme = (values.theme) ? values.theme  : 'ECON'
  data[dataschema] = {}
  data[dataschema][avro] = {}
  data[dataschema][avro]['namespace'] = 'daf://'+ values.ownership  + '/' + theme +'/' + values.title
  data[dataschema][avro]['separator'] = values.separator
  data[dataschema][avro]['name'] = values.title
  data[dataschema][avro]['aliases'] = [values.title]
  data[dataschema][avro]['fields'] =  []
  data[dataschema][avro]["`type`"] = "record"
  data[dataschema][kyloSchema] = getKyloSchema(localStorage.getItem('kyloSchema') ? JSON.parse(localStorage.getItem('kyloSchema')) : '', values)
  data[dataschema][flatSchema] = []
  values.tests.map(function(item){
    if(item.nome !== 'file'){
    var name = item.nome
    var tipo = item.tipo 
    if (Array.isArray( item.tipo)){
      if( item.tipo.indexOf("string") == 1){
        tipo = 'string'
      } else {
        tipo = tipo[0]
      }
    }else if(item.tipo instanceof Object){
      tipo = JSON.stringify(item.tipo);
    }
    var obj = {'name' : name, "`type`" : tipo}
    var tag =  ((item.tag === '' || item.tag === undefined )  ? [] : item.tag.split(','))
    var metadata = {  "desc": item.desc, 
                      "required": 0, 
                      "field_type": "",
                      "cat": "",
                      "tag": tag,
                      "personal": {
                        "ispersonal" : (item.personale) ? item.personale : false
                        },
                      "cat": item.cat, 
                      "field_profile" : {
                        "index": item.field_profile_is_index, 
                        "profile": item.field_profile_is_profile, 
                        "validation": item.field_profile_validation, 
                        "standardization": item.field_profile_standardization
                      },
                      "format_std":{
                        "name": (item.format_std_name) ? item.format_std_name : "",
                        "param": item.format_std_param
                      },
                      "constr": [{"`type`": "","param": ""}],
                      "semantics": {
                        "id": (item.id_concetto) ? item.id_concetto : "",
                        "id_label": item.concetto, 
                        "context": item.contesto, 
                        "subject": item.subject, 
                        "predicate": item.predicate, 
                        "rdf_object": item.rdf_object
                      }
    }
    data[dataschema][avro]['fields'].push(obj)
    var flat = {'name' : name, "`type`" : tipo, 'metadata' : metadata }
    data[dataschema][flatSchema].push(flat)
    }
  })
  return data
}

export function createMetacatalog(values, data) {
    var metacatalog = createDcat(values, data)
    metacatalog = createDataschema(values, data)
    metacatalog = createOperational(values, data)
    return metacatalog
}