import React, { useState } from "react";
import { connect } from "react-redux";
import map from "lodash/map";
import { Button } from "react-bootstrap";
import { handleUpdateData, handlePostData } from "../../../reducer/action";
import AddNewPost from "../AddNew";
import size from "lodash/size";
import { handleEnterLeave, handleEnterMouse } from "../../common";

let data = [];
let selectMultiImage = false;
let addNew = false;
let isUpload = true;
const HomeCollections = (props) => {
  const [editData, setEditData] = useState();
  const [edit, setEdit] = useState(false);
  const [notSubTitle, setNotSubTitle] = useState(false);
  const [showYear, setShowYear] = useState(false);
  const [isSingle, setIsSingle] = useState(true);

  const { homeCollection, clientsJson, homeAchievements } = props || {};

  const handleEdit = (
    item,
    isSingle = false,
    notSubTitle = false,
    isMultiImage = false,
    showYear = false,
    isNew = false,
    isUploadImage = true
  ) => {
    setEdit(true);
    setEditData(item);
    setIsSingle(isSingle);
    setNotSubTitle(notSubTitle);
    setShowYear(showYear);
    selectMultiImage = isMultiImage;
    addNew = isNew;
    isUpload = isUploadImage;
  };

  const handleUpdate = () => {
    if (selectMultiImage) {
      data["alias_name"] = "home_clients";
    } else {
      data["img"] = editData.img;
    }

    props.handleUpdateData(data, editData.id).then((resp) => {
      if (!resp?.error) {
        props.handleGetData();
        handleClose();
      }
    });
  };

  const handleSubmit = () => {
    if (addNew) {
      data["alias_name"] = "home_achievements";
      props.handlePostData(data).then((resp) => {
        if (resp && resp.data) {
          props.handleGetData();
          handleClose();
        }
      });
    } else {
      handleUpdate();
    }
  };

  const handleClose = () => {
    setEdit(false);
    setEditData();
    data = [];
  };
  const handleChange = (e) => {
    data[e.target.name] = e.target.value;
    if (selectMultiImage) {
      data["img"] = JSON.stringify([...e.target.oldImg]);
    }
  };

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
              <Button
                className="add_new_carousel data_update_btn icon_button"
                onClick={() => handleEdit(item, true)}
                onMouseEnter={handleEnterMouse}
                onMouseLeave={handleEnterLeave}
              >
                <i class="fa fa-edit" />
              </Button>
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
            <Button
              className="add_new_carousel data_update_btn"
              onClick={() =>
                handleEdit(
                  size(clientsJson) > 0 && clientsJson[0],
                  false,
                  true,
                  true
                )
              }
              onMouseEnter={handleEnterMouse}
              onMouseLeave={handleEnterLeave}
            >
              Update & Delete
            </Button>
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
            <Button
              className="add_new_carousel data_update_btn"
              onClick={() =>
                handleEdit("", false, true, false, true, true, false)
              }
              onMouseEnter={handleEnterMouse}
              onMouseLeave={handleEnterLeave}
            >
              Add
            </Button>
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
                    <Button
                      className="add_new_carousel data_update_btn icon_button"
                      onClick={() =>
                        handleEdit(item, false, true, false, true, false, false)
                      }
                      onMouseEnter={handleEnterMouse}
                      onMouseLeave={handleEnterLeave}
                    >
                      <i class="fa fa-edit" />
                    </Button>
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
      <AddNewPost
        handleClose={handleClose}
        handleChange={handleChange}
        show={edit}
        notTitle
        notSubTitle={notSubTitle}
        notDesc={isUpload}
        isSingle={isSingle}
        selectData={editData}
        selectMultiImage={selectMultiImage}
        handleSubmit={handleSubmit}
        showYear={showYear}
        showImageUploader={isUpload}
      />
    </section>
  );
};

const mapStateToProps = (state) => ({
  homeCollection: state?.homeAllData?.homeCollection,
  clientsJson: state?.homeAllData?.homeClients,
  homeAchievements: state?.homeAllData?.homeAchievements,
});
const mapDispatchToProps = {
  handleUpdateData,
  handlePostData,
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeCollections);
