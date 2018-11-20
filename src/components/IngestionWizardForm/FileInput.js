import React, {Component } from 'react';
import Dropzone from 'react-dropzone';
import { Field } from 'redux-form';

class FileInput extends Component {

  static defaultProps = {
    className: '',
    cbFunction: () => {},
  };

  render() {
    const { fields, onDropFunction, tipofile, className, meta: { error, touched }, label, classNameLabel } = this.props;

    return (
      <div className={`${className}` + (error && touched ? ' has-error ' : '')}>
            <Dropzone
                name="input"
                className="dropzone w-100"
                multiple={false}
                maxSize={10485760}
                onDrop={( filesToUpload, e ) => {
                    onDropFunction(fields, filesToUpload, tipofile, e)
                }
                }> 
                <div className="container">
                <div className="row" style={{"paddingTop": "10px"}}>
                    <div className="col">Trascina il tuo file qui, oppure clicca per selezionare il file da caricare.</div>
                </div>
                </div>
            </Dropzone>
        {error && touched ? error : ''}
      </div>
    );
  }
}
export default props => <Field {...props} component={FileInput} />;