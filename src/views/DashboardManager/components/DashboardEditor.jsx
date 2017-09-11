import React, { Component } from 'react';
import Components from 'react';
import Dashboard, { addWidget } from 'react-dazzle';
import { withRouter } from 'react-router-dom'

// App components
import Header from './Header';
import EditBar from './bar/EditBar';
import EditBarTop from './bar/EditBarTop';
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

class DashboardEditor extends Component {
  constructor(props) {
    super(props);

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

    //set state
    this.state = {
      // Widgets that are available in the dashboard
      widgets: {},
      // Layout of the dashboard
      layout: {
        rows: []
      },
      editMode: true,
      isModalOpen: false,
      dashboard: {
        status: 0
      }
    };
    
    //id of widget to edit
    this.id= this.props.match.params.id,
 
    //bind functions
    this.load = this.load.bind(this);
    this.setLayout = this.setLayout.bind(this);
    this.addRow = this.addRow.bind(this);
    this.addWidget = this.addWidget.bind(this);
    this.saveTextWidget = this.saveTextWidget.bind(this);
    this.save = this.save.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onPublish = this.onPublish.bind(this);
    this.onRemove = this.onRemove.bind(this);
    
  }

  componentDidMount(){
  }

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
    
    //if is new
    if(!this.id) return;

    let response = dashboardService.get(this.id);
    
    response.then((config) => {

      let dashboard = config;
      if (dashboard.widgets)
        dashboard.widgets = JSON.parse(dashboard.widgets);
      else dashboard.widgets = {}

      if (dashboard.layout)
       dashboard.layout = JSON.parse(dashboard.layout);
      else dashboard.layout = { rows: [] }

      this.setState({
        dashboard: dashboard
      });

      for(let i in dashboard.widgets) {
        let widget = dashboard.widgets[i];

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
      this.setState( {
        widgets: dashboard.widgets,
      });
      
      this.setLayout(dashboard.layout, true);
    });

  }

  /**
   * When a widget moved, this will be called. Layout should be given back.
   */
  onMove = (layout) => {
    this.setLayout(layout);
  }

  /**
   * When a widget is removed, this will be called. Layout should be given back.
   */
  onRemoveWidget = (layout) => {
    this.setLayout(layout);
  }


  /**
  * Set layout Dashboard
  */
  setLayout = (layout, notSave) => {
    // add control button
    if(layout) {

      layout.rows.map((row, index) => {
        
        //remove old widget control
        if(this.state.widgets['BtnControlWidget_' + index] ) {
          this.state.widgets['BtnControlWidget_' + index] = null;
        }
  
        //create new widget control
        this.state.widgets['BtnControlWidget_' + index] = {
          type: BtnControlWidget,
          title: '',
          props: {
            layout: layout,
            index: index,
            setLayout: this.setLayout,
            addWidget: this.addWidget,
            widgets: this.widgetsTypes
          }
        }
  
        //remove widget control from layout
        if (row.columns.length > 0 && row.columns[row.columns.length - 1].className == "col-w-30")
          row.columns.pop();
  
        //insert new widget control in layout
        row.columns.push({
          className: 'col-w-30',
          widgets: [{key: 'BtnControlWidget_' + index}],
        })
  
      }) 
      
      this.state.layout = layout;
  
      this.setState({
        layout: layout
      });
  
      if(!notSave)
        this.save();
    }
  }

  /**
  * Add row
  */
  addRow = function (widgetKey) { 
    let columns = [{
        className: 'col-lg-12 col-md-12 col-sm-12 col-xs-12',
        widgets: [],
      }];

    let row = {columns: columns}

    this.state.layout.rows.push(row);
    this.setLayout(this.state.layout);
  }

