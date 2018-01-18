import React, { Component } from 'react';
import InfiniteScroll from '../../../../components/InfinityScroll';
import WidgetImage from "./WidgetImage";
import $ from 'jquery';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: 6,
      visibility: 'visible'
    }
  }

  loadMore = () => {
    if (this.state.isLoading) { return }
    var totitems = this.state.items + 1;
    this.setState({ items: totitems, visibility: 'hidden'});
  }

  handleScrollToBottom = () => this.loadMore()
  handleLoadMoreClick = () => this.loadMore()

  async imageLoad(widget){
    /* console.log('identifier: ' + widget); */
    let url = 'https://datipubblici.daf.teamdigitale.it/dati-gov/v1/plot/' + widget + '/330x280';
    const response = await fetch(url, {
        method: 'GET'
    }).then(response => response.text())
        .then(text => {
          return text
        })
    /* console.log(response.text()) */
	}

  render() {
    const { visibility, items, isLoading } = this.state;
    const { widgets, isModalOpen, onRequestClose, onWidgetSelect } = this.props;
    let visible = Object.keys(widgets).length<=items ? 'hidden':visibility;
    var count = 0;
    const widgetItems = Object.keys(widgets).map((widget, key) => {
      if(count<items){
        count++;
        let wid = widgets[widget].type;
        let onLoadIframe = function(id) {
          $("#title-preview-" + id).hide();
        } 
        if(widget && widget =="TextWidget")
          return (
            <div className="infinity-iframe-100" key={key}>
                <div className="card text-center">
                    <div className="card-body">
                      <a className="list-group-item" onClick={() => onWidgetSelect(widget)}>
                      <h6 className="list-group-item-heading">
                      <i className="fa fa-font" aria-hidden="true"></i>  
                        {" "+widgets[widget].title}
                      </h6>
                      </a>
                  </div>
                </div>
            </div>
          );
        if(widget && widget.indexOf("BtnControlWidget") != 0 && widget !="TextWidget")
        return (
            <div className="infinity-iframe-50" key={key}>
                <div className="card text-center">
                    <div className="card-body">  
              
                      <a className="list-group-item" onClick={() => onWidgetSelect(widget)}>
                        <h6 className="list-group-item-heading" id={"title-preview-" + key}>
                          {widgets[widget].title}
                        </h6>
                        <div className="preview-widget">
                          <WidgetImage widget={widget} wid={wid} widgets={widgets} onLoadIframe={onLoadIframe} key={key}/>
                        </div>
                      </a>
                </div>
              </div>
            </div>
          );
      }
    });
    return (
      <InfiniteScroll onScrollToBottom={this.handleScrollToBottom} className="d-flex flex-wrap">
        {widgetItems}
        <button
          className="List-load-more-button"
          onClick={this.handleLoadMoreClick}
          disabled={isLoading} style={{visibility: visible }}>
          {isLoading ? 'Loading...' : 'Load more'}
        </button>
      </InfiniteScroll>
    );
  }
}

export default List;
