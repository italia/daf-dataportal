import $ from 'jquery';
import { serviceurl } from '../../config/serviceurl.js'

export {getJsonCatalog, getJsonDataschema, sendPostDataMeta}

function getJsonCatalog(){
  var json = {}
  json['dcatapit'] = getJsonDcatap()
  json['dataschema'] = getJsonDataschema()
  json['operational'] = getJsonOperational()
  sendPostData(json)
  console.log(json)
  console.log(JSON.stringify(json))
  return json
}

function sendPostDataMeta(json, file) {
    $.ajax({
    type: "POST",
    url: serviceurl.apiURLCatalog + "/catalog-ds/add",
    dataType: 'json',
    data: JSON.stringify(json),
    contentType: 'application/json',
    headers: {
        authorization: 'Basic ' + btoa("ckanadmin:ckanadmin")   //If your header name has spaces or any other char not appropriate
    },
    success: function( data ) {
      console.log(data)
      alert('ok')
      if (file){
      var formData = new FormData();
      formData.append("upfile", file, "agency.txt")
    //  $.ajax({
    //      type: "POST",
    //      url: "http://localhost:9001/ingestion-manager/v1/add-datasets/" + encodeURIComponent(data.message),
    //      data: formData,
    //      processData: false,
    //      contentType: false,
    //      mimeType: "multipart/form-data",
    //      success: function( result ) {
    //        console.log(result)
    //        alert('second ok')
    //      },
    //      error: function (e) {
    //        console.log(e)
    //      }
    //    });
      }
    }
    })

}


function sendPostData(json) {
  var file = document.getElementById('ds_datafile').files[0];
  $.ajax({
    type: "POST",
    url: serviceurl.apiURLCatalog + "/catalog-ds/add",
    dataType: 'json',
    data: JSON.stringify(json),
    contentType: "application/json",
    success: function( data ) {
      console.log(data)
      alert('ok')
      if (file){
      var formData = new FormData();
      formData.append("upfile", file, "agency.txt")
      $.ajax({
          type: "POST",
          url: serviceurl.apiURLIngestion + "/add-datasets/" + encodeURIComponent(data.message),
          data: formData,
          processData: false,
          contentType: false,
          mimeType: "multipart/form-data",
          success: function( result ) {
            console.log(result)
            alert('second ok')
          },
          error: function (e) {
            console.log(e)
          }
        });
      }
    }
    })

//  return json
}

function getJsonDcatap(){
  //Get Title (can be many)
  var dcat_title_n = document.querySelectorAll('[id^="dct_title_"]')
  //Get Description (can be many)
  var dcat_desc_n = document.querySelectorAll('[id^="dct_description_"]')
  //Get Theme (Needs to be one)
  var dcat_theme = document.querySelector('[id="dcat_theme"]')
  //Get Categories (can be many)
  var dcat_subject_n = document.querySelectorAll('[id^="dct_subject"]')
  //Get Keywords/Tags
  var dcat_keyword = document.querySelector('[id="dct_keyword"]')
  //Get Ownership (can be many)
  var dcat_rightsHolder_n = document.querySelectorAll('[id^="dct_rightsHolder"]')
  //Get Periodicity
  var dcat_accrualPeriodicity = document.querySelector('[id="dct_accrualPeriodicity"]')
  //Get Language
  var dcat_language = document.querySelector('[id="dct_language"]')
  //Get Landing Page
  var dcat_landingPage= document.querySelector('[id="dcat_landingPage"]')

  var json = {}
  json['dct_title'] = getMultiElement(dcat_title_n)
  json['dct_description'] = getMultiElement(dcat_desc_n)
  json['dct_theme'] = getThemeCatObj(dcat_theme.value)
  json['dct_subject'] = [getThemeCatObj(dcat_subject_n[0].value)]
  json['dct_keyword'] = dcat_keyword.value
  json['dct_rightsHolder'] = getMultiElement(dcat_rightsHolder_n)
  json['dct_accrualPeriodicity'] = dcat_accrualPeriodicity.value
  json['dct_language'] = dcat_language.value
  json['dcat_landingPage'] = dcat_landingPage.value
  //alert(JSON.stringify(json) + " - i")
  return json
}

