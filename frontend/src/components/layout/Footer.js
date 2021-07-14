import React from "react";

const Footer = () => {
  return (
    // <footer className='mt-auto p-4 text-white text-center bg-dark '>
    <footer
      style={{ position: "fixed", bottom: "0", left: "0", width: "100%" }}
      className='text-white text-center bg-dark p-4'
    >
      <div className='container'>
        Copyright &copy; {new Date().getFullYear()} DevNet
      </div>
    </footer>
  );
};

export default Footer;
