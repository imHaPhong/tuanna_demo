import React from "react";
import "./footer.scss";

import { BsArrowRight } from "react-icons/bs";
import { RiFacebookFill } from "react-icons/ri";
import { AiOutlineTwitter } from "react-icons/ai";
import { FaTelegram } from "react-icons/fa";

const Footer = ({ ...props }) => {
  return (
    <footer {...props}>
      <div className="footer-widget-container">
        <div className="footer-widget">
          <h6>Customer Service</h6>

          <ul>
            <li>Help & Contact Us </li>
            <li>Returns & Refunds</li>
            <li>Online Stores</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>
        <div className="footer-widget">
          <h6>Company</h6>

          <ul>
            <li> About Us</li>
            <li>What We Do</li>
            <li>FAQ Page</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div className="footer-widget">
          <h6>Social Media</h6>

          <ul>
            <li>Twitter</li>
            <li>Instagram</li>
            <li>Tumblr</li>
            <li>Pinterest</li>
          </ul>
        </div>
        <div className="footer-widget">
          <div className="newsletter">
            <h6>Newsletter</h6>

            <input type="text" placeholder="Your email address" />
            <BsArrowRight />
          </div>

          <ul>
            <li>
              <a href="/">Term & Condition</a>
            </li>
            <li>
              <a href="/">Policy</a>
            </li>
            <li>
              <a href="/">Map</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-copyright">
        <p>© 2020 Helendo. All Rights Reserved.</p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img
            src="https://live.hasthemes.com/html/7/helendo-preview/helendo/assets/images/logo/logo.svg"
            alt=""
          />
          <p> © 2020 Helendo. All Rights Reserved.</p>
        </div>
        <div className="social-items">
          <p>Follow Us On Social</p>

          <ul>
            <li>
              <RiFacebookFill />
            </li>
            <li>
              <AiOutlineTwitter />
            </li>
            <li>
              <FaTelegram />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
