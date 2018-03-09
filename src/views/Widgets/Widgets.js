import React, { Component } from 'react';
import Components from 'react';
import WidgetService from './service/WidgetService';
import WidgetCard from '../../components/Cards/WidgetCard'

const widgetService = new WidgetService();

class Widgets extends Component{
    constructor(props){
        super(props)

        this.state = {
            listWidgets: [],
            loading: true
        }
    }
    
    componentDidMount(){
        let response = widgetService.iframes()
        response.then(json => {
            this.setState({
                loading: false,
                listWidgets: json
            })
        })
    }

    render(){
        const { loading, listWidgets } = this.state

        return(
            <div className="container body">
                <div className="main_container">
                    <div className="top_nav">
                        <div className="nav_menu">
                            <nav className="dashboardHeader">
                                <h2>Widget</h2>
                            </nav>
                            {loading ? <h1 className="text-center fixed-middle"><i className="fa fa-circle-o-notch fa-spin mr-2" /> Caricamento </h1> :
                            <div className="row pl-3">
                            {
                                this.state.listWidgets.map((iframe, index) => {
                                    
                                    return (
                                        iframe.identifier && iframe.table &&
                                        <WidgetCard
                                            iframe={iframe}
                                            key={index}
                                        />
                                    )
                                })
                            }
                            </div>
                        }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Widgets