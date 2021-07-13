import React from "react";

const Footer = () => {
  return (
    <footer className='text-white mt-5 p-4 text-center bg-dark'>
      Copyright &copy; {new Date().getFullYear()} DevNet
    </footer>
  );
};

export default Footer;
