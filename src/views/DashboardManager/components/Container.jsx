import React from 'react';

const Container = ({children}) => {
  return (
    <div className="container body">
      <div className="main_container">
        {children}
      </div>
    </div>
  );
};

export default Container;
