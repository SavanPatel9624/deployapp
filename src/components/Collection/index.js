import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import map from "lodash/map";
import { Row, Col, Image } from "react-bootstrap";
import ComNavigation from "../ComNavigation";
import { getCollection } from "../../reducer/action";
import { handleEnterMouse, handleEnterLeave } from "../../common";

const Collection = (props) => {
  const { collectionData } = props || {};

  const handleProDetails = (id) => {
    props.history.push(`/collection/${id}`);
  };

  useEffect(() => {
    props.getCollection();
  }, []);

  useEffect(() => () => handleEnterLeave(), []);

  return (
    <section>
      <ComNavigation title="Collection" />
      <div className="spadding position-relative">
        <div className="container">
          <Row>
            {map(collectionData, (item, index) => (
              <Col
                sm={6}
                md={4}
                xl={3}
                className="product_items position-relative"
                key={`product_${index}`}
              >
                <div
                  className="items"
                  onClick={() => handleProDetails(item.id)}
                  onMouseEnter={handleEnterMouse}
                  onMouseLeave={handleEnterLeave}
                >
                  <div className="product_img">
                    <Image src={item.img} />
                  </div>
                  <div className="product_desc">
                    <span className="product_name">
                      <h5>{item.title}</h5>
                    </span>
                    <span className="product_size">
                      <b className="size">Size</b>
                      <span>
                        : {item.size_x} X {item.size_y} {item.size_type}
                      </span>
                    </span>
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
  collectionData: state?.collection?.collectionData,
});
const mapDispatchToProps = {
  getCollection,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Collection));
