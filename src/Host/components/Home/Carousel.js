import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import map from "lodash/map";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "../../../sass/carousel.scss";
import { Button, Image } from "react-bootstrap";
import { Carousel } from "react-responsive-carousel";
import AddNewPost from "../AddNew";
import { handlePostData, handleUpdateData } from "../../../reducer/action";
import { handleEnterLeave, handleEnterMouse } from "../../common";

let data = [];
let update = false;
const CarouselComp = (props) => {
  const [carouselJson, setCarouselJson] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectData, setSelectData] = useState();

  const handleChange = (e) => {
    data[e.target.name] = e.target.value;
  };

  const handleUpdateData = () => {
    data["img"] = selectData.img;
    props.handleUpdateData(data, selectData.id).then((resp) => {
      if (!resp?.error) {
        props.handleGetData();
        handleShowModal();
      }
    });
  };

  useEffect(() => {
    if (props.carouselJson) {
      setCarouselJson(props.carouselJson);
    }
  }, [props.carouselJson]);

  const handleSubmit = () => {
    if (update) {
      handleUpdateData();
    } else {
      data["alias_name"] = "home_carousel";
      props.handlePostData(data).then((resp) => {
        if (resp && resp.data) {
          props.handleGetData();
          handleShowModal();
        }
      });
    }
  };

  useEffect(() => () => handleEnterLeave(), []);

  const handleShowModal = () => {
    setShowModal(!showModal);
  };
  const handleNewAdd = () => {
    setShowModal(!showModal);
    setSelectData();
    update = false;
  };

  const handleSelected = (select) => {
    setShowModal(!showModal);
    setSelectData(select);
    update = true;
  };

  return (
    <div className="position-relative">
      <Button
        onClick={handleNewAdd}
        className="add_new_carousel"
        onMouseEnter={handleEnterMouse}
        onMouseLeave={handleEnterLeave}
      >
        Add New Post
      </Button>
      <Carousel
        infiniteLoop
        interval={5000}
        transitionTime={2000}
        showThumbs={false}
        showStatus={false}
        className="home_carousel_block"
        fade
        stopOnHover={false}
      >
        {map(carouselJson, (item, index) => (
          <div className="carousel_block" key={`carousel_${index}`}>
            <Button
              className="update_carousel big_cursor"
              onClick={() => handleSelected(item)}
              onMouseEnter={handleEnterMouse}
              onMouseLeave={handleEnterLeave}
            >
              Update
            </Button>
            <Image src={item.img} />
            <div className="carousel_box">
              <span className="carousel_sub_tilte">{item.sub_title}</span>
              <h2 className="carousel_headar">{item.title}</h2>
              <p className="carousel_desc">{item.description}</p>
              <a href="#">
                <Button
                  className="carousel_read_more_button big_cursor"
                  onClick={() => props.history.push("/u/collection")}
                  onMouseEnter={handleEnterMouse}
                  onMouseLeave={handleEnterLeave}
                >
                  <span>READ MORE</span>
                </Button>
              </a>
            </div>
          </div>
        ))}
      </Carousel>
      <AddNewPost
        show={showModal}
        modalTitle="Add New Carousel"
        handleClose={handleShowModal}
        handleChange={handleChange}
        isSingle
        selectData={selectData}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  carouselJson: state?.homeAllData?.homeCarouselData,
});
const mapDispatchToProps = {
  handlePostData,
  handleUpdateData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CarouselComp));
