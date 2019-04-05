import React, { Component } from 'react';
import Dashboard, { addWidget } from 'react-dazzle';
import { toastr } from 'react-redux-toastr'
import SectionTitle from './SectionTitle';
import TextEditor from './editor/TextEditor';
import ShareButton from '../../../components/ShareButton/ShareButton';
import CustomFrame from './CustomFrame.jsx';
import IframeWidget from './widgets/IframeWidget';
import TextWidget from './widgets/TextWidget';
import BtnControlWidget from './widgets/BtnControlWidget';
import WidgetService from '../../DashboardManager/components/services/WidgetService';
import EditBar from './bar/EditBar.jsx'
import { serviceurl } from "../../../config/serviceurl";
import { isPublic } from '../../../utility'


// Default styes of dazzle.
require('react-dazzle/lib/style/style.css');

// Our styles
require('../styles/custom.css');

const widgetService = new WidgetService();

const months = {
  '1': 'Gennaio',
  '2': 'Febbraio',
  '3': 'Marzo',
  '4': 'Aprile',
  '5': 'Maggio',
  '6': 'Giugno',
  '7': 'Luglio',
  '8': 'Agosto',
  '9': 'Settembre',
  '10': 'Ottobre',
  '11': 'Novembre',
  '12': 'Dicembre',
}

