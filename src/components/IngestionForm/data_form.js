

class DataInputForm {

  static getDcatap() {
    return {
      title: "DCATAP Catalogue Info",
      subtitle: "Info for DCATAP profile",
      hidden: false,
      fields: [
        {
          fieldType: "inputMultiLang",
          fieldName: "Titolo",
          fieldId: "dct_title"
        },
        {
          fieldType: "textMultiLang",
          fieldName: "Descrizione",
          fieldId: "dct_description"
        },
        {
          fieldType: "selectTheme",
          fieldName: "Ambito",
          fieldId: "dcat_theme"
        },
        {
          fieldType: "selectCategory",
          fieldName: "Categorie",
          fieldId: "dct_subject"
        },
        {
          fieldType: "text",
          fieldName: "Keywords / Tags",
          fieldId: "dct_keyword"
        },
        {
          fieldType: "inputMultiLang",
          fieldName: "Owner",
          fieldId: "dct_rightsHolder"
        },
        {
          fieldType: "input",
          fieldName: "Frequenza Aggiornamento",
          fieldId: "dct_accrualPeriodicity"
        },
        {
          fieldType: "selectLang",
          fieldName: "Lingua",
          fieldId: "dct_language"
        },
        {
          fieldType: "input",
          fieldName: "Landing Page",
          fieldId: "dcat_landingPage"
        },
      ]
    }
  }

  static getDataschema(){
    return {
      title: "Data Schema",
      subtitle: "Info for Dataset's data schema",
      hidden: false,
      fields: [
        /*
        {
          fieldType: "inputFile",
          fieldName: "Data File",
          fieldId: "ds_datafile"
        },
        */
        {
          fieldType: "input",
          fieldName: "Namespace",
          fieldId: "ds_namespace"
        },
        {
          fieldType: "input",
          fieldName: "Dataset Name",
          fieldId: "ds_name"
        },
        {
          fieldType: "input",
          fieldName: "Aliases",
          fieldId: "ds_aliases"
        }
        /*
        {
          fieldType: "inputNumField",
          fieldName: "Numero Campi",
          fieldId: "ds_nfields"
        },
        */
      ]
    }
  }

  static getDataschemaField() {
    return [
      {
        fieldType: "input",
        fieldName: "Dataset Name",
        fieldId: "ds_fields-name"
      },
      {
        fieldType: "inputFieldDataType",
        fieldName: "Type",
        fieldId: "ds_fields-type"
      },
      {
        fieldType: "text",
        fieldName: "Documentation",
        fieldId: "ds_fields-doc"
      },
      {
        fieldType: "input",
        fieldName: "Default Value",
        fieldId: "ds_fields-default"
      },
    ]
  }

  static getDataschemaFieldMetadata() {
    return [
      {
        fieldType: "textMultiLang",
        fieldName: "Description",
        fieldId: "ds_fields-metadata-desc"
      },
      {
        fieldType: "selectYN",
        fieldName: "Campo Obbligatorio?",
        fieldId: "ds_fields-metadata-required"
      },
      {
        fieldType: "selectFieldType",
        fieldName: "Tipo di Campo",
        fieldId: "ds_fields-metadata-fieldtype"
      },
      //This will be changed to take into account automatic filling.
      {
        fieldType: "input",
        fieldName: "Categories",
        fieldId: "ds_fields-metadata-cat"
      },
      {
        fieldType: "input",
        fieldName: "Tags",
        fieldId: "ds_fields-metadata-tag"
      },
      {
        fieldType: "inputMultiFieldConstr",
        fieldName: "Field Constraints",
        fieldId: "ds_fields-metadata-constr"
      },
      {
        fieldType: "inputMultiFieldSemantics",
        fieldName: "Semantics Info",
        fieldId: "ds_fields-metadata-semantics"
      }
    ]
  }

  static getOperational(){

  return {
      title: "DAF Operational Info",
      subtitle: "DAF Backend information",
      hidden: false,
      fields: [
        {
          fieldType: "input",
          fieldName: "Dataset URI",
          fieldId: "ops_uri"
        },
        {
          fieldType: "input",
          fieldName: "Ownership Group",
          fieldId: "ops_group_own"
        },
        {
          fieldType: "selectYesNo",
          fieldName: "Definisce uno nuovo Schema Standard?",
          fieldId: "ops_is_std"
        },
        {
          fieldType: "input",
          fieldName: "Uri Standard Schema Associato (se esiste)",
          fieldId: "ops_std_uri"
        },
        {
          fieldType: "selectDsReadType",
          fieldName: "Tipo lettura del dataset",
          fieldId: "ops_read_type"
        },
        {
          fieldType: "geoRef",
          fieldName: "Lat e Long Punti che georeferenziano il Dataset",
          fieldId: "ops_georef"
        },
      ]
    }
  }

}
export default DataInputForm
