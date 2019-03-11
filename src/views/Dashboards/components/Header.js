import React, { Component } from 'react';
import { connect } from 'react-redux'
import { isEditor, isAdmin } from '../../../utility'
import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faGlobe, faUsers, faSortDown, faUser } from '@fortawesome/fontawesome-free-solid'

class Header extends Component{
  constructor(props){
    super(props)
    this.state = {
      open: false,
      dropdownStyle: {width: '261px'},
    }

    this.openVisibility = this.openVisibility.bind(this)
    
  }

  openVisibility(){
    this.setState({
        open: !this.state.open
    })
    let dropdown = document.querySelector('#dropdown_story')
    let info = dropdown.getClientRects()
    
    if(info[0].bottom > 800 || window.location.hash === '#/home')
        this.setState({
            dropdownStyle: {width: '261px', transform: `translate(${0}px, ${-285}px)`}
        })
    else
        this.setState({
            dropdownStyle: {width: '261px'}
        })
  }

  handleSave(){
      const { onSave } = this.props

      onSave();
  }

  render(){
    const { status, readOnly, editToggle, loggedUser, onSave, onDelete, onStatusChange, author } = this.props
    const { dropdownStyle } = this.state
    
    var show = this.state.open? ' show': ''
    var active = this.state.open? ' active' : ''

    return(
      <div className="row">
       <div className={"fa-pull-right dropdown" + show }>
          {
              <button className={"h-100 btn btn-light text-primary text-center"+active} id='dropdown_story' data-toggle="dropdown"  aria-haspopup="true" aria-expanded="false" onClick={this.openVisibility.bind(this)}>

                  <FontAwesomeIcon icon={faSortDown} className="pull-left"/>
                  
              {
                  status == "2" &&
                  //<span className="badge badge-pill badge-warning fa-pull-right badge-dash" title="Pubblica"> </span>
                  //<i className="fa fa-globe fa-pull-right fa-lg text-icon" title='Pubblica'/>
                  <span title="Open Data" className="ml-2"><FontAwesomeIcon icon={faGlobe} className="mx-auto" /></span>
              }
              {
                  status == "1" &&
                  //<span className="badge badge-pill badge-success fa-pull-right badge-dash" title="Condivisa"> </span>
                  //<i className="fa fa-users fa-lg fa-pull-right text-icon" title="Condivisa"/>
                  <span title="Organizzazione" className="ml-2"><FontAwesomeIcon icon={faUsers} className="mx-auto" /></span>
              }
              {
                  status == "0" &&
                  //<span className="badge badge-pill badge-secondary fa-pull-right badge-dash" title="In bozza"> </span>
                  //<i className="fa fa-lock fa-lg fa-pull-right text-icon" title="In Bozza"/>
                  <span title="Privata" className="ml-2"><FontAwesomeIcon icon={faUser} className="mx-auto"/></span>
              }

              </button>}
              <div className={"dropdown-menu m-0" + show} style={dropdownStyle} aria-labelledby="dropdownMenuButton">
                  <h6 className="dropdown-header bg-white"><b>CHI PUÒ VISUALIZZARE?</b></h6>
                  <button className="dropdown-item bg-light b-l-pvt" onClick={onStatusChange.bind(this, 0)}>
                      
                      
                      <div className="row">
                          <h5 className="col-1 pl-0"><FontAwesomeIcon icon={faUser} className="mx-2"/></h5>
                          <div className="row col-11 ml-1">
                              <div className="col-12 pl-1"><p className="mb-0"><b>Solo tu</b></p></div>
                              
                              <div className="col-12 pl-1">Contenuto privato</div>
                          </div>
                          
                      </div>
                      
                  </button>
                  <button className="dropdown-item bg-light b-l-org" onClick={onStatusChange.bind(this, 1)}>
                      <div className="row">
                          <h5 className="col-1 pl-0"><FontAwesomeIcon icon={faUsers} className="mx-2"/></h5>
                          <div className="row col-11 ml-1">
                              <div className="col-12 pl-1"><p className="mb-0"><b>Organizzazione</b></p></div>
                              
                              <div className="col-12 pl-1">Contenuto visibile ai membri <br/>della tua organizzazione</div>
                          </div>
                      </div>
                  </button>
                  {(isEditor(loggedUser) || isAdmin(loggedUser)) && <button className="dropdown-item bg-light b-l-open" onClick={onStatusChange.bind(this, 2)}>
                  
                      <div className="row">
                          <h5 className="col-1 pl-0"><FontAwesomeIcon icon={faGlobe} className="mx-2"/></h5>
                          <div className="row col-11 ml-1">
                              <div className="col-12 pl-1"><p className="mb-0"><b>Open data</b></p></div>
                              
                              <div className="col-12 pl-1">Contenuto visibile a <br/>chiunque, visibile sul <br/>dataportal pubblico </div>
                          </div>
                      </div>
                  </button>}
              </div>
          </div>
          <div className="align-self-center ml-3">
              {this.props.org}
          </div>
        {!readOnly && <button className="ml-auto btn btn-link text-primary" onClick={onSave.bind(this)}><i className="fa fa-save fa-lg"/></button>}
        {author === loggedUser.uid && <button className={readOnly?"ml-auto btn btn-link text-primary":"btn btn-link text-primary"} onClick={onDelete.bind(this)}><i className="fa fa-trash fa-lg"/></button>}
        {author === loggedUser.uid && window.location.hash.indexOf('create')===-1 && <button className="btn btn-link text-primary" onClick={editToggle}><i className="fa fa-edit fa-lg"/></button>}
      </div>
    )
  }
}

function mapStateToProps(state) {
  const loggedUser = state.userReducer['obj']?state.userReducer['obj'].loggedUser:{ }
  return { loggedUser }
}

export default connect(mapStateToProps)(Header)