import React, { Component } from 'react';
import InfiniteScroll from '../../../../components/InfinityScroll';
import $ from 'jquery';

class List extends Component {
  constructor(props) {
    super(props);
    console.log('LIST widgets: ' + this.props.widgets)
  }
  state = {
    items: 4
  }

  loadMore = () => {
    if (this.state.isLoading) { return }
    var totitems = this.state.items + 1;
    this.setState({ items: totitems });
  }

  handleScrollToBottom = () => this.loadMore()
  handleLoadMoreClick = () => this.loadMore()

  render() {
    const { items, isLoading } = this.state;
    const { widgets, isModalOpen, onRequestClose, onWidgetSelect } = this.props;
    var count = 0;

    const widgetItems = Object.keys(widgets).map((widget, key) => {
      if(count<items){
        count++;
        let wid = widgets[widget].type;
        
        let onLoadIframe = function(id) {
          $("#title-preview-" + id).hide();
        }

          if(widget)
            return (
              <div className="infinity-iframe-50" key={key}>
              <div className="card text-center">
                  <div className="card-body">  
                    <a className="list-group-item" onClick={() => onWidgetSelect(widget)}>
                      <h6 className="list-group-item-heading" id={"title-preview-" + key}>
                        {widgets[widget].title}
                      </h6>
                      <div className="preview-widget">
                        {React.createElement(wid, {...widgets[widget].props, class: "no-click", onLoad: () => onLoadIframe(key)})}
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
          disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Load more'}
        </button>
      </InfiniteScroll>
    );
  }
}

export default List;
