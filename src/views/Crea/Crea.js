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
import { isEditor, isAdmin } from '../../utility'

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
            pvtStory: '0',
            orgStory: 'default_org',
            pvtDash: '0',
            orgDash: 'default_org'
        }
    }

    openModalDash = () => {
        this.setState({
            isOpenDash: true,
            pvtDash: '0',
            orgDash: 'default_org'
        });
    };

    hideModalDash = () => {
        this.setState({
            isOpenDash: false,
            pvtDash: '0',
            orgDash: 'default_org'
        });
    };

    openModalStory = () => {
        this.setState({
            isOpenStory: true,
            pvtStory: '0',
            orgStory: 'default_org'
        });
    };

    hideModalStory = () => {
        this.setState({
            isOpenStory: false,
            pvtStory: '0',
            orgStory: 'default_org'
        });
    };

    onPvtChange(e, value, mode) {
        if(mode==0){
            if (this.pvtStory.value == 0) {
                this.setState({
                    orgStory: 'default_org'
                });
            }
            this.setState({
                pvtStory: value
            });
            this.validate(mode, e);
        }
        if(mode==1){
            if (this.pvtDash.value == 0) {
                this.setState({
                    orgDash: 'default_org'
                });
            }
            this.setState({
                pvtDash: value
            });
            this.validate(mode, e);
        }
    }

    onOrganizationChange(e, value, mode) {
        if(mode==0){
            this.setState({
                orgStory: value
            });
        }
        if(mode==1){
            this.setState({
                orgDash: value
            });
        }
        this.validate(mode, e);
    }

    validate = (mode, e) => {
        e.preventDefault()

        if(mode==0){
            this.titleDash
            if (!this.titleStory.value) {
                this.setState({
                    validationMSg: 'Campo obbligatorio'
                });
            } else {
                this.setState({
                    validationMSg: null
                });
            }
    
            if (this.pvtStory.value == 1 && (!this.orgStory || this.orgStory.value == '')) {
                this.setState({
                    validationMSgOrg: 'Campo obbligatorio'
                });
            } else {
                this.setState({
                    validationMSgOrg: null
                });
            }
        
        }
        
        if(mode==1){
            if (!this.titleDash.value) {
                this.setState({
                    validationMSg: 'Campo obbligatorio'
                });
            } else {
                this.setState({
                    validationMSg: null
                });
            }
    
            if (this.pvtDash.value == 1 && (!this.orgDash || this.orgDash.value == '')) {
                this.setState({
                    validationMSgOrg: 'Campo obbligatorio'
                });
            } else {
                this.setState({
                    validationMSgOrg: null
                });
            }
        
        }


    }

    /**
    * Save Dashboard
    */
    handleSaveDash = (e) => {
        e.preventDefault()

        if (this.titleDash.value) {
            if (this.pvtDash.value == 1 && (!this.orgDash || this.orgDash.value == '')) {
                this.setState({
                    validationMSgOrg: 'Campo obbligatorio'
                });
            } else {
                //prepara data
                let layout = { rows: [] };
                let widgets = {};
                let request = {
                    title: this.titleDash.value,
                    pvt: this.state.pvtDash,
                    org: this.state.orgDash,
                    subtitle: this.subtitleDash.value,
                    layout: JSON.stringify(layout),
                    widgets: JSON.stringify(widgets),
                    status: 0
                };

                //save data
                dashboardService.save(request).then((data) => {
                    this.props.history.push('/private/dashboard/list/' + data.message + '/edit');
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
        if (this.titleStory.value) {
            if (this.pvtStory.value == 1 && (!this.orgStory || this.orgStory.value == '')) {
                this.setState({
                    validationMSgOrg: 'Campo obbligatorio'
                });
            } else {
                let layout = { rows: [] };
                let widgets = {};
                //save data
                let request = {
                    title: this.titleStory.value,
                    pvt: this.state.pvtStory,
                    org: this.state.orgStory,
                    layout: JSON.stringify(layout),
                    widgets: JSON.stringify(widgets),
                    published: 0
                };
                userStoryService.save(request).then((data) => {
                    this.props.history.push('/private/userstory/list/' + data.message + '/edit');
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
                                        <input type="text" className="form-control" ref={(titleStory) => this.titleStory = titleStory} onChange={this.validate.bind(this, 0)} id="titleStory" placeholder="Titolo" />
                                        {this.state.validationMSg && <span>{this.state.validationMSg}</span>}
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-md-2 form-control-label">Privata</label>
                                    <div className="col-md-8">
                                        {loggedUser.organizations && loggedUser.organizations.length > 1 ?
                                        <select className="form-control" ref={(pvtStory) => this.pvtStory = pvtStory} onChange={(e) => this.onPvtChange(e, e.target.value, 0)} id="pvtStory" >
                                            <option value="0" defaultValue key="0">No</option>
                                            <option value="1" key='1'>Si</option>
                                        </select>
                                        :
                                        <div>
                                            <select className="form-control" ref={(pvtStory) => this.pvtStory = pvtStory} id="pvtStory" >
                                                <option value="0" defaultValue key="0">No</option>
                                            </select>
                                            <span>Puoi creare soltanto storie pubbliche in quanto non hai nessuna organizzazione associata</span>
                                        </div>
                                        }
                                    </div>
                                </div>
                                {this.state.pvtStory == 1 &&
                                    <div className="form-group row">
                                        <label className="col-md-2 form-control-label">Organizzazione</label>
                                        <div className="col-md-8">
                                            <select className="form-control" ref={(orgStory) => this.orgStory = orgStory} onChange={(e) => this.onOrganizationChange(e, e.target.value, 0)} id="orgStory" >
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
                            <button className='btn btn-gray-200' onClick={this.hideModalStory.bind(this)}>
                                Close
                            </button>
                            <button type="button" className="btn btn-primary px-2" onClick={this.handleSaveStory.bind(this)}>
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
                                        <input type="text" className="form-control" ref={(titleDash) => this.titleDash = titleDash} onChange={this.validate.bind(this,1)} id="titleDash" placeholder="Titolo" />
                                        {this.state.validationMSg && <span>{this.state.validationMSg}</span>}
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-md-2 form-control-label">Sottotitolo</label>
                                    <div className="col-md-8">
                                        <input type="text" className="form-control" ref={(subtitleDash) => this.subtitleDash = subtitleDash} id="subtitleDash" placeholder="Sottotitolo" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-md-2 form-control-label">Privata</label>
                                    <div className="col-md-8">
                                    {loggedUser.organizations && loggedUser.organizations.length > 1 ?
                                        <select className="form-control" ref={(pvtDash) => this.pvtDash = pvtDash} onChange={(e) => this.onPvtChange(e, e.target.value, 1)} id="pvtDash" >
                                            <option value="0" defaultValue key="0">No</option>
                                            <option value="1" key='1'>Si</option>
                                        </select>
                                    :
                                        <div>
                                            <select className="form-control" ref={(pvtDash) => this.pvtDash = pvtDash} onChange={(e) => this.onPvtChange(e, e.target.value, 1)} id="pvtDash" >
                                                <option value="0" defaultValue key="0">No</option>
                                            </select>
                                            <span>Puoi creare soltanto dashboards pubbliche in quanto non hai nessuna organizzazione associata</span>
                                        </div>
                                    }
                                    </div>
                                </div>
                                {this.state.pvtDash == 1 &&
                                    <div className="form-group row">
                                        <label className="col-md-2 form-control-label">Organizzazione</label>
                                        <div className="col-md-8">
                                            <select className="form-control" ref={(orgDash) => this.orgDash = orgDash} onChange={(e) => this.onOrganizationChange(e, e.target.value, 1)} id="orgDash" >
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
                            <button className='btn btn-gray-200' onClick={this.hideModalDash}>
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
                    {(isEditor() || isAdmin()) &&
                    <div className="col-3">
                        <div className="card text-center">
                            <h3 className="card-title pt-4">Dataset</h3>
                            <div className="card-body pb-4">
                                <button className="btn btn-primary" onClick={() => { this.props.history.push("/private/ingestionwizzard")}}>Crea scheda e carica</button>
                            </div>
                        </div>
                    </div>
                    }
                    <div className="col-3">
                        <div className="card text-center">
                            <h3 className="card-title pt-4">Dashboard</h3>
                            <div className="card-body pb-4">
                                <button className="btn btn-primary" onClick={this.openModalDash.bind(this)}>Crea</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="card text-center">
                            <h3 className="card-title pt-4">Storia</h3>
                            <div className="card-body pb-4">
                                <button className="btn btn-primary" onClick={this.openModalStory.bind(this)}>Crea</button>
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
