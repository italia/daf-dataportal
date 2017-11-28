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
        let url = 'https://api.daf.teamdigitale.it/dati-gov/v1/plot/' + widget + '/330x280';
        const response = fetch(url, {
            method: 'GET'
        }).then(response => response.text())
            .then(text => {
                this.setState({
                    loading: false,
                    imageSrc: text
                })
            })
        /* console.log(response) */
    }

    getQueryStringValue(url, key) {
        return decodeURIComponent(url.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
    }

    render() {
        const imgStyle = {
            width: '100%'
        }
        
        var base64Icon = ""
        if (this.state.imageSrc) {
            base64Icon = "base64," + this.state.imageSrc.replace(/"/g, '')
        }
        return this.state.loading === true ? <p>Caricamento ...</p> : (
            <div style={imgStyle}>    
                {this.state.imageSrc &&
                    <img src={"data:image/jpg;" + base64Icon} />
                }
            </div>
        );
    }
}

export default WidgetImage;
