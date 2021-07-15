import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        position: "fixed",
        bottom: "0",
        left: "0",
        width: "100%",
        padding: "10px 0",
        height: "50px",
        marginTop: "-50px",
      }}
      className='text-white text-center bg-dark'
    >
      <div className='container'>
        Copyright &copy; {new Date().getFullYear()} DevNet
      </div>
    </footer>
  );
};

export default Footer;
