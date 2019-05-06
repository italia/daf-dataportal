import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import WidgetCard from '../../components/Cards/WidgetCard';
import UserstoryCard from '../../components/Cards/UserstoryCard';
import DatasetCard from '../../components/Cards/DatasetCard';

import {
    search
} from '../../actions'

// Services
import HomeService from './services/HomeService';


const homeService = new HomeService();

class Home extends Component {
    constructor(props){
        super(props)

        this.state = {
            listStories: [],
            listIframes: [],
            counter:[],
            items: 3,
            isLoading: true,
        }

        let iframes = homeService.iframes();
        iframes.then(json => {
            var widgets = json
            let iframesOpen = homeService.iframesOpen()
            iframesOpen.then(json =>{
              var list = widgets.concat(json)
              console.log(widgets)
              this.setState({
                listIframes: list
              })
            })
            
        }) 

        this.updatePredicate = this.updatePredicate.bind(this);
        this.handleSearch = this.handleSearch.bind(this);

    }

    componentDidMount() {
      var datasets = []
      var stories = []
      var counter = {}
      let home = homeService.homeElements();
        home.then(json =>{
          try{
            json.map((element, index)=>{
                switch(element.type){
                    case 'catalog_test':
                        datasets.push(element)
                        break;
                    case 'ext_opendata':
                        datasets.push(element)
                        break;
                    case 'datastory':
                        let story = JSON.parse(element.source)
                        stories.push(story)
                        break;
                    case 'type':
                        let type = JSON.parse(element.source)
                        counter = type
                        break;
                }
            })
            this.setState({
              listDataset: datasets,
              listStories: stories,
              counter: counter,
              isLoading: false
            })
          }
          catch(error){console.log('error in getting elements')}
        })
        
        this.updatePredicate()
        window.addEventListener("resize", this.updatePredicate);
    }

    updatePredicate() {
        if (window.innerWidth <= 1200)
            this.setState({items: 2});
        if (window.innerWidth <= 767)
            this.setState({items: 1});
        if (window.innerWidth > 1200)
            this.setState({items: 3});
    }

    handleSearch(){
        const { dispatch } = this.props
        let filter = {
            'text': '',
            'index': ['catalog_test','ext_opendata'],
            'org': [],
            'theme':[],
            'date': "",
            'status': [],
            'order':"desc"
        }
        this.props.history.push('/private/dataset/');
        dispatch(search('', filter, false))
    }


