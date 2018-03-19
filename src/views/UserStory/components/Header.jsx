import React from 'react';

const Header = (props) => {
  return (
    <div className="top_nav">
        <div className="nav_menu">
            <nav className="dashboardHeader row">
                <i className="fas fa-font fa-lg m-2" style={{lineHeight:'1'}}/><h2>{' '+props.title}</h2>
            </nav>
        </div>
    </div>
  );
};

export default Header;
