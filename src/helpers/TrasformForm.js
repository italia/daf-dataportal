import { getKyloSchema, getCurrentDate } from '../utility'
import { serviceurl } from '../config/serviceurl';

export function createOperational (values, data) {
  var user = localStorage.getItem('user').toLowerCase()
  var operational = 'operational'
  data[operational] = {}
  data[operational]['group_own'] = user
  data[operational]['acl'] = []
  data[operational]['theme'] = values.categoria
  data[operational]['subtheme'] = values.sottocategoria
  data[operational]['read_type'] = values.read_type
  data[operational]['file_type'] = values.filetype
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
    var url = "".concat(values.domain).concat("/").concat(values.subdomain).concat("/").concat(values.nome)
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
        "param": values.filetype?values.filetype:'csv'
      }]
    }
  }
  if(values.modalitacaricamento==3){
    var url = serviceurl.apiURLHdfs+"/uploads/".concat(localStorage.getItem('user').toLowerCase()).concat("/").concat(values.domain).concat("/").concat(values.subdomain).concat("/").concat(values.nome).concat("/")
    data[operational][input_src] = {"srv_push": [{
      "name": "ws_hdfs",
      "access_token": null,
      "username": localStorage.getItem('user').toLowerCase(),
      "url": url,
      "param": values.filetype?values.filetype:'csv',
      "password": "xxxxxxx"
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
  return data
}


export function createDcat (values, data) {
  var dcatapit = 'dcatapit'
  var user = localStorage.getItem('user').toLowerCase()
  var currentDate = getCurrentDate()
  var tags =  ((item.tag === '' || item.tag === undefined )  ? [] : item.tag.split(','))
  data[dcatapit] = {}
  data[dcatapit]['privatex'] = true
  data[dcatapit]['name'] = values.nome
  data[dcatapit]['title'] = values.titolo
  data[dcatapit]['author'] = user
  data[dcatapit]['identifier'] = values.nome 
  data[dcatapit]['alternate_identifier'] = values.nome
  data[dcatapit]['notes'] = values.descrizione
  data[dcatapit]['theme'] =  values.categoria
  data[dcatapit]['publisher_name'] = values.gruppoproprietario
  data[dcatapit]['publisher_editor'] = values.gruppoproprietario
  data[dcatapit]['publisher_identifier'] = values.gruppoproprietario
  data[dcatapit]['modified'] = currentDate
  data[dcatapit]['holder_name'] =values.gruppoproprietario
  data[dcatapit]['holder_identifier'] = values.gruppoproprietario
  data[dcatapit]['license_title'] = values.licenza 
  data[dcatapit]['license_id'] = values.licenza
  data[dcatapit]['organization'] = values.gruppoproprietario
  data[dcatapit]['owner_org'] = values.gruppoproprietario
  data[dcatapit]['frequency'] = values.frequenzaaggiornamento
  data[dcatapit]['creation_date'] = currentDate
  data[dcatapit]["groups"] = []
  data[dcatapit]["resources"] = []
  data[dcatapit]["relationships_as_object"] = []
  data[dcatapit]["relationships_as_subject"] = []
  data[dcatapit]["tags"] = tags
  return data
}

export function createDataschema (values, data) {
  var dataschema = 'dataschema'
  var avro = 'avro'
  var kyloSchema= 'kyloSchema'
  var flatSchema = 'flatSchema'
  var theme = values.categoria
  data[dataschema] = {}
  data[dataschema][avro] = {}
  data[dataschema][avro]['namespace'] = 'daf://'+ values.gruppoproprietario  + '/' + theme +'/' + values.title
  data[dataschema][avro]['separator'] = values.separator
  data[dataschema][avro]['name'] = values.titolo
  data[dataschema][avro]['aliases'] = [values.titolo]
  data[dataschema][avro]['fields'] =  []
  data[dataschema][avro]["`type`"] = "record"
  data[dataschema][avro]["property_hierarchy"] = item.treedata
  data[dataschema][kyloSchema] = getKyloSchema(localStorage.getItem('kyloSchema') ? JSON.parse(localStorage.getItem('kyloSchema')) : '', values)
  data[dataschema][flatSchema] = []
  values.tests.map(function(item){
    if(item.nome !== 'file'){
    var name = item.nome
    var tipo = item.tipo 
    if (Array.isArray( item.tipo)){
      if(item.tipo.indexOf("string") == 1){
        tipo = 'string'
      } else {
        tipo = tipo[0]
      }
    }else if(item.tipo instanceof Object){
      tipo = JSON.stringify(item.tipo);
    }
    var obj = {'name' : name, "`type`" : tipo}
    var tag =  ((item.tag === '' || item.tag === undefined )  ? [] : item.tag.split(','))
    var metadata = {//INFORMAZIONI PRINCIPALI
                    "type": item.tipo,
                    "title": item.nomehr,
                    "desc": item.desc,
                    "tag": tag,

                    //FORMATO E CONVENZIONI
                    "field_type": item.tipoinformazione,
                    "format_std":{
                        "name": item.standardformat,
                        "param":undefined
                    },
                    "uri_voc": item.vocabolariocontrollato,
                    "uri_property": item.campovocabolariocontrollato,

                    //SEMANTICA E ONTOLOGIE
                    "semantics": {
                        "id": item.concetto,
                        "context": item.contesto,
                        "field_group": item.idgruppocampi,
                        "subject": item.rdfsoggetto,
                        "predicate": item.rdfpredicato,
                        "rdf_object": item.rdfcomplemento
                    },
                    //INFORMAZIONI OPERAZIONALI
                    "key": item.chiave,
                    "required": item.obbligatorio,
                    "is_createdate": item.datacreazione,
                    "is_updatedate": item.dataaggiornamento,
                    "field_profile": {
                        "is_index": item.indicizzare,
                        "is_profile": item.profiloindicizzazione
                    },
                    //DATI PERSONALI
                    "personal": {
                        "is_personal": item.datipersonali,
                        "cat":undefined,
                        "processing": item.tipomascheramento,
                        "is_analysis": item.disponibileanalisi
                    }
        
    }
    var convArray = []
    if(item.conv && item.conv.length>0){
        for(var i; i<item.conv.length; i++){
            var conv = item.conv[i]
            convArray.push({"key":conv.tipo,"value":conv.val})
        }
    }
    metadata["format_std"]["conv"] = convArray
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
