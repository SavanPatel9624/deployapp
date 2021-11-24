import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Col, Row, Image } from "react-bootstrap";
import map from "lodash/map";
import ComNavigation from "../../ComNavigation";
import { getMediaData } from "../../../reducer/action";
import { handleEnterLeave, handleEnterMouse } from "../../../common";

const MediaKit = (props) => {
  const { mediaData } = props || {};

  useEffect(() => {
    props.getMediaData();
  }, []);

  const handleMediaDetails = (id) => {
    props.history.push(`/media-kit/${id}`);
  };

  useEffect(() => () => handleEnterLeave(), []);

  return (
    <section>
      <ComNavigation title="Media Kit" />
      <div className="spadding position-relative">
        <div className="container">
          <Row>
            {mediaData &&
              map(mediaData, (item, index) => (
                <Col
                  md={6}
                  className="post_item position-relative"
                  key={`blog_${index}`}
                >
                  <div className="item">
                    <div className="media_img_block">
                      <Image src={item?.banner_img} />
                    </div>
                    <div className="item_content">
                      <h4
                        className="title"
                        data-aos="fade-down"
                        data-aos-easing="linear"
                        data-aos-delay="200"
                        data-aos-duration="500"
                      >
                        {item?.title}
                      </h4>
                      <p
                        className="desc"
                        className="title"
                        data-aos="fade-up"
                        data-aos-easing="linear"
                        data-aos-delay="200"
                        data-aos-duration="500"
                      >
                        <span
                          dangerouslySetInnerHTML={{
                            __html: item?.description,
                          }}
                        />
                      </p>
                    </div>
                    <div
                      className="post_more_read"
                      onClick={() => handleMediaDetails(`blog_${item.id}`)}
                      onMouseEnter={handleEnterMouse}
                      onMouseLeave={handleEnterLeave}
                    >
                      <span className="more_line" />
                      <span>READ MORE</span>
                    </div>
                  </div>
                </Col>
              ))}
          </Row>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  mediaData: state?.media?.mediaData,
});
const mapDispatchToProps = {
  getMediaData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MediaKit));