  /**
  * Add widget
  */
  addWidget = function (widgetKey, row) {
    
    if (row == undefined) {
      row = this.state.layout.rows.length;
      this.addRow();
    }

    let newWidget = this.widgetsTypes[widgetKey];

    //count widget of type
    let progressive = this.getNextProgressive(widgetKey);
    //assign key to widget
    let newKey = widgetKey + "_" + progressive;
    if (!newWidget.props)
      newWidget.props = {};
    newWidget.props.wid_key = newKey;

    //add widget to list
    this.state.widgets[newKey] = newWidget;
    //add widget to layout
    this.state.layout.rows[row].columns[0].widgets.push({key: newKey});
    this.setLayout(this.state.layout);
  }

  /**
  * Count widget of type
  */
  getNextProgressive = function(type) {
    let counter = 0;
    Object.keys(this.state.widgets).map((name, wid) => {
      let nameArr = name.split('_');
      if (nameArr [0] == type) {
        let count = Number.parseInt(nameArr[1]);
        if (count > counter)
          counter = count;
      }
    })
    
    return counter + 1;
  }

  /**
  * Save Layout and widgets
  */
  save = () => {
    //clean layout from control button
    let layoutOld = JSON.parse(JSON.stringify(this.state.layout));
    let layout = {};

    for(let i in layoutOld) {
      let rows = layoutOld[i];
      if (rows) {
        rows.filter(row => {
          row.columns = row.columns.filter(col => {
            if (col.className == "col-w-30")
              return false;
            else
              return true;
          })
        })
        layout[i] = rows;
      }
    };

    //clean widgets from control button
    let widgetsOld = this.state.widgets;
    let widgets = {};

    for(let i in widgetsOld) {
      let widget = widgetsOld[i];
      if(!i.startsWith("BtnControlWidget")) {
        if (widget.type) {
          widgets[i] = JSON.parse(JSON.stringify(widget));
          widgets[i].type = widget.type.name
        }
      }
    }

    //save data
    let request = this.state.dashboard;
    request.layout = JSON.stringify(layout);
    request.widgets = JSON.stringify(widgets);
    const response = dashboardService.save(request);
    this.setState({saving: true});
    response.then((data)=> {
      this.setState({
        dashboard: this.state.dashboard,
        saving: false
      })
    })
  }

  /**
   * Save text of TextWidget
   */
  saveTextWidget = function (key, html) {
    this.state.widgets[key].props.text = html;
    this.save();
  }

