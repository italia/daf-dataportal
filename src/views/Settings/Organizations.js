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
import { isAdmin, isSysAdmin } from '../../utility'
import { toastr } from 'react-redux-toastr'


const organizationService = new OrganizationService()

class Organizations extends Component {
    constructor(props){
        super(props)
        this.state = {
            organizations: [],
            users: [],
            allUsers: [],
            org: "",
            user: "",
            orgModal: false,
            userModal: false,
            userEdit: false,
            createOrg: false,
            query: '',
            filter: [],
            nome:'',
            nomeWG:'',
            mail:'',
            psw:'',
            repeatPassword: '',
            checked: true,
            pswok: true,
            create: '',
            add: '',
            remove: '',
            delete: '',
            disableSave: true,
            workgroupError:'',
            workgroups:[],
            removingUser:false,
            userToRemove:'',
            removingWg:false,
            wgToRemove:'',
            removingWgUser:false,
            workgroupUserToRemove:''
        }
        
        this.openOrgCreate = this.openOrgCreate.bind(this)
        this.openWGCreate = this.openWGCreate.bind(this)
        this.openOrgModal = this.openOrgModal.bind(this)
        this.closeOrgModal = this.closeOrgModal.bind(this)
        this.openUserModal = this.openUserModal.bind(this)
        this.closeUserModal = this.closeUserModal.bind(this)
        this.updateValue = this.updateValue.bind(this)
        this.validatePsw = this.validatePsw.bind(this)
        this.checkDoublePassword = this.checkDoublePassword.bind(this)
    }

    componentDidMount(){
        this.load()
    }

    load(){
        const { loggedUser } = this.props
        if(isSysAdmin(loggedUser)){
            console.log('utente sys admin, prendo tutte le organizzazioni')
            let response = organizationService.organizations();
            response.then((json)=> {
                this.setState({
                    organizations: json.elem,
                    filter: json.elem
                });
            });
        }else if(isAdmin(loggedUser)){
            console.log('prendo le organizzazioni dove utente è admin')
            var orgs = []
            loggedUser && loggedUser.roles.map((role) => {
                if(role.indexOf('daf_adm_')>-1){
                    orgs.push(role.replace('daf_adm_',''))
                }
                })
                this.setState({
                    organizations: orgs,
                    filter: orgs
                });
        }
        const users = organizationService.groupInfo("open_data_group")
        let allUsers = []
        let tmp = {}
        users.then((json)=>{
            json.member_user.map(user => {
                tmp = {
                    'value': user,
                    'label': user
                }
                allUsers.push(tmp);
            })
            this.setState({
                allUsers: allUsers,
            })
        })
    }

    getUsers(org) {
        let response = organizationService.groupInfo(org)
        response.then((json) => {
            this.setState({
                userEdit: true,
                createOrg: false,
                workgroupEdit: false,
                users: json.member_user,
                org: org,
                workgroupUsers: undefined,
                workgroupError:undefined,
                removeUserWG:undefined,
                selectedOrg:org
            });
        });
    }

    getWorkGroupUsers(workgroup){
         console.log(workgroup)
        let response = organizationService.groupInfo(workgroup)
        response.then((json) => { 
             this.setState({
                userEdit: false,
                createOrg: false,
                workgroupEdit: true,
                createWG: false,
                workgroupUsers: json.member_user,
                selectedWorkgroup: workgroup,
                removeUserWG:undefined

             }); 
        });  
    }

    getWorkgroups(org) {
        let response = organizationService.groupInfo(org)
        let orgUsers = []
        let tmp = {}
        response.then((json) => {
                json.member_user.map(user => {
                    tmp = {
                        'value': user,
                        'label': user
                    }
                    orgUsers.push(tmp);
                })
                this.setState({
                    orgUsers: orgUsers,
                })

            this.setState({
                userEdit: false,
                createOrg: false,
                workgroupEdit: true,
                createWG: false,
                workgroupUsers: undefined,
                workgroups: json.member_group,
                org: org,
                orgUsers: orgUsers,
                workgroupError:undefined,
                selectedWorkgroup: undefined,
                removeUserWG:undefined,
                selectedOrg:org,
                orgModal: false

            });
        });
    }

