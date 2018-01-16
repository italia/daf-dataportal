import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchProperties } from '../../actions';
import { serviceurl } from '../../config/serviceurl'
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalClose,
    ModalBody,
    ModalFooter 
} from 'react-modal-bootstrap';
import Select from 'react-select'
import OrganizationService from "./services/OrganizationService";

const organizationService = new OrganizationService()

class Organizations extends Component {
    constructor(props){
        super(props)
        this.state = {
            organizations: this.props.loggedUser.organizations,
            users: [],
            allUsers: [],
            org: "",
            user: "",
            orgModal: false,
            userModal: false,
            userEdit: false,
            createOrg: false,
            query: '',
            filter: this.props.loggedUser.organizations,
            nome:'',
            mail:'',
            psw:'',
            create: '',
            add: '',
            remove: '',
            delete: '',
        }

        this.load()
        
        this.openOrgCreate = this.openOrgCreate.bind(this)
        this.openOrgModal = this.openOrgModal.bind(this)
        this.closeOrgModal = this.closeOrgModal.bind(this)
        this.openUserModal = this.openUserModal.bind(this)
        this.closeUserModal = this.closeUserModal.bind(this)
        this.updateValue = this.updateValue.bind(this)
    }

    load(){
        const { loggedUser } = this.props
        if(loggedUser.role !='daf_editors'){
            let response = organizationService.organizations();
            response.then((json)=> {
                this.setState({
                    organizations: json.orgs,
                    filter: json.orgs
                });
            });
        }
        const users = organizationService.users("default_org")
        let allUsers = []
        let tmp = {}
        users.then((json)=>{
            json.member_user.map(user => {
                if (user.indexOf("default_admin") === -1){
                    tmp = {
                        'value': user,
                        'label': user
                    }
                    allUsers.push(tmp);
                }
            })
            this.setState({
                allUsers: allUsers,
            })
        })
    }

    getUsers(org) {
        let response = organizationService.users(org)
        response.then((json) => {
            this.setState({
                userEdit: true,
                createOrg: false,
                users: json.member_user,
                org: org,
            });
        });
    }

    removeUser(user){
        const { org } = this.state
        let response = organizationService.userDel(org, user)
        response.then((json) => {
            if (json.code != '0') {
                this.getUsers(org);
                this.setState({
                    remove: json.fields,
                    add: '',
                    create:'',
                    delete:''
                })
            }else{
                this.getUsers(org);
                this.setState({
                    remove: 'ko',
                    add: '',
                    create: '',
                    delete: ''
                })
                console.log('User remove error: ' + json.message)
            }
        })
    }

    add(){
        const { user, org } = this.state;
        let response = organizationService.userAdd(org, user)
        response.then((json) =>{
            if(json.code!= '0'){
                this.getUsers(org)
                this.setState({
                    add: json.fields,
                    create: '',
                    remove: '',
                    delete: '',
                    user: '',
                    userModal: false
                })
            }else{
                this.getUsers(org);
                this.setState({
                    add: 'ko',
                    create: '',
                    remove: '',
                    delete: '',
                    user: '',
                    userModal: false
                })
                console.log('User Add error: '+json.message)
            }   
        })
    }

    createOrg(){
        const { nome, mail, psw } = this.state
        let organization = {
            groupCn: nome,
            predefinedUserPwd: psw,
            predefinedUserMail: mail,
            supSetConnectedDbName: "default"
        }
        let response = organizationService.create(organization);
        response.then((json) => {
            if(json.code!='0'){
                this.setState({
                    remove: '',
                    add: '',
                    create: 'ok',
                    delete: '',
                    nome: '',
                    mail: '',
                    psw: '',
                });
                this.load();
                }else{
                    this.setState({
                        remove: '',
                        add: '',
                        create: 'ko',
                        delete: '',
                    })
                    console.log('Create org error: '+ json.message)
                }
            }
        )
    }

    deleteOrg(){
        const { org } = this.state
        let response = organizationService.delete(org);
        response.then((json) => {
            if (!json.code) {
                this.setState({
                    orgModal: false,
                    remove: '',
                    add: '',
                    create: '',
                    delete: 'ok',
                    message: json.message
                })
                this.load();
            }else{
                this.setState({
                    orgModal: false,
                    remove: '',
                    add: '',
                    create: '',
                    delete: 'ko',
                    message: json.message
                })
                this.load();
            }
        })
    }

