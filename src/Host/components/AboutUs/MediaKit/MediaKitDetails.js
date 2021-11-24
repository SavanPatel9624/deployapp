import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Col, Row, Image } from "react-bootstrap";
import map from "lodash/map";
import size from "lodash/size";
import find from "lodash/find";
import filter from "lodash/filter";
import replace from "lodash/replace";
import MediaGallery from "../../MediaGallery";
import ComNavigation from "../../ComNavigation";
import { getMediaData } from "../../../../reducer/action";
import { withRouter } from "react-router";
import { handleEnterLeave, handleEnterMouse } from "../../../common";

const MediaKitDetails = (props) => {
  const [paramsId, setParamsId] = useState(
    replace(props.match.params.id, `blog_`, "")
  );
  const [selectData, setSelectData] = useState();
  const { mediaData } = props || {};

  useEffect(() => {
    if (!mediaData) {
      props.getMediaData();
    }
    if (paramsId && mediaData) {
      const selectData = find(mediaData, ["id", parseInt(paramsId)]);
      setSelectData(selectData);
    }
  }, [mediaData]);

  useEffect(() => {
    setParamsId(replace(props.match.params.id, `blog_`, ""));
    if (paramsId && mediaData) {
      const selectData = find(mediaData, ["id", parseInt(paramsId)]);
      setSelectData(selectData);
    }
  }, [props.match.params.id, paramsId]);

  useEffect(() => () => handleEnterLeave(), []);

  return (
    <section>
      <ComNavigation title="Media Details" isMedia />
      <div className="spadding">
        <div className="container">
          <Row>
            <Col md={7} lg={9}>
              {selectData && (
                <div className="media_details_block">
                  <div className="media_image">
                    <Image src={selectData.banner_img} />
                  </div>
                  <div className="media_details_desc">
                    <h6>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: selectData.description,
                        }}
                      />
                    </h6>
                  </div>
                  {size(selectData.gallary) > 0 && (
                    <div className="media_details_gallery">
                      <MediaGallery photos={selectData.gallary} />
                    </div>
                  )}
                </div>
              )}
            </Col>
            <Col md={5} lg={3}>
              <div className="releted_title">
                <h5>Releted Blogs</h5>
              </div>
              {map(
                filter(mediaData, (o) => o.id !== selectData?.id),
                (item, index) =>
                  index < 6 && (
                    <div
                      key={`releted_${index}`}
                      className="releted_media_block media_details_block"
                    >
                      <div className="releted_media_image media_image">
                        <Image src={item.banner_img} />
                      </div>
                      <div className="releted_media_title">
                        <p
                          onClick={() => {
                            props.history.push(`/u/media-kit/blog_${item.id}`);
                          }}
                          onMouseEnter={handleEnterMouse}
                          onMouseLeave={handleEnterLeave}
                        >
                          {item.title}
                        </p>
                      </div>
                    </div>
                  )
              )}
            </Col>
          </Row>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  mediaData: state?.media?.mediaData,
});
const mapDispatchToProps = { getMediaData };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MediaKitDetails));