    removeWorkgroup(workgroup, selectedOrg){
        console.log('Elimino ' + workgroup)
        this.setState({
            workgroupError: undefined,
            removingWg:true,
            wgToRemove:workgroup
        })        
        let response = organizationService.workgroupDel(workgroup)
        response.then((response) => {
            if (response.ok) {
                this.setState({
                    workgroupError: undefined,
                    removingWg:false,
                    wgToRemove:''
                })    
                this.getWorkgroups(selectedOrg)
                toastr.success('Completato', 'Workgroup eliminato con successo')
            }else {
                response.json().then(json => {
                    console.log('ERRORE: ' + JSON.stringify(json))
                    if(json.code===1){
                        this.setState({
                            workgroupError: json.message,
                            removingWg:false,
                            wgToRemove:''
                        })
                        console.log('Errore durante l\'eliminazione del workgroup: ' + json.message)
                        toastr.error('Errore', 'Errore durante l\'eliminazione del workgroup: ' + json.message)
                    }else if(json.code===0){
                        this.setState({
                            workgroupError: json.message,
                            removingWg:false,
                            wgToRemove:''
                        })
                        console.log('Errore durante l\'eliminazione del workgroup: ' + json.message)
                        toastr.error('Errore', 'Errore durante l\'eliminazione del workgroup')
                    }else {
                        this.setState({
                            removingWg:false,
                            wgToRemove:''
                        })
                        console.log('Errore durante l\'eliminazione del workgroup')
                        toastr.error('Errore', 'Errore durante l\'eliminazione del workgroup')
                    }
                })
            }
        })
    }

    removeWorkgroupUser(workgroupuser, user){
        console.log('remove workgroupuser: ' + workgroupuser)
        this.setState({
            removingWgUser: true,
            workgroupUserToRemove: user
        })
        const { org } = this.state
        let response = organizationService.userDelWg(workgroupuser, user)
        response.then((response) => {
            if (response.ok) {
                this.setState({
                    removingWgUser:false,
                    workgroupUserToRemove:''
                })      
                toastr.success('Completato', 'Utente eliminato con successo dal workgroup')
                this.getWorkGroupUsers(workgroupuser)                   
            }else{
                response.json().then(json => {
                    if (json.code == '1') {
                        this.setState({
                            removingWgUser:false,
                            workgroupUserToRemove:''
                        })     
                        console.log('User remove WG error: ' + json.message)
                        toastr.error('Errore', 'Errore durante l\'eliminazione dell\'utente dal workgroup: ' + json.message)
                    }else  if (json.code == '0') {
                        this.setState({
                            removingWgUser:false,
                            workgroupUserToRemove:''
                        }) 
                        console.log('User remove WG error: ' + json.message)    
                        toastr.error('Errore', 'Errore durante l\'eliminazione dell\'utente dal workgroup')
                    }else {
                        this.setState({
                            removingWgUser:false,
                            workgroupUserToRemove:''
                        })  
                        console.log('User remove WG error')   
                        toastr.error('Errore', 'Errore durante l\'eliminazione dell\'utente dal workgroup')
                    }
                })
            }
        })   
    }

    removeUser(user){
        const { org } = this.state
        this.setState({
            removingUser:true,
            userToRemove:user
        })
        let response = organizationService.userDelOrg(org, user)
        response.then((response) => {
            if (response.ok) {
                response.json().then(json => {
                    if (json.code != '0') {
                        this.setState({
                            removingUser:false,
                            userToRemove:''
                        })
                        this.getUsers(org);
                        toastr.success('Completato', 'Utente eliminato con successo dall\'organizzazione')
                    }else{
                        this.setState({
                            removingUser:false,
                            userToRemove:''
                        })                        
                        this.getUsers(org);
                        toastr.error('Errore', 'Errore durante l\'eliminazione dell\'utente dall\'organizzazione: ' + json.message)
                        console.log('User remove error: ' + json.message)
                    }
                })
            }else{
                response.json().then(json => {
                    if (json.code == '1') {
                        this.setState({
                            removingUser:false,
                            userToRemove:''
                        })     
                        toastr.error('Errore', 'Errore durante l\'eliminazione dell\'utente dall\'organizzazione: ' + json.message)
                        console.log('User remove error: ' + json.message)
                    } else if (json.code == '0') {
                        this.setState({
                            removingUser:false,
                            userToRemove:''
                        })     
                        toastr.error('Errore', 'Errore durante l\'eliminazione dell\'utente dall\'organizzazione')
                        console.log('User remove error: ' + json.message)
                    } else {
                        this.setState({
                            removingUser:false,
                            userToRemove:''
                        })     
                        toastr.error('Errore', 'Errore durante l\'eliminazione dell\'utente dall\'organizzazione')
                        console.log('User remove error')
                    }
                })
            }
        })   
    }

