import { getKyloSchema, getCurrentDate } from '../utility'
import { serviceurl } from '../config/serviceurl';

export function createOperational (values, data) {
  var user = localStorage.getItem('user').toLowerCase()
  var operational = 'operational'
  data[operational] = {}
  data[operational]['group_own'] = values.gruppoproprietario
  data[operational]['acl'] = []
  data[operational]['theme'] = values.categoria
  data[operational]['subtheme'] = values.sottocategoria
  data[operational]['file_type'] = values.tipofile
  data[operational]['dataset_proc'] = { 
     "merge_strategy" : values.strategiamerge,
     "scheduling_strategy" :  values.tempopolling==0?"CRON_DRIVEN":"TIMER_DRIVEN",
     "cron" : values.tempopolling==0?values.espressionecron:(values.timerquantita + ' ' + values.timerunita),
     "dataset_type" : "batch",  
     "read_type" : (values.tiposalvataggio) ? values.tiposalvataggio : 'update'
    }
  data[operational]['type_info'] = {
    'dataset_type' : values.tipodataset,
    'query_json': values.query_json?JSON.stringify(values.query_json):undefined,
    'query_sql': values.query_sql?values.query_sql:undefined,
    'sources' : values.sources
  }
  if (!values.tiposalvataggio){
      data[operational]['read_type'] = 'update'
  } else {
      data[operational]['read_type'] = values.tiposalvataggio
  }
  if(values.modalitacaricamento=='sftp'){
    var param = "format=".concat(values.tipofile?values.tipofile:'csv')
    var url = "".concat(values.categoria).concat("/").concat(values.sottocategoria).concat("/").concat(values.nome)
    data[operational]['input_src'] = {"sftp": [{
        "name": "sftp_local",
        "url": url,
        "username": user,
        "param": param
      }]
    }
  }else if(values.modalitacaricamento=='webservice_pull'){
      data[operational]['input_src'] = {"srv_pull": [{
        "name": "ws_remote",
        "url": values.urlws,
        "username": "test",
        "password": "test",
        "param": values.tipofile?values.tipofile:'csv'
      }]
    }
  }else if(values.modalitacaricamento=='webservice_push'){
    var url = serviceurl.apiURLHdfs+"/uploads/".concat(user.concat("/").concat(values.categoria).concat("/").concat(values.sottocategoria).concat("/").concat(values.nome).concat("/"))
    data[operational]['input_src'] = {"srv_push": [{
      "name": "ws_hdfs",
      "access_token": null,
      "username": user,
      "url": url,
      "param": values.tipofile?values.tipofile:'csv',
      "password": "xxxxxxx"
    }]
  }
}else{
  data[operational]['input_src'] = { }
}
  data[operational]['storage_info'] = 
    {
			"hdfs": {
        "name": "hdfs_daf",
        "path" : null,
        "param" : null
			}
    }
  data[operational]['dataset_type'] = (values.tipoingestiondati) ? values.tipoingestiondati  : 'batch'
  data[operational]['is_vocabulary'] = (values.isvocabulary === 'yes')?true:false
  
  data[operational]['is_std'] = (values.seguestd === 'isstandard')?true:false
  if(values.seguestd === 'seguestandard'){
    data[operational]['std_schema'] = {}
    data[operational]['std_schema']['std_uri'] = values.datasetstd
  }

  if(values.sorgenti && values.sorgenti.length>0){
    for(var i=0;i<values.sorgenti.length;i++){
      let sorgente =  values.sorgenti[i]
      if(sorgente.type==='sftp'){
        data[operational]['input_src']['sftp'] = []
        data[operational]['input_src']['sftp'].push(sorgente)
      } else if(sorgente.type==='srvPull'){
        data[operational]['input_src']['srv_pull'] = []
        data[operational]['input_src']['srv_pull'].push(sorgente)
      } else if(sorgente.type==='srvPush'){
        data[operational]['input_src']['srv_push'] = []
        data[operational]['input_src']['srv_push'].push(sorgente)
      }
    }
  }

  if(values.pipelines && values.pipelines.length>0){
    for(var i=0;i<values.pipelines.length;i++){
      let pipeline = values.pipelines[i]
      data[operational]['ingestion_pipeline'] = []
      data[operational]['ingestion_pipeline'].push(pipeline)
    }
  }

  return data
}


export function createDcat (values, data) {
  var dcatapit = 'dcatapit'
  var user = localStorage.getItem('user').toLowerCase()
  var currentDate = getCurrentDate()
  var tags =  ((values.tag === '' || values.tag === undefined )  ? [] : values.tag.split(','))
  data[dcatapit] = {}
  data[dcatapit]['privatex'] = true
  data[dcatapit]['name'] = values.nome
  data[dcatapit]['title'] = values.titolo
  data[dcatapit]['author'] = user
  data[dcatapit]['identifier'] = values.nome 
  data[dcatapit]['alternate_identifier'] = values.nome
  data[dcatapit]['notes'] = values.descrizione
  data[dcatapit]['theme'] =  values.categoria
  //data[dcatapit]['subtheme'] =  values.sottocategoria
  data[dcatapit]['publisher_name'] = values.gruppoproprietario
  //data[dcatapit]['publisher_editor'] = values.gruppoproprietario
  data[dcatapit]['publisher_identifier'] = values.gruppoproprietario
  data[dcatapit]['modified'] = currentDate
  data[dcatapit]['holder_name'] =values.gruppoproprietario
  data[dcatapit]['holder_identifier'] = values.gruppoproprietario
  //data[dcatapit]['license_title'] = values.licenza 
  data[dcatapit]['license_id'] = values.licenza
  data[dcatapit]['organization'] = {'name': values.gruppoproprietario }
  data[dcatapit]['owner_org'] = values.gruppoproprietario
  data[dcatapit]['frequency'] = values.frequenzaaggiornamento
  //data[dcatapit]['creation_date'] = currentDate
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
  data[dataschema][avro]['namespace'] = 'daf://'+ values.gruppoproprietario  + '/' + theme +'/' + values.titolo
  data[dataschema][avro]['separator'] = values.separator
  data[dataschema][avro]['name'] = values.titolo
  data[dataschema][avro]['aliases'] = [values.titolo]
  data[dataschema][avro]['fields'] =  []
  data[dataschema][avro]["`type`"] = "record"
  data[dataschema][avro]['property_hierarchy'] = values.treedata
  data[dataschema][kyloSchema] = getKyloSchema(localStorage.getItem('kyloSchema') ? JSON.parse(localStorage.getItem('kyloSchema')) : '', values)
  data[dataschema][flatSchema] = []
  values['inferred'].map(function(item){
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
    var metadata = {//INFORMAZIONI PRINCIPALI
                    "type": item.tipo,
                    "title": item.nomehr,
                    "desc": item.desc,
                    "tag": item.tag?item.tag:[],

                    //FORMATO E CONVENZIONI
                    "field_type": item.tipoinformazione,
                    "format_std":{
                        "name": item.standardformat,
                        "param":undefined
                    },

                    //SEMANTICA E ONTOLOGIE
                    "semantics": {
                        "id": item.concetto,
                        "context": item.contesto,
                        "field_group": item.idgruppocampi,
                        "subject": item.rdfsoggetto,
                        "predicate": item.rdfpredicato,
                        "rdf_object": item.rdfcomplemento,
                        "uri_voc": item.vocabolariocontrollato,
                        "uri_property": item.campovocabolariocontrollato
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
