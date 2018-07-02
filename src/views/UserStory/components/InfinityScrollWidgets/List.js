import React, { Component } from 'react';
import InfiniteScroll from '../../../../components/InfinityScroll';
import { serviceurl } from "../../../../config/serviceurl"
import $ from 'jquery';

class List extends Component {
  constructor(props) {
    super(props);
    console.log('LIST widgets: ' + this.props.widgets)
    this.state = {
      items: 6,
      visibility: 'visible'
    }
  }

  transformName(name) {
    var sp1 = name.split('_o_')
    if (sp1[1])
      return sp1[1]
    else
      return name
  }

  loadMore = () => {
    if (this.state.isLoading) { return }
    var totitems = this.state.items + 1;
    this.setState({ items: totitems, visibility: 'hidden' });
  }

  handleScrollToBottom = () => this.loadMore()
  handleLoadMoreClick = () => this.loadMore()

  render() {
    const { items, isLoading, visibility } = this.state;
    const { widgets, isModalOpen, onRequestClose, onWidgetSelect } = this.props;
    var count = 0;
    let visible = Object.keys(widgets).length<=items ? 'hidden':visibility;
    const widgetItems = Object.keys(widgets).map((widget, key) => {
      if(count<items){
        count++;
        let wid = widgets[widget].type;
        
        let onLoadIframe = function(id) {
          $("#title-preview-" + id).hide();
        }

          if(widget)
              if (widget && widget == "TextWidget")
          return (
            <div className="infinity-iframe-100" key={key}>
              <div className="card text-center">
                <div className="card-body">
                  <a className="list-group-item" onClick={() => onWidgetSelect(widget)}>
                    <h6 className="list-group-item-heading">
                      <i className="fa fa-font" aria-hidden="true"></i>
                      {" " + widgets[widget].title}
                    </h6>
                  </a>
                </div>
              </div>
            </div>
          );
        if (widget && widget.indexOf("BtnControlWidget") != 0 && widget != "TextWidget")
          return (
              <div className="infinity-iframe-50" key={key}>
              <div className="card text-center">
                  <div className="card-body">  
                    <a className="list-group-item" onClick={() => onWidgetSelect(widget)}>
                      <h6 className="list-group-item-heading" id={"title-preview-" + key}>
                        {" [" + this.transformName(widgets[widget].table) + "] " + widgets[widget].title}
                      </h6>
                      <div className="preview-widget">
                      {
                        <div style={{ width: '100%' }}>
                          {/* <img src={"data:image/jpg;base64," + widgets[widget].image} /> */}
                          <img src={serviceurl.urlCacher + 'plot/' + widget + '/330x280'}/>
                        </div>
                       /*  :
                        <div style={{ width: '100%' }}>
                          {React.createElement(wid, { ...widgets[widget].props, class: "no-click", onLoad: () => onLoadIframe(key) })}
                        </div> */
                      }
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
          {isLoading ? 'Caricamento...' : 'Altri'}
        </button>
      </InfiniteScroll>
    );
  }
}

export default List;
