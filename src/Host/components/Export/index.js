import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Button,
  Modal,
  FloatingLabel,
  FormControl,
} from "react-bootstrap";
import map from "lodash/map";
import TagsInput from "react-tagsinput";
import ComNavigation from "../ComNavigation";
import CKEditor from "../CkEditor";
import "../../../sass/export.scss";
import "react-tagsinput/react-tagsinput.css";
import { getExportData, handleUpdateData } from "../../../reducer/action";
import { handleEnterLeave, handleEnterMouse } from "../../common";

let data = [];
const Export = (props) => {
  const [show, setShow] = useState(false);
  const { exportData } = props || {};
  const [tags, setTags] = useState([]);

  const handleShowPopup = () => {
    setShow(!show);
  };

  useEffect(() => {
    props.getExportData();
  }, []);

  useEffect(() => {
    if (exportData) {
      setTags(exportData?.more_details.split("|"));
    }
  }, [exportData]);

  const handleClose = () => {
    setShow(!show);
  };

  const handleChange = (e, tags = false) => {
    if (tags) {
      setTags(e);
      data["more_details"] = e.join("|");
    } else {
      data[e.target.name] = e.target.value;
    }
  };

  const handleSubmit = () => {
    props.handleUpdateData(data, exportData.id).then((res) => {
      if (res?.message) {
        props.getExportData();
        handleClose();
      }
    });
  };

  return (
    <section>
      <ComNavigation title="Export" />
      <div className="spadding">
        <div className="container position-relative">
          <Button
            className="add_new_carousel data_update_btn"
            onClick={handleShowPopup}
            onMouseEnter={handleEnterMouse}
            onMouseLeave={handleEnterLeave}
          >
            Update
          </Button>
          <Row>
            <Col className="export_block" md={9}>
              <h6
                className="sub-title"
                data-aos="fade-down"
                data-aos-easing="linear"
                data-aos-delay="100"
                data-aos-duration="500"
              >
                {exportData?.sub_title}
              </h6>
              <p
                className="desc"
                data-aos="fade-up"
                data-aos-easing="linear"
                data-aos-delay="100"
                data-aos-duration="500"
              >
                <span
                  dangerouslySetInnerHTML={{
                    __html: exportData?.description,
                  }}
                />
              </p>
            </Col>
            <Col
              xs={12}
              className="d-flex justify-content-center mt-3 export_block flex-wrap"
            >
              {exportData &&
                map(exportData.more_details.split("|"), (item, index) => (
                  <span
                    className="export_contry"
                    key={`contry_${index}`}
                    data-aos="fade-down"
                    data-aos-easing="linear"
                    data-aos-delay="150"
                    data-aos-duration="500"
                  >
                    {item}
                  </span>
                ))}
            </Col>
          </Row>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Export</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel
            controlId="floatingName"
            label="Sub Title"
            className="mb-3 col-lg-6 col-xs-12"
          >
            <FormControl
              type="text"
              name="subTitle"
              placeholder={"Sub Title"}
              defaultValue={exportData?.sub_title}
              onChange={(e) => handleChange(e)}
            />
          </FloatingLabel>
          <div>
            <label>Description</label>
            <CKEditor
              handleChange={handleChange}
              defaultData={exportData?.description}
            />
          </div>
          <TagsInput
            value={tags}
            onChange={(e) => handleChange(e, true)}
            inputProps={{ placeholder: "Add Country" }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

const mapStateToProps = (state) => ({
  exportData: state?.exportData,
});
const mapDispatchToProps = {
  getExportData,
  handleUpdateData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Export);
