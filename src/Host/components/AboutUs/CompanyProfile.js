import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import map from "lodash/map";
import filter from "lodash/filter";
import {
  Col,
  Row,
  Image,
  Button,
  FormControl,
  FloatingLabel,
} from "react-bootstrap";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import ComNavigation from "../ComNavigation";
import { getCompanyProfile, handleUpdateData } from "../../../reducer/action";
import CKEditor from "../CkEditor";
import AddNewPost from "../AddNew";
import { handleEnterLeave, handleEnterMouse } from "../../common";

let data = [];
let editData = [];
let selectedData = "";
let selectMultiImage = false;
let isUpload = false;
const CompanyProfile = (props) => {
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState();

  const { companyProfile } = props;
  const handleChange = (e) => {
    data[e.target.name] = e.target.value;
    if (selectMultiImage) {
      data["img"] = JSON.stringify([...e.target.oldImg]);
    }
  };
  const onBlur = () => {
    props.handleUpdateData(data, selectedData?.id).then((resp) => {
      if (resp && resp.message) {
        props.getCompanyProfile();
        hideModal();
      }
    });
  };

  useEffect(() => {
    props.getCompanyProfile();
  }, []);

  const handleShowModal = () => {
    selectedData = companyProfile[0];
    setShow(true);
  };

  const handleCertificate = () => {
    selectedData = companyProfile[1];
    setShow(true);
    selectMultiImage = true;
    isUpload = true;
    data["alias_name"] = "company_profile";
  };

  const hideModal = () => {
    setShow(false);
  };

  const handleEdit = (id) => {
    setEditId(id);
    setEdit(true);
    editData = [];
  };
  const handleEditData = (e) => {
    editData[e.target.name] = e.target.value;
  };
  const handleSubmitData = (id) => {
    editData["id"] = id;
    const moreData = companyProfile[0].more_details;
    map(moreData, (item) => {
      if (item.id === id) {
        if (!editData.name) {
          editData["name"] = item.name;
        }
        if (!editData.description) {
          editData["description"] = item.description;
        }
      }
    });
    const filterData = filter(moreData, (item) => item.id !== id);
    filterData.push({ ...editData });
    data["more_details"] = JSON.stringify(filterData);
    onBlur();
    setEdit(false);
  };

  return (
    <div className="company_profile">
      <ComNavigation title="Company Profile" isAbout />
      <section>
        <div className="spadding">
          <div className="container position-relative">
            <Button
              className="add_new_carousel data_update_btn"
              onClick={handleShowModal}
              onMouseEnter={handleEnterMouse}
              onMouseLeave={handleEnterLeave}
            >
              Update
            </Button>
            <div className="profile-desc">
              <h3
                data-aos="flip-down"
                data-aos-easing="linear"
                data-aos-delay="100"
                data-aos-duration="1000"
              >
                {companyProfile && companyProfile[0]?.title}
              </h3>
              <p
                className="profile_desc"
                dangerouslySetInnerHTML={{
                  __html: companyProfile && companyProfile[0].description,
                }}
              />
            </div>
          </div>
        </div>
        <div className="spadding">
          <div className="container">
            <Row className="mission_vision_block">
              {map(
                companyProfile && companyProfile[0].more_details,
                (item, index) => (
                  <Col
                    md={6}
                    key={`mission_${index}`}
                    className="position-relative"
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
                      <div>
                        <FloatingLabel
                          controlId="floatingName"
                          label="name"
                          className="mb-3"
                        >
                          <FormControl
                            type="text"
                            name="name"
                            placeholder="Title"
                            defaultValue={item.name}
                            onChange={handleEditData}
                          />
                        </FloatingLabel>
                        <div>
                          <label style={{ color: "#fff" }}>Description</label>
                          <CKEditor
                            handleChange={handleEditData}
                            defaultData={item.description}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="d-grid card-box">
                        <h3
                          data-aos="flip-down"
                          data-aos-easing="linear"
                          data-aos-delay="100"
                          data-aos-duration="500"
                        >
                          <i
                            className={
                              item.id === 1 ? "fas fa-bullseye" : "fa fa-flag"
                            }
                          />
                          <span>{item.name}</span>
                        </h3>
                        <span
                          className="card-desc"
                          data-aos="zoom-out"
                          data-aos-easing="linear"
                          data-aos-delay="100"
                          data-aos-duration="500"
                        >
                          <span
                            dangerouslySetInnerHTML={{
                              __html: item.description,
                            }}
                          />
                        </span>
                      </div>
                    )}
                  </Col>
                )
              )}
            </Row>
          </div>
        </div>
        <div className="spadding">
          <div className="container position-relative">
            <Button
              className="add_new_carousel data_update_btn"
              onClick={handleCertificate}
              onMouseEnter={handleEnterMouse}
              onMouseLeave={handleEnterLeave}
            >
              Update
            </Button>
            <Row className="align-items-center">
              <Col
                md={6}
                className="profile-desc certificate_desc order-md-1 order-2"
              >
                <h3
                  data-aos="flip-down"
                  data-aos-easing="linear"
                  data-aos-delay="100"
                  data-aos-duration="500"
                >
                  {companyProfile && companyProfile[1].title}
                </h3>
                <p
                  data-aos="zoom-out"
                  data-aos-easing="linear"
                  data-aos-delay="100"
                  data-aos-duration="500"
                >
                  <span
                    dangerouslySetInnerHTML={{
                      __html: companyProfile && companyProfile[1].description,
                    }}
                  />
                </p>
              </Col>
              <Col md={6} className="order-md-2 order-1">
                {companyProfile && companyProfile[1].img && (
                  <Carousel
                    showStatus={false}
                    className="certificate_carousel"
                    data-aos="zoom-in"
                    data-aos-easing="linear"
                    data-aos-delay="100"
                    data-aos-duration="500"
                  >
                    {map(companyProfile[1].img, (item, index) => (
                      <div
                        className="certificate_img col-md-8 col-lg-7 col-9 m-auto"
                        key={`certificat_${index}`}
                      >
                        <Image src={item} />
                      </div>
                    ))}
                  </Carousel>
                )}
              </Col>
            </Row>
          </div>
        </div>
      </section>

      <AddNewPost
        show={show}
        modalTitle="Update Company Profile"
        handleClose={hideModal}
        handleChange={handleChange}
        isSingle={!isUpload}
        notSubTitle
        selectData={selectedData}
        selectMultiImage={selectMultiImage}
        showImageUploader={isUpload}
        handleSubmit={onBlur}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  companyProfile: state?.companyProfile?.companyProfile,
});
const mapDispatchToProps = {
  getCompanyProfile,
  handleUpdateData,
};
export default connect(mapStateToProps, mapDispatchToProps)(CompanyProfile);
