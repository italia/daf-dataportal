import React from 'react';
import { Media, Row, Card, CardText } from 'reactstrap';

import { arrDataParser } from '../../../../util/dataParser'
import { isEmpty } from '../../../../util/commonUtils'

const IconXML = 'xml.svg'
const IconJSON = 'json.svg'
const IconCSV = 'csv.svg'
const IconXLSX = 'xlsx.svg'
const IconPDF = 'pdf.svg'

const matchIcon = format => ({
  'RDF_XML': IconXML,
  'RDF_TURTLE': IconXML,
  'JSON_LD': IconJSON,
  'CSV': IconCSV,
  'XLSX': IconXLSX,
  'PDF': IconPDF
}[format])

const DistButton = ({ downloadUrl, format, titles, descriptions }) => {
  return <a className="col-xs-3 my-1 mx-2" onClick={e => window.location = downloadUrl}>
    <Card className="mb-2 text-center border-0" body>

      <Media
        style={{ width: '48px', height: '48px' }}
        className="mx-auto"
        object
        src={`./img/semantics/${matchIcon(format.value)}`}
        alt={`Download ${format.value} serialization`}
      />
      <span className="mt-2 text-primary">{format.value}</span>
    </Card>
  </a>
}

const DistButtons = ({ distributions }) => {
  const parsedDistributions = arrDataParser(distributions, 'it')
  return isEmpty(distributions) ? null : <div>
    <CardText><strong>Distribuzioni:</strong></CardText>
    <Row>
      {parsedDistributions.map(
        (dist, index, arr) => <DistButton key={`Dist[${dist.format.value}]`} {...dist} />
      )}
    </Row>
  </div>
}

export default DistButtons
