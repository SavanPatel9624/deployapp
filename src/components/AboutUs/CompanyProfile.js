import React, { useEffect } from "react";
import { connect } from "react-redux";
import map from "lodash/map";
import { Col, Row, Image } from "react-bootstrap";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import ComNavigation from "../ComNavigation";
import { getCompanyProfile } from "../../reducer/action";

const CompanyProfile = (props) => {
  const { companyProfile } = props || {};

  useEffect(() => {
    props.getCompanyProfile();
  }, []);

  return (
    <div className="company_profile">
      <ComNavigation title="Company Profile" isAbout />
      <section>
        <div className="spadding">
          <div className="container position-relative">
            <div className="profile-desc">
              <h3
                data-aos="flip-down"
                data-aos-easing="linear"
                data-aos-delay="100"
                data-aos-duration="1000"
              >
                {companyProfile && companyProfile[0]?.title}
              </h3>
              <p
                className="profile_desc"
                dangerouslySetInnerHTML={{
                  __html: companyProfile && companyProfile[0].description,
                }}
              />
            </div>
          </div>
        </div>
        <div className="spadding">
          <div className="container">
            <Row className="mission_vision_block">
              {map(
                companyProfile && companyProfile[0].more_details,
                (item, index) => (
                  <Col
                    md={6}
                    key={`mission_${index}`}
                    className="position-relative"
                  >
                    <div className="d-grid card-box">
                      <h3
                        data-aos="flip-down"
                        data-aos-easing="linear"
                        data-aos-delay="100"
                        data-aos-duration="500"
                      >
                        <i
                          className={
                            item.id === 1 ? "fas fa-bullseye" : "fa fa-flag"
                          }
                        />
                        <span>{item.name}</span>
                      </h3>
                      <span
                        className="card-desc"
                        data-aos="zoom-out"
                        data-aos-easing="linear"
                        data-aos-delay="100"
                        data-aos-duration="500"
                      >
                        <span
                          dangerouslySetInnerHTML={{
                            __html: item.description,
                          }}
                        />
                      </span>
                    </div>
                  </Col>
                )
              )}
            </Row>
          </div>
        </div>
        <div className="spadding">
          <div className="container position-relative">
            <Row className="align-items-center">
              <Col
                md={6}
                className="profile-desc certificate_desc order-md-1 order-2"
              >
                <h3
                  data-aos="flip-down"
                  data-aos-easing="linear"
                  data-aos-delay="100"
                  data-aos-duration="500"
                >
                  {companyProfile && companyProfile[1].title}
                </h3>
                <p
                  data-aos="zoom-out"
                  data-aos-easing="linear"
                  data-aos-delay="100"
                  data-aos-duration="500"
                >
                  <span
                    dangerouslySetInnerHTML={{
                      __html: companyProfile && companyProfile[1].description,
                    }}
                  />
                </p>
              </Col>
              <Col md={6} className="order-md-2 order-1">
                {companyProfile && companyProfile[1].img && (
                  <Carousel
                    showStatus={false}
                    className="certificate_carousel"
                    data-aos="zoom-in"
                    data-aos-easing="linear"
                    data-aos-delay="100"
                    data-aos-duration="500"
                  >
                    {map(companyProfile[1].img, (item, index) => (
                      <div
                        className="certificate_img col-md-8 col-lg-7 col-9 m-auto"
                        key={`certificat_${index}`}
                      >
                        <Image src={item} />
                      </div>
                    ))}
                  </Carousel>
                )}
              </Col>
            </Row>
          </div>
        </div>
      </section>
    </div>
  );
};

const mapStateToProps = (state) => ({
  companyProfile: state?.companyProfile?.companyProfile,
});
const mapDispatchToProps = {
  getCompanyProfile,
};
export default connect(mapStateToProps, mapDispatchToProps)(CompanyProfile);
