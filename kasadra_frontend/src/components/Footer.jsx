import React from 'react';
import '../styles/components/Footer.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-top">
                <h4 className='footer-text'>Contact US</h4>
                <div className="footer-content">
                    <div className="footer-item">
                        <i className="fas fa-map-marker-alt"></i>
                        <span>
                            73/1A, Keezh pammam, Marthandam, Tamil Nadu 629165.
                            <br />Land mark: Near Reliance super market
                        </span>
                    </div>

                    <div className="footer-item">
                        <i className="fas fa-phone-alt"></i>
                        <a href="tel:+918754107983">+91 8754107983</a>
                    </div>

                    <div className="footer-item">
                        <i className="fas fa-envelope"></i>
                        <a href="mailto:info@digidense.in">info@digidense.in</a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>DigiDense Software Solutions Pvt Ltd © 2024. All Rights Reserved.</p>
                <div className="social-icons">
                    <i className="fab fa-facebook-f"></i>
                    <i className="fab fa-instagram"></i>
                    <i className="fab fa-twitter"></i>
                </div>
            </div>
        </footer>
    );
};

export default Footer;


