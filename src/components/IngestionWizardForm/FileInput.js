import React, {Component, PropTypes} from 'react';
import Dropzone from 'react-dropzone';
import { Field } from 'redux-form';

class FileInput extends Component {
  static propTypes = {
    dropzone_options: PropTypes.object,
    meta: PropTypes.object,
    label: PropTypes.string,
    classNameLabel: PropTypes.string,
    input: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.node,
    cbFunction: PropTypes.func,
  };

  static defaultProps = {
    className: '',
    cbFunction: () => {},
  };

  render() {
    const { fields, onDropFunction, className, meta: { error, touched }, label, classNameLabel } = this.props;

    return (
      <div className={`${className}` + (error && touched ? ' has-error ' : '')}>
        {label && <p className={classNameLabel || ''}>{label}</p>}
            <Dropzone
                name="input"
                className="dropzone w-100"
                multiple={false}
                maxSize={10485760}
                onDrop={( filesToUpload, e ) => {
                    onDropFunction(fields, filesToUpload, e)
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