import React, { Component } from 'react';
import { connect } from 'react-redux'
import { roles, isSysAdmin, isAdmin } from '../../utility'
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalClose,
    ModalBody,
    ModalFooter 
} from 'react-modal-bootstrap';
import { toastr } from 'react-redux-toastr'
import UserService from "./services/UserService";

const userService = new UserService()

class Users extends Component {

    constructor(props){
        super(props)
        this.state = {
            users: [],
            userAct: "",
            uid: '',
            givenname: '',
            sn: '',
            mail: '',
            userOrganizations:[],
            userRoles:[],
            newUserRoles:[],
            userpassword: '',
            repeatPassword: '',
            role: '',
            checked: true,
            userModal: false,
            createUser: false,
            userEdit: false,
            query: '',
            filter: [],
            create: '',
            edit: '',
            delete: '',
            message: '',
            pswok: true,
            enableSave: true,
            saving: false,
            loading: true
        }

        this.load()
        
        this.openUserCreate = this.openUserCreate.bind(this)
        this.openUserModal = this.openUserModal.bind(this)
        this.closeUserModal = this.closeUserModal.bind(this)
        this.delete = this.delete.bind(this)
        this.save = this.save.bind(this)
        this.edit = this.edit.bind(this)
        this.checkDoublePassword = this.checkDoublePassword.bind(this)
        this.validatePsw = this.validatePsw.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    save(){
        const { uid, givenname, mail,sn, userpassword} = this.state
        const json =  {
            uid: uid,
            givenname: givenname,
            sn: sn,
            mail: mail,
            userpassword: userpassword
        }
        let response = userService.saveUser(json)
        this.setState({
            saving: true
        })
        response.then((json)=>{
            if(json.fields){
                this.setState({
                    uid: '',
                    givenname: '',
                    sn: '',
                    mail: '',
                    userpassword: '',
                    repeatPassword: '',
                    role: '',
                    createUser: false,
                    create: json.fields,
                    edit: '',
                    delete:'',
                    saving: false
                })
                toastr.success('Completato', 'Utente creato con successo')
                this.load();
            }else{
                this.setState({
                    create: 'ko',
                    edit: '',
                    delete: '',
                    saving: false,
                    message: json.message
                })
                toastr.error('Errore', 'Si è verificato un errore nella creazione dell\'utente: ' + json.message)
                console.log('Create Error: ' + json.message)
            }
        })

    }



    load(){
        const { loggedUser } = this.props
        this.setState({
            loading: true
        })
        if(isSysAdmin(loggedUser)){
            const users = userService.users("open_data_group")
            var userList = []
            users.then((json)=>{
                json.member_user.map(user => {
                    if (user.indexOf("default_admin") === -1) {
                        userList.push(user)
                    }
                })
                this.setState({
                    users: userList,
                    filter: userList,
                    loading: false
                })
            })
        }else if(isAdmin(loggedUser)){
            console.log('prendo gli utenti dove utente è admin')
            var userList = []
            loggedUser && loggedUser.roles.map((role) => {
                if(role.indexOf('daf_adm_')>-1){
                    const users = userService.users(role.replace('daf_adm_',''))
                    users.then((json)=>{
                        json.member_user.map(user => {
                            if (user.indexOf("default_admin") === -1) {
                                userList.push(user)                            }
                            })
                        this.setState({
                            users: userList,
                            filter: userList,
                            loading: false
                        })
                        })
                    }
                })
            console.log('load terminato')
        } else {
            console.log('Utente non amministratore')
            this.setState({
                loading: false
            })
        }
    }

    openUserCreate(){
        this.setState({
            createUser: true,
            userEdit: false,
            uid: '',
            givenname: '',
            sn: '',
            mail: '',
            userpassword: '',
            repeatPassword: '',
            role: '',
        })
    }

    openUserModal(user) {
        this.setState({
            userAct: user,
            userModal: true,
            createUser: false,
            userEdit: false,
        })
    }

    closeUserModal() {
        this.setState({
            userModal: false,
        })
    }

    searchBy(val) {
        const { users } = this.state;
        var res = []
        var result = users.reduce(function (r, e) {
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

    editUser(user){
        this.setState({
            userEdit: true,
            createUser: false,
            userAct: user,
            userRoles: [],
            newUserRoles: []
        })
        let response = userService.userDetail(user);
        response.then((json) => {
            this.setState({
                givenname: json.givenname,
                sn: json.sn,
                role: json.role,
                uid: json.uid,
                userOrganizations: json.organizations,
                userRoles: json.roles,
                newUserRoles: json.roles
            })
        })
    }

    edit(){
        this.setState({
            edit:undefined
        })
        var rolesToAdd=[]
        var rolesToDelete=[]
        if(this.state.newUserRoles && this.state.newUserRoles.length>0){
            for(var i=0;i<this.state.newUserRoles.length;i++){
                if(this.state.userRoles.indexOf(this.state.newUserRoles[i])===-1){
                    rolesToAdd.push(this.state.newUserRoles[i])
                }
            }
            for(var j=0;j<this.state.userRoles.length;j++){
                if(this.state.newUserRoles.indexOf(this.state.userRoles[j])===-1){
                    rolesToDelete.push(this.state.userRoles[j])
                }
            }
        }
        const { userAct, givenname, sn } = this.state
        const { loggedUser } = this.props

        if(isSysAdmin(loggedUser)){
            var json = {
                givenname: givenname,
                sn: sn,
                rolesToAdd: rolesToAdd,
                rolesToDelete: rolesToDelete
            }
        } else {
            var json = {
                rolesToAdd: rolesToAdd,
                rolesToDelete: rolesToDelete
            }
        }
        let response = userService.saveChanges(userAct, json)
        this.setState({
            saving: true
        })
        response.then((json)=>{
            if(json.fields){
                this.setState({
                    userEdit: true,
                    edit: json.fields,
                    create: '',
                    delete: '',
                    saving: false
                })
                toastr.success('Completato', 'Utente modificato con successo')
            }else{
                this.setState({
                    userEdit: true,
                    edit: 'ko',
                    create: '',
                    delete: '',
                    message: json.message,
                    saving: false
                })
                toastr.error('Errore', 'Errore durante la modifica dell\'utente: ' + json.message)
                console.log('Edit error: ' + json.message)
            }
        }) 

    }

    delete(){
        const { userAct } = this.state
        let response = userService.deleteUser(userAct)
        this.setState({
            saving: true
        })
        response.then((json)=>{
            if(json.fields){
                this.setState({
                    userAct: '',
                    userModal: false,
                    delete: json.fields,
                    create: '',
                    edit: '',
                    saving: false
                })
                toastr.success('Completato', 'Utente eliminato con successo')
                this.load();
            }else{
                this.setState({
                    userAct: '',
                    userModal: false,
                    delete: 'ko',
                    message: json.message,
                    create: '',
                    edit: '',
                    saving: false
                })
                toastr.error('Errore', 'Errore durante l\'eliminazione dell\'utente: ' + json.message)
            }
        })
    }

    checkDoublePassword(repeatPassword){
        const { userpassword } = this.state;
        if(userpassword === repeatPassword){
            this.setState({
                checked: true,
                enableSave: false
            })
        }
        else{
            this.setState({
                checked: false,
                enableSave: true,
            })
        }
    }

    validatePsw(val){
        // pattern to match : Atleast one capital letter, one number and 8 chars length
        if(val!==''){
            var reg = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9%@#,;:_'/<([{^=$!|}.>-]{8,}$")
            if (reg.test(val)) {
                this.setState({
                    pswok: true,
                })
            }
            else {
                this.setState({
                    pswok: false,
                    enableSave: true,
                })
            }
        }else
            this.setState({
                pswok: true,
                enableSave: true
            })
    }

    handleChange(org,e){
        console.log('aggiungo nuovo ruolo: ' + e.target.value);
        var r = this.state.newUserRoles.filter((role)=>{
            return !role.endsWith(org)
        });
        r.push(e.target.value)
        this.setState({
            newUserRoles: r
        })
      }

    render() {
        const { loggedUser } = this.props
        const { users, filter, loading, userAct, userModal, userEdit, createUser, uid, givenname, sn, mail, userpassword, repeatPassword, checked, role, userOrganizations, userRoles, newUserRoles} = this.state
        console.log('userRoles: ' + userRoles)
        console.log('newUserRoles: ' + newUserRoles)
        return (
            <div>
                <Modal
                    contentLabel="Delete Organization"
                    className="Modal__Bootstrap modal-dialog modal-60"
                    isOpen={userModal}>
                    <form>
                        <ModalHeader>
                            <ModalTitle>Cancellazione Utente</ModalTitle>
                            <ModalClose onClick={this.closeUserModal} />
                        </ModalHeader>
                        <ModalBody>
                            Sei sicuro di voler eliminare l'utente <b>{userAct}</b> ?
                        </ModalBody>
                        <ModalFooter>
                        <button className='btn btn-danger' onClick={this.delete}>
                            {this.state.saving && <i className="fa fa-spinner fa-spin fa-lg" />}{!this.state.saving && "Cancella l'utente"}
                        </button>
                        <button className='btn btn-secondary' onClick={this.closeUserModal}>
                            Annulla
                        </button>
                        </ModalFooter>
                    </form>
                </Modal>
                <div className="row">
                    <div className="form-group ml-3">
                        <div className="row m-0">
                            <div className="col-5">
                                <label htmlFor="example-search-input">Utenti</label>
                            </div>
                            <div className="col-7">
                                {isSysAdmin(loggedUser) &&
                                <button type="button" className="btn btn-link fa-pull-right p-0" title="Crea nuovo utente" onClick={this.openUserCreate}>
                                    <i className="fa fa-plus-circle fa-lg"></i>
                                </button>
                                }
                            </div>
                        </div>
                        <ul className="list-group">
                            <li className="list-group-item"><input className="form-control" onChange={(e)=>{this.searchBy(e.target.value)}}></input></li>
                            
                            {loading?<h1 className="text-center fixed-middle"><i className="fas fa-circle-notch fa-spin mr-2"/>Caricamento</h1>:filter && filter.length > 0 && filter.map(user =>
                                <li className={"list-group-item " + (userAct===user?"active":"")} key={user} >{user}
                                    <button type="button" className={"btn float-right " + ((userAct === user ? "btn-active" : "btn-link"))} onClick={() => { this.editUser(user) }}><i className="fa fa-edit fa-lg" /></button>
                                    <button type="button" className={"btn float-right " + ((userAct === user ? "btn-active" : "btn-link"))} onClick={() => { this.openUserModal(user) }}><i className="fa fa-trash fa-lg" /></button>
                                </li>
                            )
                            }
                        </ul>
                        {isSysAdmin(loggedUser) &&
                        <button type="button" className="btn btn-link float-right mt-3" title="Crea nuovo utente" onClick={this.openUserCreate}>
                            <i className="fa fa-plus-circle fa-lg"></i>
                        </button>
                        }
                    </div>
                    {createUser && 
                    <div className="col-7">
                        <div className="form-group form-control ml-5">
                            <h3 className="mb-3">Creazione utente</h3>
                            <div className="form-group row">
                                <label className="col-3 col-form-label">Nome</label>
                                <div className="col-6">
                                    <input className="form-control" type="search" value={givenname} onChange={(e) => { this.setState({ givenname: e.target.value }) }}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-3 col-form-label">Cognome</label>
                                <div className="col-6">
                                    <input className="form-control" type="search" value={sn} onChange={(e) => { this.setState({ sn: e.target.value }) }}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-3 col-form-label">User ID</label>
                                <div className="col-6">
                                    <input className="form-control" type="search" value={uid} onChange={(e) => { this.setState({ uid: e.target.value }) }}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-3 col-form-label">Email</label>
                                <div className="col-6">
                                    <input className="form-control" type="mail" value={mail} onChange={(e) => { this.setState({ mail: e.target.value }) }}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-3 col-form-label">Password <button className="btn btn-link p-0" data-toggle="tooltip" data-placement="top" title="La password deve essere lunga almeno 8 caratteri e contenere almeno un lettera maiuscola e un numero"><i className="fa fa-info-circle"/></button></label>
                                <div className="col-6">
                                    <input className="form-control" type="password" value={userpassword} onChange={(e) => { this.setState({ userpassword: e.target.value, checked: e.target.value === '' ? true : false}); this.validatePsw(e.target.value) }}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-3 col-form-label">Ripeti Password</label>
                                <div className="col-6">
                                    <input className="form-control" type="password" value={repeatPassword} onChange={(e) => { this.setState({ repeatPassword: e.target.value }); this.checkDoublePassword(e.target.value) }} />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary" disabled={this.state.enableSave} onClick={this.save}>{this.state.saving&&<i className="fa fa-spinner fa-spin fa-lg"/>}{!this.state.saving&&"Crea"}</button>
                        </div>
                        <div hidden={checked} className="ml-5 w-100">
                            <div className="alert alert-danger" role="alert">
                                <i className="fa fa-times-circle fa-lg m-t-2"></i> Le password inserite non corrispondono, verificare il corretto inserimento
                            </div>
                        </div>
                        <div hidden={this.state.pswok} className="ml-5 w-100">
                            <div className="alert alert-warning" role="alert">
                                <i className="fa fa-times-circle fa-lg m-t-2"></i> La password inserita non rispetta le linee guida: <br/>
                                <ul>
                                    <li>Almeno 8 caratteri</li>
                                    <li>Almeno una lettera maiuscola</li>
                                    <li>Almeno un numero</li>
                                    <li>I caratteri speciali consentiti sono: "{"%@#,;:_\'/<([{^=$!|}.>-"}"</li>
                                </ul>
                            </div>
                        </div>
                    </div>}
                    {userEdit && 
                    <div className="col-7">
                        <div className="form-group form-control ml-5">
                            <h3 className="mb-3">Modifica l'utente <b>{userAct}</b></h3>
                            <div className="form-group row">
                                <label className="col-3 col-form-label">Nome</label>
                                <div className="col-6">
                                    <input className="form-control" type="search" disabled={!isSysAdmin(loggedUser)} value={givenname} onChange={(e) => { this.setState({ givenname: e.target.value }) }} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-3 col-form-label">Cognome</label>
                                <div className="col-6">
                                    <input className="form-control" type="search" disabled={!isSysAdmin(loggedUser)} value={sn} onChange={(e) => { this.setState({ sn: e.target.value }) }} />
                                </div>
                            </div>
                            {/* <div className="form-group row">
                                <label className="col-3 col-form-label">Ruolo</label>
                                <div className="col-6">
                                    <select className="form-control" value={role} onChange={(e) => { this.setState({ role: e.target.value }) }}>
                                        <option value="daf_admins">daf_admins</option>
                                        <option value="daf_editors">daf_editors</option>
                                        <option value="daf_viewers">daf_viewers</option>
                                    </select>
                                </div>
                            </div> */}
                            {userOrganizations && userOrganizations.length>0 && 
                            <div className="form-group row">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                        <th scope="col">Organizzazione</th>
                                        <th scope="col">Ruolo</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userOrganizations.map((org, index) => { 
                                        var roleInOrg = ''
                                        return <tr key={index}>
                                                    <td>{org}</td>
                                                     <td>
                                                        <select onChange={this.handleChange.bind(this,org)} id={'select_' + uid + '_' + org}>
                                                            <option value=""  defaultValue></option>
                                                            {roles.map(role => {
                                                                if(role.key !== 'daf_sys_admin')
                                                                    return userRoles.indexOf(role.key+'_' + org)>-1?<option value={role.key+'_'+org} key={role.key+'_'+org} selected>{role.label}</option>: <option value={role.key+'_'+org} key={role.key+'_'+org}>{role.label}</option>
                                                                }    
                                                            )}
                                                        </select>
                                                    </td> 
                                            </tr>
                                        }
                                    )}
                                    </tbody>
                                </table>
                            </div>
                            }
                            <button type="submit" className="btn btn-primary" onClick={this.edit}>{this.state.saving && <i className="fa fa-spinner fa-spin fa-lg" />}{!this.state.saving &&"Modifica"}</button>
                        </div>
                    </div>}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const loggedUser = state.userReducer['obj'].loggedUser || { }
    const properties = state.propertiesReducer ? state.propertiesReducer['prop'] || {} : {} 
    return { loggedUser, properties }
}

export default connect(mapStateToProps)(Users)