function getJsonDataschema(){

  //var namespace = document.querySelector('[id="ds_namespace"]')
  //var name = document.querySelector('[id="ds_name"]')
  // var aliases = document.querySelector('[id="ds_aliases"]')
  var fields_name = document.querySelectorAll('[id^="ds_fields-name"]')
  var fields_type = document.querySelectorAll('[id^="ds_fields-type"]')
  var fields_metadata_desc = document.querySelectorAll('[id^="ds_fields-metadata_desc"]')
  var fields_metadata_required = document.querySelectorAll('[id^="ds_fields-metadata_required"]')
  var fields_metadata_fieldtype = document.querySelectorAll('[id^="ds_fields-metadata_fieldtype"]')
  var fields_metadata_cat = document.querySelectorAll('[id^="ds_fields-metadata_cat"]')
  var fields_metadata_tag = document.querySelectorAll('[id^="ds_fields-metadata_tag"]')
  var fields_metadata_semsubj = document.querySelectorAll('[id^="ds_fields-metadata_sem-subj"]')
  var fields_metadata_semcontext = document.querySelectorAll('[id^="ds_fields-metadata_sem-context"]')
  var fields_metadata_constr = document.querySelectorAll('[id^="ds_fields-metadata_constr"]')
  var fields_metadata_constr_val = document.querySelectorAll('[id^="ds_fields-metadata_constr_val"]')

  var fieldsList = []

  for (var i=0; i<fields_name.length; i++) {
    var field = {}
    field['name'] = fields_name[i].value
    field['`type`'] = fields_type[i].value

    var metadata = {}
    metadata['desc'] = fields_metadata_desc[i].value
    metadata['required'] = parseInt(fields_metadata_required[i].value)
    metadata['field_type'] = fields_metadata_fieldtype[i].value
    metadata['cat'] = fields_metadata_cat[i].value
    metadata['tag'] = fields_metadata_tag[i].value
    metadata['constr'] = [{'`type`': fields_metadata_constr[i].value, param: fields_metadata_constr_val[i].value}]
    metadata['semantics'] = {'id': fields_metadata_semsubj[i].value, 'context': fields_metadata_semcontext[i].value}

    field['metadata'] = metadata
    fieldsList.push(field)
  }

  var json = {}

  if (fieldsList.length !== 0){
    var avroGenerated = JSON.parse($('#avro_schema_datafile').val())
    var avroFields = getAvroFields(avroGenerated, fieldsList)
  }

  json['avro'] = {
    //namespace: namespace.value,
    //name: name.value,
    //aliases: aliases.value,
  //  ['type']: "record",
    fields: avroFields
  }
  json['avro']['`type`'] = "record"
  json['flatSchema'] = fieldsList

  /*
  json['namespace'] = namespace.value
  json['name'] = name.value
  json['aliases'] = aliases.value
  json['fields'] = fieldsList
*/
  //alert(JSON.stringify(json) + " - i")
  return json

}

function getAvroFields(avro, flatSchema){
  var avroFields = []

  if(avro!=''){
    if(avro.type === "record"){
      avroFields = avro.fields.map(function(item){
        item['`type`'] = item['type'];
        delete item['type'];
        return item
      })
    } else if(avro.type === "array"){
      avroFields = avro.items.fields.map(function(item){
        item['`type`'] = item['type'];
        delete item['type'];
        return item
      })
    }
  } else {
    for (var field of flatSchema){
      avroFields.push({name: field.name, '`type`': field.type})
    }
  }
  return avroFields
}

function getJsonOperational(){

  var ops_uri = document.querySelector('[id="ops_uri"]')
  var ops_group_own = document.querySelector('[id="ops_group_own"]')
  var ops_is_std = document.querySelector('[id="ops_is_std"]')
  var ops_std_uri = document.querySelector('[id="ops_std_uri"]')
  var ops_read_type = document.querySelector('[id="ops_read_type"]')
  var ops_georef_lat_list = document.querySelectorAll('[id^="ops_georef_lat"]')
  var ops_georef_lon_list = document.querySelectorAll('[id^="ops_georef_lon"]')

  var georef = []
  for (var i=0; i<ops_georef_lon_list.list; i++){
    var georefObj = {lat: ops_georef_lat_list[i].value, lon: ops_georef_lon_list[i].value}
    georef.push(georefObj)
  }

  var json = {}
  json['uri'] = ops_uri.value
  json['group_own'] = ops_group_own.value
  json['is_std'] = ops_is_std.value > 0 ? true : false

  var std_schema = {}
  if (ops_std_uri.value !== ''){
    std_schema['std_uri'] = ops_std_uri.value
    json['std_schema'] = std_schema
  }

  json['read_type'] = ops_read_type.value
  json['georef'] = georef
  json['input_src'] = {
    url: "file_url"
  }
  //alert(JSON.stringify(json) + " - i")
  return json
}

function getMultiElement(elements) {
  var json = {}
  for (var elem of elements) {
    const idParts = elem.id.split("_")
    const idValue = idParts[(idParts.length - 1)]
    json[idValue] = elem.value
  }
  return json
}
//Temporary Workaround
function getThemeCatObj(element){
  return {
    id: element,
    value: element,
    it: element
  }
}
