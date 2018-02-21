import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalClose,
    ModalBody,
    ModalFooter
} from 'react-modal-bootstrap';
import { connect } from 'react-redux'
import DashboardService from '../DashboardManager/components/services/DashboardService'
import UserStoryService from '../UserStory/components/services/UserStoryService'

const dashboardService = new DashboardService();
const userStoryService = new UserStoryService();

class Crea extends Component {

    constructor(props) {
        super(props);
        this.props = props;

        this.state = {
            isOpenDash: false,
            isOpenStory: false,
            validationMSg: 'Campo obbligatorio',
            validationMSgOrg: 'Campo obbligatorio',
            pvt: '0',
            org: 'default_org'
        }
    }

    openModalDash = () => {
        this.setState({
            isOpenDash: true,
            pvt: '0',
            org: 'default_org'
        });
    };

    hideModalDash = () => {
        this.setState({
            isOpenDash: false,
            pvt: '0',
            org: 'default_org'
        });
    };

    openModalStory = () => {
        this.setState({
            isOpenStory: true,
            pvt: '0',
            org: 'default_org'
        });
    };

    hideModalStory = () => {
        this.setState({
            isOpenStory: false,
            pvt: '0',
            org: 'default_org'
        });
    };

    onPvtChange(e, value) {
        if (this.pvt.value == 0) {
            this.setState({
                org: 'default_org'
            });
        }
        this.setState({
            pvt: value
        });
        this.validate(e);
    }

    onOrganizationChange(e, value) {
        this.setState({
            org: value
        });
        this.validate(e);
    }

    validate = (e) => {
        e.preventDefault()
        var title;

        if(this.titleDash)
            title = this.titleDash
        else if(this.titleStory)
            title = this.titleStory

        if (!title.value) {
            this.setState({
                validationMSg: 'Campo obbligatorio'
            });
        } else {
            this.setState({
                validationMSg: null
            });
        }

        if (this.pvt.value == 1 && (!this.org || this.org.value == '')) {
            this.setState({
                validationMSgOrg: 'Campo obbligatorio'
            });
        } else {
            this.setState({
                validationMSgOrg: null
            });
        }
    }

    /**
    * Save Dashboard
    */
    handleSaveDash = (e) => {
        e.preventDefault()

        if (this.titleDash.value) {
            if (this.pvt.value == 1 && (!this.org || this.org.value == '')) {
                this.setState({
                    validationMSgOrg: 'Campo obbligatorio'
                });
            } else {
                //prepara data
                let layout = { rows: [] };
                let widgets = {};
                let request = {
                    title: this.titleDash.value,
                    pvt: this.state.pvt,
                    org: this.state.org,
                    subtitle: this.subtitle.value,
                    layout: JSON.stringify(layout),
                    widgets: JSON.stringify(widgets),
                    status: 0
                };

                //save data
                dashboardService.save(request).then((data) => {
                    this.props.history.push('/dashboard/list/' + data.message + '/edit');
                })
            }
        } else {
            this.setState({
                validationMSg: 'Campo obbligatorio'
            });
        }
    }

    /**
    * Save Title
    */
    handleSaveStory = (e) => {
        e.preventDefault()
        if (this.title.value) {
            if (this.pvt.value == 1 && (!this.org || this.org.value == '')) {
                this.setState({
                    validationMSgOrg: 'Campo obbligatorio'
                });
            } else {
                let layout = { rows: [] };
                let widgets = {};
                //save data
                let request = {
                    title: this.titleStory.value,
                    pvt: this.state.pvt,
                    org: this.state.org,
                    layout: JSON.stringify(layout),
                    widgets: JSON.stringify(widgets)
                };
                userStoryService.save(request).then((data) => {
                    this.props.history.push('/user_story/list/' + data.message + '/edit');
                });
            }
        } else {
            this.setState({
                validationMSg: 'Campo obbligatorio'
            });
        }

    }

