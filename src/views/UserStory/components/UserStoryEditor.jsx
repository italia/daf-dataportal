import React, { Component } from 'react';
import Components from 'react';
import { withRouter, Prompt } from 'react-router-dom'
import { connect } from 'react-redux'
import { toastr } from 'react-redux-toastr'

// App components
import Header from './Header';
import Container from './Container';
import UserStoryEditorContainer from './UserStoryEditorContainer';
import EditBarTop from './bar/EditBarTop';
import IframeWidget from './widgets/IframeWidget';
import TextWidget from './widgets/TextWidget';

// SERVICES
import UserStoryService from './services/UserStoryService';
import { isPublic } from '../../../utility';

const userStoryService = new UserStoryService();


class UserStoryEditor extends Component {
  constructor(props) {
    super(props);

    //init state

    this.state={
      modified: this.props.history.location.modified?this.props.history.location.modified:false,
      id: this.props.match.params.id?this.props.match.params.id:undefined,
    };

    //bind functions
    this.save = this.save.bind(this);
    this.onPublish = this.onPublish.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.onChange = this.onChange.bind(this);
    
    
    //load data
    if (this.state.id) {
      let response = userStoryService.get(this.state.id);
      response.then((story) => {
        let wids = JSON.parse(story.widgets)

        Object.keys(wids).map(wid => {
          if (wids[wid].props.wid_key.indexOf("TextWidget")!=-1){
            /* wids[wid].props.onSave = this.saveTextWidget.bind(this) */
            wids[wid].type = TextWidget
            wids[wid].props.readOnly = false
          }else
            wids[wid].type = IframeWidget
        })

        this.setState({
          dataStory: story,
          widgets: wids
        });
      });
    } else {
      let wids = {}
      if(this.props.history.location.story){
        wids = JSON.parse(this.props.history.location.story.widgets)
        
        this.state={
          modified: this.props.history.location.modified?this.props.history.location.modified:false,
          id: this.props.match.params.id?this.props.match.params.id:undefined,
          dataStory: this.props.history.location.story?this.props.history.location.story:false,
          widgets: wids
        };

        console.log(this.state)
      }
    }
  }
  componentDidMount() {
    window.addEventListener('beforeunload', (ev) => 
    {  
        ev.preventDefault();
        if(this.state.modified)
          return ev.returnValue = 'Sei sicuro di voler chiudere la pagina?';
        return;
    });
  }


  /**
   * Save text of TextWidget
   */
  saveTextWidget = function (key, html) {
    this.state.widgets[key].props.text = html;
    this.save();
  }

  save() {
      const { dataStory } = this.state
      this.setState({
        saving: true
      });
      
      if(dataStory.widgets==='{}'){
        toastr.error('Errore', 'Per salvare una Storia inserisci almeno un Widget')
      }else{

        userStoryService.save(dataStory).then((data)=> {
          this.setState({
            saving: false,
            modified: false
          })
          if(window.location.hash.indexOf('/userstory/create')!==-1){
            this.state.dataStory.id = data.message;
            this.props.history.push('/private/userstory/list/'+ data.message + '/edit');
          }
          toastr.success('Completato', 'Storia salvata con successo')
        })
      }

  }

  onChange(story){
    this.setState({
      modified: true,
      dataStory: story
    })
  }

  /**
   * onPublish
   */
  onPublish(published){
    this.state.dataStory.published = published;
    this.save(this.state.dataStory);
  }

  /**
   * onRemove
   */
  onRemove() {
    this.setState({
      removing: true
    })
    userStoryService.remove(this.state.dataStory.id).then(() => {
      window.location = isPublic()?'#/userstory/list':'#/private/userstory/list';
      this.setState({
        removing: false
      })
    })
  }

  /**
   * Render Function
   */
  render() {
    return (
      
    <Container>
    {this.state.dataStory &&
      <div>
      {/* <Header title="La Tua Storia" org={this.state.dataStory.org} pvt={this.state.dataStory.pvt}/> */}
          <EditBarTop 
              title={this.state.dataStory.title}
              onPublish={this.onPublish}
              id={this.state.dataStory.id}
              status={this.state.dataStory.published}
              onSave={this.save}
              onRemove={this.onRemove}
              modified={this.state.modified}
              saving={this.state.saving}
              removing={this.state.removing}
              pvt={this.state.dataStory.pvt}
              author={this.state.dataStory.user}
              loggedUser={this.props.loggedUser}
          ></EditBarTop>
          <UserStoryEditorContainer 
            dataStory={this.state.dataStory} 
            onChange={this.onChange}
            widgets={this.state.widgets}
            readonly={false}
          />
      </div>
      }
      <Prompt
        when={this.state.modified}
        message={'Ci sono delle modifiche non salvate, sei sicuro di voler lasciare la pagina?'}
      />    
    </Container>
  
    );
  }

}

function mapStateToProps(state) {
  const { loggedUser } = state.userReducer['obj'] || { }
  return { loggedUser }
}

export default connect(mapStateToProps)(UserStoryEditor);
