import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import map from "lodash/map";
import { Col, Row, Image, Button } from "react-bootstrap";
import { Carousel } from "react-responsive-carousel";
import "../../../sass/infrastructure.scss";
import ComNavigation from "../ComNavigation";
import {
  handlePostData,
  handleUpdateData,
  getInfrastructure,
} from "../../../reducer/action";
import AddNewPost from "../AddNew";
import { handleEnterLeave, handleEnterMouse } from "../../common";

let data = [];
let update = false;
let isCarousel = false;
const Infrastructure = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [selectData, setSelectData] = useState();
  const [showDescription, setShowDescription] = useState(true);
  const [subTitle, setSubTitle] = useState(true);
  const { infrastructureCarousel, infrastructure } = props || {};

  useEffect(() => {
    props.getInfrastructure();
  }, []);


  const handleChange = (e) => {
    data[e.target.name] = e.target.value;
  };

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  const handleUpdateData = () => {
    data["img"] = selectData.img;
    props.handleUpdateData(data, selectData.id).then((resp) => {
      if (!resp?.error) {
        props.getInfrastructure();
        handleShowModal();
      }
    });
  };

  const handleSelected = (select, isDesc = true, noSubTitle = false) => {
    setShowModal(!showModal);
    setSelectData(select);
    setShowDescription(isDesc);
    setSubTitle(noSubTitle);
    update = true;
  };

  const handleSubmit = () => {
    if (update) {
      handleUpdateData();
    } else {
      data["alias_name"] = isCarousel
        ? "infrastructure_carousel"
        : "infrastructure";
      props.handlePostData(data).then((resp) => {
        if (resp && resp.data) {
          props.getInfrastructure();
          handleShowModal();
        }
      });
    }
  };

  const handleNewAdd = (carousel = true, isDesc = true, noSubTitle = false) => {
    setShowModal(!showModal);
    setSelectData();
    update = false;
    setShowDescription(isDesc);
    setSubTitle(noSubTitle);
    isCarousel = carousel;
  };

  const handleOddEvenNumber = (number) => number / 2 === 0;

  return (
    <div>
      <ComNavigation title="Infrastructure" isAbout />
      <section>
        <div className="spadding">
          <div className="container position-relative">
            <Button
              onClick={handleNewAdd}
              className="add_new_carousel"
              onMouseEnter={handleEnterMouse}
              onMouseLeave={handleEnterLeave}
            >
              Add New Post
            </Button>
            <Carousel showStatus={false} className="infrastructure_carousel">
              {infrastructureCarousel &&
                map(infrastructureCarousel, (item, index) => (
                  <div
                    className="infrastructure_carousel_box"
                    key={`infratructure_${index}`}
                  >
                    <Button
                      onClick={() => handleSelected(item)}
                      className="update_carousel"
                      style={{ left: 0, position: "absolute" }}
                      onMouseEnter={handleEnterMouse}
                      onMouseLeave={handleEnterLeave}
                    >
                      Update
                    </Button>
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
          <Button
            onClick={() => handleNewAdd(false, false, true)}
            className="add_new_carousel"
            onMouseEnter={handleEnterMouse}
            onMouseLeave={handleEnterLeave}
          >
            Add New Post
          </Button>
          {infrastructure &&
            map(infrastructure, (item, index) => (
              <div className="spadding">
                <div className="container">
                  <div className="quality_control_block">
                    <Row className="align-items-center position-relative">
                      <Button
                        onClick={() => handleSelected(item, false, true)}
                        className="add_new_carousel data_update_btn"
                        style={{ left: "0" }}
                        onMouseEnter={handleEnterMouse}
                        onMouseLeave={handleEnterLeave}
                      >
                        Update
                      </Button>
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
        <AddNewPost
          isSingle
          selectData={selectData}
          show={showModal}
          notDesc={showDescription}
          modalTitle={`${selectData ? "Update" : "Add New"} Carousel`}
          handleClose={handleShowModal}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          notSubTitle={subTitle}
        />
      </section>
    </div>
  );
};

const mapStateToProps = (state) => ({
  infrastructureCarousel: state?.infrastructure?.infrastructureCarousel,
  infrastructure: state?.infrastructure?.infrastructure,
});
const mapDispatchToProps = {
  handlePostData,
  handleUpdateData,
  getInfrastructure,
};
export default connect(mapStateToProps, mapDispatchToProps)(Infrastructure);
