import React from 'react';

import { Link } from 'react-router-dom';
import formats from '../../data/formats'


export default class GroupFilter extends React.Component {

    constructor(props) {
        super(props)

        this.state = props;
        let group_filter = [];


        if (props.group_filter)
            group_filter = props.group_filter;

        this.state = {
            groups: formats,
            group_filter: group_filter
        };

    }

    enableGroup(id_group) {
        this.state.group_filter[id_group] = !this.state.group_filter[id_group];
        this.setState({
            group_filter: this.state.group_filter
        });

        if (this.props.onSearch)
            this.props.onSearch(null, this.state.group_filter, null);
    }

    render() {
        return (
            <ul className="list-group">
                {
                    this.state.groups.map((group, index) => {
                        return (
                            <li key={index} className={"list-group-item " + (this.state.group_filter[group.name] == true ? "active" : "")} onClick={() => this.enableGroup(group.name)}>
                                {/*  <img src={"/img/group/" + group  + (this.state.group_filter[group] == true ? "_blu" : "") + ".png"} /> */}
                                {group.name}
                            </li>
                        )
                    })
                }
            </ul>
        );
    }
}