class UserStoryEditorContainer extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      dataStory: props.dataStory,
      widgets: props.widgets,
      layout: JSON.parse(props.dataStory.layout)
    };

    let org = props.dataStory.org
    
    if(!props.readonly){
      let response = widgetService.getIframe(org, props.dataStory.pvt)
      response.then(iframes => {
        this.loadIframe(iframes);
      })
    }

    this.onChange = this.onChange.bind(this);
    this.setLayout = this.setLayout.bind(this);
    this.addRow = this.addRow.bind(this);
    this.addWidget = this.addWidget.bind(this);
    this.saveTextWidget = this.saveTextWidget.bind(this);
    this.save = this.save.bind(this);
    this.isLastText = this.isLastText.bind(this)
  }

  componentDidMount(){
    let wids = this.state.widgets

    Object.keys(wids).map(wid => {
      if (wids[wid].props.wid_key.indexOf("TextWidget") != -1) {
        wids[wid].props.onSave = this.saveTextWidget.bind(this)
      }
    })

    this.setState({
      widgets: wids
    })
    if (!this.props.readonly)
      this.setLayout(this.state.layout, true)
  }

  async loadImage(widget) {
    let url = serviceurl.apiURLDatiGov + '/plot/' + widget + '/330x280';
    const response = await fetch(url, {
      method: 'GET'
    })

    return response
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
      console.log(output)
      return output;
    }
  }

  /**
* Count widget of type
*/
  getNextProgressive = function (type) {
    let counter = 0;
    Object.keys(this.state.widgets).map((name, wid) => {
      let nameArr = name.split('_');
      if (nameArr[0] == type) {
        let count = Number.parseInt(nameArr[1]);
        if (count > counter)
          counter = count;
      }
    })

    return counter + 1;
  }

  /**
   * Load all Iframe types
   */
  loadIframe = (iframes) => {
    iframes.map(iframe => {
      /* const response = this.loadImage(iframe.identifier)
      response.then(response => {
        if (response.ok)
          response.text().then(text => {
            this.widgetsTypes[iframe.identifier] = {
              "type": IframeWidget,
              "title": iframe.title,
              "image": text.replace(/"/g, ''),
              //"props": iframe
              "table": iframe.table,
              "props": {
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
* Add row
*/
  addRow = function (widgetKey) {
    let columns = [{
      className: 'col-lg-12 col-md-12 col-sm-12 col-xs-12',
      widgets: [],
    }];

    let row = { columns: columns }

    this.state.layout.rows.push(row);
    this.setLayout(this.state.layout);
  }

  isLastText(){
    let rowsLength = this.state.layout.rows.length
    if(rowsLength > 0){
      var prevWidget = this.state.layout.rows[rowsLength-1].columns[0].widgets[0].key
      if(prevWidget.indexOf('TextWidget')!==-1)
        return true
    }
    
    return false
  }

  /**
* Add widget
*/
  addWidget = function (widgetKey, row) {
    
    if(widgetKey === "TextWidget" && this.isLastText()){
      toastr.info('Attenzione', 'Hai già inserito un testo sopra questo elemento, modificalo per aggiungere paragrafi')
      return
    }else{
      if (row == undefined) {
        row = this.state.layout.rows.length
        this.addRow();
      }

      let newWidget = {};
      let newKey = ""
      //count widget of type
      if (widgetKey === "TextWidget") {
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
      } else {
        newWidget = this.widgetsTypes[widgetKey];
        newKey = widgetKey
        newWidget.type = IframeWidget
      }
      if (!newWidget.props)
        newWidget.props = {};
      newWidget.props.wid_key = newKey;

      //console.log(this.widgetsTypes)
      //add widget to list
      this.state.widgets[newKey] = newWidget;
      //add widget to layout
      this.state.layout.rows[row].columns[0].widgets.push({ key: newKey });
      this.setLayout(this.state.layout);
    }

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
    "TextWidget": {
      "type": TextWidget,
      "title": "Testo",
      "props": {
        "onSave": this.saveTextWidget.bind(this)
      }
    },
  }

  onChange = function(key, value) {
    this.state.dataStory[key] = value;
    this.state.dataStory['timestamp'] = new Date(); 
    if(this.props.onChange)
      this.props.onChange(this.state.dataStory);
  }

  /**
  * Save Layout and widgets
  */
  save = () => {
    //clean layout from control button
    let layoutOld = JSON.parse(JSON.stringify(this.state.layout));

    let layout = {};

    for (let i in layoutOld) {

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
    for (let i in widgetsOld) {
      let widget = widgetsOld[i];
      /* console.log(i)
      console.log(widget) */
      /* if(!i.startsWith("BtnControlWidget")) { */
      if (i.indexOf('BtnControlWidget') == -1) {
        if (widget.type) {
          /*           console.log(widgets[i])
                    console.log(widget) */
          widgets[i] = widget;
          /* console.log(widgets[i].type + ' ' + widget.type.name) */
          widgets[i].type = widget.type
        }
      }
    }

    //save data
    let request = this.state.dataStory;
    request.layout = JSON.stringify(layout);
    request.widgets = JSON.stringify(this.cleanWidgets(layout));
    console.log(JSON.parse(request.widgets))
    /* const response = dashboardService.save(request); */
    if (this.props.onChange)
      this.props.onChange(request);
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
    console.log(layout)
    console.log(this.state.widgets)
    this.setLayout(layout);
  }

  setLayout = (layout, notSave) => {
    // add control button
    if (layout) {

      layout.rows.map((row, index) => {

        //remove old widget control
        if (this.state.widgets['BtnControlWidget_' + index]) {
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
          widgets: [{ key: 'BtnControlWidget_' + index }],
        })

      })

      /* this.state.layout = layout; */

      this.setState({
        layout: layout
      });

      if (!notSave)
        this.save();
    }
  }

  getFirstWidget(widgets){
    var wid;
    for(wid in widgets){
      if(wid.indexOf('TextWidget')===-1){
        return wid
        break
      }
    }
  }


  /**
   * Render Function
   */
  render() {
    var firstWid = this.getFirstWidget(this.state.widgets)
    var url = ''

    if (firstWid)
      url = serviceurl.urlCacher +firstWid+'.png'
    return (
      <div>
      { this.props.readonly && isPublic() && 
        <ShareButton className="mt-5 float-right" />
      }
      <div className="bg-white story-content container">
        <SectionTitle readonly={this.props.readonly} title="Titolo"/>
        <TextEditor 
          readonly={this.props.readonly}
          keyValue="title"
          text={this.state.dataStory.title} 
          className="text-editor-title"
          onChange={this.onChange}
          placeholder="Title"
          disableHtml={true}
        ></TextEditor>
        {this.props.readonly && <div className="mt-5 mb-2 text-left mx-auto text-editor" style={{maxWidth: '600px'}}>
          Autore <i>{this.state.dataStory.user}</i>
        </div>}
        {this.props.readonly && <div className="mb-3 text-left mx-auto text-editor" style={{maxWidth: '600px'}}>
          Organizzazione <i>{this.state.dataStory.org}</i>
        </div>}
        {this.props.readonly && <div className="mb-5 text-left mx-auto text-editor" style={{maxWidth: '600px'}}>
          {this.state.dataStory && this.state.dataStory.timestamp && this.state.dataStory.timestamp.dayOfMonth+" "+months[this.state.dataStory.timestamp.monthValue]+", "+this.state.dataStory.timestamp.year}
        </div>}
        <SectionTitle readonly={this.props.readonly} title="Sottotitolo"/>
        <TextEditor 
          readonly={this.props.readonly}
          keyValue="subtitle"
          text={this.state.dataStory.subtitle} 
          className="text-editor-subtitle"
          onChange={this.onChange}
          placeholder="Subtitle"
        ></TextEditor>
        <SectionTitle readonly={this.props.readonly} title="Contenuto della Storia" />
        <Dashboard
          frameComponent={CustomFrame}
          onRemove={this.onRemoveWidget}
          layout={this.state.layout}
          widgets={this.state.widgets}
          editable={!this.props.readonly}
          onAdd={this.onAdd}
          onMove={this.onMove}
          />
        {!this.props.readonly && 
        <EditBar
          onEdit={this.toggleEdit}
          addRow={this.addRow}
          widgets={this.widgetsTypes}
          addWidget={this.addWidget}
        />}
        
      </div>
    </div>
    );
  }

}

export default UserStoryEditorContainer;