    removeUserFromWorkgroups(user,org){
        let response = organizationService.groupInfo(org)
        response.then((json) => {
            json.member_group && json.member_group.length > 0 && json.member_group.map((wg) => {
                this.removeWorkgroupUser(wg, user)
            })
        })
    }

    add(org){
        const { user } = this.state;
        let response = organizationService.userAdd(org, user)
        this.setState({ saving: true })
        response.then((response) => {
            if (response.ok) {
                this.getUsers(org)
                this.setState({
                    user: '',
                    userModal: false,
                    saving: false
                })
                toastr.success('Completato', 'Utente aggiunto con successo all\'organizzazione')
            }else{
                response.json().then(json => {
                    if(json.code== '1'){
                        this.getUsers(org);
                        this.setState({
                            user: '',
                            userModal: false,
                            saving: false
                        })
                        console.log('User Add error: '+json.message)
                        toastr.error('Errore', 'Errore durante l\'aggiunta dell\'utente all\'organizzazione: ' + json.message)
                    
                    } else if(json.code== '0'){
                        this.getUsers(org);
                        this.setState({
                            user: '',
                            userModal: false,
                            saving: false
                        })
                        console.log('User Add error: '+json.message)
                        toastr.error('Errore', 'Errore durante l\'aggiunta dell\'utente all\'organizzazione')                    
                    } else {
                        this.setState({
                            user:'',
                            saving: false
                        })
                        toastr.error('Errore', 'Errore durante l\'aggiunta dell\'utente all\'organizzazione')
                        console.log('User Add error')
                    }
                })
            }
        })   
    }

    addWG(wg){
        const { user } = this.state;
        let response = organizationService.userAddWG(wg, user)
        this.setState({ saving: true })
        response.then((response) => {
            if (response.ok) {
                this.getWorkGroupUsers(wg)
                this.setState({
                    user: '',
                    userModal: false,
                    saving: false
                })
                toastr.success('Completato', 'Utente aggiunto con successo al workgroup')
            }else{
                response.json().then(json => {
                    if(json.code== '1'){
                        this.setState({
                            user: '',
                            userModal: false,
                            saving: false
                        })
                        console.log('User Add error: '+json.message)
                        toastr.error('Errore', 'Errore durante l\'aggiunta dell\'utente al workgroup: ' + json.message)
                    
                    } else  if(json.code== '0'){
                        this.setState({
                            user: '',
                            userModal: false,
                            saving: false
                        })
                        console.log('User Add error: '+json.message)
                        toastr.error('Errore', 'Errore durante l\'aggiunta dell\'utente al workgroup')
                    
                    } else {
                        this.setState({
                            user:'',
                            saving: false
                        })
                        toastr.error('Errore', 'Errore durante l\'aggiunta dell\'utente al workgroup')
                        console.log('User Add error')
                    }
                })
            }
        })   
    }

