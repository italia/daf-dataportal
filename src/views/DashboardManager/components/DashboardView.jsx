import React, { Component } from 'react';
import Components from 'react';
import Dashboard, { addWidget } from 'react-dazzle';

// App components
import Header from './Header';
import EditBar from './EditBar';
import Container from './Container';
import CustomFrame from './CustomFrame';

// Widgets of the dashboard.
import TextWidget from './widgets/TextWidget';
import BtnControlWidget from './widgets/BtnControlWidget';
import BarChart from './widgets/BarChart';
import LineChart from './widgets/LineChart';
import DoughnutChart from './widgets/DoughnutChart';
import IframeWidget from './widgets/IframeWidget';

// Services
import WidgetService from './services/WidgetService';
import DashboardService from './services/DashboardService';

// We are using bootstrap as the UI library
// Removed for conflicts
//import 'bootstrap/dist/css/bootstrap.css';

// Default styes of dazzle.
import 'react-dazzle/lib/style/style.css';

// Our styles
import '../styles/custom.css';


const widgetService = new WidgetService();
const dashboardService = new DashboardService();

class DashboardView extends Component {
  constructor(props) {
    super(props);
    this.state={
      id: this.props.match.params.id
    };

    //get iframe from server
    let iframeTypes = widgetService.getIframe();
    iframeTypes.then(iframes => {
      this.loadIframe(iframes);
      //get widget from server
      this.load();
    }, err => {
      //get widget from server
      this.load();
    })

  }
  
  /**
   * Types of widgets avaible
    */
  widgetsTypes = {
    "TextWidget":{
      "type": TextWidget,
      "title": "Contenuto Testuale",
      "props":{
        readOnly: false
      }
    }
  };

  /**
   * Load all Iframe types
   */
  loadIframe = (iframes) => {
    iframes.map(iframe => {
      this.widgetsTypes[iframe.title] = {
        "type": IframeWidget,
        "title": iframe.title,
        "props":{
          "url": iframe.iframe_url
        }
      }
    }) 
  }
  
  /**
   * Method called for load stored user widget
   */
  load = (config) => {
    let response = dashboardService.get(this.state.id);
    response.then((config) => {
      for(let i in config.widgets) {
        let widget = config.widgets[i];

        //assign instance to widget.type
        let typeWid = i.split('_')[0];
        if(this.widgetsTypes[typeWid]) {
          widget.type = this.widgetsTypes[typeWid].type;
          //last extends overrides previous
          widget.props = {...widget.props, ...this.widgetsTypes[typeWid].props,  wid_key: i};
        } else {
          console.error("Widget " + typeWid + " non trovato")
        }
      }

      //render widgets
      this.state.widgets = config.widgets;
      this.setState({
        layout: config.layout
      });
    });

  }


  /**
   * Render Function
   */
  render() {
    return (
    <Container>
      <Header title="View Dashboard" />
      <Dashboard
        frameComponent={CustomFrame}
        layout={this.state.layout}
        widgets={this.state.widgets}
        editable={false}
        />
    </Container>
    );
  }

}

export default DashboardView;
