import React from 'react';

function Footer () {
  return (
      <footer className="footer py-3" style={footerStyle}>
        <div className="container">
          <p className="text-center">
            <a href="https://www.facebook.com/profile.php?id=100019893572194" target="_blank">© Kravchuk Alexander</a>
          </p>
        </div>
      </footer>
  )
}

const footerStyle = {
  backgroundColor: '#f5f5f5'
};

export default Footer

