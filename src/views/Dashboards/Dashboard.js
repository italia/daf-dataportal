import React, { Component } from 'react';
import GridLayout from 'react-grid-layout'


class Dashboard extends Component{
  constructor(props){
    super(props)

    this.state = { width: 1108, cols: 12 }

    this.updatePredicate = this.updatePredicate.bind(this)
  }

  componentDidMount(){
    this.updatePredicate()
    window.addEventListener("resize", this.updatePredicate);
  }

  componentWillUnmount() {
      window.removeEventListener("resize", this.updatePredicate);
  }

  updatePredicate() {
      if (window.innerWidth <= 1200){
        console.log("Minore o uguale a 1200")
          this.setState({hide: true})
          this.setState({width: 928, cols: 8, hide: false});
        }
      if (window.innerWidth <= 767){
        console.log("MAggiore o uguale a 767")
          this.setState({hide: true})
          this.setState({width: 788, cols: 4, hide: false});
      }
      if (window.innerWidth > 1200){
        console.log("Maggiore di 1200")
          this.setState({hide: true})
          this.setState({width: 1108, cols: 12, hide: false});
      }
  }

  render(){
    const { width, cols, hide } = this.state
    var layout = [
      {i: 'a', x: 0, y: 0, w: 1, h: 2},
      {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
      {i: 'c', x: 4, y: 0, w: 1, h: 2}
    ];
    return (<div>
      {!hide && <GridLayout className="container b-a-1" layout={layout} cols={cols} autoSize={true} rowHeight={30} width={width}>
        <div className="bg-danger" key="a">a</div>
        <div className="bg-accento" key="b">b</div>
        <div className="bg-success" key="c">c</div>
      </GridLayout>}
      </div>
    )
  }
}

export default Dashboard