import React, { Component } from 'react';
import { connect } from 'react-redux'
import ListBar from './bar/ListBar.jsx';
import UserstoryCard from "../../../components/Cards/UserstoryCard";
import { isPublic } from '../../../utility'

// App components
import Header from './Header.jsx';
import Container from './Container.jsx';

// Services
import UserStoryService from './services/UserStoryService';

// Our styles
require('../styles/custom.css');


const userStoryService = new UserStoryService();

class UserStoryList extends Component {
  constructor(props) {
    super(props);
    this.state={};

    this.load();

    this.filter = this.filter.bind(this);
  }
  
  /**
   * Method called for load dashboard list
   */
  load = (config) => {
    const { properties } = this.props

    this.state = {
      userStories: [],
      loading:true
    };
    var org = undefined
    if(isPublic() && properties.domain!=='dataportal' && properties.domain!=='dataportal-private')
      org = properties.organization

    let response = isPublic()?userStoryService.listPbc(org):userStoryService.listPvt(org);
    response.then((list) => {
      this.originalUserStories = list;
      this.setState({
        userStories: list,
        loading:false
      });
    });
  }

  /**
   * Execute filter
   */
  filter = (e) => {
    let key = e.target.value.toLowerCase();
    this.setState({
      userStories: this.originalUserStories.filter((item) => item.title.toLowerCase().indexOf(key) != -1)
    });
  }

  /**
   * Render Function
   */
  render() {

    const iframeStyle = {
      width: '100%',
      height: '160px',
      border: '0'
    }
    return this.state.loading === true ? <h1 className="text-center fixed-middle"><i className="fas fa-circle-notch fa-spin mr-2"/>Caricamento</h1> : (
    <Container>

      <Header title="Storie" />
      
      <ListBar onChange={this.filter} history={this.props.history} isOpen={this.props.history.location.state?this.props.history.location.state.isOpen:false}></ListBar>
      
      <div className="row pl-3">
        {
          this.state.userStories.map((story, index) => {
            let chartUrl = undefined
              if ((story.widgets && story.widgets !== '{}') && (story.layout && story.layout !== '{}')) {
                const dashLayout = JSON.parse(story.layout)
                var firstLayout = ''

                let righe = dashLayout.rows
                for (let i = 0; i < righe.length; i++) {
                  let colonne = righe[i].columns;
                  for (let j = 0; j < colonne.length; j++) {
                    let wids = colonne[j].widgets
                    wids.map((index) => {
                      /*  if (!index.key.startsWith('TextWidget')) { */
                      if (index.key.indexOf('TextWidget') == -1) {
                        firstLayout = index.key
                      }
                    })
                    if (firstLayout != '')
                      break
                  }
                  if (firstLayout != '')
                    break
                }
                const dashWidgets = JSON.parse(story.widgets)
                if (firstLayout != '') {
                  const firstWidget = dashWidgets[firstLayout];
                }
                var time = 0
                let widgets = Object.keys(dashWidgets)
                for (let k = 0; k < widgets.length; k++){
                  if(widgets[k].indexOf('TextWidget')!==-1){
                    var text = dashWidgets[widgets[k]].props.text
                    var array = text?text.split(' '):[]
                    
                    time = time + (array.length/275)
                  }
                  else
                    time = time + 1 
                }
              }
            return (
              <UserstoryCard 
                story = {story}
                widgetA={firstLayout}
                time = {time}
                key = {index}
                id = {index}
                />
            
            )
          })
        }
      </div>

      {
        this.state.userStories && this.state.userStories.length == 0 &&
        <p>
          <b>Nessuna storia trovata</b>
        </p>
      }
    </Container>
    );
  }

}

function mapStateToProps(state) {
  const { properties } = state.propertiesReducer['prop'] || {}

  return { properties }
}

export default connect(mapStateToProps)(UserStoryList);