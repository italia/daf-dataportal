import React, { PropTypes } from 'react';

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

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;