    openOrgCreate(){
        this.setState({
            createOrg: true,
            userEdit: false,
        })
    }

    openOrgModal(org) {
        this.setState({
            org: org,
            orgModal: true,
        })
    }

    closeOrgModal() {
        this.setState({
            orgModal: false,
        })
    }

    openUserModal() {
        this.setState({
            userModal: true,
            add: ''
        })
    }

    closeUserModal() {
        this.setState({
            userModal: false,
        })
    }

    searchBy(val) {
        const { organizations } = this.state;
        var res = []
        var result = organizations.reduce(function (r, e) {
            if (e.toLowerCase().indexOf(val) != -1) {
                res.push(e)
            }
            return res;
        }, {})
        this.setState({
            query: val,
            filter: result
        })
        return result;
    }

    updateValue(newValue) {
        this.setState({
            user: newValue,
        });
    }

    render() {
        const { loggedUser } = this.props
        const { users, allUsers, organizations, filter, user, org, orgModal, userModal, userEdit, createOrg} = this.state
    
        return (
            <div>
                {this.state.create === 'ok' && <div className="col-sm-10">
                    <div className="alert alert-success" role="alert">
                        <i className="fa fa-check-circle fa-lg m-t-2"></i> Organizzazione creata con successo
                    </div>
                </div>}
                {this.state.create === 'ko' && <div className="col-sm-10">
                    <div className="alert alert-danger" role="alert">
                        <i className="fa fa-times-circle fa-lg m-t-2"></i> Si è verificato un errore nella creazione dell'organizzazione
                    </div>
                </div>}
                {this.state.delete === 'ok' && <div className="col-sm-10">
                    <div className="alert alert-success" role="alert">
                        <i className="fa fa-check-circle fa-lg m-t-2"></i> Organizzazione eliminata con successo
                    </div>
                </div>}
                {this.state.delete === 'ko' && <div className="col-sm-10">
                    <div className="alert alert-danger" role="alert">
                        <i className="fa fa-times-circle fa-lg m-t-2"></i> Non è stato possibile eliminare l'organizzazione: {this.state.message}
                    </div>
                </div>}
                {this.state.add==='ok' && <div className="col-sm-10">
                    <div className="alert alert-success" role="alert">
                        <i className="fa fa-check-circle fa-lg m-t-2"></i> Utente aggiunto correttamente all'organizzazione
                    </div>
                </div>}
                {this.state.add === 'ko' && <div className="col-sm-10">
                    <div className="alert alert-danger" role="alert">
                        <i className="fa fa-times-circle fa-lg m-t-2"></i> Si è verificato un errore nell'inserimento dell'utente
                    </div>
                </div>}
                {this.state.remove === 'ok' && <div className="col-sm-10">
                    <div className="alert alert-success" role="alert">
                        <i className="fa fa-check-circle fa-lg m-t-2"></i> Utente rimosso correttamente dall'organizzazione
                    </div>
                </div>}
                {this.state.remove === 'ko' && <div className="col-sm-10">
                    <div className="alert alert-danger" role="alert">
                        <i className="fa fa-times-circle fa-lg m-t-2"></i> Si è verificato un errore nella rimozione dell'utente
                    </div>
                </div>}
                <Modal
                    contentLabel="Delete Organization"
                    className="Modal__Bootstrap modal-dialog modal-60"
                    isOpen={orgModal}>
                    <form>
                        <ModalHeader>
                            <ModalTitle>Cancellazione</ModalTitle>
                            <ModalClose onClick={this.closeOrgModal.bind(this)} />
                        </ModalHeader>
                        <ModalBody>
                            Sei sicuro di voler eliminare l'organizzazione <b>{org}</b> ?
                        </ModalBody>
                        <ModalFooter>
                        <button className='btn btn-danger' onClick={this.deleteOrg.bind(this)}>
                            Cancella l'organizzazione
                        </button>
                            <button className='btn btn-secondary' onClick={this.closeOrgModal.bind(this)}>
                                Annulla
                        </button>
                        </ModalFooter>
                    </form>
                </Modal>
                <Modal
                    contentLabel="Add a User"
                    className="Modal__Bootstrap modal-dialog modal-60"
                    isOpen={userModal}>
                        <ModalHeader>
                            <ModalTitle>Aggiungi un utente all'organizzazione <b>{org}</b></ModalTitle>
                            <ModalClose onClick={this.closeUserModal} />
                        </ModalHeader>
                        <ModalBody>
                            <Select
                                id="state-select"
                                onBlurResetsInput={false}
                                onSelectResetsInput={false}
                                options={allUsers}
                                simpleValue
                                clearable={true}
                                name="selected-user"
                                value={this.state.user}
                                onChange={this.updateValue}
                                rtl={false}
                                searchable={true}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <button className='btn btn-primary' onClick={this.add.bind(this)}>
                                Aggiungi utente
                            </button>
                            <button className='btn btn-secondary' onClick={this.closeUserModal}>
                                Annulla
                            </button>
                        </ModalFooter>
                </Modal>
                <div className="row">
                    <div className="form-group ml-3">
                        <label htmlFor="example-search-input" className="col-2 mb-3">Organizzazioni</label>
                        <ul className="list-group">
                            <li className="list-group-item"><input className="form-control" onChange={(e)=>{this.searchBy(e.target.value)}}></input></li>
                            {filter && filter.length > 0 && filter.map(organization => {
                                if(organization!="default_org")
                                    return(
                                <li className={"list-group-item "+ (org===organization?"active":"")} key={organization}>{organization}
                                    <button type="button" className={"float-right " + ((org === organization ? "btn-active" : "btn-link"))} onClick={()=>{this.getUsers(organization)}}><i className="fa fa-user-plus fa-lg" /></button>
                                    {loggedUser.role==='daf_admins'&&<button type="button" className={"float-right " + ((org === organization ? "btn-active" : "btn-link"))} onClick={()=>{this.openOrgModal(organization)}}><i className="fa fa-trash fa-lg" /></button>}
                                </li>);
                                })
                            }
                        </ul>
                        {loggedUser.role==='daf_admins'&&<button type="button" className="btn-link float-right mt-3" title="Crea nuova organizzazione" onClick={this.openOrgCreate}>
                            <i className="fa fa-plus-circle fa-lg"></i>
                        </button>}
                    </div>
                    {createOrg && 
                    <div className="col-7">
                        <div className="form-group form-control ml-5">
                            <label htmlFor="example-search-input" className="mb-3">Crea organizzazione</label>
                            <div className="form-group row">
                                <label className="col-3 col-form-label">Nome dell'organizzazione</label>
                                <div className="col-6">
                                    <input className="form-control" type="search" value={this.state.nome} onChange={(e)=>{this.setState({nome:e.target.value})}}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-3 col-form-label">Email amministratore</label>
                                <div className="col-6">
                                    <input className="form-control" type="mail" value={this.state.mail} onChange={(e) => { this.setState({ mail: e.target.value }) }}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-3 col-form-label">Password amministratore</label>
                                <div className="col-6">
                                    <input className="form-control" type="password" value={this.state.psw} onChange={(e) => { this.setState({ psw: e.target.value }) }}/>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary" onClick={this.createOrg.bind(this)}>Crea</button>
                        </div>
                    </div>}  
                    {userEdit && 
                    <div className="form-group ml-5">
                        <label htmlFor="example-search-input" className="col-2 mb-3">Utenti</label>
                        <ul className="list-group">
                            {users && users.length > 0 && users.map(users => {
                                if (users.indexOf("default_admin") === -1)
                                    return(
                                        <li className="list-group-item" key={users}>{users}
                                            <button type="button" className="btn-link float-right" onClick={this.removeUser.bind(this, users)}><i className="fa fa-times fa-1" /></button>
                                        </li>)
                                }
                            )
                            }
                        </ul>
                        <button type="button" className="btn-link mt-3" title="Aggiungi nuovo utente" onClick={this.openUserModal}>
                            <i className="fa fa-plus-circle fa-lg" /> Aggiungi Utente
                        </button>
                    </div>}        
                </div>
            </div>
        )
    }
}

Organizations.propTypes = {
  loggedUser: PropTypes.object,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const loggedUser = state.userReducer['obj'].loggedUser || { }
    const properties = state.propertiesReducer ? state.propertiesReducer['prop'] || {} : {} 
    return { loggedUser, properties }
}

export default connect(mapStateToProps)(Organizations)
