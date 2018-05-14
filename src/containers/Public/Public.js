import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../../views/Public/Home/Home';
import Header from '../../components/Header/Public/Header'
import Footer from '../../components/Footer/Public/Footer'


class Public extends Component {

  constructor(props){
    super(props)
    this.state = {
      js_scrolled: false,
    }

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  };
  
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  };
  
  handleScroll(event) {
    if(window.scrollY > 150){
      this.setState({
        js_scrolled: true
      })
    }
    else{
      this.setState({
        js_scrolled: false
      })
    }
  };
  

  render() {
    const { history } = this.props
    return (
      <div className="app">
        <Header history={history} scrolled={this.state.js_scrolled}/>
        <div data-reactroot className="app-body pub bg-white">
          <main className="w-100">
              <Switch>
                <Route path="/home" name="Home" exact component={Home}/>
                <Redirect from="/" to="/home"/>
              </Switch>
          </main>
        </div>
        <Footer/>
      </div>
      );
  }
}

Public.propTypes = {
  loggedUser: PropTypes.object,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { loggedUser, authed } = state.userReducer['obj'] || {}
  return { loggedUser, authed }
}

export default connect(mapStateToProps)(Public);
