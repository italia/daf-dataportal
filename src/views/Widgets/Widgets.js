import React, { Component } from 'react';
import Components from 'react';
import InfiniteScroll from '../../components/InfinityScroll'
import WidgetService from './service/WidgetService';
import WidgetCard from '../../components/Cards/WidgetCard'

const widgetService = new WidgetService();

class Widgets extends Component{
    constructor(props){
        super(props)

        this.state = {
            listWidgets: props.widgets?props.widgets:[],
            searched: props.widgets?props.widgets:[],
            query: '',
            items: 18,
            loading: props.loading?props.loading:true
        }
        this.createWidget = this.createWidget.bind(this)
    }
    
    componentDidMount(){
        if(this.state.listWidgets.length===0 && !this.props.widgets){
          let response = widgetService.iframes()
          response.then(json => {
              var iframes = json

              let responseOpen = widgetService.iframesOpen()
              responseOpen.then(open=>{
                iframes = iframes.concat(open)
                this.setState({
                  loading: false,
                  listWidgets: iframes,
                  searched: iframes
                })
              })
              
          })
        }else{
            this.setState({
                loading: false
            })
        }
    }

    filter(e, val){
        return e.title.toLowerCase().indexOf(val) != -1 || e.table.toLowerCase().indexOf(val) != -1
    }

    searchBy(val) {
        const { listWidgets } = this.state;
        var result = listWidgets.filter((wid) => {
            if(wid.table)
                return wid.title.toLowerCase().indexOf(val) != -1 || wid.table.toLowerCase().indexOf(val) != -1
            else
                return wid.title.toLowerCase().indexOf(val) != -1
        })
    
        this.setState({
          query: val,
          searched: result
        })
        return result;
      }

    loadMore = () => {
        if (this.state.isLoading) { return }
        var totitems = this.state.items + 6;
        this.setState({ 
            items: totitems,
            visible: "hidden"
        });
    }

    createWidget(){
        this.props.openModalWidget();
      }

    handleScrollToBottom = () => this.loadMore()
    handleLoadMoreClick = () => this.loadMore()

    render(){
        const { loading, listWidgets, visible, items } = this.state
        let visibility = listWidgets.length<=items ? 'hidden':visible;
        return loading == true ? <h1 className="text-center fixed-middle"><i className="fas fa-circle-notch fa-spin mr-2"/>Caricamento</h1> : (
           <div className="container body">
                <div className="main_container">
                    <div className="top_nav">
                        <div className="nav_menu">
                            <nav className="dashboardHeader row">
                                <i className="fas fa-chart-bar fa-lg m-2" style={{lineHeight:'1'}}/><h2> Widget</h2>
                            </nav>
                            {window.location.hash.indexOf('dataset')===-1 && <div className="row">
                                <div className="col-10">
                                    <div className="input-prepend input-group mb-20">
                                        <div className="input-group-text transparent-frame">
                                            <i className="fa fa-search"/>
                                        </div>
                                        <input className="form-control transparent-frame" size="25" type="text" value={this.state.query} onChange={(e) => this.searchBy(e.target.value)} placeholder="Filtra la lista ..."/>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <button type="button" className="btn btn-link float-right" title="Aggiungi Widget" onClick={this.createWidget}>
                                        <i className="fa fa-plus-circle fa-lg m-t-2"></i>
                                    </button>
                                    </div>
                                    
                            </div>}
                            <div className="App bg-light">

                                {listWidgets.length>0 ? 
                                <InfiniteScroll onScrollToBottom={this.handleScrollToBottom} className="row pl-3">
                                    {
                                        this.state.searched.slice(0, items).map((iframe, index) => {
                                            if(iframe.identifier)
                                                return (
                                                    <WidgetCard
                                                        iframe={iframe}
                                                        key={index}
                                                    />
                                                )
                                        })
                                    }
                                </InfiniteScroll>
                                :
                                <i>Non sono stati trovati Widget</i>
                                }
                            </div>
                            <button
                                className="List-load-more-button"
                                onClick={this.handleLoadMoreClick}
                                disabled={loading} style={{visibility: visibility }}>
                                {loading ? 'Caricamento...' : 'Altri'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Widgets