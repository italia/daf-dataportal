export function createOperational (values, data) {
  var operational = 'operational'
  data[operational] = {}
  data[operational]['uri'] = values.uri
  data[operational]['group_own'] = values.ownership
  data[operational]['is_std'] = (values.is_std === 'true')
  if (!values.is_std){
    data[operational]['is_std'] = false
  }
  var std_schema = 'std_schema'
  data[operational][std_schema] = {}
  data[operational][std_schema]['std_uri'] = values.uri_associato
  data[operational]['read_type'] = values.read_type
  if (!values.read_type){
      data[operational]['read_type'] = 'update'
  }
  data[operational]['push'] = values.pushOrPull
  data[operational]['ftporws'] = values.ftporws
  data[operational]['connection'] = values.dest_uri
  return data
}

export function createDcat (values, data) {
  var dcatapit = 'dcatapit'
  data[dcatapit] = {}
  data[dcatapit]['name'] = values.title
  data[dcatapit]['title'] = values.title
  data[dcatapit]['identifier'] = values.title //values.identifier
  data[dcatapit]['alternate_identifier'] = values.title //values.identifier
  data[dcatapit]['notes'] = values.notes
  data[dcatapit]['theme'] =  (values.theme) ? values.theme  : 'ECON'
  data[dcatapit]['publisher_name'] = values.ownership //values.publisher_editor
  data[dcatapit]['publisher_editor'] = values.ownership //values.publisher_editor
  data[dcatapit]['publisher_identifier'] = values.ownership //values.publisher_editor
  data[dcatapit]['modified'] = '2017-07-23' //values.creation_date
  data[dcatapit]['holder_name'] = values.ownership  //values.holder_name
  data[dcatapit]['holder_identifier'] = values.ownership  //values.holder_identifier
  data[dcatapit]['license_title'] = 'Altro (Non Commerciale)' //values.license_title
  data[dcatapit]['license_id'] = 'other-nc'//values.license_identifier
  data[dcatapit]['owner_org'] = values.ownership //values.owner_org
  data[dcatapit]['frequency'] = 'unknown'//Not in form
  data[dcatapit]['creation_date'] = '2017-07-23' //Not in form
  data[dcatapit]["groups"] = []
  data[dcatapit]["resources"] = []
  data[dcatapit]["relationships_as_object"] = []
  data[dcatapit]["relationships_as_subject"] = []
  data[dcatapit]["tags"] = []
  return data
}

export function createDataschema (values, data) {
  var dataschema = 'dataschema'
  var avro = 'avro'
  var flatSchema = 'flatSchema'
  var theme = (values.theme) ? values.theme  : 'ECON'
  data[dataschema] = {}
  data[dataschema][avro] = {}
  data[dataschema][avro]['namespace'] = 'daf://'+ values.ownership  + '/' + theme +'/' + values.title
  data[dataschema][avro]['name'] = values.title
  data[dataschema][avro]['aliases'] = values.title
  data[dataschema][avro]['fields'] =  []
  data[dataschema][avro]["`type`"] = "record"
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
    }
    var obj = {'name' : name, "`type`" : tipo}
    var metadata = { "desc": "", "required": 0, "field_type": "","cat": "","tag": "","constr": [{"`type`": "","param": ""}],"semantics": {"id": "","context": ""}}
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

