import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchProperties } from '../../actions';

class Administration extends Component {

    constructor(props){
        super(props)
        this.state = {
            organizations: [],
            users: [],
            org: "",
            user: "",
        }

        this.load = this.load.bind(this)
        this.save = this.save.bind(this)
    }

    async settings(org) {
        var url = "http://service:9000/dati-gov/v1/settings?organization=" + org
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })

        return response.json();
    }

    load(org){
        let response = this.settings(org)
        response.then((json)=> {
            this.setState({
            });
        });
    }

   /**
  * Save Settings
  */
  saveSettings = (settings) => {
    console.log('save settings: ' + settings)
    //save data
    let json = {
        theme: this.state.theme,
        headerSiglaTool: this.state.title,
        headerDescTool: this.state.desc,
        headerLogo: this.state.logo,
        twitterURL: this.state.twitter,
        mediumURL: this.state.medium,
        notizieURL: this.state.news,
        forumURL: this.state.forum,
        footerLogoAGID: this.state.footer_logoA,
        footerLogoGov: this.state.footer_logoB,
        footerNomeEnte: this.state.footerName,
        footerPrivacy: this.state.privacy,
        footerLegal: this.state.legal
    }

    const response = this.save(json, this.state.org);
    this.setState({saving: true});
    response.then((data)=> {
      this.setState({
        saving: false
      })
    })
  }

  async save(settings, org) {
        const response = await fetch( 'http://service:9000/dati-gov/v1/settings?organization=' + org, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(settings)
        })
        return response.json();
    }

    onOrgChange(value) {
        this.setState({
            org: value,
        })
    }

    onUserChange(value) {
        this.setState({
            user: value,
        })

        this.load(value)
    }

    render() {
    const { loggedUser} = this.props
    return (
        <div>
            <div className="col-6 form-group row">
                <label htmlFor="example-search-input" className="col-2 col-form-label">Utente</label>
                <select className="form-control" aria-required="true" onChange={(e) => this.onUserChange(e.target.value)} value={this.state.org}>
                    <option value=""></option>
                </select>
            </div>
            <div className="col-6 form-group row">
                <label htmlFor="example-search-input" className="col-2 col-form-label">Organizzazione</label>
                <select className="form-control" aria-required="true" onChange={(e) => this.onOrgChange(e.target.value)} value={this.state.org}>
                    <option value=""></option>
                    <option value="daf">Daf</option>
                    <option value="roma">Comune di Roma</option>
                </select>
            </div>
            
        </div>
    )
  }
}

Administration.propTypes = {
  loggedUser: PropTypes.object,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const loggedUser = state.userReducer['obj'].loggedUser || { }
    const properties = state.propertiesReducer ? state.propertiesReducer['prop'] || {} : {} 
    return { loggedUser, properties }
}

export default connect(mapStateToProps)(Administration)
