import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import WidgetCard from '../../components/Cards/WidgetCard';
import UserstoryCard from '../../components/Cards/UserstoryCard';
import DashboardCard from '../../components/Cards/DashboardCard';
import DatasetCard from '../../components/Cards/DatasetCard';

import {
    loadDatasets,
    unloadDatasets,
    datasetDetail,
    getFileFromStorageManager
} from '../../actions'

// Services
import HomeService from './services/HomeService';


const homeService = new HomeService();

class Home extends Component {
    constructor(props){
        super(props)

        this.state = {
            listStories: [],
            listDashboards: [],
            listIframes: [],
            items: 3,
        }
        
        this.searchDataset();

        let dash = homeService.dashboards();
        dash.then(json => {
            this.setState({
                listDashboards: json
            })
        })

        let stories = homeService.stories();
        stories.then(json => {
            this.setState({
                listStories: json
            })
        })

        let iframes = homeService.iframes();
        iframes.then(json => {
            this.setState({
                listIframes: json
            })
        })

        this.updatePredicate = this.updatePredicate.bind(this);
        

    }

    componentDidMount() {
        this.updatePredicate()
        window.addEventListener("resize", this.updatePredicate);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updatePredicate);
    }

    updatePredicate() {
        if (window.innerWidth <= 1200)
            this.setState({items: 2});
        if (window.innerWidth <= 767)
            this.setState({items: 1});
        if (window.innerWidth > 1200)
            this.setState({items: 3});
    }

    searchDataset(query, category, group, organization, order) {
        const { dispatch } = this.props
        dispatch(loadDatasets(query, 0, '', category, group, organization, order))
    }

    render(){
        const { datasets, isFetching } = this.props
        const { listDashboards, listStories, listIframes, items } = this.state
        return isFetching === true ? <h1 className="text-center fixed-middle"><i className="fas fa-circle-notch fa-spin mr-2" />Loading</h1> : (
            <div>
                <div className="top-home w-100 bg-grey-n d-md-down-none">
                    <div className="row m-auto container body">
                        <div className="col-6 col-lg-3 pt-3">
                            <div className="card mt-1 bg-light">
                                <div className="card-body p-0 clearfix">
                                    <div className="btn-group float-right mt-4">
                                        <button type="button" className="btn btn-transparent btn-lg text-primary dropdown-toggle py-0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        </button>
                                    </div>
                                    <i className="fa fa-table bg-primary p-4 font-2xl mr-3 float-left"></i>
                                    <div className="h5 text-muted mb-0 pt-3">{datasets?datasets.length:0}</div>
                                    <div className="text-muted text-uppercase font-weight-bold font-xs">Dataset</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-lg-3 pt-3">
                            <div className="card mt-1 bg-light">
                                <div className="card-body p-0 clearfix">
                                    <div className="btn-group float-right mt-4">
                                        <button type="button" className="btn btn-transparent btn-lg text-primary dropdown-toggle py-0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        </button>
                                    </div>
                                    <i className="fa fa-chart-bar bg-primary p-4 font-2xl mr-3 float-left"></i>
                                    <div className="h5 text-muted mb-0 pt-3">{listIframes.length}</div>
                                    <div className="text-muted text-uppercase font-weight-bold font-xs">Widgets</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-lg-3 pt-3">
                            <div className="card mt-1 bg-light">
                                <div className="card-body p-0 clearfix">
                                    <div className="btn-group float-right mt-4">
                                        <button type="button" className="btn btn-transparent btn-lg text-primary dropdown-toggle py-0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        </button>
                                    </div>
                                    <i className="fa fa-columns bg-primary p-4 font-2xl mr-3 float-left"></i>
                                    <div className="h5 text-muted mb-0 pt-3">{listDashboards.length}</div>
                                    <div className="text-muted text-uppercase font-weight-bold font-xs">Dashboard</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-lg-3 pt-3">
                            <div className="card mt-1 bg-light">
                                <div className="card-body p-0 clearfix">
                                    <div className="btn-group float-right mt-4">
                                        <button type="button" className="btn btn-transparent btn-lg text-primary dropdown-toggle py-0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        </button>
                                    </div>
                                    <i className="fa fa-font bg-primary p-4 font-2xl mr-3 float-left"></i>
                                    <div className="h5 text-muted mb-0 pt-3">{listStories.length}</div>
                                    <div className="text-muted text-uppercase font-weight-bold font-xs">Storie</div>
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
                            datasets&&datasets.slice(0, items).map((dataset, index) => {
                                return (
                                    <DatasetCard
                                        dataset={dataset}
                                        key={index}
                                    />
                                )
                            })
                        }
                    </div>
                    <div className="w-100 text-center">
                        <Link to={'/dataset'}>
                            <h4 className="text-primary"><u>Vedi tutte</u></h4>
                        </Link>
                    </div>
                </div>
                <div className="py-3 bg-light">
                    <div className="container body w-100">
                        <div className="row mx-auto text-muted">
                            <i className="fa fa-chart-bar fa-lg m-4" style={{ lineHeight: '1' }} /><h2 className="mt-3 mb-4">Widgets</h2>
                        </div>
                        <div className="row mx-auto m-0">
                            {
                                this.state.listIframes.slice(0, items).map((iframe, index) => {
                                    return (
                                        <WidgetCard
                                            iframe={iframe}
                                            key={index}
                                        />)
                                })
                            }
                        </div>
                        <div className="w-100 text-center">
                            <Link to={'/widget'}>
                                <h4 className="text-primary"><u>Vedi tutte</u></h4>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="py-3 container body w-100">
                    <div className="row mx-auto text-muted">
                        <i className="fa fa-columns fa-lg m-4" style={{ lineHeight: '1' }}/><h2 className="mt-3 mb-4">Dashboard</h2>
                    </div>
                    <div className="row mx-auto m-0">
                        {
                            this.state.listDashboards.slice(0, items).map((dash, index) => {
                                let chartUrl = undefined
                                if ((dash.widgets && dash.widgets !== '{}') && (dash.layout && dash.layout !== '{}')) {
                                    const dashLayout = JSON.parse(dash.layout)
                                    let firstLayout = ''
                                    var preview = []
                                    let righe = dashLayout.rows
                                    for (let i = 0; i < righe.length; i++) {
                                        let colonne = righe[i].columns;
                                        for (let j = 0; j < colonne.length; j++) {
                                            let wids = colonne[j].widgets
                                            wids.map((index) => {
                                                /*  if (!index.key.startsWith('TextWidget')) { */
                                                if (index.key.indexOf('TextWidget') == -1) {
                                                    firstLayout = index.key
                                                    preview.push(index.key)
                                                }
                                            })
                                            if (firstLayout != '')
                                                if (preview.length === 2)
                                                    break
                                        }
                                        if (firstLayout != '')
                                            if (preview.length === 2)
                                                break
                                    }

                                    const dashWidgets = JSON.parse(dash.widgets)
                                    var imageA = undefined;
                                    var imageB = undefined;

                                    if (preview.length !== 0) {
                                        imageA = dashWidgets[preview[0]].image
                                        if (preview[1])
                                            imageB = dashWidgets[preview[1]].image
                                    }

                                    if (firstLayout != '') {
                                        const firstWidget = dashWidgets[firstLayout];
                                        chartUrl = firstWidget['props']['url']
                                    }
                                }
                                return (
                                    <DashboardCard
                                        widgetA={preview&&preview[0]?preview[0]:undefined}
                                        widgetB={preview&&preview[1]?preview[1]:undefined}
                                        imageA={imageA}
                                        imageB={imageB}
                                        dash={dash}
                                        id={index}
                                        key={index}
                                    />
                                )
                            })
                        }
                    </div>
                    <div className="w-100 text-center">
                        <Link to={'/dashboard/list'}>
                            <h4 className="text-primary"><u>Vedi tutte</u></h4>
                        </Link>
                    </div>
                </div>
                <div className="py-3 bg-light">
                <div className="container body w-100">
                    <div className="row mx-auto text-muted">
                        <i className="fa fa-font fa-lg m-4" style={{ lineHeight: '1' }}/><h2 className="mt-3 mb-4">Storie</h2>
                    </div>
                    <div className="row mx-auto m-0">
                        {
                            this.state.listStories.slice(0, items).map((story, index) => {
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
                                    var imageA = undefined
                                    if (firstLayout != '') {
                                        const firstWidget = dashWidgets[firstLayout];
                                        imageA = firstWidget.image
                                    }
                                    var time = 0
                                    let widgets = Object.keys(dashWidgets)
                                    for (let k = 0; k < widgets.length; k++) {
                                        if (widgets[k].indexOf('TextWidget') !== -1) {
                                            var text = dashWidgets[widgets[k]].props.text
                                            var array = text ? text.split(' ') : []

                                            time = time + (array.length / 275)
                                        }
                                        else
                                            time = time + 1
                                    }
                                }
                                return (
                                    <UserstoryCard
                                        story={story}
                                        widgetA={firstLayout}
                                        imageA={imageA}
                                        time={time}
                                        id={index}
                                        key={index}
                                    />

                                )
                            })
                        }
                    </div>
                    <div className="w-100 text-center">
                        <Link to={'/user_story/list'}>
                            <h4 className="text-primary"><u>Vedi tutte</u></h4>
                        </Link>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

Home.propTypes = {
    selectDataset: PropTypes.string,
    query: PropTypes.string,
    datasets: PropTypes.array,
    dataset: PropTypes.object,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired,
    ope: PropTypes.string,
    json: PropTypes.array
}

function mapStateToProps(state) {
    const { isFetching, lastUpdated, dataset, items: datasets, query, ope, json } = state.datasetReducer['obj'] || { isFetching: true, items: [], ope: '' }
    return { datasets, dataset, isFetching, lastUpdated, query, ope, json }
}

export default connect(mapStateToProps)(Home)