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
            items: 18,
            loading: props.loading?props.loading:true
        }
    }
    
    componentDidMount(){
        if(this.state.listWidgets.length===0 && !this.props.widgets){
            let response = widgetService.iframes()
            response.then(json => {
                this.setState({
                    loading: false,
                    listWidgets: json
                })
            })
        }else{
            this.setState({
                loading: false
            })
        }
    }

    loadMore = () => {
        if (this.state.isLoading) { return }
        var totitems = this.state.items + 6;
        this.setState({ 
            items: totitems,
            visible: "hidden"
        });
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
                            <div className="App bg-light">

                                {listWidgets.length>0 ? 
                                <InfiniteScroll onScrollToBottom={this.handleScrollToBottom} className="row pl-3">
                                    {
                                        this.state.listWidgets.slice(0, items).map((iframe, index) => {
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
                                <i>Non sono stati trovati Widget, se vuoi essere il primo a crearli clicca qui</i>
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