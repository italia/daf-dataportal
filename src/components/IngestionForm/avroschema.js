import $ from 'jquery';
import Papa from 'papaparse';

export {processInputFile, getFlatSchema}


const avro = require('avsc');

function finalizeOps(json){
  //this function is needed to start all operations after the schema is ready. Think of using callback function
  //console.log(json);
  //console.log(JSON.stringify(json));
  var avroSchema = getAvroSchema(json);
  $('#avroschema').html(JSON.stringify(avroSchema));
  $('#avro_schema_datafile').val(JSON.stringify(avroSchema));


  return getFlatSchema(avroSchema);
  //call the callback function
}


function getFlatSchema(json){
  var fieldList = {"names": [], "props": []};

  function recElem(fields, accObj){
    var rootName = accObj['fields'];
    for (var field of fields) {
      (accObj['fields']==="") ? accObj['fields'] = field['name'] : accObj['fields'] = rootName + ".|." + field['name'];

      if(typeof field['type'] == 'object'){
        if(field['type']['type']=='record'){
          recElem(field['type']['fields'], accObj);
          accObj['fields'] = rootName;
        } else {
          fieldList["names"].push(accObj['fields']);
          fieldList["props"].push({type: field['type']});
          accObj = {"fields": rootName};
        }

      } else {
        fieldList["names"].push(accObj['fields']);
        fieldList["props"].push({type: field['type']});
        accObj = {"fields": rootName};
      }

    }
  }

  var fields = {};
  if(json.type=="array") {
    fields = json.items.fields;
  } else {
    fields = json.fields;
  }
  //alert(JSON.stringify(json));
  recElem(fields, {"fields": ""});
  //alert(JSON.stringify(fieldList));
  //cicla sui fields iniziali
  return fieldList;

}

function getAvroSchema(json){
  //need to implement a iterative way to get the right schema by looking at multiple rows
  var csvInferred = avro.Type.forValue(json);
  var schema = csvInferred.schema();
  //console.log(schema);
  //console.log(JSON.stringify(schema));
  return schema;
}



function processInputFile(cb) {
  var file = document.getElementById('ds_datafile').files[0];

  var reader = new FileReader();
  reader.onload = function(e) {
    var text = reader.result;
    try {
      var json = JSON.parse(text);
      cb(finalizeOps(json));
      //alert(JSON.stringify(json));
    } catch (err) {
      //alert("no");
      //console.log(text);
      var objCsv = Papa.parse(text, { header: true, quoteChar: '"', dynamicTyping: true,
        error: function(error, file) {alert(error)},
        complete: function(results, file) {cb(finalizeOps(results.data))}
      });
    }

  }

  reader.readAsText(file);
}
/*
function flatSchema2Avro(schema){

}
*/
