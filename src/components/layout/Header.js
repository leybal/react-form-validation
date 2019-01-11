import React from 'react';

function Header () {
  return (
    <header style={headerStyle}>
      <div className="py-4 mb-3 text-center">
          <h2>Test for JavaScript Developer from Softindex</h2>
      </div>
    </header>
  )
}

const headerStyle = {
  backgroundColor: '#f5f5f5'
};

export default Header
