import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchProperties } from '../../actions';
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalClose,
    ModalBody,
    ModalFooter
} from 'react-modal-bootstrap'
import themes from './data/Themes'
import Select from "react-select";
import { serviceurl } from '../../config/serviceurl'


class Settings extends Component {

    constructor(props){
        super(props)
        this.state={
            temi: themes,
            isOpen: false,
            theme: 1,
            title: '',
            organization: '',
            desc: '',
            logo: '',
            twitter: '',
            medium: '',
            news:'',
            forum: '',
            footer_logoA: '',
            footer_logoB: '',
            footer_logoC: '',
            footerName: '',
            privacy: '',
            legal: '',
            isChanged: false,
            showDiv: true,
            newDomain: true,
            domains: []
        }

        let allDomains = []
        let tmp = {}
        let response = this.domains()
        response.then(json => {
            json.map(domain => {
                tmp ={
                    'value' : domain,
                    'label' : domain
                }
                allDomains.push(tmp)
            })
            this.setState({
                domains: allDomains
            })
        })

        this.onClick = this.onClick.bind(this)
        this.onThemeSelect = this.onThemeSelect.bind(this)
        this.load = this.load.bind(this)
        this.save = this.save.bind(this)
        this.onDomainChange = this.onDomainChange.bind(this)
        this.addDomain = this.addDomain.bind(this)
    }

