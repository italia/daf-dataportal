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
            userpassword: '',
            role: '',
            userModal: false,
            createUser: false,
            userEdit: false,
            query: '',
            filter: [],
            create: '',
            edit: '',
            delete: '',
            message: '',
            saving: false
        }

        this.load()
        
        this.openUserCreate = this.openUserCreate.bind(this)
        this.openUserModal = this.openUserModal.bind(this)
        this.closeUserModal = this.closeUserModal.bind(this)
        this.delete = this.delete.bind(this)
        this.save = this.save.bind(this)
        this.edit = this.edit.bind(this)
    }

    save(){
        const { uid, givenname, mail,sn, userpassword, role} = this.state
        const json =  {
            uid: uid,
            givenname: givenname,
            sn: sn,
            mail: mail,
            userpassword: userpassword,
            role: role
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
                    role: '',
                    createUser: false,
                    create: json.fields,
                    edit: '',
                    delete:'',
                    saving: false
                })
                this.load();
            }else{
                this.setState({
                    create: 'ko',
                    edit: '',
                    delete: '',
                    saving: false,
                    message: json.message
                })
                console.log('Create Error: ' + json.message)
            }
        })

    }

    load(){
        const users = userService.users("default_org")
        var userList = []
        users.then((json)=>{
            json.member_user.map(user => {
                if (user.indexOf("default_admin") === -1) {
                    userList.push(user)
                }
                this.setState({
                    users: userList,
                    filter: userList
                })
            })
        })
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
            userAct: user
        })
        let response = userService.userDetail(user);
        response.then((json) => {
            this.setState({
                givenname: json.givenname,
                sn: json.sn,
                role: json.role
            })
        })
    }

    edit(){
        const { userAct, givenname, sn, role } = this.state
        var json = {
            givenname: givenname,
            sn: sn,
            role: role
        }
        let response = userService.saveChanges(userAct, json)
        this.setState({
            saving: true
        })
        response.then((json)=>{
            if(json.fields){
                this.setState({
                    userEdit: false,
                    givenname: '',
                    sn: '',
                    role: '',
                    edit: json.fields,
                    create: '',
                    delete: '',
                    saving: false
                })
            }else{
                this.setState({
                    edit: 'ko',
                    create: '',
                    delete: '',
                    message: json.message,
                    saving: false
                })
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
            }
        })
    }

    render() {
        const { loggedUser } = this.props
        const { users, filter, userAct, userModal, userEdit, createUser, uid, givenname, sn, mail, userpassword, role} = this.state
    
        return (
            <div>
                {this.state.create === 'ok' && <div className="col-sm-10">
                    <div className="alert alert-success" role="alert">
                        <i className="fa fa-check-circle fa-lg m-t-2"></i> Utente creata con successo
                    </div>
                </div>}
                {this.state.create === 'ko' && <div className="col-sm-10">
                    <div className="alert alert-danger" role="alert">
                        <i className="fa fa-times-circle fa-lg m-t-2"></i> Si è verificato un errore nella creazione dell'utente: {this.state.message}
                    </div>
                </div>}
                {this.state.delete === 'ok' && <div className="col-sm-10">
                    <div className="alert alert-success" role="alert">
                        <i className="fa fa-check-circle fa-lg m-t-2"></i> Utente eliminata con successo
                    </div>
                </div>}
                {this.state.delete === 'ko' && <div className="col-sm-10">
                    <div className="alert alert-danger" role="alert">
                        <i className="fa fa-times-circle fa-lg m-t-2"></i> Non è stato possibile eliminare l'utente: {this.state.message}
                    </div>
                </div>}
                {this.state.edit === 'ok' && <div className="col-sm-10">
                    <div className="alert alert-success" role="alert">
                        <i className="fa fa-check-circle fa-lg m-t-2"></i> Utente modificato con successo
                    </div>
                </div>}
                {this.state.edit === 'ko' && <div className="col-sm-10">
                    <div className="alert alert-danger" role="alert">
                        <i className="fa fa-times-circle fa-lg m-t-2"></i> Si è verificato un errore nella modifica dell'utente: {this.state.message}
                    </div>
                </div>}
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
                        <label htmlFor="example-search-input" className="mb-3">Utenti</label>
                        <ul className="list-group">
                            <li className="list-group-item"><input className="form-control" onChange={(e)=>{this.searchBy(e.target.value)}}></input></li>
                            {filter && filter.length > 0 && filter.map(user =>
                                <li className={"list-group-item " + (userAct===user?"active":"")} key={user} >{user}
                                    <button type="button" className={"btn float-right " + ((userAct === user ? "btn-active" : "btn-link"))} onClick={() => { this.editUser(user) }}><i className="fa fa-pencil fa-lg" /></button>
                                    <button type="button" className={"btn float-right " + ((userAct === user ? "btn-active" : "btn-link"))} onClick={() => { this.openUserModal(user) }}><i className="fa fa-trash fa-lg" /></button>
                                </li>
                            )
                            }
                        </ul>
                        <button type="button" className="btn btn-link float-right mt-3" title="Crea nuovo utente" onClick={this.openUserCreate}>
                            <i className="fa fa-plus-circle fa-lg"></i>
                        </button>
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
                                <label className="col-3 col-form-label">Password</label>
                                <div className="col-6">
                                    <input className="form-control" type="password" value={userpassword} onChange={(e)=>{this.setState({ userpassword: e.target.value})}}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-3 col-form-label">Ruolo</label>
                                <div className="col-6">
                                    <select className="form-control" value={role} onChange={(e) => { this.setState({ role: e.target.value }) }}>
                                        <option value=""></option>
                                        <option value="daf_admins">daf_admins</option>
                                        <option value="daf_editors">daf_editors</option>
                                        <option value="daf_viewers">daf_viewers</option>
                                    </select>                                
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary" onClick={this.save}>{this.state.saving&&<i className="fa fa-spinner fa-spin fa-lg"/>}{!this.state.saving&&"Crea"}</button>
                        </div>
                    </div>}
                    {userEdit && 
                    <div className="col-7">
                        <div className="form-group form-control ml-5">
                            <h3 className="mb-3">Modifica l'utente <b>{userAct}</b></h3>
                            <div className="form-group row">
                                <label className="col-3 col-form-label">Nome</label>
                                <div className="col-6">
                                    <input className="form-control" type="search" value={givenname} onChange={(e) => { this.setState({ givenname: e.target.value }) }} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-3 col-form-label">Cognome</label>
                                <div className="col-6">
                                    <input className="form-control" type="search" value={sn} onChange={(e) => { this.setState({ sn: e.target.value }) }} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-3 col-form-label">Ruolo</label>
                                <div className="col-6">
                                    <select className="form-control" value={role} onChange={(e) => { this.setState({ role: e.target.value }) }}>
                                        <option value="daf_admins">daf_admins</option>
                                        <option value="daf_editors">daf_editors</option>
                                        <option value="daf_viewers">daf_viewers</option>
                                    </select>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary" onClick={this.edit}>{this.state.saving && <i className="fa fa-spinner fa-spin fa-lg" />}{!this.state.saving &&"Modifica"}</button>
                        </div>
                    </div>}
                </div>
            </div>
        )
    }
}

Users.propTypes = {
  loggedUser: PropTypes.object,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const loggedUser = state.userReducer['obj'].loggedUser || { }
    const properties = state.propertiesReducer ? state.propertiesReducer['prop'] || {} : {} 
    return { loggedUser, properties }
}

export default connect(mapStateToProps)(Users)
