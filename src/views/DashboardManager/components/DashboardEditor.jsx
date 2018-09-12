import React, { Component } from 'react';
import Components from 'react';
import Dashboard, { addWidget } from 'react-dazzle';
import { withRouter, Prompt } from 'react-router-dom'
import { connect } from 'react-redux'
import { toastr } from 'react-redux-toastr'

// App components
import EditBar from './bar/EditBar.jsx';
import EditBarTop from './bar/EditBarTop.jsx';
import Container from './Container.jsx';
import CustomFrame from './CustomFrame.jsx';

// Widgets of the dashboard.
import TextWidget from './widgets/TextWidget';
import BtnControlWidget from './widgets/BtnControlWidget';
import IframeWidget from './widgets/IframeWidget';

// Services
import WidgetService from './services/WidgetService';
import DashboardService from './services/DashboardService';

import { serviceurl } from "../../../config/serviceurl";

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

    //set state
    this.state = {
      // Widgets that are available in the dashboard
      widgets: {},
      // Layout of the dashboard
      layout: {
        rows: []
      },
      editMode: true,
      modified: this.props.history.location.state ? this.props.history.location.state.modified : false,
      isModalOpen: false,
      dashboard: this.props.history.location.state ? this.props.history.location.state.dash : {status: 0},
      id: this.props.match.params.id?this.props.match.params.id:''
    };

    if(this.props.match.params.id)
      this.load();
    else{
      let iframeTypes = widgetService.getIframe(this.props.history.location.state.dash.org, this.props.history.location.state.dash.pvt);
      iframeTypes.then(iframes => {
        this.loadIframe(iframes);
        //get widget from server
        /* this.load(); */
      }, err => {
        //get widget from server
        /* this.load(); */
      })
    }
 
    //bind functions
    /* this.load = this.load.bind(this); */
    this.setLayout = this.setLayout.bind(this);
    this.addRow = this.addRow.bind(this);
    this.addWidget = this.addWidget.bind(this);
    this.saveTextWidget = this.saveTextWidget.bind(this);
    this.save = this.save.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onPublish = this.onPublish.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.back = this.back.bind(this)
    this.preview = this.preview.bind(this)
    
  }

  componentDidMount() {
      window.addEventListener('beforeunload', (ev) => 
      {  
          ev.preventDefault();
          if(this.state.modified)
            return ev.returnValue = 'Sei sicuro di voler chiudere la pagina?';
          return;
      });
  }

  async loadImage(widget){
    let url =  serviceurl.apiURLDatiGov + '/plot/' + widget + '/330x280';
    const response = await fetch(url, {
      method: 'GET'
    })
    
    return response
  }

  /**
   * Load all Iframe types
   */
  loadIframe = (iframes) => {
    iframes.map(iframe => {
/*       const response = this.loadImage(iframe.identifier)
      response.then(response => {
        if(response.ok)
          response.text().then(text => {
            this.widgetsTypes[iframe.identifier] = {
              "type": IframeWidget,
              "title": iframe.title,
              "image": text.replace(/"/g, ''),
              //"props": iframe
              "table": iframe.table,
              "props":{
                "url": iframe.iframe_url,
                "identifier": iframe.identifier,
                "origin": iframe.origin
              }
            }
          })
        else */
          this.widgetsTypes[iframe.identifier] = {
            "type": IframeWidget,
            "title": iframe.title,
            "image": undefined,
            "table": iframe.table,
            //"props": iframe
            "props": {
              "url": iframe.iframe_url,
              "identifier": iframe.identifier,
              "origin": iframe.origin
            }
          }
      })
    //})
  }
  

  /**
   * Method called for load stored user widget
   */
  load = (config) => {
    
    //if is new
    if(!this.state.id) return;

    let response = dashboardService.get(this.state.id);
    
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

      for (let i in dashboard.widgets) {
        let widget = dashboard.widgets[i];
        //assign instance to widget.type
        /* let typeWid = i //.split('_')[0]; //Test */
        /* if (i.startsWith("TextWidget")) { */
          if (i.indexOf('TextWidget')!=-1) {
          /* widget.type = this.widgetsTypes[typeWid].type; */
          widget.type = TextWidget;
          widget.props.onSave = this.saveTextWidget.bind(this);
          //last extends overrides previous
          /* widget.props = {...widget.props, ...this.widgetsTypes[typeWid].props,  wid_key: i}; */
        } else {
          widget.type = IframeWidget;
        }

      }

      //render widgets
      this.setState( {
        widgets: dashboard.widgets,
      });
      
      this.setLayout(dashboard.layout);

      //get iframe from server
      let iframeTypes = widgetService.getIframe(dashboard.org, dashboard.pvt);
      iframeTypes.then(iframes => {
        this.loadIframe(iframes);
        //get widget from server
        /* this.load(); */
      }, err => {
        //get widget from server
        /* this.load(); */
      })

      /* console.log(this.widgetsTypes) */
    });

  }

  /**
   * When a widget moved, this will be called. Layout should be given back.
   */
  onMove = (layout) => {
    this.setLayout(layout, true);
  }

  /**
   * When a widget is removed, this will be called. Layout should be given back.
   */
  onRemoveWidget = (layout) => {
    this.setLayout(layout, true);
  }


  /**
  * Set layout Dashboard
  */
  setLayout = (layout, notSave) => {
    if(notSave){
      console.log('modificato')
      this.setState({
        modified: true
      })
    }
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
            dashboardWidgets: this.state.widgets,
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
      

      //this.state.layout = layout;
  
      this.setState({
        layout: layout
      });
  
/*       if(!notSave)
        this.save(); */
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
    this.setLayout(this.state.layout, true);
  }

  /**
  * Add widget
  */
  addWidget = function (widgetKey, row) {
    if (row == undefined) {
      row = this.state.layout.rows.length;
      this.addRow();
    }

    let newWidget = {};
    let newKey = ""
    //count widget of type
    if(widgetKey==="TextWidget"){
      let progressive = this.getNextProgressive(widgetKey);
      //assign key to widget
      newKey = widgetKey + "_" + progressive;
      
      newWidget = {
        "type": TextWidget,
        "title": "Testo",
        "props": {
          "onSave": this.saveTextWidget.bind(this),
          "wid_key": newKey
        }
      }
    }else{
      newWidget = this.widgetsTypes[widgetKey];
      newKey = widgetKey
    }
    if (!newWidget.props)
      newWidget.props = {};
    newWidget.props.wid_key = newKey;

    //add widget to list
    this.state.widgets[newKey] = newWidget;
    //add widget to layout
    this.state.layout.rows[row].columns[0].widgets.push({key: newKey});
    this.setLayout(this.state.layout, true);

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

  cleanWidgets(layout) {
    const { widgets } = this.state;
    var output = {};
    if (layout && widgets) {
      let righe = layout.rows;
      for (let i = 0; i < righe.length; i++) {
        let colonne = righe[i].columns;
        for (let j = 0; j < colonne.length; j++) {
          let wids = colonne[j].widgets
          for (let k = 0; k < wids.length; k++) {
            output[wids[k].key] = widgets[wids[k].key]
          }
        }
      }
    console.log(output);
    return output;
    }
  }

  back(){
      this.props.history.push('/private/dashboard/list')
  }

  preview(){
      this.props.history.push('/private/dashboard/list/'+this.state.id)
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
    /* console.log(widgetsOld); */
    for(let i in widgetsOld) {
      let widget = widgetsOld[i];
      /* console.log(i)
      console.log(widget) */
      /* if(!i.startsWith("BtnControlWidget")) { */
        if (i.indexOf('BtnControlWidget')==-1) {
        if (widget.type) {
/*           console.log(widgets[i])
          console.log(widget) */
          widgets[i] = JSON.parse(JSON.stringify(widget));
          /* console.log(widgets[i].type + ' ' + widget.type.name) */
          widgets[i].type = widget.type.name
        }
      }
    }

    //save data
    let request = this.state.dashboard;
    request.layout = JSON.stringify(layout);
    /* request.widgets = JSON.stringify(widgets); */
    request.widgets = JSON.stringify(this.cleanWidgets(layout));
    if(request.widgets==='{}'){
      toastr.error('Errore', 'Per salvare una Dashboard inserisci almeno un Widget')
    }else{
      const response = dashboardService.save(request);
      this.setState({saving: true});
      response.then((data)=> {
        request.id = data.message
        this.setState({
          dashboard: request,
          id: data.message,
          modified: false,
          saving: false
        })
        this.props.history.push('/private/dashboard/list/'+ data.message + '/edit');
        toastr.success('Completato', 'Dashboard salvata con successo')
      })
    }
  }

  /**
   * Save text of TextWidget
   */
  saveTextWidget = function (key, html) {
    this.state.widgets[key].props.text = html;
    console.log(key)
    console.log(this.state.widgets)
    console.log(this.state.widgets[key])
    this.save();
  }

  /**
   * Types of widgets avaible
   */
  widgetsTypes = {
    "TextWidget":{
      "type": TextWidget,
      "title": "Testo",
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
    <Container>{
      this.state.dashboard &&
      <div>
      <EditBarTop 
          dashboard={this.state.dashboard}
          onBack={this.back}
          onPreview={this.preview}
          saving={this.state.modified}
          onSave={this.save}
          onChange={this.onChangeTitle}
          onPublish={this.onPublish}
          onRemove={this.onRemove}
          org={this.state.dashboard.org}
          pvt={this.state.dashboard.pvt}
          status={this.state.dashboard.status}
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
      <Prompt
        when={this.state.modified}
        message={'Ci sono delle modifiche non salvate, sei sicuro di voler lasciare la pagina?'}
      />
      </div>}
    </Container>

    );
  }

}

function mapStateToProps(state) {
  const { loggedUser } = state.userReducer['obj'] || { }
  return { loggedUser }
}

export default connect(mapStateToProps)(DashboardEditor);
