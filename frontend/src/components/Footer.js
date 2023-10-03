import React from 'react';
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div>
      <footer className="footer">
        <p className="footer__text">© {currentYear} Mesto Russia</p>
      </footer>
    </div>
  );
}

export default Footer;
