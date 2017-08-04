import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  appName: state.appName
});

class Appo extends React.Component {
  render() {
    return (
       <div data-reactroot className="app">
        <h1>Appo</h1>
      </div>
      );
  }
}

export default connect(mapStateToProps, () => ({}))(Appo);