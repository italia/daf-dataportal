import React, { Component } from 'react';
import Components from 'react';
import Dashboard, { addWidget } from 'react-dazzle';

// App components
import Container from './Container.jsx';
import CustomFrame from './CustomFrame.jsx';
import ViewBar from './bar/ViewBar.jsx';

// Widgets of the dashboard.
import TextWidget from './widgets/TextWidget';
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
// import '../styles/custom.css';


const widgetService = new WidgetService();
const dashboardService = new DashboardService();

class DashboardView extends Component {
  constructor(props) {
    super(props);
    this.state={
      id: this.props.match.params.id
    };

    this.load()
  }
  
  /**
   * Types of widgets avaible
    */
  widgetsTypes = {
    "TextWidget":{
      "type": TextWidget,
      "title": "Contenuto Testuale",
      "props":{
        "readOnly": true
      }
    }
  };

  /**
   * Load all Iframe types
   */
  loadIframe = (iframes) => {
    iframes.map(iframe => {
      this.widgetsTypes[iframe.identifier] = {
        "type": IframeWidget,
        "title": iframe.title,
        "props":{
          "url": iframe.iframe_url
        }
      }
    })
    
    console.log(this.widgetsTypes)
  }
  
  /**
   * Method called for load stored user widget
   */
  load = (config) => {
    let response = dashboardService.get(this.state.id);
    response.then((config) => {
      
      let dashboard = config;
      if (dashboard.widgets)
        dashboard.widgets = JSON.parse(dashboard.widgets);
      if (dashboard.layout)
        dashboard.layout = JSON.parse(dashboard.layout);

      for(let i in dashboard.widgets) {
        let widget = dashboard.widgets[i];
        //assign instance to widget.type
        /* let typeWid = i //.split('_')[0]; //Test */
        /* if(i.startsWith("TextWidget")) { */
        if (i.indexOf('TextWidget')!=-1) {

          /* widget.type = this.widgetsTypes[typeWid].type; */
          widget.type = TextWidget;
          widget.props.readOnly = true
          //last extends overrides previous
          /* widget.props = {...widget.props, ...this.widgetsTypes[typeWid].props,  wid_key: i}; */
        } else {
          widget.type = IframeWidget;
        }
        
      }
      /* console.log(dashboard.widgets) */
      //render widgets
      this.state.widgets = dashboard.widgets;
      this.setState({
        layout: dashboard.layout,
        title: dashboard.title,
        subtitle: dashboard.subtitle,
        org: dashboard.org,
        pvt: dashboard.pvt,
        dashboard: dashboard
        /* widgets: dashboard.widgets */
      });

          //get iframe from server
      let org = dashboard.org
      let iframeTypes = widgetService.getIframe(org, dashboard.pvt);
      iframeTypes.then(iframes => {
        this.loadIframe(iframes);
        //get widget from server
        /* this.load(); */
      }, err => {
        //get widget from server
        /* this.load(); */
      })

    });

  }


  /**
   * Render Function
   */
  render() {
    
    return (
    <Container>
    {this.state.dashboard && 
      <div>
        <ViewBar dashboard={this.state.dashboard} title={this.state.title} subtitle={this.state.subtitle} id={this.state.id} org={this.state.org} pvt={this.state.pvt}></ViewBar>
        <Dashboard
          frameComponent={CustomFrame}
          layout={this.state.layout}
          widgets={this.state.widgets}
          editable={false}
          />
        </div>}
    </Container>
    );
  }

}

export default DashboardView;
