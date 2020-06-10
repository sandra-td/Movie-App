import React from 'react';

const Footer = () => {
    return (
        <div className="footer-container">
            <ul className="social-links">
                <li><a href="/"><i className="fa fa-twitter"></i></a></li>
                <li><a href="/"><i className="fa fa-facebook"></i></a></li>
                <li><a href="/"><i className="fa fa-instagram"></i></a></li>
                <li><a href="/"><i className="fa fa-google-plus"></i></a></li>
                <li><a href="/"><i className="fa fa-youtube"></i></a></li>
            </ul>
            <ul className="footer-links">
                <li><a href="/">Site Index</a></li>
                <li><a href="/">MovieAppPro</a></li>
                <li><a href="/">Press Room</a></li>
                <li><a href="/">Advertising</a></li>
                <li><a href="/">Help</a></li>
                <li><a href="/">Contact Us</a></li>

            </ul>

            <ul className="footer-links">
                <li><a href="/">Jobs</a></li>
                <li><a href="/">Conditions of Use</a></li>
                <li><a href="/">Privacy Policy</a></li>
                <li><a href="/">Interest-Based Ads</a></li>

            </ul>
            <p>	&copy; Movie App by Aleksandra</p>
        </div>
    )
}

export default Footer