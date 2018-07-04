import React, { PropTypes } from 'react';

const CustomFrame = ({children, onRemove, editable}) => {
  return (
    <div  /* style={{height:'400px'}} */>
      {editable && <div className="x_title">
          <ul className="nav navbar-right panel_toolbox">
            <li><a onClick={() => {onRemove();}} className="close-link"><i className="fa fa-close"></i></a></li>
          </ul>
      </div>}
      <div className="mb-4 x_content">
        {children}
      </div>
    </div>
  );
};

CustomFrame.propTypes = {
  children: PropTypes.element,
  onRemove: PropTypes.func,
  editable: PropTypes.bool,
};

export default CustomFrame;
