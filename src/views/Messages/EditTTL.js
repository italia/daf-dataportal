import React, { Component } from 'react'
import { messages } from "../../i18n/i18n-ita";
import { ButtonClass, TopBannerPage, EasyTitleContainer, StyleColor } from "../Settings/LayoutCustom";
import { Button, Container, Card, Row, Col, Input, FormGroup, Form, FormFeedback } from "reactstrap";
import MessageService from "./services/MessageService";
import { toastr } from "react-redux-toastr";

const CreateRowTTL = ({ row }) =>{
  return (
    <tr>
      <th className="bg-white" style={{ width: 192 }}>
        <i className={ "pointer mr-2 fa-lg " + row.icon } id={row.id} title={row.tooltip} />
        <strong>{row.label}: </strong>
      </th>
      <td className="bg-grigino">
        <Row form>
          <Col sm={3}>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Input  type="text" 
                      name={row.inputID} 
                      id={row.inputID} 
                      maxLength="3" 
                      onChange={row.inputOnchange} 
                      valid={row.inputValid.isValid} 
                      invalid={!row.inputValid.isValid} />
              <FormFeedback >{row.inputValid.messageError}</FormFeedback>
            </FormGroup>
          </Col>
          <Col sm={3}>
            <CreateButton 
                  color={StyleColor.LINK.description} 
                  icon={{ iconClass:ButtonClass.SAVE.description+StyleColor.TEXTPRIMARY.description, 
                          title: messages.label.salva}}
                  fnc={()=>row.fncSave(row.inputID, event)} />{' '}
            <CreateButton 
                  color={StyleColor.LINK.description} 
                  icon={{ iconClass:ButtonClass.UNDO.description+StyleColor.TEXTPRIMARY.description, 
                          title: messages.label.annulla}}
                  fnc={()=>row.fncUndo(row.inputID, event)} />{' '}
          </Col>
        </Row>
      </td>
    </tr>
  )  
}

const CreateButton = ( { color, icon, fnc} ) => { 
    return (
        <Button onClick={fnc} color={color}> 
          <i onClick={fnc} className={icon.iconClass+" fa-lg "} title={icon.title}></i>
        </Button> 
    )
}

const fieldOK = () => ({  isValid: true, messageError: ''  })
const fieldKO = ( message ) => ({ isValid: false, messageError: message  })

const dayToSecond = ( day = 1 ) =>  ( day * 86400 )
const secondToDay = ( second = 86400 ) =>  ( second / 86400 )
const getNameField = ( name ) => (name.substring(0, name.indexOf('T')))

const messageService = new MessageService();

export default class EditTTL extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isValidinfo: fieldOK(),
      isValidsuccess: fieldOK(),
      isValiderror: fieldOK()
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    let check =  fieldOK()
   
    if (!value) {
      check = fieldKO(messages.validazione.campoObbligatorio) 
    } else if (!/^[0-9]+$/.test(value)) {
      check = fieldKO(messages.validazione.campoImpostareSoloGiorni) 
    } else if (value == 0) {
      check = fieldKO(messages.validazione.almenoUnGiorno) 
    } else {
      check =  fieldOK()
    }

    this.setState({
      ["isValid"+name]: check
    });
  }

  
  load = () => {

    let response = messageService.messageTTL();
    response
      .then(response => response.json())
      .then(json => {
        
        this.setState({
          storeTTL: json
        });

        this.state.storeTTL.map(element => {
          const  name  = element.name;
          const  value = element.value;
          let    check = fieldOK()
          const  field = getNameField(name)

          if (value == 0 || value == undefined) {
            check = fieldKO(messages.validazione.campoObbligatorio) 
          } else {
            check =  fieldOK()
          }

          this.setState({
            ["isValid"+ field ]: check
          });
          this.formTTL[field].value= secondToDay ( value )
        });
      })
      .catch(error => {
        toastr.error(messages.label.errore, error.message);
      });
  };
  
  componentWillMount() {
    this.load();
  }

  restoreField = ( name, e ) => {

    e.preventDefault()
    const field = this.state.storeTTL.filter(obj => {
      return obj.name == name+"Type";
    }); 
    this.formTTL[name].value= secondToDay ( field[0].value )
  }

  saveField = ( name, e ) => {
    e.preventDefault()
    const field = this.state['isValid'+name]
    if( field.isValid ){
      const ttl =[{
                    name: name+"Type",
                    value: dayToSecond( parseInt( this.formTTL[name].value ) )
                  }];
      const response = messageService.updateMessageTTL(ttl);
      response.then(response => response.json())
              .then(json => {
                  toastr.success(
                      messages.label.salvataggio,
                      messages.label.salvataggioOK
                  );
                  this.load();
              })
              .catch(error => {
                  toastr.error(messages.label.errore, error.message);
              });
      } else {
        toastr.error(messages.label.errore, messages.label.salvataggioKO);
      }            
  }

  render() {
    return (
      <Container className="container">
  
        <Row>
          <Col sm={1} />
          <Col sm={10}>
            <TopBannerPage
                title={messages.menu.gestioneTTL}
                icon={ButtonClass.CLOCK.description}
            />
            <EasyTitleContainer message={messages.label.editTTLDescFunction} />
            <Card body>
                <form ref={el => (this.formTTL = el)} className="px-4">
                  <table className="table table-striped table-responsive-1">
                    <thead>
                      <tr>
                        <th>{messages.label.tipologiaDiNotifica}</th>
                        <th>{messages.label.validita+" (Espressa in giorni) "}</th>
                      </tr>
                    </thead>
                    <tbody className="w-100">
                      <CreateRowTTL row={{ 
                              icon:ButtonClass.PUNTOESCLAMATIVO.description + StyleColor.TEXTINFO.description, 
                              tooltip: messages.label.descInfoType,
                              label: messages.label.infoType,
                              inputID: "info",
                              inputOnchange: this.handleInputChange,
                              inputValid: this.state.isValidinfo,
                              fncSave: this.saveField,
                              fncUndo: this.restoreField
                            }}
                              />
                      <CreateRowTTL row={{ 
                              icon:ButtonClass.CHECK.description + StyleColor.TEXTSUCCESS.description, 
                              tooltip: messages.label.descSuccessType,
                              label: messages.label.successType,
                              inputID: "success", 
                              inputOnchange: this.handleInputChange,
                              inputValid: this.state.isValidsuccess,
                              fncSave:  this.saveField,
                              fncUndo:  this.restoreField  }}
                              />
                      <CreateRowTTL row={{ 
                              icon:ButtonClass.PUNTOESCLAMATIVO.description + StyleColor.TEXTDANGER.description, 
                              tooltip: messages.label.descErrorType,
                              label: messages.label.errorType,
                              inputID: "error",
                              inputOnchange: this.handleInputChange,
                              inputValid: this.state.isValiderror,
                              fncSave: this.saveField,
                              fncUndo: this.restoreField  }}
                              />                
                    </tbody>
                  </table>
                </form>
            </Card>
          </Col>
          <Col sm={1} />
        </Row>
      </Container>
    )
  }
}
