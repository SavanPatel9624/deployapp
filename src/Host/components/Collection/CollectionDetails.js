import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import find from "lodash/find";
import size from "lodash/size";
import map from "lodash/map";
import { Image, Row, Col } from "react-bootstrap";
import ComNavigation from "../ComNavigation";
import Product_bg_img from "../../asset/productionBg.jpg";
import InquiryForm from "../Form";
import { getCollection } from "../../../reducer/action";
import { handleEnterLeave, handleEnterMouse } from "../../common";

const CollectionDetails = (props) => {
  const [selectProduct, setSelectProduct] = useState();
  const [reletedProduct, setreletedProduct] = useState();
  const { collectionData } = props || {};

  useEffect(() => {
    props.getCollection();
  }, []);
  useEffect(() => {
    let reletedProd = [];
    let selectPro;

    find(collectionData, (o) => {
      if (o.id !== parseInt(props.match.params.id)) {
        reletedProd.push(o);
      } else {
        selectPro = o;
      }
    });

    if (selectPro) {
      setSelectProduct(selectPro);
      setreletedProduct(reletedProd);
    }
  }, [props.match.params.id, collectionData]);

  const handleProDetails = (id) => {
    props.history.push(`/u/collection/${id}`);
  };
  
  useEffect(() => () => handleEnterLeave(), []);

  return (
    <section>
      <ComNavigation title="Collection Details" />
      <div
        className="product_details"
        style={{ backgroundImage: `url(${Product_bg_img})` }}
      >
        <Row className="m-0">
          {selectProduct && (
            <Col md={6} className="select_product">
              <div>
                <h4 className="p-t-10">Product Information</h4>
              </div>
              <div className="production_info">
                <div className="production_info_block">
                  <Row>
                    <Col>
                      <div className="pro_img col-sm-10 m-auto">
                        <Image src={selectProduct?.img} />
                      </div>
                      <div className="pro_desc row">
                        <div className="pro_size col-lg-6">
                          <div className="info_box">
                            <b className="m-r-5">Size :</b>
                            <div>
                              :{selectProduct?.size_x} X {selectProduct?.size_y}{" "}
                              {selectProduct?.size_type}
                            </div>
                          </div>
                        </div>
                        <div className="pro_weight col-lg-6">
                          <div className="info_box">
                            <b className="m-r-5">Weight :</b>
                            <div>{selectProduct?.weight} kgs</div>
                          </div>
                        </div>
                        <div className="pro_thickness col-lg-6">
                          <div className="info_box">
                            <b className="m-r-5">Thickness :</b>
                            <div>{selectProduct?.thickness}</div>
                          </div>
                        </div>
                        <div className="pro_tiles col-lg-6">
                          <div className="info_box">
                            <b className="m-r-5">Tiles :</b>
                            <div>{selectProduct?.tiles} pcs</div>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="mt-5 mb-4">
                      <div>
                        <h4 className="p-t-10">Product Inquiry</h4>
                      </div>
                      <InquiryForm />
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          )}
          {size(reletedProduct) > 0 && (
            <Col md={6}>
              <div className="releted_pro">
                <h4>Releted Products</h4>
              </div>
              <div className="releted_product">
                <div className="">
                  <Row>
                    {map(reletedProduct, (item, index) => (
                      <Col
                        sm={6}
                        xl={4}
                        className="product_items"
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
                              <h5>{item.name}</h5>
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
            </Col>
          )}
        </Row>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  collectionData: state?.collection?.collectionData,
});
const mapDispatchToProps = { getCollection };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CollectionDetails));
