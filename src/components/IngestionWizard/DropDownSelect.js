/**
*
* DropDownSelect
*
*/

import React from 'react';

class DropDownSelect extends React.Component { // eslint-disable-line react/prefer-stateless-function

  transforToArray(input){
    let array;
    console.log('transforToArray: ' +  input)
    if(input.indexOf(",") !== -1){
        array = input.split(",")
    }else{
        array.push(input)
    }
    return array;
    }

  renderSelectOptions = (person) => (
    <option key={person} value={person}>{person}</option>
  )

  render() {
    const { input, label } = this.props;
    let types = this.transforToArray(this.props.people);
    return (
      <div>
        {/* <label htmlFor={label}>{label}</label> */}
        <select {...input}>
          <option value="">Select</option>
          {types.map(this.renderSelectOptions)}
        </select>
      </div>
    );
  }
}

// function DropDownSelect(person) {
//   return (
//     <option key={person} value={person}>{person}</option>
//   );
// }

DropDownSelect.propTypes = {
  people: React.PropTypes.array,
  input: React.PropTypes.object,
  label: React.PropTypes.string,
};

export default DropDownSelect;