    render() {
        const { loggedUser } = this.props
        return (
            <div className="form-group">
                <Modal isOpen={this.state.isOpenStory} onRequestHide={this.hideModalStory}>
                    <form>
                        <ModalHeader>
                            <ModalTitle>Crea una Storia</ModalTitle>
                            <ModalClose onClick={this.hideModalStory} />
                        </ModalHeader>
                        <ModalBody>
                            <div className="form-group">
                                <div className="form-group row">
                                    <label className="col-md-2 form-control-label">Titolo</label>
                                    <div className="col-md-8">
                                        <input type="text" className="form-control" ref={(titleStory) => this.titleStory = titleStory} onChange={this.validate.bind(this)} id="title" placeholder="Titolo" />
                                        {this.state.validationMSg && <span>{this.state.validationMSg}</span>}
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-md-2 form-control-label">Privata</label>
                                    <div className="col-md-8">
                                        <select className="form-control" ref={(pvt) => this.pvt = pvt} onChange={(e) => this.onPvtChange(e, e.target.value)} id="pvt" >
                                            <option value="0" defaultValue key="0">No</option>
                                            <option value="1" key='1'>Si</option>
                                        </select>
                                    </div>
                                </div>
                                {this.state.pvt == 1 &&
                                    <div className="form-group row">
                                        <label className="col-md-2 form-control-label">Organizzazione</label>
                                        <div className="col-md-8">
                                            <select className="form-control" ref={(org) => this.org = org} onChange={(e) => this.onOrganizationChange(e, e.target.value)} id="org" >
                                                <option value="" key='organization' defaultValue></option>
                                                {loggedUser.organizations && loggedUser.organizations.length > 0 && loggedUser.organizations.map(organization => {
                                                    if (organization !== 'default_org')
                                                        return (
                                                            <option value={organization} key={organization}>{organization}</option>)
                                                }
                                                )}
                                            </select>
                                            {this.state.validationMSgOrg && <span>{this.state.validationMSgOrg}</span>}
                                        </div>
                                    </div>
                                }
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <button className='btn btn-default' onClick={this.hideModalStory.bind(this)}>
                                Close
                            </button>
                            <button type="button" className="btn btn-primary px-2" onClick={/* this.handleSaveStory.bind(this) */()=>{}}>
                                <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
                                Crea
                            </button>
                        </ModalFooter>
                    </form>
                </Modal>
                <Modal isOpen={this.state.isOpenDash} onRequestHide={this.hideModalDash}>
                    <form>
                        <ModalHeader>
                            <ModalTitle>Crea una Dashboard</ModalTitle>
                            <ModalClose onClick={this.hideModalDash} />
                        </ModalHeader>
                        <ModalBody>
                            <div className="form-group">
                                <div className="form-group row">
                                    <label className="col-md-2 form-control-label">Titolo</label>
                                    <div className="col-md-8">
                                        <input type="text" className="form-control" ref={(titleDash) => this.titleDash = titleDash} onChange={this.validate.bind(this)} id="title" placeholder="Titolo" />
                                        {this.state.validationMSg && <span>{this.state.validationMSg}</span>}
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-md-2 form-control-label">Sottotitolo</label>
                                    <div className="col-md-8">
                                        <input type="text" className="form-control" ref={(subtitle) => this.subtitle = subtitle} id="subtitle" placeholder="Sottotitolo" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-md-2 form-control-label">Privata</label>
                                    <div className="col-md-8">
                                        <select className="form-control" ref={(pvt) => this.pvt = pvt} onChange={(e) => this.onPvtChange(e, e.target.value)} id="pvt" >
                                            <option value="0" defaultValue key="0">No</option>
                                            <option value="1" key='1'>Si</option>
                                        </select>
                                    </div>
                                </div>
                                {this.state.pvt == 1 &&
                                    <div className="form-group row">
                                        <label className="col-md-2 form-control-label">Organizzazione</label>
                                        <div className="col-md-8">
                                            <select className="form-control" ref={(org) => this.org = org} onChange={(e) => this.onOrganizationChange(e, e.target.value)} id="org" >
                                                <option value="" key='organization' defaultValue></option>
                                                {loggedUser.organizations && loggedUser.organizations.length > 0 && loggedUser.organizations.map(organization => {
                                                    if (organization !== 'default_org')
                                                        return (<option value={organization} key={organization}>{organization}</option>)
                                                })
                                                }
                                            </select>
                                            {this.state.validationMSgOrg && <span>{this.state.validationMSgOrg}</span>}
                                        </div>
                                    </div>
                                }
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <button className='btn btn-default' onClick={this.hideModalDash}>
                                Chiudi
                            </button>
                            <button type="button" className="btn btn-primary px-2" onClick={this.handleSaveDash.bind(this)}>
                                <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
                                Crea
                            </button>
                        </ModalFooter>
                    </form>
                </Modal>
                
                <h3 className="card-title">Cosa vuoi creare?</h3>
                <div className="row">
                    <div className="col-3">
                        <div className="card text-center">
                            <h5 className="card-title">Carica un nuovo Dataset</h5>
                            <div className="card-body">
                                <button className="btn btn-primary" onClick={() => { this.props.history.push("/ingestionwizzard")}}>Carica Dataset</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="card text-center">
                            <h5 className="card-title">Crea una nuova Dashboard</h5>
                            <div className="card-body">
                                <button className="btn btn-primary" onClick={this.openModalDash.bind(this)}>Crea Dashboard</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="card text-center">
                            <h5 className="card-title">Crea una nuova Storia</h5>
                            <div className="card-body">
                                <button className="btn btn-primary" onClick={this.openModalStory.bind(this)}>Crea Storia</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Crea.propTypes = {
    loggedUser: PropTypes.object,
    organizations: PropTypes.array
}

function mapStateToProps(state) {
    const loggedUser = state.userReducer['obj'].loggedUser || {}
    return { loggedUser }
}

export default connect(mapStateToProps)(Crea)