    async settings(org) {
        var url = serviceurl.apiURLDatiGov + "/settings?domain=" + org
        let token = localStorage.getItem('token')
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })

        return response.json();
    }

    async domains() {
        var url = serviceurl.apiURLDatiGov + "/domain"
        let token = localStorage.getItem('token')
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })

        return response.json();
    }

    load(org){
        let response = this.settings(org)
        response.then((json)=> {
            this.setState({
                theme: json.theme?json.theme:1,
                title: json.headerSiglaTool?json.headerSiglaTool:'',
                organization: json.organization?json.organization:'',
                desc: json.headerDescTool?json.headerDescTool:'',
                logo: json.headerLogo?json.headerLogo:'',
                twitter: json.twitterURL?json.twitterURL:'',
                medium: json.mediumURL?json.mediumURL:'',
                news: json.notizieURL?json.notizieURL:'',
                forum: json.forumURL?json.forumURL:'',
                footer_logoA: json.footerLogoAGID?json.footerLogoAGID:'',
                footer_logoB: json.footerLogoGov?json.footerLogoGov:'',
                footer_logoC: json.footerLogoDevITA?json.footerLogoDevITA:'',
                footerName: json.footerNomeEnte?json.footerNomeEnte:'',
                privacy: json.footerPrivacy?json.footerPrivacy:'',
                legal: json.footerLegal?json.footerLegal:'',
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
        organization: this.state.organization,
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
        footerLogoDevITA: this.state.footer_logoC,
        footerNomeEnte: this.state.footerName,
        footerPrivacy: this.state.privacy,
        footerLegal: this.state.legal
    }

    const response = this.save(json, this.state.domain);
    this.setState({saving: true});
    response.then((data)=> {
      this.setState({
        saving: false
      })
    })
  }

  async save(settings, org) {
      let token = localStorage.getItem('token')
      const response = await fetch(serviceurl.apiURLDatiGov + '/settings/' + org, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(settings)
        })
        return response.json();
    }

    onClick() {
        this.setState({
            isOpen: true,
        });
    };

    hideModal = (e) => {
        e.preventDefault();
        this.setState({
            isOpen: false
        });
    };

    onThemeSelect(id){
        this.setState({
            theme: id,
            isOpen: false,
            isChanged: true
        })
        let settings = this.state;
        settings.theme = id;
        this.saveSettings(settings);
    }

    onTitleChange(value){
        this.setState({
            title: value,
            isChanged: true
        });
        let settings = this.state;
        settings.title = value;
        this.saveSettings(settings);
    }

    onOrganizationChange(value){
        this.setState({
            organization: value,
            isChanged: true
        });
        let settings = this.state;
        settings.organization = value;
        this.saveSettings(settings);
    }

    onDescChange(value) {
        this.setState({
            desc: value,
            isChanged: true
        });
        let settings = this.state;
        settings.desc = value;
        this.saveSettings(settings);
    }

    onLogoChange(value) {
        this.setState({
            logo: value,
            isChanged: true
        });
        let settings = this.state;
        settings.logo = value;
        this.saveSettings(settings);
    }

    onTwitterChange(value) {
        this.setState({
            twitter: value,
            isChanged: true
        });
        let settings = this.state;
        settings.twitter = value;
        this.saveSettings(settings);
    }

    onMediumChange(value) {
        this.setState({
            medium: value,
            isChanged: true
        });
        let settings = this.state;
        settings.medium = value;
        this.saveSettings(settings);
    }
    
    onFootAChange(value) {
        this.setState({
            footer_logoA: value,
            isChanged: true
        });
        let settings = this.state;
        settings.footer_logoA = value;
        this.saveSettings(settings);
    }

    onFootBChange(value) {
        this.setState({
            footer_logoB: value,
            isChanged: true
        });
        let settings = this.state;
        settings.footer_logoB = value;
        this.saveSettings(settings);
    }

    onFootCChange(value) {
        this.setState({
            footer_logoC: value,
            isChanged: true
        });
        let settings = this.state;
        settings.footer_logoC = value;
        this.saveSettings(settings);
    }

    onFootnameChange(value) {
        this.setState({
            footerName: value,
            isChanged: true
        });
        let settings = this.state;
        settings.footerName = value;
        this.saveSettings(settings);
    }

    onPrivacyChange(value) {
        this.setState({
            privacy: value,
            isChanged: true
        });
        let settings = this.state;
        settings.privacy = value;
        this.saveSettings(settings);
    }

    onLegalChange(value) {
        this.setState({
            legal: value,
            isChanged: true
        });
        let settings = this.state;
        settings.legal = value;
        this.saveSettings(settings);
    }

    onNewsChange(value) {
        this.setState({
            news: value,
            isChanged: true
        });
        let settings = this.state;
        settings.news = value;
        this.saveSettings(settings);
    }

    onForumChange(value) {
        this.setState({
            forum: value,
            isChanged: true
        });
        let settings = this.state;
        settings.forum = value;
        this.saveSettings(settings);
    }

    onDomainChange(newValue){
        this.setState({
            domain: newValue,
            newDomain: true
        })
        console.log("value: " + newValue)
        if (newValue=='' || !newValue){
            this.setState({
                showDiv: true
            })
        }else{
            this.setState({
                showDiv: false
            })
        }
        this.load(newValue)
    }

    addDomain(){
        const response = this.settings('dataportal')
        response.then((json)=>{
            var settings = json;
            const save = this.save(json, this.state.domain)
            save.then((json)=>{
                this.setState({
                    newDomain: true,
                })
                let allDomains = []
                let tmp = {}
                let domains = this.domains()
                domains.then(json => {
                    json.map(domain => {
                        tmp = {
                            'value': domain,
                            'label': domain
                        }
                        allDomains.push(tmp)
                    })
                    this.setState({
                        domains: allDomains,
                        showDiv: false
                    })
                    this.load(this.state.domain)
                })
            })
        })
    }

    render() {
        const { loggedUser} = this.props
        const { newDomain, domains } = this.state
    return (
        <div>
            <Modal
                contentLabel="Seleziona un tema"
                className="Modal__Bootstrap modal-dialog modal-80"
                isOpen={this.state.isOpen}>
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" onClick={this.hideModal.bind(this)}>
                            <span aria-hidden="true">&times;</span>
                            <span className="sr-only">Chiudi</span>
                        </button>
                        <h4 className="modal-title">Modifica il tema</h4>
                    </div>
                    <div className="modal-body">
                        <h5>Scegli il tema da usare</h5>
                        <div className="row ml-0 preview-widget-container">
                            {
                                this.state.temi.map((theme, key) => {
                                    return (
                                        <div key={key} className="list-group">
                                            <div  className="col-sm-12 col-md-12 col-lg-12 mb-20">
                                                <a className="list-group-item" onClick={() => this.onThemeSelect(theme.id)}>
                                                    <h6 className="list-group-item-heading">
                                                        {'Tema ' + theme.id}
                                                    </h6>
                                                    <img className="col-sm-12 col-md-12 col-lg-12 mb-20" src={"/img/themes/" + theme.snapshot} />
                                                </a>
                                            </div>
                                            
                                            
                                        </div>
                                    )}
                                )
                            }

                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-gray-200" onClick={this.hideModal.bind(this)}>Chiudi</button>
                    </div>
                </div>
            </Modal>
            <div className="form-group row">
                <div className="col-md-9">
                    <div className="card">
                        <div className="card-block">
                            <div className="form-group row">
                                <label className="col-2 col-form-label">Dominio</label>
                                <div className="col-4">
                                    <Select
                                        id="state-select"
                                        onBlurResetsInput={false}
                                        onSelectResetsInput={true}
                                        options={domains}
                                        simpleValue
                                        clearable={true}
                                        name="selected-user"
                                        value={this.state.domain}
                                        onChange={this.onDomainChange}
                                        rtl={false}
                                        searchable={true}
                                    />
                                </div>
                                {loggedUser.role==="daf_admins" && <button className="btn btn-link" title="Aggiungi un nuovo dominio" onClick={()=>this.setState({newDomain: false, showDiv: true, domain: ''})}><i className="fa fa-plus"/></button>}
                            </div>
                            <div hidden={this.state.showDiv}>
                                <div className="form-group row">
                                    <label className="col-2 col-form-label">Tema</label>
                                    <div className="col-10">
                                        <div className="form-inline">
                                            <input className="form-control" type="text" value={'Tema ' + this.state.theme} id="example-search-input" onClick={this.onClick}/>
                                            <button type="button" className="btn btn-primary" onClick={this.onClick}><i className="fa fa-edit"></i></button>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-2 col-form-label">Organizzazione</label>
                                    <div className="col-10">
                                        <input className="form-control" type="search" value={this.state.organization} 
                                            onChange= {(e) => this.onOrganizationChange(e.target.value)}/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-2 col-form-label">Titolo</label>
                                    <div className="col-10">
                                        <input className="form-control" type="search" value={this.state.title} 
                                            onChange= {(e) => this.onTitleChange(e.target.value)}/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label  className="col-2 col-form-label">Descrizione</label>
                                    <div className="col-10">
                                        <input className="form-control" type="search" value={this.state.desc} 
                                            onChange={(e) => this.onDescChange(e.target.value)}/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label  className="col-2 col-form-label">Logo</label>
                                    <div className="col-10">
                                        <input className="form-control" type="search" value={this.state.logo} 
                                            onChange={(e) => this.onLogoChange(e.target.value)}/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                        <label className="col-2 col-form-label"><i className="fa fa-twitter"></i>{" "}Twitter</label>
                                    <div className="col-10">
                                        <input className="form-control" type="text" value={this.state.twitter} 
                                            onChange={(e) => this.onTwitterChange(e.target.value)}/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                        <label className="col-2 col-form-label"><i className="fa fa-medium"></i>{" "}Medium</label>
                                    <div className="col-10">
                                        <input className="form-control" type="search" value={this.state.medium} 
                                            onChange={(e) => this.onMediumChange(e.target.value)}/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-2 col-form-label">Notizie</label>
                                    <div className="col-10">
                                        <input className="form-control" type="text" value={this.state.news}
                                            onChange={(e) => this.onNewsChange(e.target.value)} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-2 col-form-label">Forum</label>
                                    <div className="col-10">
                                        <input className="form-control" type="search" value={this.state.forum}
                                            onChange={(e) => this.onForumChange(e.target.value)} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-2 col-form-label">Footer Logo 1</label>
                                    <div className="col-10">
                                        <input className="form-control" type="search" value={this.state.footer_logoA} 
                                            onChange={(e) => this.onFootAChange(e.target.value)}/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-2 col-form-label">Footer Logo 2</label>
                                    <div className="col-10">
                                        <input className="form-control" type="search" value={this.state.footer_logoB}
                                            id="example-search-input" onChange={(e) => this.onFootBChange(e.target.value)} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-2 col-form-label">Footer Logo 3</label>
                                    <div className="col-10">
                                        <input className="form-control" type="search" value={this.state.footer_logoC} 
                                            onChange={(e) => this.onFootCChange(e.target.value)}/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-2 col-form-label">Footer Nome</label>
                                    <div className="col-10">
                                        <input className="form-control" type="search" value={this.state.footerName} 
                                            onChange={(e) => this.onFootnameChange(e.target.value)}/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-2 col-form-label">Privacy Policy</label>
                                    <div className="col-10">
                                        <input className="form-control" type="search" value={this.state.privacy} 
                                            onChange={(e) => this.onPrivacyChange(e.target.value)}/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-2 col-form-label">Note Legali</label>
                                    <div className="col-10">
                                        <input className="form-control" type="search" value={this.state.legal} 
                                            onChange={(e) => this.onLegalChange(e.target.value)}/>
                                    </div>
                                </div>
                            </div>
                            {loggedUser.role==="daf_admins" &&
                            <div hidden={newDomain}>
                                <div className="form-group row">
                                    <label className="col-2 col-form-label">Nuovo Dominio</label>
                                    <div className="col-4">
                                        <input className="form-control" type="search" value={this.state.domain}
                                            onChange={(e) => {this.setState({domain: e.target.value})}} />
                                    </div>
                                    <button className="btn btn-primary" title="Aggiungi il dominio" onClick={this.addDomain}><i className="fa fa-check"/></button>
                                </div>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
  }
}

Settings.propTypes = {
  loggedUser: PropTypes.object,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const loggedUser = state.userReducer['obj'].loggedUser || { }
    const properties = state.propertiesReducer ? state.propertiesReducer['prop'] || {} : {} 
    return { loggedUser, properties }
}

export default connect(mapStateToProps)(Settings)
