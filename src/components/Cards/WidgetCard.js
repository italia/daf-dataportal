import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import IframeWidget from '../../views/DatasetDetail/widgets/IframeWidget';
import { transformWidgetName, truncateWidgetTitle, truncateDatasetName } from "../../utility";
import { serviceurl } from "../../config/serviceurl";



class WidgetCard extends Component {
    constructor(props){
        super(props)
        this.state = {}

        this.isSuperset = this.isSuperset.bind(this)
        this.isMetabase = this.isMetabase.bind(this)
    }

    async loadImage(widget) {
        let url = serviceurl.apiURLDatiGov + '/plot/' + widget + '/330x280';
        const response = await fetch(url, {
            method: 'GET'
        })

        return response
    }

    isSuperset(){
        const { iframe } = this.props
        if(iframe.identifier.indexOf('superset')!== -1)
            return true
        else
            return false
    }

    isMetabase(){
        const { iframe } = this.props
        if (iframe.identifier.indexOf('metabase')!== -1)
            return true
        else
            return false
    }

    //remove &standalone=true from original link
    getLink(url){
        if(url)
            if(url.indexOf('&standalone=true') !== -1){
                url = url.substring(0, url.length - 16);
            }
        return url
    }

    componentDidMount(){
        const { iframe } = this.props
        let url = serviceurl.apiURLDatiGov + '/plot/' + iframe.identifier + '/330x280';
        const response = fetch(url, {
            method: 'GET'
        }).then(response => {
            if (response.ok) {
                response.text().then(text => {
                    this.setState({
                        loading: false,
                        imageSrc: text.replace(/"/g, '')
                    })
                });
            } else {
                this.setState({
                    loading: false,
                    imageSrc: undefined
                })
            }
        })
    }

    linkTo(nome){
        this.props.history.push('/dataset/'+nome)
    }

    render(){
        const { iframe } = this.props
        var org = ''
        if(iframe.table){
            if(iframe.table.indexOf('_o_')!==-1){
                var sp1 = iframe.table.split('_o_')
                let sp2 = sp1[0].split('.')
                org = sp2[1]
            }
        } else {
            org = 'default_org'
        }
        
        return(
            <div className="mx-auto">
                <div className="card widget-card">
                    <div className="header-widget py-1">
                        <div className="row m-0">
                            <div className="col-9 title-widget my-2 pl-3">
                                <a href={this.getLink(iframe.iframe_url)} target='_blank' rel="noopener noreferrer" title={iframe.title}><p className="text-primary">{truncateWidgetTitle(iframe.title)}</p></a>
                            </div>
                            <div className="col-3 my-2">
                                {
                                    org !== 'default_org' &&
                                    <span className="badge badge-pill badge-danger pull-right badge-dash" title="Il widget è privato"> </span>
                                }
                                {
                                    org === 'default_org' &&
                                    <span className="badge badge-pill badge-success pull-right badge-dash" title="Il widget è pubblico"> </span>
                                }
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="row m-0 b-b-card">
                            <div className="crop col-12 w-100">
                                <div>
                                    {this.state.imageSrc && this.state.imageSrc !== 'noimage' ? <img src={"data:image/jpg;base64," + this.state.imageSrc} alt={iframe.table?transformWidgetName(iframe.table):''}/> :
                                    
                                        React.createElement(IframeWidget, { url: iframe.iframe_url, class: "no-click" })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row m-0 footer-widget">
                        <div className="col-2 p-0 h-100">
                            <div className="tool text-icon text-center bg-light b-b-card b-r-dash">
                                {this.isSuperset() && <i className="fa fa-database py-3" title="Realizzato con Superset"/>}
                                {this.isMetabase() && <i className="fa fa-pie-chart py-3" title="Realizzato con Metabase" />}
                            </div>
                        </div>
                        <div className="col-8 pr-0 h-100">
                            <div title={sp1 ? (sp1[1]) : ''}>
                                <i className="text-icon fa fa-table py-3 pr-2" /> {sp1 ? truncateDatasetName(sp1[1]):''}
                            </div>
                        </div>
                        {sp1 && <div className="col-2 p-0 h-100">
                            <Link to={'/dataset/'+sp1[1]}>
                                <i className="text-primary fa fa-arrow-circle-right pull-right fa-lg py-3 pr-3" title="Vai al Dataset"/>
                            </Link>
                        </div>}
                    </div>
                </div>
            </div>
        )
    }
}

export default WidgetCard