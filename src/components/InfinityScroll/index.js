import React, { Component, PropTypes } from 'react';
import throttle from 'throttle-debounce/throttle';

export default class InfiniteScroll extends Component {
  static propTypes = {
    children: PropTypes.node,
    offsetBottomThreshold: PropTypes.number,
    onScrollToBottom: PropTypes.func,
  };

  static defaultProps = {
    offsetBottomThreshold: 400,
  };

  constructor() {
    super();
    this.handleScroll = throttle(200, this.handleScroll);
  }

  componentDidMount() {
    this.refs.container.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    this.refs.container.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = (e) => {
    const totalHeight = e.target.scrollHeight;
    const totalOffset = e.target.clientHeight + e.target.scrollTop;

    if (totalOffset + this.props.offsetBottomThreshold >= totalHeight) {
      this.props.onScrollToBottom(e);
    }
  }

  render() {
    const { children, className, ...rest } = this.props;

    return (
      <div {...rest} className={`scroll-y ${className}`} ref="container">
        {children}
      </div>
    );
  }
}
