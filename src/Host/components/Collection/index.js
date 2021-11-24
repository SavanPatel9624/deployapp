import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import map from "lodash/map";
import {
  Row,
  Col,
  Image,
  Modal,
  FormControl,
  FloatingLabel,
  Button,
} from "react-bootstrap";
import ComNavigation from "../ComNavigation";
import ImageUploader from "react-images-upload";
import {
  addCollection,
  handleUpdateCollection,
  getCollection,
  handleDeleteCollection,
} from "../../../reducer/action";
import { handleEnterMouse, handleEnterLeave } from "../../common";

let update = false;
let data = [];
const Collection = (props) => {
  const [show, setShow] = useState(false);
  const [selectData, setSelectData] = useState();
  const { collectionData } = props || {};

  const handleProDetails = (id) => {
    props.history.push(`/u/collection/${id}`);
  };

  const handleSubmit = () => {
    if (update) {
      data["img"] = selectData.img;
      props.handleUpdateCollection(data, selectData.id).then((resp) => {
        if (resp?.message) {
          props.getCollection();
          handleShowModal();
        }
      });
    } else {
      props.addCollection(data).then((resp) => {
        if (resp && resp.data) {
          props.getCollection();
          handleShowModal();
        }
      });
    }
  };

  const handleDelete = (id) => {
    props.handleDeleteCollection(id).then((res) => {
      if (res.status === 200) {
        props.getCollection();
      }
    });
  };

  const onDrop = (picture) => {
    handleChange({ target: { name: "file", value: picture[0] } });
  };
  const handleShowModal = () => {
    setShow(!show);
  };

  useEffect(() => {
    props.getCollection();
  }, []);

  const handleChange = (e) => {
    data[e.target.name] = e.target.value;
  };

  const handleNewAdd = () => {
    setShow(!show);
    setSelectData();
    data = [];
    update = false;
  };
  const handleEdit = (item) => {
    setShow(!show);
    setSelectData(item);
    update = true;
  };

  useEffect(() => () => handleEnterLeave(), []);

  return (
    <section>
      <ComNavigation title="Collection" />
      <div className="spadding position-relative">
        <Button
          onClick={handleNewAdd}
          className="add_new_carousel"
          onMouseEnter={handleEnterMouse}
          onMouseLeave={handleEnterLeave}
        >
          Add Collection
        </Button>
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
                <Button
                  className="add_new_carousel data_update_btn icon_button"
                  onClick={() => handleEdit(item)}
                  onMouseEnter={handleEnterMouse}
                  onMouseLeave={handleEnterLeave}
                >
                  <i class="fa fa-edit" />
                </Button>
                <Button
                  className="add_new_carousel data_update_btn icon_button"
                  onClick={() => handleDelete(item.id)}
                  style={{ left: "10px" }}
                  onMouseEnter={handleEnterMouse}
                  onMouseLeave={handleEnterLeave}
                >
                  <i class="fa fa-trash" />
                </Button>
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
      <Modal show={show} onHide={handleShowModal}>
        <Modal.Header closeButton>
          <Modal.Title>{`${
            update ? "Update" : "Add New"
          } Collection`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel
            controlId="floatingName"
            label="Title"
            className="mb-3"
          >
            <FormControl
              type="text"
              name="title"
              placeholder="Title"
              defaultValue={selectData?.title}
              onChange={(e) => handleChange(e)}
            />
          </FloatingLabel>
          <div controlId="floatingName">
            <label>Size</label>
            <div className="mb-3 d-flex align-items-center">
              <FormControl
                type="text"
                name="size_x"
                size="lg"
                className="me-2"
                defaultValue={selectData?.size_x}
                onKeyPress={(event) => {
                  if (!(event.which >= 48 && event.which <= 57)) {
                    event.preventDefault();
                  }
                }}
                onChange={(e) => handleChange(e)}
              />
              X
              <FormControl
                type="text"
                name="size_y"
                size="lg"
                className="ms-2"
                onKeyPress={(event) => {
                  if (!(event.which >= 48 && event.which <= 57)) {
                    event.preventDefault();
                  }
                }}
                defaultValue={selectData?.size_y}
                onChange={(e) => handleChange(e)}
              />
              <select
                className="ms-2 size-selection"
                name="size_type"
                onChange={handleChange}
                defaultValue={selectData?.size_type}
              >
                <option value="mm">mm</option>
                <option value="inch">inch</option>
              </select>
            </div>
          </div>
          <FloatingLabel
            controlId="floatingName"
            label="Weight"
            className="mb-3"
          >
            <FormControl
              type="text"
              name="weight"
              placeholder="Weight"
              onKeyPress={(event) => {
                if (!(event.which >= 48 && event.which <= 57)) {
                  event.preventDefault();
                }
              }}
              defaultValue={selectData?.weight}
              onChange={(e) => handleChange(e)}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingName"
            label="Thickness"
            className="mb-3"
          >
            <FormControl
              type="text"
              name="thickness"
              placeholder="Thickness"
              onKeyPress={(event) => {
                if (!(event.which >= 48 && event.which <= 57)) {
                  event.preventDefault();
                }
              }}
              defaultValue={selectData?.thickness}
              onChange={(e) => handleChange(e)}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingName"
            label="Tiles"
            className="mb-3"
          >
            <FormControl
              type="text"
              name="tiles"
              placeholder="Tiles"
              onKeyPress={(event) => {
                if (!(event.which >= 48 && event.which <= 57)) {
                  event.preventDefault();
                }
              }}
              defaultValue={selectData?.tiles}
              onChange={(e) => handleChange(e)}
            />
          </FloatingLabel>
          <div>
            <label>Image</label>
            <ImageUploader
              withPreview={true}
              withIcon={true}
              buttonText="Choose Image"
              onChange={onDrop}
              label={" Max file size: 100mb || accepted: jpg, jpeg, png"}
              imgExtension={[".jpg", ".jpeg", ".png"]}
              maxFileSize={105906176}
              singleImage={true}
              accept="image/jpg, image/jpeg, image/png"
              defaultImages={selectData && [selectData?.img]}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleShowModal}>
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
  collectionData: state?.collection?.collectionData,
});
const mapDispatchToProps = {
  addCollection,
  handleUpdateCollection,
  getCollection,
  handleDeleteCollection,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Collection));
