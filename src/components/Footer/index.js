import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getFooterData } from "../../reducer/action";
import { handleEnterLeave, handleEnterMouse } from "../../common";

const addressData = [
  { name: "company", title: "Company", defaultValue: "" },
  { name: "area", title: "Area", defaultValue: "" },
  { name: "landmark", title: "Landmark", defaultValue: "" },
  { name: "city", title: "City", defaultValue: "" },
  { name: "state", title: "State", defaultValue: "" },
  { name: "pincode", title: "Pincode", defaultValue: "" },
];

const Footer = (props) => {
  const [address, setAddress] = useState();
  const [addressJson, setAddressJson] = useState(addressData);

  const { footerData } = props || {};

  useEffect(() => {
    if (footerData?.address) {
      const oldAddress = [];
      const JionArray = footerData?.address?.split("$");
      addressJson.map((e, i) => (e.defaultValue = JionArray[i]));
      setAddressJson(addressJson);

      oldAddress["company"] = JionArray[0];
      JionArray.shift();
      oldAddress["adLine"] = JionArray.map((e) => e).join(", ");
      setAddress(oldAddress);
    }
  }, [footerData]);

  useEffect(() => {
    props.getFooterData();
  }, []);

  return (
    <footer
      className="main-footer dark position-relative"
      style={{ clear: "both" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6 item-box">
            <div className="item abot">
              <div className="logo-footer">
                <Link
                  to="/"
                  className="logo"
                  onMouseEnter={handleEnterMouse}
                  onMouseLeave={handleEnterLeave}
                >
                  <img src={footerData?.logo} alt="Alexa" />
                </Link>
              </div>
              <div className="social-icon">
                <a
                  href={footerData?.facebook}
                  target="_blank"
                  onMouseEnter={handleEnterMouse}
                  onMouseLeave={handleEnterLeave}
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  href={footerData?.instagram}
                  target="_blank"
                  onMouseEnter={handleEnterMouse}
                  onMouseLeave={handleEnterLeave}
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  href={footerData?.twitter}
                  target="_blank"
                  onMouseEnter={handleEnterMouse}
                  onMouseLeave={handleEnterLeave}
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  href={footerData?.printrest}
                  target="_blank"
                  onMouseEnter={handleEnterMouse}
                  onMouseLeave={handleEnterLeave}
                >
                  <i className="fab fa-pinterest-p"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-md-6 item-box">
            <div className="item usful-links">
              <div className="fothead">
                <h6>Useful Links</h6>
              </div>
              <ul>
                <li
                  onMouseEnter={handleEnterMouse}
                  onMouseLeave={handleEnterLeave}
                >
                  <i className="fas fa-chevron-right"></i>
                  <Link to="/">Home</Link>
                </li>
                <li
                  onMouseEnter={handleEnterMouse}
                  onMouseLeave={handleEnterLeave}
                >
                  <i className="fas fa-chevron-right"></i>
                  <Link to="/company-profile">Company Profile</Link>
                </li>
                <li
                  onMouseEnter={handleEnterMouse}
                  onMouseLeave={handleEnterLeave}
                >
                  <i className="fas fa-chevron-right"></i>
                  <Link to="/collection">Collections</Link>
                </li>
                <li
                  onMouseEnter={handleEnterMouse}
                  onMouseLeave={handleEnterLeave}
                >
                  <i className="fas fa-chevron-right"></i>
                  <Link to="/catalogue">Catalogue</Link>
                </li>
                <li
                  onMouseEnter={handleEnterMouse}
                  onMouseLeave={handleEnterLeave}
                >
                  <i className="fas fa-chevron-right"></i>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 item-box">
            <div className="item fotcont write">
              <div className="fothead">
                <h6>Contact Us</h6>
              </div>
              <p>
                <a
                  href={`tel:+${footerData?.mobile}`}
                  onMouseEnter={handleEnterMouse}
                  onMouseLeave={handleEnterLeave}
                >
                  <i className="fas fa-phone-volume"></i> +{footerData?.mobile}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${footerData?.email}`}
                  onMouseEnter={handleEnterMouse}
                  onMouseLeave={handleEnterLeave}
                >
                  <i className="far fa-envelope"></i> {footerData?.email}
                </a>
              </p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 item-box">
            <div className="item fotcont">
              <div className="fothead">
                <h6>Visit</h6>
              </div>
              <span>
                <i className="fas fa-map-marker-alt"></i> {address?.company}
              </span>
              <p className="faddress">{address?.adLine}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const mapStateToProps = (state) => ({
  footerData: state?.footerData,
});
const mapDispatchToProps = {
  getFooterData,
};
export default connect(mapStateToProps, mapDispatchToProps)(Footer);
