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
            titolo: '',
            Descrizione: '',
            Logo: '',
            Twitter: '',
            medium: '',
            footer_logoA: '',
            footer_logoB: '',
            footerName: '',
            privacy: '',
            legal: '',
        }

        this.onClick = this.onClick.bind(this)
        this.themeSelector = this.themeSelector.bind(this)
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

    onThemeSelect(theme){
        this.setState({
            theme: theme.id,
        })
        this.hideModal;
    }

    themeSelector(themes){
        themes.map((theme, key) => {
        return (
            <div key={key} className="col-sm-12 col-md-12 col-lg-12 list-group mb-20">
                <a className="list-group-item" /* onClick={this.onThemeSelect(theme)} */>
                    <h6 className="list-group-item-heading">
                        {'Tema' + theme.id}
                    </h6>
                </a>
            </div>
        )
    }
    )
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
                            {this.themeSelector(this.state.temi)}
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
                                        <input className="form-control" type="text" value={loggedUser ? loggedUser.sn + ' ' + loggedUser.givenname : ''} id="example-search-input" />
                                        <button type="button" className="btn btn-primary" onClick={this.onClick}><i className="fa fa-edit"></i></button>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="example-search-input" className="col-2 col-form-label">Titolo</label>
                                <div className="col-10">
                                    <input className="form-control" type="search" value={loggedUser.sn + ' ' + loggedUser.givenname} id="example-search-input" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="example-search-input" className="col-2 col-form-label">Descrizione</label>
                                <div className="col-10">
                                    <input className="form-control" type="search" value={loggedUser ? loggedUser.sn + ' ' + loggedUser.givenname : ''} id="example-search-input" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="example-search-input" className="col-2 col-form-label">Logo</label>
                                <div className="col-10">
                                    <input className="form-control" type="search" value={loggedUser ? loggedUser.sn + ' ' + loggedUser.givenname : ''} id="example-search-input" />
                                </div>
                            </div>
                            <div className="form-group row">
                                    <label htmlFor="example-text-input" className="col-2 col-form-label"><i className="fa fa-twitter"></i>{" "}Twitter</label>
                                <div className="col-10">
                                    <input className="form-control" type="text" value={loggedUser?loggedUser.uid:''} id="example-text-input"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                    <label htmlFor="example-search-input" className="col-2 col-form-label"><i className="fa fa-medium"></i>{" "}Medium</label>
                                <div className="col-10">
                                    <input className="form-control" type="search" value={loggedUser?loggedUser.mail:''} id="example-search-input"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="example-search-input" className="col-2 col-form-label">Footer Logo 1</label>
                                <div className="col-10">
                                    <input className="form-control" type="search" value={loggedUser?loggedUser.sn + ' ' + loggedUser.givenname:''} id="example-search-input"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="example-search-input" className="col-2 col-form-label">Footer Logo 2</label>
                                <div className="col-10">
                                    <input className="form-control" type="search" value={loggedUser ? loggedUser.sn + ' ' + loggedUser.givenname : ''} id="example-search-input" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="example-search-input" className="col-2 col-form-label">Footer Nome</label>
                                <div className="col-10">
                                    <input className="form-control" type="search" value={loggedUser ? loggedUser.sn + ' ' + loggedUser.givenname : ''} id="example-search-input" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="example-search-input" className="col-2 col-form-label">Privacy Policy</label>
                                <div className="col-10">
                                    <input className="form-control" type="search" value={loggedUser ? loggedUser.sn + ' ' + loggedUser.givenname : ''} id="example-search-input" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="example-search-input" className="col-2 col-form-label">Note Legali</label>
                                <div className="col-10">
                                    <input className="form-control" type="search" value={loggedUser ? loggedUser.sn + ' ' + loggedUser.givenname : ''} id="example-search-input" />
                                </div>
                            </div>
                            <button type="button" className="btn btn-primary float-right">Save</button>
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
