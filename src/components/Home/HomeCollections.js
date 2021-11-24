import React from "react";
import { connect } from "react-redux";
import map from "lodash/map";
import size from "lodash/size";
import { handleEnterLeave, handleEnterMouse } from "../../common";
import { withRouter } from "react-router";

const HomeCollections = (props) => {
  const { homeCollection, clientsJson, homeAchievements } = props || {};

  return (
    <section className="blog-grid">
      <div className="container">
        <div className="section-head text-center">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8 col-sm-10">
              <h6
                className="custom-font"
                data-aos="flip-down"
                data-aos-easing="linear"
                data-aos-delay="150"
                data-aos-duration="500"
              >
                Our Latest Collection
              </h6>
              <h1
                className="playfont"
                data-aos="flip-down"
                data-aos-easing="linear"
                data-aos-delay="150"
                data-aos-duration="500"
              >
                Alexa Collection
              </h1>
            </div>
          </div>
        </div>
        <div className="row">
          {map(homeCollection, (item, index) => (
            <div
              className="col-lg-6 col-md-6 collection-box position-relative"
              key={`collection_${index}`}
            >
              <div className="item md-mb50">
                <div className="post-img">
                  <div className="img">
                    <img src={item.img} alt={item.sub_title} />
                  </div>
                </div>
                <div className="cont">
                  <h5 className="playfont">{item.sub_title}</h5>
                  <a
                    className="more"
                    onClick={() => props.history.push("/collection")}
                    onMouseEnter={handleEnterMouse}
                    onMouseLeave={handleEnterLeave}
                  >
                    <span className="custom-font">Read More</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="corporate-clients_block">
          <div className="section-head text-center">
            <div className="row justify-content-center">
              <div className="col-lg-6 col-md-8 col-sm-10">
                <h6
                  className="custom-font"
                  data-aos="flip-down"
                  data-aos-easing="linear"
                  data-aos-delay="300"
                  data-aos-duration="500"
                >
                  HONORS & MENTIONS
                </h6>
                <h1
                  className="playfont"
                  data-aos="flip-down"
                  data-aos-easing="linear"
                  data-aos-delay="300"
                  data-aos-duration="500"
                >
                  Corporate Clients
                </h1>
              </div>
            </div>
          </div>
          <div className="row position-relative">
            {size(clientsJson) > 0 &&
              map(clientsJson[0]?.img, (item, index) => (
                <div
                  className="col-md-3 col-sm-6 col-6 clients_img"
                  key={`clients_${index}`}
                  data-aos="fade-down"
                  data-aos-easing="linear"
                  data-aos-delay="300"
                  data-aos-duration="500"
                >
                  <img src={item} />
                </div>
              ))}
          </div>
        </div>
        <div className="corporate-clients_block">
          <div className="section-head text-center">
            <div className="row justify-content-center">
              <div className="col-lg-6 col-md-8 col-sm-10">
                <h6
                  className="custom-font"
                  data-aos="flip-down"
                  data-aos-easing="linear"
                  data-aos-delay="350"
                  data-aos-duration="500"
                >
                  HONORS & MENTIONS
                </h6>
                <h1
                  className="playfont"
                  data-aos="flip-down"
                  data-aos-easing="linear"
                  data-aos-delay="350"
                  data-aos-duration="500"
                >
                  Achievements
                </h1>
              </div>
            </div>
          </div>
          <div className="row achievement_area position-relative">
            {size(homeAchievements) &&
              map(homeAchievements, (item, index) => (
                <div
                  className="col-md-4 achievement_block "
                  key={`achievement_${index}`}
                >
                  <div
                    className="achievement_box position-relative"
                    data-aos="fade-down"
                    data-aos-easing="linear"
                    data-aos-delay="400"
                    data-aos-duration="500"
                  >
                    <div>
                      <h2 className="achievement_year">{item.year}</h2>
                    </div>
                    <div>
                      <span className="achievement_desc">
                        {item.description}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  homeCollection: state?.homeAllData?.homeCollection,
  clientsJson: state?.homeAllData?.homeClients,
  homeAchievements: state?.homeAllData?.homeAchievements,
});
const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(HomeCollections));