  /**
   * Types of widgets avaible
   */
  widgetsTypes = {
    "TextWidget":{
      "type": TextWidget,
      "title": "Contenuto Testuale",
      "props":{
        "onSave": this.saveTextWidget.bind(this)
      }
    },/* 
    "EngineTelemetricsWidget":{
        "type": BarChart,
        "title":"Engine"
    },
    "PerformanceWidget":{
        "type": DoughnutChart,
        "title":"Reactor Temp"
    },
    "ShipVitalTelemetricsWidget":{
        "type": LineChart,
        "title":"Reactor Telemetrics"
    },
    "IframeTest": {
      "type": IframeWidget,
      "title":"Iframe Test",
      "props":{
        "url": "http://localhost:8088/superset/explore/table/3/?form_data=%7B%22datasource%22%3A%223__table%22%2C%22viz_type%22%3A%22line%22%2C%22slice_id%22%3A20%2C%22granularity_sqla%22%3A%22ds%22%2C%22time_grain_sqla%22%3A%22Time+Column%22%2C%22since%22%3A%22100+years+ago%22%2C%22until%22%3A%22now%22%2C%22metrics%22%3A%5B%22sum__num%22%5D%2C%22groupby%22%3A%5B%22name%22%5D%2C%22limit%22%3A%2225%22%2C%22timeseries_limit_metric%22%3Anull%2C%22show_brush%22%3Afalse%2C%22show_legend%22%3Atrue%2C%22rich_tooltip%22%3Atrue%2C%22show_markers%22%3Afalse%2C%22x_axis_showminmax%22%3Atrue%2C%22line_interpolation%22%3A%22linear%22%2C%22contribution%22%3Afalse%2C%22x_axis_label%22%3A%22%22%2C%22x_axis_format%22%3A%22smart_date%22%2C%22y_axis_label%22%3A%22%22%2C%22y_axis_bounds%22%3A%5Bnull%2Cnull%5D%2C%22y_axis_format%22%3A%22.3s%22%2C%22y_log_scale%22%3Afalse%2C%22rolling_type%22%3A%22None%22%2C%22time_compare%22%3Anull%2C%22num_period_compare%22%3A%22%22%2C%22period_ratio_type%22%3A%22growth%22%2C%22resample_how%22%3Anull%2C%22resample_rule%22%3Anull%2C%22resample_fillmethod%22%3Anull%2C%22where%22%3A%22%22%2C%22having%22%3A%22%22%2C%22filters%22%3A%5B%5D%7D&standalone=true&height=400"
      }
    },
    "Iframe Google": {
      "type": IframeWidget,
      "title":"Iframe Google",
      "props":{
        "url": "http://localhost:8088/superset/explore/table/3/?form_data=%7B%22datasource%22%3A%223__table%22%2C%22viz_type%22%3A%22line%22%2C%22slice_id%22%3A20%2C%22granularity_sqla%22%3A%22ds%22%2C%22time_grain_sqla%22%3A%22Time+Column%22%2C%22since%22%3A%22100+years+ago%22%2C%22until%22%3A%22now%22%2C%22metrics%22%3A%5B%22sum__num%22%5D%2C%22groupby%22%3A%5B%22name%22%5D%2C%22limit%22%3A%2225%22%2C%22timeseries_limit_metric%22%3Anull%2C%22show_brush%22%3Afalse%2C%22show_legend%22%3Atrue%2C%22rich_tooltip%22%3Atrue%2C%22show_markers%22%3Afalse%2C%22x_axis_showminmax%22%3Atrue%2C%22line_interpolation%22%3A%22linear%22%2C%22contribution%22%3Afalse%2C%22x_axis_label%22%3A%22%22%2C%22x_axis_format%22%3A%22smart_date%22%2C%22y_axis_label%22%3A%22%22%2C%22y_axis_bounds%22%3A%5Bnull%2Cnull%5D%2C%22y_axis_format%22%3A%22.3s%22%2C%22y_log_scale%22%3Afalse%2C%22rolling_type%22%3A%22None%22%2C%22time_compare%22%3Anull%2C%22num_period_compare%22%3A%22%22%2C%22period_ratio_type%22%3A%22growth%22%2C%22resample_how%22%3Anull%2C%22resample_rule%22%3Anull%2C%22resample_fillmethod%22%3Anull%2C%22where%22%3A%22%22%2C%22having%22%3A%22%22%2C%22filters%22%3A%5B%5D%7D&standalone=true&height=400"
      }
    } */
  }
  
  /**
   * onChangeTitle
   */
  onChangeTitle(title){
    this.state.dashboard.title = title;
    this.save();
  }

  /**
   * onPublish
   */
  onPublish(published){
    this.state.dashboard.status = published;
    this.save();
  }

  /**
   * onRemove
   */
  onRemove() {
    dashboardService.remove(this.state.dashboard.id).then(() => {
      window.location = '#/dashboard/list';
    });
  }

  /**
   * Render Function
   */
  render() {
    return (
    <Container>
      <EditBarTop 
          dashboard={this.state.dashboard}
          saving={this.state.saving}
          onChange={this.onChangeTitle}
          onPublish={this.onPublish}
          onRemove={this.onRemove}
      ></EditBarTop>
      <Dashboard
        frameComponent={CustomFrame}
        onRemove={this.onRemoveWidget}
        layout={this.state.layout}
        widgets={this.state.widgets}
        editable={true}
        onAdd={this.onAdd}
        onMove={this.onMove}
      />
      <EditBar 
        onEdit={this.toggleEdit} 
        addRow={this.addRow}
        widgets={this.widgetsTypes}
        addWidget={this.addWidget}
        />
    </Container>
    );
  }

}

export default DashboardEditor;
