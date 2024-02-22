'use client';

import React, { useState,useEffect } from "react";

import '../styles/footer.css';
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { TiSocialYoutubeCircular } from "react-icons/ti";




const Footer = () => {
  const [isMettaMuse, setIsMettaMuse] = useState(true);
  const [isQuickLinks, setIsQuickLinks] = useState(true);
  const [isFollowUs, setIsFollowUs] = useState(true);

  const handleResize = () => {
    if (window.innerWidth < 650) {
        setIsMettaMuse(false);
        setIsQuickLinks(false);
        setIsFollowUs(false);
    } else {

      setIsMettaMuse(true);
      setIsQuickLinks(true);
      setIsFollowUs(true);
    }
  }
  
  // create an event listener
  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return(()=>{
      window.removeEventListener("resize",handleResize);
    })
  })
  return (
    <footer>
      <div className="wrapper width-100">
        <div className="letterAndcontact">
          <div className="newsletter">
            <p className="footerHeading">Be the first to know</p>
            <p>Sign up for updates from Optimum Nutrition.</p>
            <div className="inputsBtn">
              <input
                className=""
                type="email"
                placeholder="Enter your e-mail..."
              />
              <button className="subscribeBtn">Subscribe</button>
            </div>
          </div>

          <div className="contactDetails" style={{padding:"20px"}}>
            <div className="contactUs">
              <p className="footerHeading">Contact us</p>
              <p style={{ marginBottom: "20px" }}>011 - 495967859</p>
              <p>customercare@optimumnutrition.com</p>
            </div>
            <div className="currency">
              <p className="footerHeading">Currency</p>
              {/* <img
                src={televisionsvg}
                alt="televisionsvg"
                style={{ marginBottom: "20px" }}
              /> */}
              <p className="smallText">
                Transactions will be completed in Indian Rupees and a currency reference
                is available on hover.
              </p>
            </div>
          </div>
        </div>
        <hr />
        <div className="actionsLinksContainer">
          <div className="mettaMuse">
            <div
              className="footerHeadingCont"
              onClick={() => setIsMettaMuse((prev) => !prev)}
            >
              <span className="footerHeading">About Optimum Nutrition</span>
              {isMettaMuse ? (
                <MdOutlineKeyboardArrowUp className="arrow_icons" cursor="pointer" />
              ) : (
                <MdOutlineKeyboardArrowDown className="arrow_icons" cursor="pointer" />
              )}
            </div>
            {isMettaMuse ? (
              <ul className={`${isMettaMuse ? "mt20" : ""}`}>
                <li>About Us</li>
                <li>Stories</li>
                <li>Artisans</li>
                <li>Boutiques</li>
                <li>Contact Us</li>
                <li>EU Compliances Docs</li>
              </ul>
            ) : null}
          </div>
          <div className="quickLinks">
            <div
              className="footerHeadingCont"
              onClick={() => setIsQuickLinks((prev) => !prev)}
            >
              <span className="footerHeading">Quick Links</span>
              {isQuickLinks ? (
                <MdOutlineKeyboardArrowUp className="arrow_icons" cursor="pointer" />
              ) : (
                <MdOutlineKeyboardArrowDown className="arrow_icons" cursor="pointer" />
              )}
            </div>
            {isQuickLinks ? (
              <ul className={`${isQuickLinks ? "mt20" : ""}`}>
                <li>Orders & Shipping</li>
                <li>Join/Login as a Seller</li>
                <li>Payment & Pricing</li>
                <li>Return & Refunds</li>
                <li>FAQs</li>
                <li>Privacy Policy</li>
                <li>Terms & Conditions</li>
              </ul>
            ) : null}
          </div>
          <div className="followus">
            <div className="socialLinksContainer">
              <div
                className="footerHeadingCont"
                onClick={() => setIsFollowUs((prev) => !prev)}
              >
                <span className="footerHeading">Follow Us</span>
                {isFollowUs ? (
                  <MdOutlineKeyboardArrowUp className="arrow_icons" cursor="pointer" />
                ) : (
                  <MdOutlineKeyboardArrowDown className="arrow_icons" cursor="pointer" />

                )}
              </div>
              {
                isFollowUs ? (
                  <div className="socialAcc">
                    <div className="social_links">
                         <FaInstagram className="link_icons" /> 
                        <IoLogoLinkedin className="link_icons" />
                        <FaTwitterSquare className="link_icons" />
                        <TiSocialYoutubeCircular className="link_icons" />
                    </div>

                  </div>
                ) : null
              }

            </div>

          </div>
        </div>
        <div className="copyright">
          <p><a href="https://github.com/Mohitjangra489" style={{color:"white"}}>Github: https://github.com/Mohitjangra489</a></p>
          <p>Copyright © 2023 mohitjangra. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;