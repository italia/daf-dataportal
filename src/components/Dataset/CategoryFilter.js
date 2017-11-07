import React from 'react';

import { Link } from 'react-router-dom';
import filterCategories from '../../data/filterCategories.js'

export default class CategoryFilter extends React.Component {

    constructor(props) {
        super(props)

        this.state = props;
        let category_filter = [];

        if (props.category_filter)
            category_filter = props.category_filter;

        this.state = {
            categories: filterCategories,
            category_filter: category_filter
        };

    }

    enableCategory(id_category) {
        this.state.category_filter[id_category] = !this.state.category_filter[id_category];
        this.setState({
            category_filter: this.state.category_filter
        });

        if (this.props.onSearch)
            this.props.onSearch(this.state.category_filter, null, null);
    }

    render() {
        return (
            <ul className="list-group">

                {
                    this.state.categories.map((category, index) => {
                        return (
                            <li key={index} className={"list-group-item " + (this.state.category_filter[category.tag] == true ? "active" : "")} onClick={() => this.enableCategory(category.tag)}>
                                <img style={{ height: '2em' }} src={"/img/category/" + category.tag + (this.state.category_filter[category.tag] == true ? "_blu" : "") + ".png"} />
                                {category.name}
                            </li>


                        )
                    })
                }
            </ul>
        );
    }
}

