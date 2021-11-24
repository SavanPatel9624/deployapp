import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { Button, Image } from "react-bootstrap";
import { handleUpdateData } from "../../reducer/action";
import map from "lodash/map";
import { handleEnterLeave, handleEnterMouse } from "../../common";

const AboutHome = (props) => {
  const [aboutHomeData, setAboutHomeData] = useState({ ...props.aboutData });

  useEffect(() => {
    if (props.aboutData) {
      const updatedData = [];
      map(props.aboutData, (item) => {
        updatedData.push({
          ...item,
        });
      });

      setAboutHomeData(...updatedData);
    }
  }, [props.aboutData]);

  useEffect(() => () => handleEnterLeave(), []);

  return (
    <section className="home_about_section section-padding">
      <div className="container">
        <div
          className="row"
          data-aos="fade-down"
          data-aos-easing="linear"
          data-aos-delay="100"
          data-aos-duration="1000"
        >
          <div className="col-lg-5 left_block">
            <div className="about_industryImage">
              <Image src={aboutHomeData?.img} />
            </div>
          </div>
          <div className="col-lg-7 valign right_block">
            <div className="exp-content">
              <h6
                className="sub-title"
                data-aos="fade-down"
                data-aos-easing="linear"
              >
                About Us
              </h6>
              <h1
                className="playfont"
                data-aos="Zoom-in"
                data-aos-easing="linear"
                data-aos-delay="200"
                data-aos-duration="2000"
              >
                {aboutHomeData?.title}
              </h1>
              <p className="txt-justify home_about_desc">
                <span
                  dangerouslySetInnerHTML={{
                    __html: aboutHomeData?.description,
                  }}
                />
              </p>
              <div className="numbers mt-30">
                <div className="row">
                  {map(aboutHomeData.more_details, (item) => (
                    <div className="col-md-5 d-flex align-items-center">
                      <div className="item w-100">
                        <h3>
                          <span
                            className="nbr custom-font"
                            data-aos="flip-down"
                            data-aos-easing="linear"
                            data-aos-delay="200"
                            data-aos-duration="2000"
                          >
                            {item.year}
                          </span>
                        </h3>
                        <h6
                          data-aos="flip-down"
                          data-aos-easing="linear"
                          data-aos-delay="200"
                          data-aos-duration="2000"
                        >
                          {item.subTitle}
                        </h6>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="abtreadmore">
              <Button
                className="btn-curve btn-bord btn-lit"
                onClick={() => props.history.push("/company-profile")}
                onMouseEnter={handleEnterMouse}
                onMouseLeave={handleEnterLeave}
              >
                <span>Read More</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  aboutData: state?.homeAllData?.aboutData,
});
const mapDispatchToProps = {
  handleUpdateData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AboutHome));
