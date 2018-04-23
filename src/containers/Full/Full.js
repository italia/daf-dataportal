import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';
import Home from '../../views/Home/Home';
import IngestionWizard from '../../views/IngestionWizard/';
import Ontologies from '../../views/Ontologies/';
import Vocabulary from '../../views/Vocabulary/';
import Dashboard from '../../views/Dashboard/';
import Dataset from '../../views/Dataset/';
import DatasetList from '../../views/DataseList/';
import DatasetDetail from '../../views/DatasetDetail/DatasetDetail';
import UserStory from '../../views/UserStory/';
import Profile from '../../views/Profile/';
import Settings from '../../views/Settings/';
import DashboardManager from '../../views/DashboardManager/DashboardManager';
import Organizations from '../../views/Settings/Organizations';
import Users from '../../views/Settings/Users';
import Crea from "../../views/Crea/Crea";
import Widgets from '../../views/Widgets/Widgets';
import SearchBar from '../../components/SearchBar/SearchBar';

class Full extends Component {

  constructor(props){
    super(props)
    this.state = {
      open: false,
      isOpenStory: false,
      isOpenDash: false,
      pvtStory: '0',
      orgStory: 'default_org',
      pvtDash: '0',
      orgDash: 'default_org',
      validationMSg: 'Campo obbligatorio',
      validationMSgOrg: 'Campo obbligatorio',
    }

    this.openSearch = this.openSearch.bind(this)
    this.openModalStory = this.openModalStory.bind(this)
    this.hideModalStory = this.hideModalStory.bind(this)
    this.handleSaveStory = this.handleSaveStory.bind(this)
    this.openModalDash = this.openModalDash.bind(this)
    this.hideModalDash = this.hideModalDash.bind(this)
    this.handleSaveDash = this.handleSaveDash.bind(this)
  }

  openSearch(){
    this.setState({
      open: !this.state.open
    })
  }

  onPvtChangeStory(e, value){
    if(this.pvt.value == 0){
      this.setState({
        orgStory: 'default_org'
      });
    }
    this.setState({
        pvtStory: value
    });
    this.validateStory(e);
  }

  onOrganizationChangeStory(e, value){
    this.setState({
      orgStory: value
    });
    this.validateStory(e);
  }

  onPvtChangeDash(e, value){
    if(this.pvtDash.value == 0){
      this.setState({
        orgDash: 'default_org'
      });
    }
    this.setState({
        pvtDash: value
    });
    this.validateDash(e);
  }

  onOrganizationChangeDash(e, value){
    this.setState({
      orgDash: value
    });
    this.validateDash(e);
  }

  validateStory = (e) => {
    e.preventDefault()
    if(!this.titleStory.value){
      this.setState({
        validationMSg: 'Campo obbligatorio'
      });
    }else{
      this.setState({
        validationMSg: null
      });
    }

     if(!this.orgStory || this.orgStory.value == ''){
      this.setState({
        validationMSgOrg: 'Campo obbligatorio'
      });
    }else{
      this.setState({
        validationMSgOrg: null
      });
    }
  }

  validateDash = (e) => {
    e.preventDefault()
    if(!this.titleDash.value){
      this.setState({
        validationMSg: 'Campo obbligatorio'
      });
    }else{
      this.setState({
        validationMSg: null
      });
    }

    if(!this.orgDash || this.orgDash.value == ''){
      this.setState({
        validationMSgOrg: 'Campo obbligatorio'
      });
    }else{
      this.setState({
        validationMSgOrg: null
      });
    }
  }
  
  openModalStory = () => {
    this.setState({
      isOpenStory: true
    });
  };
  
  hideModalStory = () => {
    this.setState({
      isOpenStory: false
    });
  };

  openModalDash = () => {
    this.setState({
      isOpenDash: true
    });
  };
  
  hideModalDash = () => {
    this.setState({
      isOpenDash: false
    });
  };

  /**
  * Save Story
  */
  handleSaveStory = (e) => {
    e.preventDefault()
    if(this.titleStory.value){
      if(!this.orgStory || this.orgStory.value == ''){
        this.setState({
          validationMSgOrg: 'Campo obbligatorio'
        });
      }else if(this.orgStory.value=='default_org' && this.pvtStory.value == 1){
        this.setState({
          validationMSgOrg: 'Non è possibile creare una storia privata con l\'organizzazione selezionata'
        });
      }else{
        let layout = { rows: [] };
        let widgets = {};
        //save data
        let request = {
          title: this.titleStory.value,
          pvt: this.state.pvtStory,
          org: this.state.orgStory,
          layout: JSON.stringify(layout),
          widgets: JSON.stringify(widgets)
        };
/*         userStoryService.save(request).then((data)=> {
            this.props.history.push('/user_story/list/'+ data.message + '/edit');
        }); */
        this.props.history.push({
          'pathname':'/user_story/create',
          'story': request,
          'modified':true
        })
        this.hideModalStory();
      }
    }else{
      this.setState({
          validationMSg: 'Campo obbligatorio'
        });
    }

  }

