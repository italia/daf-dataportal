import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalClose,
    ModalBody,
    ModalFooter
} from 'react-modal-bootstrap'
import themes from './data/Themes'


class Settings extends Component {

    constructor(props){
        super(props)
        this.state={
            temi: themes,
            isOpen: false,
            theme: 1,
            title: '/Daf',
            desc: '',
            logo: '',
            twitter: '',
            medium: '',
            footer_logoA: '',
            footer_logoB: '',
            footerName: '',
            privacy: '',
            legal: '',
            isChanged: false
        }

        this.onClick = this.onClick.bind(this)
        
        this.onThemeSelect = this.onThemeSelect.bind(this)
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
    }

    onTitleChange(value){
        this.setState({
            title: value,
            isChanged: true
        });
    }

    onDescChange(value) {
        this.setState({
            desc: value,
            isChanged: true
        });
    }

    onLogoChange(value) {
        this.setState({
            logo: value,
            isChanged: true
        });
    }

    onTwitterChange(value) {
        this.setState({
            twitter: value,
            isChanged: true
        });
    }

    onMediumChange(value) {
        this.setState({
            medium: value,
            isChanged: true
        });
    }
    
    onFootAChange(value) {
        this.setState({
            footer_logoA: value,
            isChanged: true
        });
    }

    onFootBChange(value) {
        this.setState({
            footer_logoB: value,
            isChanged: true
        });
    }

    onFootnameChange(value) {
        this.setState({
            footerName: value,
            isChanged: true
        });
    }

    onPrivacyChange(value) {
        this.setState({
            privacy: value,
            isChanged: true
        });
    }

    onLegalChange(value) {
        this.setState({
            legal: value,
            isChanged: true
        });
    }



    render() {
    const { loggedUser } = this.props
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
                                        <div className="list-group">
                                            <div key={key} className="col-sm-12 col-md-12 col-lg-12 mb-20">
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
                        <button type="button" className="btn btn-default" onClick={this.hideModal.bind(this)}>Chiudi</button>
                    </div>
                </div>
            </Modal>
            <div className="form-group row">
                <div className="col-md-9">
                    <div className="card">
                        <div className="card-block">
                            <div className="form-group row">
                                <label htmlFor="example-search-input" className="col-2 col-form-label">Tema</label>
                                <div className="col-10">
                                    <div className="form-inline">
                                        <input className="form-control" type="text" value={'Tema ' + this.state.theme} id="example-search-input" onClick={this.onClick}/>
                                        <button type="button" className="btn btn-primary" onClick={this.onClick}><i className="fa fa-edit"></i></button>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="example-search-input" className="col-2 col-form-label">Titolo</label>
                                <div className="col-10">
                                    <input className="form-control" type="search" value={this.state.title} 
                                        id="example-search-input" onChange= {(e) => this.onTitleChange(e.target.value)}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="example-search-input" className="col-2 col-form-label">Descrizione</label>
                                <div className="col-10">
                                    <input className="form-control" type="search" value={this.state.desc} 
                                        id="example-search-input" onChange={(e) => this.onDescChange(e.target.value)}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="example-search-input" className="col-2 col-form-label">Logo</label>
                                <div className="col-10">
                                    <input className="form-control" type="search" value={this.state.logo} 
                                        id="example-search-input" onChange={(e) => this.onLogoChange(e.target.value)}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                    <label htmlFor="example-text-input" className="col-2 col-form-label"><i className="fa fa-twitter"></i>{" "}Twitter</label>
                                <div className="col-10">
                                    <input className="form-control" type="text" value={this.state.twitter} 
                                        id="example-text-input" onChange={(e) => this.onTwitterChange(e.target.value)}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                    <label htmlFor="example-search-input" className="col-2 col-form-label"><i className="fa fa-medium"></i>{" "}Medium</label>
                                <div className="col-10">
                                    <input className="form-control" type="search" value={this.state.medium} 
                                        id="example-search-input" onChange={(e) => this.onMediumChange(e.target.value)}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="example-search-input" className="col-2 col-form-label">Footer Logo 1</label>
                                <div className="col-10">
                                    <input className="form-control" type="search" value={this.state.footer_logoA} 
                                        id="example-search-input" onChange={(e) => this.onFootAChange(e.target.value)}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="example-search-input" className="col-2 col-form-label">Footer Logo 2</label>
                                <div className="col-10">
                                    <input className="form-control" type="search" value={this.state.footer_logoB} 
                                        id="example-search-input" onChange={(e) => this.onFootBChange(e.target.value)}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="example-search-input" className="col-2 col-form-label">Footer Nome</label>
                                <div className="col-10">
                                    <input className="form-control" type="search" value={this.state.footerName} 
                                        id="example-search-input" onChange={(e) => this.onFootnameChange(e.target.value)}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="example-search-input" className="col-2 col-form-label">Privacy Policy</label>
                                <div className="col-10">
                                    <input className="form-control" type="search" value={this.state.privacy} 
                                        id="example-search-input" onChange={(e) => this.onPrivacyChange(e.target.value)}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="example-search-input" className="col-2 col-form-label">Note Legali</label>
                                <div className="col-10">
                                    <input className="form-control" type="search" value={this.state.legal} 
                                        id="example-search-input" onChange={(e) => this.onLegalChange(e.target.value)}/>
                                </div>
                            </div>
                            <button type="button" className={"btn btn-primary float-right " + (this.state.isChanged ? "" :"disabled")}>Save</button>
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
}

function mapStateToProps(state) {
    const loggedUser = state.userReducer['obj'].loggedUser || { } 
    return { loggedUser }
}

export default connect(mapStateToProps)(Settings)
