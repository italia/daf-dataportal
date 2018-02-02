import React from 'react';

const Header = (props) => {
  return (
    <div className="top_nav">
        <div className="nav_menu">
            <nav className="dashboardHeader">
                <h2>{props.title}</h2>
                <span className="badge badge-info">{props.org}</span>
            </nav>
        </div>
    </div>
  );
};

export default Header;
