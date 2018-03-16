import React from 'react';

const Header = (props) => {
  return (
    <div className="top_nav">
        <div className="nav_menu">
            <nav className="dashboardHeader">
                <div className="row">
                    <div className="col-10">
                        <h3 className="card-title">{props.title}</h3>
                    </div>
                    <div className="col-2">
                    {props.pvt==1&&
                        <div className="badge badge-danger fa-pull-right mt-20"><i className="fa fa-lock fa-lg m-t-2"></i> PRIVATA</div>
                    }   
                    </div>
                </div>
                <span className="badge badge-info">{props.org}</span> 
            </nav>
        </div>
    </div>
  );
};

export default Header;
