import React, { Component } from 'react';
import Dashboard, { addWidget } from 'react-dazzle';

// App components
import Header from './Header';
import EditBar from './EditBar';
import Container from './Container';
import AddWidgetDialog from './AddWidgetDialog';
import CustomFrame from './CustomFrame';

// Widgets of the dashboard.
import TextWidget from './widgets/TextWidget';
import BtnControlWidget from './widgets/BtnControlWidget';
import BarChart from './widgets/BarChart';
import LineChart from './widgets/LineChart';
import DoughnutChart from './widgets/DoughnutChart';
import IframeWid from './widgets/Iframe';

// We are using bootstrap as the UI library
//import 'bootstrap/dist/css/bootstrap.css';

// Default styes of dazzle.
import 'react-dazzle/lib/style/style.css';

// Our styles
import '../styles/custom.css';


const IframeContainer = (url) => 
<div>
   <Iframe  iframe={url} />
</div>


var Iframe = React.createClass({
    iframe: function () {
        return {
            __html: this.props.iframe
        }
    },

    render: function() {
        return <div>
            <div dangerouslySetInnerHTML={ this.iframe() } />
        </div>;
    }
});


class Dash extends Component {
  constructor(props) {
    super(props);
    const ale = () => <Iframe iframe='<iframe width="300"  height="300" seamless frameBorder="0" scrolling="no" src="http://localhost:8088/superset/explore/table/3/?form_data=%7B%22datasource%22%3A%223__table%22%2C%22viz_type%22%3A%22line%22%2C%22slice_id%22%3A20%2C%22granularity_sqla%22%3A%22ds%22%2C%22time_grain_sqla%22%3A%22Time+Column%22%2C%22since%22%3A%22100+years+ago%22%2C%22until%22%3A%22now%22%2C%22metrics%22%3A%5B%22sum__num%22%5D%2C%22groupby%22%3A%5B%22name%22%5D%2C%22limit%22%3A%2225%22%2C%22timeseries_limit_metric%22%3Anull%2C%22show_brush%22%3Afalse%2C%22show_legend%22%3Atrue%2C%22rich_tooltip%22%3Atrue%2C%22show_markers%22%3Afalse%2C%22x_axis_showminmax%22%3Atrue%2C%22line_interpolation%22%3A%22linear%22%2C%22contribution%22%3Afalse%2C%22x_axis_label%22%3A%22%22%2C%22x_axis_format%22%3A%22smart_date%22%2C%22y_axis_label%22%3A%22%22%2C%22y_axis_bounds%22%3A%5Bnull%2Cnull%5D%2C%22y_axis_format%22%3A%22.3s%22%2C%22y_log_scale%22%3Afalse%2C%22rolling_type%22%3A%22None%22%2C%22time_compare%22%3Anull%2C%22num_period_compare%22%3A%22%22%2C%22period_ratio_type%22%3A%22growth%22%2C%22resample_how%22%3Anull%2C%22resample_rule%22%3Anull%2C%22resample_fillmethod%22%3Anull%2C%22where%22%3A%22%22%2C%22having%22%3A%22%22%2C%22filters%22%3A%5B%5D%7D&standalone=true&height=400"></iframe>' />

    this.state = {
      // Widgets that are available in the dashboard
      widgets: {
        TextWidget: {
          type: TextWidget,
          title: 'Text',
        },
        EngineTelemetricsWidget: {
          type: BarChart,
          title: 'Engine',
        },
        PerformanceWidget: {
          type: DoughnutChart,
          title: 'Reactor Temp',
        },
        ShipVitalTelemetricsWidget: {
          type: LineChart,
          title: 'Reactor Telemetrics',
        },
        IframeTest : {
          type: ale,
          title : "Test Iframe"
        }
      },
      // Layout of the dashboard
      layout: {
        rows: [
          {
            columns: [
              {
              className: 'col-md-12 col-sm-12 col-xs-12',
              widgets: [{ key: 'TextWidget' }],
              }
            ],
          }],
      },
      editMode: true,
      isModalOpen: false,
      addWidgetOptions: null,
    };
 
    // add control button
    this.state.layout.rows.map((row, index) =>{
      
      this.state.widgets['BtnControlWidget_' + index] = {
        type: BtnControlWidget,
        title: '',
        props: {
          layout: this.state.layout,
          index: index,
          setLayout: this.setLayout
        }
      }

      row.columns.push({
          className: 'col-w-30',
          widgets: [{key: 'BtnControlWidget_' + index}],
        })
    }) 

  }

  componentDidMount(){
     var that = this;
    	fetch('http://localhost:9000/superset/iframes')//fetch(`https://api.github.com/search/users?q=${input}`)
		  .then((response) => response.json())
		  .then((json) => {
        const iframes = json.map((superset, index) => {
          const links = superset.slice_link;
          var href = links.match(/href="([^"]*)/)[1];
          // NB TODO url configurabili
          var url = 'http://localhost:8088' + href  + '&standalone=true'
          var title = superset.viz_type + index.toString()
          const iframeString = '<iframe width="100%"  height="350px" seamless frameBorder="0" scrolling="no" src="' + url + '"></iframe>'
          const iframe =  () => <Iframe iframe={iframeString}/>
          return { type : iframe, title : title}
        })
        var obj = iframes.slice(0,1).reduce(function(acc, cur, i) {
          acc[i] = cur
          return acc;
        }, {});
        
       var w =  {}
       iframes.slice(0,3).map((iframe, index) => w[iframe.title] = iframe)

       const widgetstest = Object.assign(that.state.widgets,  {widgets : obj})
      // that.setState({widgets : w})
      // that.setState(widgetstest)
			 that.setState({widgets :  {
        EngineTelemetricsWidget: {
          type: iframes[1].type,
          title : iframes[1].title,
        },
        PerformanceWidget: {
          type: iframes[17].type,
          title : iframes[17].title,
        },
        ShipVitalTelemetricsWidget: {
          type: iframes[7].type,
          title : iframes[7].title,
        },
        IframeTest : {
          type: iframes[0].type,
          title : iframes[0].title,
        }
      } 
      } 
      )  
		}); 
  }

  /**
   * When a widget is removed, the layout should be set again.
   */
  onRemove = (layout) => {
    this.setLayout(layout);
  }

  /**
   * Adds new widgget.
   */
  onAdd = (layout, rowIndex, columnIndex) => {
    // Open the AddWidget dialog by seting the 'isModalOpen' to true.
    // Also preserve the details such as the layout, rowIndex, and columnIndex  in 'addWidgetOptions'.
    //  This will be used later when user picks a widget to add.
    this.setState({
      isModalOpen: true,
      addWidgetOptions: {
        layout,
        rowIndex,
        columnIndex,
      },
    });
  }

  /**
   * When a widget moved, this will be called. Layout should be given back.
   */
  onMove = (layout) => {
    this.setLayout(layout);
  }

  /**
   * This will be called when user tries to close the modal dialog.
   */
  onRequestClose = () => {
    this.setState({
      isModalOpen: false,
    });
  }

  /*
  * Set layout Dashboard
  */
  setLayout = (layout) => {
    // add control button
    this.state.layout.rows.map((row, index) =>{
      
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
          setLayout: this.setLayout
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

    console.log(layout);
    this.setState({
      layout: layout
    });

  }

  //       <Iframe iframe='<iframe width="600"  height="400" seamless frameBorder="0" scrolling="no" src="http://localhost:8088/superset/explore/table/3/?form_data=%7B%22datasource%22%3A%223__table%22%2C%22viz_type%22%3A%22line%22%2C%22slice_id%22%3A20%2C%22granularity_sqla%22%3A%22ds%22%2C%22time_grain_sqla%22%3A%22Time+Column%22%2C%22since%22%3A%22100+years+ago%22%2C%22until%22%3A%22now%22%2C%22metrics%22%3A%5B%22sum__num%22%5D%2C%22groupby%22%3A%5B%22name%22%5D%2C%22limit%22%3A%2225%22%2C%22timeseries_limit_metric%22%3Anull%2C%22show_brush%22%3Afalse%2C%22show_legend%22%3Atrue%2C%22rich_tooltip%22%3Atrue%2C%22show_markers%22%3Afalse%2C%22x_axis_showminmax%22%3Atrue%2C%22line_interpolation%22%3A%22linear%22%2C%22contribution%22%3Afalse%2C%22x_axis_label%22%3A%22%22%2C%22x_axis_format%22%3A%22smart_date%22%2C%22y_axis_label%22%3A%22%22%2C%22y_axis_bounds%22%3A%5Bnull%2Cnull%5D%2C%22y_axis_format%22%3A%22.3s%22%2C%22y_log_scale%22%3Afalse%2C%22rolling_type%22%3A%22None%22%2C%22time_compare%22%3Anull%2C%22num_period_compare%22%3A%22%22%2C%22period_ratio_type%22%3A%22growth%22%2C%22resample_how%22%3Anull%2C%22resample_rule%22%3Anull%2C%22resample_fillmethod%22%3Anull%2C%22where%22%3A%22%22%2C%22having%22%3A%22%22%2C%22filters%22%3A%5B%5D%7D&standalone=true&height=400"></iframe>' />

  render() {
    return (
    <Container>
      <AddWidgetDialog widgets={this.state.widgets} isModalOpen={this.state.isModalOpen} onRequestClose={this.onRequestClose} onWidgetSelect={this.handleWidgetSelection}/>
      <Header />
      <Dashboard
        frameComponent={CustomFrame}
        onRemove={this.onRemove}
        layout={this.state.layout}
        widgets={this.state.widgets}
        editable={this.state.editMode}
        onAdd={this.onAdd}
        onMove={this.onMove}
        addWidgetComponentText="Add New Widget"
        />
        <EditBar 
          onEdit={this.toggleEdit} 
          layout={this.state.layout}
          setLayout={this.setLayout}
          widgets={this.state.widgets}
          onWidgetSelect={this.handleWidgetSelection}
          />
    </Container>
    );
  }

  /**
   * Toggeles edit mode in dashboard.
   */
  toggleEdit = () => {
    this.setState({
      editMode: !this.state.editMode,
    });
  };

  /**
   * When user selects a widget from the modal dialog, this will be called.
   * By calling the 'addWidget' method, the widget could be added to the previous requested location.
   */
  handleWidgetSelection = (widgetName) => {
    const {layout, rowIndex, columnIndex} = this.state.addWidgetOptions;

    /**
     * 'AddWidget' method gives you the new layout.
     */
    this.setState({
      layout: addWidget(layout, rowIndex, columnIndex, widgetName),
    });

    // Close the dialogbox
    this.onRequestClose();
  }
}

export default Dash;
