import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import ComNavigation from "../ComNavigation";
import "../../sass/contact.scss";
import InquiryForm from "../Form";
import { connect } from "react-redux";
import { getFooterData } from "../../reducer/action";

const ContactUs = (props) => {
  const [address, setAddress] = useState();
  const { footerData } = props || {};

  useEffect(() => {
    if (footerData?.address) {
      const oldAddress = [];
      const JionArray = footerData?.address?.split("$");
      oldAddress["company"] = JionArray[0];
      JionArray.shift();
      oldAddress["adLine"] = JionArray.map((e) => e).join(", ");
      setAddress(oldAddress);
    }
  }, [footerData]);

  return (
    <section>
      <ComNavigation title="Contect Us" />
      <div className="spadding">
        <div className="container">
          <Row>
            <Col xs={12} md={4} className="mob_margin">
              <div
                className="white-box"
                data-aos="fade-down"
                data-aos-easing="linear"
                data-aos-delay="100"
                data-aos-duration="500"
              >
                <h3 className="icon">
                  <i className="fas fa-route" />
                </h3>
                <div className="desc">{`${address?.company} ${address?.adLine}`}</div>
              </div>
            </Col>
            <Col xs={12} md={4} className="mob_margin">
              <div
                className="white-box"
                data-aos="fade-down"
                data-aos-easing="linear"
                data-aos-delay="100"
                data-aos-duration="500"
              >
                <h3 className="icon">
                  <i className={"fas fa-phone-alt"} />
                </h3>
                <div className="desc">{footerData?.mobile}</div>
              </div>
            </Col>
            <Col xs={12} md={4} className="mob_margin">
              <div
                className="white-box"
                data-aos="fade-down"
                data-aos-easing="linear"
                data-aos-delay="100"
                data-aos-duration="500"
              >
                <h3 className="icon">
                  <i className={"fa fa-envelope"} />
                </h3>
                <div className="desc">{footerData?.email}</div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <div className="pt-md-5 cont-map">
        <div className="container mob-container">
          <Row>
            <Col md={8} className="contact_map">
              <iframe
                title="contact map"
                src="https://www.google.com/maps?q=Alexa%20Ceramic%20Pvt%20Ltd%2C%20Lakhdhirpur%2C%20Morbi%2C%20Gujarat%2C%20India&z=14&t=&ie=UTF8&output=embed"
              />
            </Col>
          </Row>
        </div>
        <div className="container">
          <Row className="justify-content-end me-0 ms-0">
            <Col
              className="contact-form mt-4 mt-sm-5 mt-md-0"
              lg={5}
              md={6}
              sm={12}
            >
              <div className="section-head">
                <h6 className="custom-font">Contact Us</h6>
                <h4 className="playfont">Get In Touch</h4>
              </div>
              <InquiryForm isContact />
            </Col>
          </Row>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  footerData: state?.footerData,
});
const mapDispatchToProps = {
  getFooterData,
};
export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);
