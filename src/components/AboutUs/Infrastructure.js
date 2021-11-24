import React, { useEffect } from "react";
import { connect } from "react-redux";
import map from "lodash/map";
import { Col, Row, Image } from "react-bootstrap";
import { Carousel } from "react-responsive-carousel";
import "../../sass/infrastructure.scss";
import ComNavigation from "../ComNavigation";
import { getInfrastructure } from "../../reducer/action";

const Infrastructure = (props) => {
  const { infrastructureCarousel, infrastructure } = props || {};

  useEffect(() => {
    props.getInfrastructure();
  }, []);

  const handleOddEvenNumber = (number) => number / 2 === 0;

  return (
    <div>
      <ComNavigation title="Infrastructure" isAbout />
      <section>
        <div className="spadding">
          <div className="container position-relative">
            <Carousel showStatus={false} className="infrastructure_carousel">
              {infrastructureCarousel &&
                map(infrastructureCarousel, (item, index) => (
                  <div
                    className="infrastructure_carousel_box"
                    key={`infratructure_${index}`}
                  >
                    <div className="infra_car_desc_card col-7 col-lg-6">
                      <div className="mechin_number">
                        <h1>{item.sub_title}</h1>
                      </div>
                      <div className="mechin_desc">
                        <h5>{item.title}</h5>
                      </div>
                    </div>
                    <Image src={item.img} />
                  </div>
                ))}
            </Carousel>
          </div>
        </div>
        <div className="position-relative">
          {infrastructure &&
            map(infrastructure, (item, index) => (
              <div className="spadding">
                <div className="container">
                  <div className="quality_control_block">
                    <Row className="align-items-center position-relative">
                      {handleOddEvenNumber(index) && (
                        <Col md={6}>
                          <div className="worker_block">
                            <Image src={item.img} />
                          </div>
                        </Col>
                      )}
                      <Col md={6}>
                        <div className="quality_desc">
                          <h2
                            data-aos="flip-down"
                            data-aos-easing="linear"
                            data-aos-delay="100"
                            data-aos-duration="500"
                          >
                            {item.title}
                          </h2>
                          <p
                            data-aos="zoom-in"
                            data-aos-easing="linear"
                            data-aos-delay="100"
                            data-aos-duration="500"
                          >
                            <span
                              dangerouslySetInnerHTML={{
                                __html: item.description,
                              }}
                            />
                          </p>
                        </div>
                      </Col>
                      {!handleOddEvenNumber(index) && (
                        <Col md={6}>
                          <div className="worker_block">
                            <Image src={item.img} />
                          </div>
                        </Col>
                      )}
                    </Row>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

const mapStateToProps = (state) => ({
  infrastructureCarousel: state?.infrastructure?.infrastructureCarousel,
  infrastructure: state?.infrastructure?.infrastructure,
});
const mapDispatchToProps = {
  getInfrastructure,
};
export default connect(mapStateToProps, mapDispatchToProps)(Infrastructure);
