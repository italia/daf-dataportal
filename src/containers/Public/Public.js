import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../../views/Public/Home/Home';
import Missione from '../../views/Public/Missione/Missione';
import Header from '../../components/Header/Public/Header'
import Footer from '../../components/Footer/Public/Footer'
//import UserStory from '../../views/UserStory/UserStory'
import Team from '../../views/Public/Team/Team';
import Guida from '../../views/Public/Guida/Guida';
// import Partecipa from '../../views/Public/Partecipa/Partecipa';
import Notizie from '../../views/Public/Notizie/NotizieList';
import NotizieDett from '../../views/Public/Notizie/NotizieDett';
// import UserStoryList from '../../views/UserStory/components/UserStoryList.jsx';
// import UserStoryView from '../../views/UserStory/components/UserStoryView.jsx';
import DataApplication from '../../views/Public/DataApplication/DataApplication';
import Faqs from '../../views/Public/Faqs'
import DatasetList from '../../views/DataseList/DatasetList'
import DatasetDetail from '../../views/DatasetDetail/DatasetDetail'
import Page404 from '../../views/404/Page404';

import Ticker from '../../newComponents/List-Ticker/Ticker'

// semantic's containers imports
import Vocabularies from '../../semantics/containers/Vocabularies.js'
import Vocabulary from '../../semantics/containers/Vocabulary.js'
import Ontologies from '../../semantics/containers/Ontologies.js'
import Ontology from '../../semantics/containers/Ontology.js'
import Policy from '../../views/Public/Policy/Policy';
import Termini from '../../views/Public/Policy/Termini';
import DatastoryList from '../../views/Datastory/DatastoryList';
import Dashboard from '../../views/Datastory/Dashboard';

class Public extends Component {

  /* constructor(props){
    super(props)
  } */

  render() {
    const { history, messages } = this.props
    var bg = 'bg-white'
    var p = ''

    if(window.location.hash.indexOf('data-applications') !== -1) bg = 'bg-light'
    if(window.location.hash.indexOf('search')!==-1)
      p='py-5'
    if(window.location.hash.indexOf('datastory/list')!==-1){
      p='py-5'
      bg='bg-light'
    }
    if(window.location.hash.indexOf('datastory/list/')!==-1){
      bg='bg-white'
    }
     if(window.location.hash.indexOf('dataset/list')!==-1)
      p='py-5'

      window.scrollTo(0,0)
    return (
      <div className="app">
        <Header history={history} />
        <div data-reactroot className={"app-body pub "+bg}>
          <main className={"app w-100 " + p}>
              <Switch>
                <Route path="/home" name="Home" exact component={Home} />
                <Route path="/" name="Home" exact component={Home} />
                <Route path="/missione" name="Missione" exact component={Missione}/>
                <Route path="/datastory/list" name="Storie" exact component={DatastoryList}/>
                <Route path="/datastory/list/:id" name="Dettaglio Storie" exact component={Dashboard}/>
                <Route path="/team" name="Chi Siamo" exact component={Team}/>
                <Route path="/gettingstarted" name="Getting started" exact component={Guida}/>
                {/* <Route path="/partecipa" name="Partecipa" exact component={Partecipa}/> */}
                <Route path="/data-applications" name="Data Applications" exact component={DataApplication}/>
                <Route path="/faqs" name="Faqs" exact component={Faqs}/>
                <Route path="/policy" name="Policy" exact component={Policy}/>
                <Route path="/termini" name="Termini e condizioni" exact component={Termini}/>
                <Route path="/notizie" name="Notizie" exact component={Notizie}/>
                <Route path="/notizie/:id" name="Dettaglio Notizie" exact component={NotizieDett}/>
                <Route path="/dataset/list" name="Lista Dataset" exact component={DatasetList}/>
                <Route path="/dataset/:id" name="Dettaglio Dataset" exact component={DatasetDetail}/>
                <Route path="/search" name="Search" exact component={DatasetList}/>
                <Route path="/ontologies" name="Ontologies" exact component={Ontologies} />
                <Route path="/ontologies/:filter" name="Ontology" component={Ontology} />
                <Route path="/vocabularies" name="Vocabularies" exact component={Vocabularies} />
                <Route path="/vocabularies/:filter" name="Vocabulary" component={Vocabulary} />
                <Route path="*" name="404 Not Found" component={Page404} />
              </Switch>
          </main>
        </div>
        {messages && messages.length > 0 && <Ticker data={messages} />}
        <Footer/>
      </div>
      );
  }
}



function mapStateToProps(state) {
  const { loggedUser, authed } = state.userReducer['obj'] || {}
  const { messages } = state.ticker || { messages: [] }
  return { loggedUser, authed, messages }
}

export default connect(mapStateToProps)(Public);
