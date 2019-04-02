import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { serviceurl } from "../../config/serviceurl";
import { truncateDatasetName, isAdmin, isEditor, isPublic } from '../../utility.js'

class UserstoryCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
            dropdownStyle: {width: '261px', left: 'auto', right: '0'},
            published: props.story.status,
            saving: false
        }
    }


    render(){
        const { story, widgetA, time, id, loggedUser } = this.props
        const { published } = this.state

        const iframeStyle = {
            width: '100%',
            height: '160px',
            border: '0'
        }

        return(
            <div className="mx-auto">
                <div className={isPublic()?"card b-a-0 border-primary bg-white card-story":"card b-a-0 border-primary bg-gray-100 card-story"}>
                    <div className="card-img-top" style={iframeStyle}>
                        <div className="row m-0">
                            {widgetA && <div className="crop col-12"><img src={serviceurl.urlCacher +widgetA+'.png'} /></div>}
                        </div>
                    </div>
                    <div className="card-body p-0">
                        <div className="title-dash">
                            <Link title={story.title} to={!isPublic()?"/private/datastory/list/" + story.id:"/datastory/list/" + story.id}>
                                <h3 className="card-title text-primary">{truncateDatasetName(story.title, 60)}</h3>
                            </Link>
                        </div>
                        <div className="card-text row m-0 mt-3 ml-4">
                            <p className="col-8 pl-0 m-0">{story.user}</p>
                            <div className="col-4">
                                {
                                    published == 2 &&
                                    //<span className="badge badge-pill badge-warning fa-pull-right badge-dash" title="Pubblica"> </span>
                                    <i className="fa fa-lg fa-globe mt-1 pr-2 fa-pull-right text-icon mx-auto" title='Pubblica'/>
                                    // <span title="Open Data" className="ml-2"><FontAwesomeIcon icon={faGlobe} className="mx-auto" /></span>
                                }
                                {
                                    published == 1 &&
                                    //<span className="badge badge-pill badge-success fa-pull-right badge-dash" title="Condivisa"> </span>
                                    <i className="fa fa-users fa-lg mt-1 pr-2 fa-pull-right text-icon mx-auto" title="Condivisa"/>
                                    // <span title="Organizzazione" className="ml-2"><FontAwesomeIcon icon={faUsers} className="mx-auto" /></span>
                                }
                                {
                                    !published &&
                                    //<span className="badge badge-pill badge-secondary fa-pull-right badge-dash" title="In bozza"> </span>
                                    <i className="fa fa-user fa-lg mt-1 pr-2 fa-pull-right text-icon mx-auto" title="In Bozza"/>
                                    // <span title="Privata" className="ml-2"><FontAwesomeIcon icon={faUser} className="mx-auto"/></span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className={isPublic()?"b-t-story py-2 footer-dash":"b-t-dash py-2 footer-dash"}>
                        <div className="pt-1 row">
                            <div className="card-text col-8"><i className="fas fa-clock text-icon pr-2"></i> {time?Math.ceil(time):0} min. di lettura</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserstoryCard;