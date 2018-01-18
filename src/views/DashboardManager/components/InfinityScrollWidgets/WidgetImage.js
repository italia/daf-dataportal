import React from 'react';

class WidgetImage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            imageSrc: ""
        }
    }

    componentDidMount() {
        const { widget } = this.props
        let url = 'https://datipubblici.daf.teamdigitale.it/dati-gov/v1/plot/' + widget + '/330x280';
        const response = fetch(url, {
            method: 'GET'
        }).then(response => {
        if (response.ok) {
            response.text().then(text => {
                this.setState({
                    loading: false,
                    imageSrc: text
                })
          });
        } else {
            this.setState({
                    loading: false,
                    imageSrc: undefined
                })
        }
      })

    }

    getQueryStringValue(url, key) {
        return decodeURIComponent(url.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
    }

    render() {
        const { wid, widgets, widget, onLoadIframe, key} = this.props;
        const imgStyle = {
            width: '100%'
        }
        
        var base64Icon = ""
        if (this.state.imageSrc) {
            base64Icon = "base64," + this.state.imageSrc.replace(/"/g, '')
        }
        return this.state.loading === true ? <p>Caricamento ...</p> : (
            this.state.imageSrc ?
            <div style={imgStyle}>    
                {this.state.imageSrc && <img src={"data:image/jpg;" + base64Icon} />}
            </div>
            :
            <div style={imgStyle}> 
                {React.createElement(wid, {...widgets[widget].props, class: "no-click", onLoad: () => onLoadIframe(key)})}
            </div>
        );
    }
}

export default WidgetImage;
