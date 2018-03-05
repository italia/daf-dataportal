import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import IframeWidget from '../../views/DatasetDetail/widgets/IframeWidget';
import { transformWidgetName } from "../../utility";


class WidgetCard extends Component {
    constructor(props){
        super(props)
        this.state = {}

        this.isSuperset = this.isSuperset.bind(this)
        this.isMetabase = this.isMetabase.bind(this)
    }

    async loadImage(widget) {
        let url = 'https://datipubblici.daf.teamdigitale.it/dati-gov/v1/plot/' + widget + '/330x280';
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

    componentDidMount(){
        const { iframe } = this.props
        let url = 'https://datipubblici.daf.teamdigitale.it/dati-gov/v1/plot/' + iframe.identifier + '/330x280';
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

    render(){
        const { iframe } = this.props
        var sp1 = iframe.table.split('_o_')
        let sp2 = sp1[0].split('.')
        var org = sp2[1]

        console.log(org)

        return(
            <div className=".col-md-auto px-2">
                <div className="card widget-card">
                    <div className="header-widget py-1">
                        <div className="row m-0">
                            <div className="col-9 title-widget my-2 pl-3">
                                <Link to={''}>
                                    <p className="text-primary">{iframe.title}</p>
                                </Link>
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
                                    {this.state.imageSrc ? <img src={"data:image/jpg;base64," + this.state.imageSrc} alt={transformWidgetName(iframe.table)}/> :
                                    
                                        React.createElement(IframeWidget, { url: iframe.iframe_url, class: "no-click" })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row m-0 footer-widget">
                        <div className="col-2 p-0 h-100">
                            <div className="tool text-icon text-center bg-light b-r-dash">
                                {this.isSuperset() && <i className="fa fa-database py-3" title="Realizzato con Superset"/>}
                                {this.isMetabase() && <i className="fa fa-pie-chart py-3" title="Realizzato con Metabase" />}
                            </div>
                        </div>
                        <div className="col-9 pr-0 h-100">
                            <div className>
                                <i className="text-icon fa fa-table py-3 pr-2"/> Dataset
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default WidgetCard