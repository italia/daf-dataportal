import React from 'react';
import organizationList from '../../data/organizationList'
import {  serviceurl } from '../../config/serviceurl'

import { Link } from 'react-router-dom';

export default class OrganizationFilter extends React.Component {

    constructor(props) {
        super(props)

        this.state = props;
        let organization_filter = [];


        if (props.organization_filter)
            organization_filter = props.organization_filter;

        this.state = {
            organizations: props.organizations,
            organization_filter: organization_filter
        };

        /* this.load(); */
    }

    load(){

        let response = this.organizations();
        response.then((list)=>{
            this.setState({
                organizations: list
            })
        })
    }

    async organizations(){
        var url = serviceurl.apiURLCatalog + '/ckan/organizations'
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        return response.json()
    }

    enableGroup(id_organization) {
        this.state.organization_filter[id_organization] = !this.state.organization_filter[id_organization];
        this.setState({
            organization_filter: this.state.organization_filter
        });

        if (this.props.onSearch)
            this.props.onSearch(null, null, this.state.organization_filter);
    }

    render() {
        
        return (
            <ul className="list-group">

                {
                    this.state.organizations.map((organization, index) => {
                        return (

                            <li key={index} className={"list-group-item " + (this.state.organization_filter[organization] == true ? "active" : "")} onClick={() => this.enableGroup(organization)}>
                                {/*  <img src={"/img/organization/" + organization + (this.state.organization_filter[organization] == true ? "_blu" : "") + ".png"} /> */}
                                {organization}
                            </li>




                        )
                    })
                }
            </ul>
        );
    }
}

