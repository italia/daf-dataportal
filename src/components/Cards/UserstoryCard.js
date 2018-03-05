import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Components from 'react';
import { Route, Link } from 'react-router-dom';

class UserstoryCard extends Component {
    constructor(props){
        super(props);
    }

    render(){
        const { story, imageA, time } = this.props
        const iframeStyle = {
            width: '100%',
            height: '160px',
            border: '0'
        }
        return(
            <div className = ".col-md-auto px-2">
                <div className="card b-a-0 border-primary bg-white card-story">
                    <div className="card-img-top" style={iframeStyle}>
                        <div className="row m-0">
                            {imageA && <div className="crop col-12"><img src={"data:image/jpg;base64," + imageA} /></div>}
                        </div>
                    </div>
                    <div className="card-body p-0">
                        <div className="title-dash">
                            <Link to={"/user_story/list/" + story.id}>
                                <h3 className="card-title text-primary">{story.title}</h3>
                            </Link>
                        </div>
                        <div className="card-text row m-0 mt-3 ml-4">
                            <p className="col-8 pl-0 m-0">{story.user}</p>
                            <div className="col-4 my-1">
                                {
                                    story.published == 2 &&
                                    <span className="badge badge-pill badge-warning pull-right badge-dash" title="Pubblica"> </span>
                                }
                                {
                                    story.published == 1 &&
                                    <span className="badge badge-pill badge-success pull-right badge-dash" title="Condivisa"> </span>
                                }
                                {
                                    !story.published &&
                                    <span className="badge badge-pill badge-secondary pull-right badge-dash" title="In bozza"> </span>
                                }
                            </div>
                        </div>
                        {story.pvt == 1 &&
                            <div className="badge badge-danger pull-left mt-20"><i className="fa fa-lock fa-lg m-t-2"></i> PRIVATA</div>
                        }
                    </div>
                    <div className="b-t-story py-2 footer-dash">
                        <div className="pt-1 row">
                            <div className="card-text col-8"><i className="fa fa-clock-o fa-lg text-secondary pr-2"></i> {Math.ceil(time)} min. di lettura</div>
                        </div>
                    </div>
                </div>
              </div >
        )
    }
}

export default UserstoryCard;