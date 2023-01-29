import React from "react";
import './footer.css';

const Footer = () => {
    return(
    <div className="footer">
        <p>&copy; {new Date().getFullYear()} Copyright: Alain Schaerer & Archit Aggarwal. Powered by  <a href="https://reactjs.org/">ReactJS</a>, <a href="https://react-bootstrap.github.io/">React-Bootstrap</a> and <a href="https://web3js.readthedocs.io/">Web3JS</a>. Videos by <a href="https://www.danoshierproductions.com/">Dan Oshier.</a></p>
    </div>
);
}

export default Footer;