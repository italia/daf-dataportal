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

class Administration extends Component {

    constructor(props){
        super(props)
        this.state = {
            organizations: [],
            users: [],
            org: "",
            user: "",
            orgModal: false,
        }

        this.load()
        this.save = this.save.bind(this)
        this.openOrgModal = this.openOrgModal.bind(this)
        this.closeOrgModal = this.closeOrgModal.bind(this)
    }

    async organizations() {
        var url = serviceurl.apiURLCatalog + '/ckan/organizations'
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })

        return response.json();
    }

    load(){
        let response = this.organizations()
        response.then((json)=> {
            this.setState({
                organizations: json
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
        this.getUsers(value);
    }

    async users(org) {
        var url = serviceurl.apiURLSecurity + '/ipa/group/' + org
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })

        return response.json();
    }

    getUsers(org) {
        let response = this.users(org)
        response.then((json) => {
            this.setState({
                users: json.member_user
            });
        });
    }

    onUserChange(value) {
        this.setState({
            user: value,
        })
    }

    openOrgModal(){
        this.setState({
            orgModal: true,
        })
    }

    closeOrgModal() {
        this.setState({
            orgModal: false,
        })
    }

    render() {
    const { loggedUser} = this.props
    const { users, organizations, user, org, orgModal} = this.state
    
    return (
        <div>
        <Modal
            contentLabel="Add a widget"
            className="Modal__Bootstrap modal-dialog modal-80"
            isOpen={orgModal}>
            <form>
                <ModalHeader>
                    <ModalTitle>Crea una nuova Organizzazione</ModalTitle>
                    <ModalClose onClick={this.closeOrgModal} />
                </ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <p>Nome dell'organizzazione:</p>
                        <input></input>
                    </div>
                </ModalBody>
                <ModalFooter>
                <button className='btn btn-default'>
                    Condividi con tutti
                </button>
                </ModalFooter>
            </form>
        </Modal>
        <Modal
            contentLabel="Add a widget"
            className="Modal__Bootstrap modal-dialog modal-80"
            isOpen={false}>
            <form>
                <ModalHeader>
                    <ModalTitle>Crea una nuova Organizzazione</ModalTitle>
                    <ModalClose onClick={this.closeOrgModal} />
                </ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <p></p>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className='btn btn-default' >
                        Condividi con tutti
            </button>
                </ModalFooter>
            </form>
        </Modal>
        <div className="row">
            <div className="col-5 form-group row ml-3">
                <label htmlFor="example-search-input" className="col-2 col-form-label mb-2">Organizzazioni</label>
                <select className="form-control" id="organizations" multiple onChange={(e) => this.onOrgChange(e.target.value)}>
                    <option value=""></option>
                    {organizations && organizations.length > 0 && organizations.map(organization =>
                        <option value={organization} key={organization}>{organization}</option>
                    )
                    }
                </select>
                <button type="button" className="btn-link mt-3" title="Crea nuova organizzazione" onClick={this.openOrgModal}>
                    <i className="fa fa-plus-circle fa-lg"></i>
                </button>
            </div>
            <div className="col-5 form-group row ml-3">
                <label htmlFor="example-search-input" className="col-2 col-form-label mb-2">Utenti</label>
                <select className="form-control" id="users" multiple onChange={(e) => this.onUserChange(e.target.value)}>
                    <option value=""></option>
                    {users && users.length > 0 && users.map(users =>
                        <option value={users} key={users}>{users}</option>
                    )
                    }
                </select>
                <button type="button" className="btn-link mt-3" title="Aggiungi nuovo utente" >
                    <i className="fa fa-plus-circle fa-lg"/> Aggiungi Utente
                </button>
            </div>            
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