    render(){
        const { isFetching, results } = this.props
        const { listDataset, listStories, listIframes, counter, items } = this.state
        //const { listDashboards, listStories, listDataset, listIframes, items, counter, isLoading } = this.state
        //var counter = JSON.parse(results[results.length-4].source)
        var totData = 0
        if(counter){
            if(counter.catalog_test)
                totData += parseInt(counter.catalog_test)
            if(counter.ext_opendata)
                totData += parseInt(counter.ext_opendata)
        }
        return isFetching === true ? <h1 className="text-center fixed-middle"><i className="fas fa-circle-notch fa-spin mr-2" />Caricamento</h1> : (
            <div>
                <div className="top-home w-100 bg-grey-n d-md-down-none">
                    <div className="row m-auto container body">
                        <div className="col-6 col-lg-3 pt-3 mx-auto">
                            <div className="card mt-1 bg-light">
                                <div className="card-body p-0 clearfix">
{/*                                     <div className="btn-group float-right mt-4">
                                        <button type="button" className="btn btn-transparent btn-lg text-primary dropdown-toggle py-0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        </button>
                                    </div> */}
                                    <div className="bg-primary p-4 mr-3 float-left">
                                        <i className="fa fa-table" style={{'fontSize':'1.5em'}}></i>
                                    </div>
                                    <div className="h5 text-muted mb-0 pt-3">{(totData>=0)?totData:'-'}</div>
                                    <div className="text-muted text-uppercase font-weight-bold font-xs">Dataset</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-lg-3 pt-3 mx-auto">
                            <div className="card mt-1 bg-light">
                                <div className="card-body p-0 clearfix">
{/*                                     <div className="btn-group float-right mt-4">
                                        <button type="button" className="btn btn-transparent btn-lg text-primary dropdown-toggle py-0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        </button>
                                    </div> */}
                                    <div className="bg-primary p-4 mr-3 float-left">
                                        <i className="fa fa-chart-bar" style={{'fontSize':'1.5em'}}></i>
                                    </div>
                                    <div className="h5 text-muted mb-0 pt-3">{listIframes.length>0?listIframes.length:'-'}</div>
                                    <div className="text-muted text-uppercase font-weight-bold font-xs">Widget</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-lg-3 pt-3 mx-auto">
                            <div className="card mt-1 bg-light">
                                <div className="card-body p-0 clearfix">
                                    <div className="bg-primary p-4 mr-3 float-left">
                                        <i className="fa fa-font" style={{'fontSize':'1.5em'}}></i>
                                    </div>
                                    <div className="h5 text-muted mb-0 pt-3">{counter.datastory?counter.datastory:'-'}</div>
                                    <div className="text-muted text-uppercase font-weight-bold font-xs">Datastory</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-3 container body w-100">
                    <div className="row m-0 text-muted">
                        <i className="fa fa-table fa-lg m-4" style={{lineHeight:'1'}} /><h2 className="mt-3 mb-4">Dataset</h2>
                    </div>
                    <div className="row mx-auto m-0">
                        {
                            listDataset&&Array.isArray(listDataset)&&listDataset.slice(0, items).map((element, index) => {
                                var open = element.type==="ext_opendata"
                                var dataset = JSON.parse(element.source)
                                return (
                                    <DatasetCard
                                        open={open}
                                        dataset={dataset}
                                        key={index}
                                    />
                                )
                            })
                        }
                    </div>
                    <div className="w-100 text-center">
                        <a className="pointer" onClick={this.handleSearch.bind(this)}>
                            <h4 className="text-primary"><u>Vedi tutti</u></h4>
                        </a>
                    </div>
                </div>
                <div className="py-3 bg-light">
                    <div className="container body w-100">
                        <div className="row mx-auto text-muted">
                            <i className="fa fa-chart-bar fa-lg m-4" style={{ lineHeight: '1' }} /><h2 className="mt-3 mb-4">Widget</h2>
                        </div>
                        <div className="row mx-auto m-0">
                            {
                                 this.state.listIframes && this.state.listIframes.length>0?this.state.listIframes.slice(0, items).map((iframe, index) => {
                                    return (
                                        <WidgetCard
                                            iframe={iframe}
                                            key={index}
                                        />)
                                    }): 
                                    <h1 className="w-100 text-center py-5"><i className="fas fa-circle-notch fa-spin mr-2" />Caricamento</h1>
                                               
                            }
                        </div>
                        <div className="w-100 text-center">
                            <Link to={'/private/widget'}>
                                <h4 className="text-primary"><u>Vedi tutti</u></h4>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="py-3 container body w-100">
                    <div className="row mx-auto text-muted">
                        <i className="fa fa-font fa-lg m-4" style={{ lineHeight: '1' }}/><h2 className="mt-3 mb-4">Datastory</h2>
                    </div>
                    <div className="row mx-auto m-0">
                        {
                            listStories.slice(0, items).map((story, index) => {
                                if ((story.widgets) && (story.layout && story.layout !== '{}')) {
                                    const dashwidgets = story.widgets.filter(wid=>{
                                      return wid.identifier.toLowerCase().indexOf('textwidget')<0
                                    })
                  
                                    var firstLayout = dashwidgets.length>0?dashwidgets[0]:''
                  
                                    var time = 0
                                    for (let k = 0; k < story.widgets.length; k++){
                                      if(story.widgets[k].identifier.toLowerCase().indexOf('textwidget')!==-1){
                                        var text = story.widgets[k].text
                                        var array = text?text.split(' '):[]
                                        
                                        time = time + (array.length/275)
                                      }
                                      else
                                        time = time + 1 
                                    }
                                  }
                                return (
                                    <UserstoryCard
                                        story={story}
                                        widgetA={firstLayout.identifier}
                                        time={time}
                                        id={index}
                                        key={index}
                                    />

                                )
                            })
                        }
                    </div>
                    <div className="w-100 text-center">
                        <Link to={'/private/datastory/list'}>
                            <h4 className="text-primary"><u>Vedi tutte</u></h4>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { isFetching, lastUpdated, dataset, items: datasets, query, ope, json } = state.datasetReducer['obj'] || { isFetching: false, items: [], ope: '' }
    const { results } = state.searchReducer['search'] || { results: [] }
    return { datasets, dataset, isFetching, lastUpdated, query, ope, json, results }
}

export default connect(mapStateToProps)(Home)