  handleSaveDash = (e) => {
    e.preventDefault()

    if(this.titleDash.value){
      if(!this.orgDash || this.orgDash.value == ''){
        this.setState({
          validationMSgOrg: 'Campo obbligatorio'
        });
      }else if(this.orgDash.value=='default_org' && this.pvtDash.value == 1){
        this.setState({
          validationMSgOrg: 'Non è possibile creare una storia privata con l\'organizzazione selezionata'
        });
      }else{
        //prepara data
        let layout = { rows: [] };
        let widgets = {};
        let request = {
          title : this.titleDash.value,
          pvt: this.state.pvtDash,
          org: this.state.orgDash,
          subtitle : this.subtitleDash.value,
          layout : JSON.stringify(layout),
          widgets : JSON.stringify(widgets),
          status: 0
        };
        
        this.props.history.push({
          pathname: '/dashboard/create',
          state: { 'dash': request, 'modified':true }})
        
        this.hideModalDash();
/*         //save data
        dashboardService.save(request).then((data)=> {
            this.props.history.push('/dashboard/list/'+ data.message + '/edit');
        }) */
      }
    } else {
      this.setState({
        validationMSg: 'Campo obbligatorio'
      });
    }
  }

  render() {
    const { history, loggedUser } = this.props
    const divStyle = {
      'paddingLeft': '10px',
      'paddingRigth': '0px',
    };
    let mainDiv = 'bg-white'
    let home = ''

    if (history.location.pathname === '/user_story/list' || history.location.pathname === '/widget')
      mainDiv='bg-light'
    
    if (history.location.pathname === '/home' || history.location.pathname.indexOf('/search')!==-1 || history.location.pathname.indexOf('/dataset')!==-1)
      home = 'p-0'
    return (
      <div className="app">
      {/* Modal per creazione nuova Storia */}
      <Modal isOpen={this.state.isOpenStory} onRequestHide={this.hideModalStory}>
          <form>
            <ModalHeader>
              <ModalTitle>Crea una Storia</ModalTitle>
              <ModalClose onClick={this.hideModalStory}/>
            </ModalHeader>
            <ModalBody>
            <div className="form-group">
                <div className="form-group row">
                  <label className="col-md-2 form-control-label">Titolo</label>
                  <div className="col-md-8">
                    <input type="text" className="form-control" ref={(titleStory) => this.titleStory = titleStory} onChange={this.validateStory.bind(this)} id="title" placeholder="Titolo"/>
                    {this.state.validationMSg && <span>{this.state.validationMSg}</span>}
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-md-2 form-control-label">Privata</label>
                  <div className="col-md-8">
                  {loggedUser.organizations && loggedUser.organizations.length > 1 ?
                    <select className="form-control" ref={(pvtStory) => this.pvtStory = pvtStory} onChange= {(e) => this.onPvtChangeStory(e, e.target.value)} id="pvt" >
                      <option value="0" defaultValue key="0">No</option>
                      <option value="1" key='1'>Si</option>
                    </select>
                    :
                    <div>
                      <select className="form-control" ref={(pvtStory) => this.pvtStory = pvtStory} onChange= {(e) => this.onPvtChangeStory(e, e.target.value)} id="pvt" >
                      <option value="0" defaultValue key="0">No</option>
                      </select>
                      <span>Puoi creare soltanto dashboards pubbliche in quanto non hai nessuna organizzazione associata</span>
                    </div>
                  }
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-md-2 form-control-label">Organizzazione</label>
                  <div className="col-md-8">
                    <select className="form-control" ref={(orgStory) => this.orgStory = orgStory} onChange= {(e) => this.onOrganizationChangeStory(e, e.target.value)} id="org" >
                        <option value=""  key='organization' defaultValue></option>
                        {loggedUser.organizations && loggedUser.organizations.length > 0 && loggedUser.organizations.map(organization => {
                              return(
                                <option value={organization} key={organization}>{organization}</option>)
                          }
                        )}
                    </select>
                    {this.state.validationMSgOrg && <span>{this.state.validationMSgOrg}</span>}
                  </div>
                </div>
            </div>
            </ModalBody>
            <ModalFooter>
              <button type="button" className='btn btn-gray-200' onClick={this.hideModalStory}>
                Close
              </button>
              <button type="button" className="btn btn-primary px-2" onClick={this.handleSaveStory.bind(this)}>
                <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
                  Crea
              </button>
            </ModalFooter>
          </form>
        </Modal>

        {/* Modal per creazione nuova Dash */}

        <Modal isOpen={this.state.isOpenDash} onRequestHide={this.hideModalDash}>
          <form>
            <ModalHeader>
              <ModalTitle>Crea una Dashboard</ModalTitle>
              <ModalClose onClick={this.hideModalDash}/>
            </ModalHeader>
            <ModalBody>
            <div className="form-group">
                <div className="form-group row">
                  <label className="col-md-2 form-control-label">Titolo</label>
                  <div className="col-md-8">
                    <input type="text" className="form-control" ref={(titleDash) => this.titleDash = titleDash} onChange={this.validateDash.bind(this)} id="title" placeholder="Titolo"/>
                    {this.state.validationMSg && <span>{this.state.validationMSg}</span>}
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-md-2 form-control-label">Sottotitolo</label>
                  <div className="col-md-8">
                    <input type="text" className="form-control" ref={(subtitleDash) => this.subtitleDash = subtitleDash} id="subtitle" placeholder="Sottotitolo"/>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-md-2 form-control-label">Privata</label>
                  <div className="col-md-8">
                  {loggedUser.organizations && loggedUser.organizations.length > 1 ?
                    <select className="form-control" ref={(pvtDash) => this.pvtDash = pvtDash} onChange={(e) => this.onPvtChangeDash(e, e.target.value)} id="pvt" >
                      <option value="0" defaultValue key="0">No</option>
                      <option value="1" key='1'>Si</option>
                    </select>
                    :
                    <div>
                      <select className="form-control" ref={(pvtDash) => this.pvtDash = pvtDash} onChange={(e) => this.onPvtChangeDash(e, e.target.value)} id="pvt" >
                        <option value="0" defaultValue key="0">No</option>
                      </select>
                      <span>Puoi creare soltanto dashboards pubbliche in quanto non hai nessuna organizzazione associata</span>
                    </div>
                  }
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-md-2 form-control-label">Organizzazione</label>
                  <div className="col-md-8">
                    <select className="form-control" ref={(orgDash) => this.orgDash = orgDash} onChange={(e) => this.onOrganizationChangeDash(e, e.target.value)} id="org" >
                        <option value=""  key='organization' defaultValue></option>
                        {loggedUser.organizations && loggedUser.organizations.length > 0 && loggedUser.organizations.map(organization => {
                            return (<option value={organization} key={organization}>{organization}</option>)
                        })
                        }
                    </select>
                    {this.state.validationMSgOrg && <span>{this.state.validationMSgOrg}</span>}
                  </div>
                </div>
            </div>
            </ModalBody>
            <ModalFooter>
              <button type="button" className='btn btn-gray-200' onClick={this.hideModalDash}>
                Chiudi
              </button>
              <button type="button" className="btn btn-primary px-2" onClick={this.handleSaveDash.bind(this)}>
                <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
                  Crea
              </button>
            </ModalFooter>
          </form>
        </Modal>


        <Header history={history} openSearch={this.openSearch} openModalStory={this.openModalStory} openModalDash={this.openModalDash}/>
        <div className="app-body">
          <Sidebar {...this.props} openModalStory={this.openModalStory} openModalDash={this.openModalDash}/>
          <main className={"main "+mainDiv} >
            {this.state.open && <SearchBar history={history} open={this.state.open}/>}
            <Breadcrumb />
            <div className={"container-fluid "+home} style={divStyle}>
              <Switch>
                <Route path="/home" name="Home" exact component={Home}/>
                <Route path="/ingestionwizzard" name="Forms" component={IngestionWizard} history={history} />
                <Route path="/ontologies" name="Ontologies" component={Ontologies} />
                <Route path="/vocabulary" name="Vocabulary" component={Vocabulary} />
                <Route path="/dashboard" name="Dashboard manager" component={DashboardManager} />
                <Route path="/user_story" name="User Story" component={UserStory} />
                <Route path="/widget" name="Widget" component={Widgets} />
                {<Route exact path="/dataset_old" name="Dataset" component={Dataset} />}
                {<Route exact path="/dataset" name="Dataset" component={DatasetList} />}
                {<Route exact path="/search" name="Search" component={DatasetList} />} 
                <Route exact path="/dataset/:id" name="Dataset Detail" component={DatasetDetail} />
                <Route path="/profile" name="Profile" component={Profile} />
                <Route path="/settings" name="Settings" component={Settings} />
                <Route path="/organizations" name="Organizations" component={Organizations} />
                <Route path="/users" name="Users" component={Users} />
                <Route path="/crea" name="Crea" component={Crea} />
                <Redirect from="/" to="/home"/>
              </Switch>
            </div>
          </main>
          <Aside />
        </div>
        <Footer />
      </div>
    );
  }
}

Full.propTypes = {
  loggedUser: PropTypes.object,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { loggedUser, authed } = state.userReducer['obj'] || {}
  return { loggedUser, authed }
}

export default connect(mapStateToProps)(Full);