    createWG(selectedOrg){
        console.log('selectedOrg: ' + selectedOrg)
        console.log('wg: ' + this.state.nomeWG)
        const { psw } = this.state
        let workgroup = {
            groupCn: this.state.nomeWG,
            predefinedUserPwd: psw,
            supSetConnectedDbName: "default"
        }
        let response = organizationService.createWG(workgroup, selectedOrg);
        this.setState({saving: true})
        response.then((response) => {
            if (response.ok) {
                    this.setState({
                        saving: false,
                    });
                    this.getWorkgroups(selectedOrg)
                    toastr.success('Completato', 'Workgroup creato con successo')
            }else{
                response.json().then(json => {
                    if(json.code== '1'){
                        this.setState({
                            saving: false
                        })
                        console.log('Create wg error: '+ json.message)
                        toastr.error('Errore', 'Errore durante la creazione del workgroup: ' + json.message)
                    } else if(json.code== '0'){
                        this.setState({
                            saving: false
                        })
                        console.log('Create wg error: '+ json.message)
                        toastr.error('Errore', 'Errore durante la creazione del workgroup')
                    } else {
                        this.setState({
                            saving: false
                        })
                        toastr.error('Errore', 'Errore durante la creazione del workgroup')
                        console.log('Create wg error')
                    }
                })
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
        this.setState({saving: true})
        response.then((response) => {
            if (response.ok) {
                    this.setState({
                        saving: false,
                        createOrg: false                    
                    });
                    toastr.success('Completato', 'Organizzazione creata con successo')
                    this.load();
            }else{
                response.json().then(json => {
                    if(json.code=='1'){
                        this.setState({
                            saving: false

                        })
                        toastr.error('Errore', 'Errore durante la creazione dell\'organizzazione: ' + json.message)
                        console.log('Create org error: '+ json.message)
                    } else if(json.code=='0'){
                        this.setState({
                            saving: false

                        })
                        toastr.error('Errore', 'Errore durante la creazione dell\'organizzazione')
                        console.log('Create org error: '+ json.message)
                    } else {
                        this.setState({
                            saving: false
                        })
                        toastr.error('Errore', 'Errore durante la creazione dell\'organizzazione')
                        console.log('Create org error')
                    }
                })
            }
        })
    }

    deleteOrg(){
        const { org } = this.state
        let response = organizationService.delete(org);
        this.setState({ saving: true })
        response.then((response) => {
            if (response.ok) {
                this.setState({
                    orgModal: false,
                    saving: false
                })
                toastr.success('Completato', 'Organizzazione eliminata con successo')
                this.load();
            }else{
                response.json().then(json => {
                    if (json.code=='1') {
                            this.setState({
                                orgModal: false,
                                message: json.message,
                                saving: false
                            })
                            toastr.error('Errore', 'Errore durante l\'eliminazione dell\'organizzazione: ' + json.message)
                        } else if (json.code=='0') {
                            this.setState({
                                orgModal: false,
                                message: json.message,
                                saving: false
                            })
                            console.log('Errore durante l\'eliminazione dell\'organizzazione ' +  json.message)
                            toastr.error('Errore', 'Errore durante l\'eliminazione dell\'organizzazione')
                        } else {
                            this.setState({
                                orgModal: false,
                                saving: false
                            })
                            console.log('Errore durante l\'eliminazione dell\'organizzazione')
                            toastr.error('Errore', 'Errore durante l\'eliminazione dell\'organizzazione')
                    }
                })
            }
        }) 
    }

    openOrgCreate(){
        this.setState({
            createOrg: true,
            userEdit: false,
            workgroupEdit: false,
            createWG: false,
            nome: '', 
            psw: '',
            repeatPassword:''
        })
    }

    openWGCreate(){
        this.setState({
            createOrg: false,
            userEdit: false,
            workgroupEdit: true,
            createWG: true,
            workgroupUsers: undefined,
            nomeWG: '', 
            psw: '',
            repeatPassword:''
        })
    }

    openOrgModal(org) {
        this.setState({
            org: org,
            orgModal: true,
            workgroupEdit: false,
            userEdit: false,
            createOrg: false
            
        })
    }

    closeOrgModal() {
        this.setState({
            orgModal: false,
        })
    }

    openUserModal(type) {
        this.setState({
            userModal: true,
            userModalType: type
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

    checkDoublePassword(repeatPassword) {
        const { psw } = this.state;
        if (psw === repeatPassword) {
            this.setState({
                checked: true,
                disableSave: false
            })
        }
        else {
            this.setState({
                checked: false,
                disableSave: true,
            })
        }
    }

    validatePsw(val) {
        // pattern to match : Atleast one capital letter, one number and 8 chars length
        if (val !== '') {
            var reg = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9%@#,;:_'/<([{^=$!|}.>-]{8,}$")
            if (reg.test(val)) {
                this.setState({
                    pswok: true,
                })
            }
            else {
                this.setState({
                    pswok: false,
                    disableSave: true,
                })
            }
        } else
            this.setState({
                pswok: true,
                disableSave: true
            })
    }

    render() {
        const { loggedUser } = this.props
        const { users, allUsers, removingUser, userToRemove, removingWg, wgToRemove, removingWgUser, workgroupUserToRemove, filter, user, org, orgModal, userModal, userModalType ,userEdit, createOrg, checked, workgroupEdit, workgroups, workgroupUsers, orgUsers, selectedWorkgroup, selectedOrg, createWG} = this.state
    
        return (
            <div>
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
                            {this.state.saving && <i className="fa fa-spinner fa-spin fa-lg" />}{!this.state.saving && "Cancella l'organizzazione"} 
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
                            {userModalType==='org' && <ModalTitle>Aggiungi un utente all'organizzazione <b>{selectedOrg}</b></ModalTitle>}
                            {userModalType==='wg' && <ModalTitle>Aggiungi un utente al workgroup <b>{selectedWorkgroup}</b></ModalTitle>}
                            <ModalClose onClick={this.closeUserModal} />
                        </ModalHeader>
                        <ModalBody>
                            <Select
                                id="state-select"
                                onBlurResetsInput={false}
                                onSelectResetsInput={false}
                                options={userModalType==="wg"?orgUsers:allUsers}
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
                            {userModalType==='org' && <button className='btn btn-primary' onClick={this.add.bind(this, selectedOrg)}>
                            {this.state.saving && <i className="fa fa-spinner fa-spin fa-lg" />}{!this.state.saving && "Aggiungi utente"}
                            </button>
                            }
                            
                            {userModalType==='wg' && <button className='btn btn-primary' onClick={this.addWG.bind(this, selectedWorkgroup)}>
                            {this.state.saving && <i className="fa fa-spinner fa-spin fa-lg" />}{!this.state.saving && "Aggiungi utente"}
                            </button>
                            }
                                
                            
                            <button className='btn btn-secondary' onClick={this.closeUserModal}>
                                Annulla
                            </button>
                        </ModalFooter>
                </Modal>
                <div className="row">
                    <div className="form-group  ml-3">
                        <div className="row m-0">
                            <div className="col-5">
                                <label htmlFor="example-search-input">Organizzazioni</label>
                            </div>
                            {isSysAdmin(loggedUser) &&
                            <div className="col-7">
                                <button type="button" className="btn btn-link fa-pull-right p-0" title="Crea nuova organizzazione" onClick={this.openOrgCreate}>
                                    <i className="fa fa-plus-circle fa-lg"></i>
                                </button>
                            </div>
                            }
                        </div>
                        <ul className="list-group">
                            <li className="list-group-item"><input className="form-control" onChange={(e)=>{this.searchBy(e.target.value)}}></input></li>
                            {filter && filter.length > 0 && filter.map(organization => {
                                if(organization!="default_org")
                                    return( <li className={"list-group-item "+ (org===organization?"active":"")} key={organization}>{organization}
                                                <button title="Gestione Utenti" type="button" className={"float-right btn " + ((org === organization ? "btn-active" : "btn-link"))} onClick={()=>{this.getUsers(organization)}}><i className="fa fa-user-plus fa-lg" /></button>
                                                <button title="Gestione Workgroups" type="button" className={"float-right btn " + ((org === organization ? "btn-active" : "btn-link"))} onClick={()=>{this.getWorkgroups(organization)}}><i className="fa fa-users fa-lg" /></button>
                                                {isSysAdmin(loggedUser) && <button title="Elimina Organizzazione" type="button" className={"float-right btn " + ((org === organization ? "btn-active" : "btn-link"))} onClick={()=>{this.openOrgModal(organization)}}><i className="fa fa-trash fa-lg" /></button>}

                                            </li>);
                                })
                            }
                        </ul>
                        {/*isAdmin(loggedUser) && <button type="button" className="btn btn-link float-right mt-3" title="Crea nuova organizzazione" onClick={this.openOrgCreate}>
                            <i className="fa fa-plus-circle fa-lg"></i>
                        </button>*/}
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
{/*                             <div className="form-group row">
                                <label className="col-3 col-form-label">Email amministratore</label>
                                <div className="col-6">
                                    <input className="form-control" type="mail" value={this.state.mail} onChange={(e) => { this.setState({ mail: e.target.value }) }}/>
                                </div>
                            </div> */}
                            <div className="form-group row">
                                <label className="col-3 col-form-label">Password amministratore <button className="btn btn-link p-0" data-toggle="tooltip" data-placement="top" title="La password deve essere lunga almeno 8 caratteri e contenere almeno un lettera maiuscola e un numero"><i className="fa fa-info-circle" /></button></label>
                                <div className="col-6">
                                    <input className="form-control" type="password" value={this.state.psw} onChange={(e) => { this.setState({ psw: e.target.value, checked: e.target.value === '' ? true : false }); this.validatePsw(e.target.value) }}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-3 col-form-label">Ripeti Password amministratore</label>
                                <div className="col-6">
                                    <input className="form-control" type="password" value={this.state.repeatPassword} onChange={(e) => { this.setState({ repeatPassword: e.target.value }); this.checkDoublePassword(e.target.value) }} />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary" disabled={this.state.disableSave} onClick={this.createOrg.bind(this)}>{this.state.saving && <i className="fa fa-spinner fa-spin fa-lg" />}{!this.state.saving && "Crea"}</button>
                        </div>
                        <div hidden={checked} className="ml-5 w-100">
                            <div className="alert alert-danger" role="alert">
                                <i className="fa fa-times-circle fa-lg m-t-2"></i> Le password inserite non corrispondono, verificare il corretto inserimento
                            </div>
                        </div>
                        <div hidden={this.state.pswok} className="ml-5 w-100">
                            <div className="alert alert-warning" role="alert">
                                <i className="fa fa-times-circle fa-lg m-t-2"></i> La password inserita non rispetta le linee guida: <br />
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
                    <div className="form-group ml-5">
                        <label htmlFor="example-search-input" className="col-2 mb-3">Utenti</label>
                        {(isAdmin(loggedUser) || isSysAdmin(loggedUser)) &&
                                <button type="button" className="btn btn-link fa-pull-right p-0" title="Aggiungi nuovo utente" onClick={this.openUserModal.bind(this,'org')}>
                                    <i className="fa fa-plus-circle fa-lg" />
                                </button>
                        }
                        <ul className="list-group">
                            {(users && users.length>0)?users.map(user => {
                                if (user.indexOf("default_admin") === -1)
                                    return(
                                        <li className="list-group-item" key={user}>{user}
                                            <button type="button" className="btn btn-link float-right" title="Rimuovi utente" onClick={this.removeUser.bind(this, user)}>{removingUser&&user===userToRemove?<i className="fa fa-spinner fa-spin fa-lg" />:<i className="fa fa-times fa-1" />}</button>
                                        </li>)
                                }
                            ):<label className="m-2 col-form-label">Non ci sono utenti</label>
                            }
                        </ul>
                        {/*isSysAdmin(loggedUser) &&
                            <button type="button" className="btn btn-link fa-pull-right mt-3" title="Aggiungi nuovo utente" onClick={this.openUserModal.bind(this,'org')}>
                                <i className="fa fa-plus-circle fa-lg" />
                            </button>
                        */}
                    </div>}
                    {workgroupEdit && 
                    <div className="form-group ml-5">
                        <label htmlFor="example-search-input" className="mb-3">Workgroups <i>{selectedOrg}</i></label>
                        {(isAdmin(loggedUser) || isSysAdmin(loggedUser)) &&
                            <button type="button" className="btn btn-link fa-pull-right p-0" title="Crea nuovo Workgroup" onClick={this.openWGCreate}>
                                <i className="fa fa-plus-circle fa-lg"></i>
                            </button>
                        }
                        <ul className="list-group">
                            {(workgroups && workgroups.length > 0)?workgroups.map(workgroup => {
                                        return( 
                                            <li className={"list-group-item "+ (workgroup===selectedWorkgroup?"active":"")} key={workgroup}>{workgroup}
                                                <button title="Elimina Workgroup" type="button"  className={"float-right btn " + ((workgroup===selectedWorkgroup ? "btn-active" : "btn-link"))} onClick={this.removeWorkgroup.bind(this, workgroup, selectedOrg)}>{removingWg&&workgroup===wgToRemove?<i className="fa fa-spinner fa-spin fa-lg" />:<i className="fa fa-times fa-1" />}</button>
                                                <button title="Gestione Utenti Workgroup" type="button" className={"float-right btn " + ((workgroup===selectedWorkgroup ? "btn-active" : "btn-link"))} onClick={()=>{this.getWorkGroupUsers(workgroup)}}><i className="fa fa-user-plus fa-lg" /></button>
                                            </li>)
                                    }
                                ):<label className="m-2 col-form-label">Non ci sono workgroup</label>
                                }
                        </ul>
                        {/*isAdmin(loggedUser) &&
                            <button type="button" className="btn btn-link fa-pull-right mt-3" title="Crea nuovo Workgroup" onClick={this.openWGCreate}>
                                <i className="fa fa-plus-circle fa-lg"/>
                            </button>
                        */}
                     </div>
                    }
                    {workgroupEdit && createWG && 
                        <div className="col-7">
                        <div className="form-group form-control ml-5">
                            <label htmlFor="example-search-input" className="mb-3">Crea workgroup</label>
                            <div className="form-group row">
                                <label className="col-3 col-form-label">Nome del workgroup</label>
                                <div className="col-6">
                                    <input className="form-control" type="search" value={this.state.nomeWG} onChange={(e)=>{this.setState({nomeWG:e.target.value})}}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-3 col-form-label">Password amministratore <button className="btn btn-link p-0" data-toggle="tooltip" data-placement="top" title="La password deve essere lunga almeno 8 caratteri e contenere almeno un lettera maiuscola e un numero"><i className="fa fa-info-circle" /></button></label>
                                <div className="col-6">
                                    <input className="form-control" type="password" value={this.state.psw} onChange={(e) => { this.setState({ psw: e.target.value, checked: e.target.value === '' ? true : false }); this.validatePsw(e.target.value) }}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-3 col-form-label">Ripeti Password amministratore</label>
                                <div className="col-6">
                                    <input className="form-control" type="password" value={this.state.repeatPassword} onChange={(e) => { this.setState({ repeatPassword: e.target.value }); this.checkDoublePassword(e.target.value) }} />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary" disabled={this.state.disableSave || this.state.nomeWG==''?true:false} onClick={this.createWG.bind(this,selectedOrg)}>{this.state.saving && <i className="fa fa-spinner fa-spin fa-lg" />}{!this.state.saving && "Crea"}</button>
                        </div>
                        <div hidden={checked} className="ml-5 w-100">
                            <div className="alert alert-danger" role="alert">
                                <i className="fa fa-times-circle fa-lg m-t-2"></i> Le password inserite non corrispondono, verificare il corretto inserimento
                            </div>
                        </div>
                        <div hidden={this.state.pswok} className="ml-5 w-100">
                            <div className="alert alert-warning" role="alert">
                                <i className="fa fa-times-circle fa-lg m-t-2"></i> La password inserita non rispetta le linee guida: <br />
                                <ul>
                                    <li>Almeno 8 caratteri</li>
                                    <li>Almeno una lettera maiuscola</li>
                                    <li>Almeno un numero</li>
                                    <li>I caratteri speciali consentiti sono: "{"%@#,;:_\'/<([{^=$!|}.>-"}"</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    }
                    {workgroupUsers && 
                        <div className="form-group ml-5">
                            <label htmlFor="example-search-input" className="mb-3">Utenti <i>{selectedWorkgroup}</i></label>
                            {(isAdmin(loggedUser) || isSysAdmin(loggedUser)) &&
                                <button type="button" className="btn btn-link fa-pull-right p-0" title="Aggiungi utente a workgroup" onClick={this.openUserModal.bind(this,'wg')}>
                                    <i className="fa fa-plus-circle fa-lg"></i>
                                </button>
                             }
                            {workgroupUsers.length > 0 && workgroupUsers.map(workgroupUser => {
                                return(
                                    <li className="list-group-item" key={workgroupUser}>{workgroupUser}
                                        <button title="Elimina Utente Workgroup" type="button" className="btn btn-link float-right" onClick={this.removeWorkgroupUser.bind(this, selectedWorkgroup, workgroupUser)}>{removingWgUser&&workgroupUser===workgroupUserToRemove?<i className="fa fa-spinner fa-spin fa-lg" />:<i className="fa fa-times fa-1" />}</button>
                                     </li>)
                                })
                            }
                            {/*isAdmin(loggedUser) &&
                                <button type="button" className="btn btn-link fa-pull-right mt-3" title="Aggiungi utente a workgroup" onClick={this.openUserModal.bind(this,'wg')}>
                                    <i className="fa fa-plus-circle fa-lg"/>
                                </button>
                            */}
                        </div>
                    } 
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
