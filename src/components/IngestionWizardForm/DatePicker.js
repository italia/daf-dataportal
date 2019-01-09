import React, {Component} from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';

class DatePicker extends Component {
    constructor(props){
        super(props)
        this.state = {
            focused: false,
            date: null,
          };
      
          this.onDateChange = this.onDateChange.bind(this);
          this.onFocusChange = this.onFocusChange.bind(this);
    }

    onDateChange(date) {
        const { modificaDataDCATAPIT } = this.props
        modificaDataDCATAPIT(date)
        this.setState({ date });
      }
    
      onFocusChange({ focused }) {
        this.setState({ focused });
      }
    
  render() {
    const { focused, date } = this.state;
    const { label, name, config, meta: { touched, error }} = this.props;
    return (
        <div className="form-group row">
            <label className="col-sm-2 col-form-label">{label}
            {config.info[name] &&
            <button type="button" className="btn btn-link" title="Info" onClick={openModalInfo.bind(this, config.info[input.name])}>
                <i className="fa fa-info-circle"></i>
            </button>
            }
            </label>    
            <div className="col-sm-10">
                <SingleDatePicker
                    id="ultimamodifica"
                    date={date}
                    focused={focused}
                    onDateChange={this.onDateChange}
                    onFocusChange={this.onFocusChange}
                    placeholder=''
                    noBorder
                />
                {touched && error && <div className="text-danger">{error}</div>}
            </div>
       </div>   
    );
  }
}
export default DatePicker