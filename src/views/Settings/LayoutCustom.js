import React from 'react'
import { 
        Container, 
        Row, 
        Col, 
        Button, 
        Nav,
        NavItem, 
        NavLink,
        TabContent,
        TabPane,
        Alert,
        Modal,
        ModalHeader,
        ModalBody,
        ModalFooter
} from 'reactstrap';
import classnames from 'classnames';

export const AlertMessageCustom = ( { color, message, button } ) => {
   return ( 
            <Alert color={color}>
                {message}
                {' '}{button && button }{' '}
            </Alert>
   )    
}

export const EasyTitleContainer  = ( {message, classname=''} ) =>{
    return(
        <Row>
            <Col sm="12" className={classname}>
                <p className="desc-dataset">{message}</p>
            </Col>
        </Row>   
    )
}

export const StampRowDetail = ( {row} ) =>{
    return (
                <tr>
                    <th className="bg-white" style={{width: '192px'}}>
                        <strong>{row.title}: </strong>
                    </th>
                    <td className="bg-grigino" title={row.title}>
                        {row.value}
                    </td>
                </tr>
    )
}

export const TopBannerPage = ( {title, icon, tabButtons} ) => {
    return (
          <div className="row mb-3"> 
               <i className={icon + " fa-lg m-2"} style={{lineHeight:'1'}}/> <h2> {title}</h2>
               { tabButtons && <TabButtons tabButtons={tabButtons} />  }
          </div>
    )
}

export const TopBannerBluePage = ( {title, icon, tabButtons} ) => {
  return (
   <div className="top-dataset-1">
        <Container className="pt-4">
            <Row>
              <Col>
                      <h2 className="dashboardHeader title-dataset text-primary" title={title}>
                          <i className={icon}></i>
                          {title}
                      </h2>
              </Col>
            </Row>
            { tabButtons && <TabButtons tabButtons={tabButtons} />  }
            
        </Container>
   </div>
  )
}

export const TabButtons =  ( {tabButtons, flex=false} ) => {
    return (
        <Nav tabs >
            {
                tabButtons.buttons.map((button, index) =>{
                  return(
                        <NavItem key={index}>
                            <NavLink
                                disabled = {button.property.disabled}
                                className={classnames({ active: tabButtons.activeTab === (index+1).toString() })}
                                onClick={() => { button.fnc() }}
                            >
                                <i className={button.icon}></i>
                                {button.title}
                            </NavLink>
                        </NavItem>
                   )  
                })
            }      
        </Nav>  
    )
}

export const TabContainerPages =  ( {containerPages} ) => {
    return (
        <TabContent activeTab={containerPages.activeTab} style={{marginBottom:'2em'}}>
            {
                containerPages.pages.map((page, index) =>{
                   return(
                    <TabPane key={index} tabId={(index+1).toString()}>
                         {page}
                    </TabPane>
                   )
                })   
            }
        </TabContent>  
    )
}

export const AddElementToList = ( {button} ) => {
    return (
              <Row>
                <Col>
                    <Button color="link" outline className="btn-link float-right" title={button.title} onClick={ button.fnc }>
                           <i className={button.icon}></i>
                    </Button>{' '}
                </Col>
              </Row>
    )
}

export const VerticalTabsCustom = ({tabButtons, containerPages}) =>{
    return (
        <Row>
					<Col sm="2">
						<TabButtons tabButtons={tabButtons} flex="true" />
					</Col>
					<Col sm="10">
						<TabContainerPages containerPages={containerPages} />
					</Col>
        </Row>
    )
}

export const ModalCustom = ({ modal, body, buttonSave, buttonCancel} ) => {
    return (
        <Modal isOpen={modal.isOpen} toggle={modal.fnc} >
            <ModalHeader toggle={modal.fnc}>
                <h5>
                    { modal.icon && <i className={modal.icon}></i> }
                    {modal.title}
                </h5>
            </ModalHeader>
            <ModalBody>
                {body}
            </ModalBody>
            <ModalFooter>
                <Button color="default"     onClick={buttonCancel.fnc}> {buttonCancel.title}</Button>{' '}
                <Button color="primary"  type="submit"   onClick={e => buttonSave.fnc(e)}>   {buttonSave.title}</Button>
            </ModalFooter>
        </Modal>
    )
} 

export const ButtonClass = Object.freeze({
    ADD:        Symbol( "fa fa-plus-circle fa-lg m-t-2" ),
    DETAIL:     Symbol( "fa fa-info-circle pr-2 "),
    USERS:      Symbol( "fa fa-users  mr-3"),
    CONVENTION: Symbol( "fa fa-handshake mr-3"),
    CLOCK:      Symbol( "fa fa-clock")
});

export const StyleColor = Object.freeze({
    DANGER:     Symbol("danger"),
    TEXTICON:   Symbol( " text-icon " ),
    TEXTPRIMARY:Symbol( " text-primary ")
});

