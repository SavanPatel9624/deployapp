import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { Button, Image, FloatingLabel, FormControl } from "react-bootstrap";
import { handleUpdateData } from "../../../reducer/action";
import map from "lodash/map";
import AddNewPost from "../AddNew";
import filter from "lodash/filter";
import { handleEnterLeave, handleEnterMouse } from "../../common";

let data = [];
let editData = [];
const AboutHome = (props) => {
  const [aboutHomeData, setAboutHomeData] = useState({ ...props.aboutData });
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState();

  const handleChange = (e) => {
    data[e.target.name] = e.target.value;
  };

  const handleUpdateData = () => {
    props.handleUpdateData(data, aboutHomeData.id).then((resp) => {
      if (!resp.error) {
        props.handleGetData();
        handleShowModal();
      }
    });
  };

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

  const handleSubmit = () => {
    data["img"] = aboutHomeData.img;
    handleUpdateData(data);
  };

  const handleEdit = (id) => {
    setEditId(id);
    setEdit(true);
    editData = [];
  };

  const handleSubmitData = (id) => {
    props.handleAlertMessage(true, false, "");
    editData["id"] = id;
    const moreData = aboutHomeData.more_details;
    map(moreData, (item) => {
      if (item.id === id) {
        if (!editData.subTitle) {
          editData["subTitle"] = item.subTitle;
        }
        if (!editData.year) {
          editData["year"] = item.year;
        }
      }
    });
    const filterData = filter(moreData, (item) => item.id !== id);
    filterData.push({ ...editData });
    data["more_details"] = JSON.stringify(filterData);
    handleUpdateData(data);
    setEdit(false);
  };

  const handleEditData = (e, id) => {
    editData[e.target.name] = e.target.value;
  };

  const handleShowModal = () => {
    setShow(!show);
  };

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
          <Button
            className="add_new_carousel data_update_btn"
            onClick={handleShowModal}
            onMouseEnter={handleEnterMouse}
            onMouseLeave={handleEnterLeave}
          >
            Update
          </Button>
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
                    <div
                      className={`col-md-5 ${
                        edit && editId === item.id ? "" : "d-flex"
                      } align-items-center position-relative`}
                    >
                      <Button
                        className="add_new_carousel data_update_btn icon_button"
                        onClick={() => {
                          edit && editId === item.id
                            ? handleSubmitData(item.id)
                            : handleEdit(item.id);
                        }}
                        onMouseEnter={handleEnterMouse}
                        onMouseLeave={handleEnterLeave}
                      >
                        {edit && editId === item.id ? (
                          <i class="fa fa-check-square-o" />
                        ) : (
                          <i class="fa fa-edit" />
                        )}
                      </Button>
                      {edit && editId === item.id ? (
                        <>
                          <FloatingLabel
                            controlId="floatingName"
                            label="Year"
                            className="mb-3"
                          >
                            <FormControl
                              type="text"
                              name="year"
                              placeholder="Year"
                              defaultValue={item.year}
                              onChange={(e) => handleEditData(e, item.id)}
                            />
                          </FloatingLabel>
                          <FloatingLabel
                            controlId="floatingName"
                            label="sub Title"
                          >
                            <FormControl
                              type="text"
                              name="subTitle"
                              placeholder="sub Title"
                              defaultValue={item.subTitle}
                              onChange={(e) => handleEditData(e, item.id)}
                            />
                          </FloatingLabel>
                        </>
                      ) : (
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
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="abtreadmore">
              <Button
                className="btn-curve btn-bord btn-lit"
                onClick={() => props.history.push("/u/company-profile")}
                onMouseEnter={handleEnterMouse}
                onMouseLeave={handleEnterLeave}
              >
                <span>Read More</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <AddNewPost
        show={show}
        modalTitle="Update"
        handleClose={handleShowModal}
        handleChange={handleChange}
        isSingle
        notSubTitle
        selectData={aboutHomeData}
        handleSubmit={handleSubmit}
      />
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
