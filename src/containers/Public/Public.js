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
import Partecipa from '../../views/Public/Partecipa/Partecipa';
import Notizie from '../../views/Public/Notizie/NotizieList';
import NotizieDett from '../../views/Public/Notizie/NotizieDett';
import UserStoryList from '../../views/UserStory/components/UserStoryList.jsx';
import UserStoryView from '../../views/UserStory/components/UserStoryView.jsx';
import DataApplication from '../../views/Public/DataApplication/DataApplication';
import Faqs from '../../views/Public/Faqs'
import DatasetList from '../../views/DataseList/DatasetList'
import DatasetDetail from '../../views/DatasetDetail/DatasetDetail'
import Page404 from '../../views/404/Page404';

class Public extends Component {

  /* constructor(props){
    super(props)
  } */

  render() {
    const { history } = this.props
    var bg = 'bg-white'
    var p = ''

    if(window.location.hash.indexOf('data-applications') !== -1) bg = 'bg-light'
    if(window.location.hash.indexOf('search')!==-1)
      p='py-5'
    if(window.location.hash.indexOf('userstory/list')!==-1){
      p='py-5'
      bg='bg-light'
    }
    if(window.location.hash.indexOf('userstory/list/')!==-1){
      p=''
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
                <Route path="/userstory/list" name="Storie" exact component={UserStoryList}/>
                <Route path="/userstory/list/:id" name="Dettaglio Storie" exact component={UserStoryView}/>
                <Route path="/team" name="Chi Siamo" exact component={Team}/>
                <Route path="/lineeguida" name="Linee Guida" exact component={Guida}/>
                <Route path="/partecipa" name="Partecipa" exact component={Partecipa}/>
                <Route path="/data-applications" name="Data Applications" exact component={DataApplication}/>
                <Route path="/faqs" name="Faqs" exact component={Faqs}/>
                <Route path="/notizie" name="Notizie" exact component={Notizie}/>
                <Route path="/notizie/:id" name="Dettaglio Notizie" exact component={NotizieDett}/>
                <Route path="/dataset/list" name="Lista Dataset" exact component={DatasetList}/>
                <Route path="/dataset/:id" name="Dettaglio Dataset" exact component={DatasetDetail}/>
                <Route path="/search" name="Search" exact component={DatasetList}/>
                <Route path="*" name="404 Not Found" component={Page404} />
              </Switch>
          </main>
        </div>
        <Footer/>
      </div>
      );
  }
}

function mapStateToProps(state) {
  const { loggedUser, authed } = state.userReducer['obj'] || {}
  return { loggedUser, authed }
}

export default connect(mapStateToProps)(Public);
