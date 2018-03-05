import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Components from 'react';
import { Route, Link } from 'react-router-dom';
import IframeWidget from '../../views/DatasetDetail/widgets/IframeWidget';
import { transformWidgetName } from "../../utility";


class WidgetCard extends Component {
    constructor(props){
        super(props)
    }

    render(){
        const { iframe, key } = this.props
        return(
            <div className=".col-md-auto px-3">
                <div className="card widget-card">
                    <div className="header-widget py-1 b-b-1">
                        <div className="title-widget mb-2">
                            <Link to={''}>
                                <p className="my-2 pl-3 text-primary">{iframe.title}</p>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <div className="crop w-100">
                            <div>
                                {
                                    React.createElement(IframeWidget, { url: iframe.iframe_url, class: "no-click" })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default WidgetCard