
import React from 'react';


export default class OrderFilter extends React.Component {

    constructor(props) {
        super(props);
        this.state = props;
        let order_filter = "";

        if (props.order_filter)
            order_filter = props.order_filter;

        this.state = {
            order_filter: order_filter
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {

        this.state.order_filter = event.target.value;
        console.log(event.target.value)
        if (this.props.onSearchOrder)
            this.props.onSearchOrder('', '', '', this.state.order_filter );
    }



    render() {


        return (
            <select className="form-control" id="ordinamento" aria-required="true" onChange={this.handleChange} value={this.state.order_filter}>
                <option value="metadata_modified%20desc">Dalla data più recente</option>
                <option value="metadata_modified%20asc">Dalla data più lontana</option>
                <option value="relevance%20asc">Per rilevanza</option>
            </select>
        );
    }
}


