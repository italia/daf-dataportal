import React from 'react';

const Header = (props) => {
  return (
    <div className="top_nav">
        <div className="nav_menu">
            <nav className="dashboardHeader">
                <h2>{props.title}</h2>
            </nav>
        </div>
    </div>
  );
};

export default Header;
