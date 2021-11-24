import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import {
  Col,
  Row,
  Image,
  Button,
  Modal,
  FormControl,
  FloatingLabel,
} from "react-bootstrap";
import map from "lodash/map";
import ComNavigation from "../../ComNavigation";
import CKEditor from "../../CkEditor";
import ImageUploader from "react-images-upload";
import {
  handleMediaData,
  handleUpdateMedia,
  getMediaData,
  handleDeleteMedia,
} from "../../../../reducer/action";
import { handleEnterLeave, handleEnterMouse } from "../../../common";

let data = [];
let update = false;
let bannreFile = "";
let isBanner = false;
const MediaKit = (props) => {
  const [show, setShow] = useState(false);
  const [selectData, setSelectData] = useState();
  const imageRef = useRef(null);
  const { mediaData } = props || {};

  useEffect(() => {
    props.getMediaData();
  }, []);

  const handleMediaDetails = (id) => {
    props.history.push(`/u/media-kit/${id}`);
  };

  const handleShowModal = () => {
    setShow(!show);
  };

  const handleNewAdd = () => {
    setShow(!show);
    setSelectData();
    update = false;
    isBanner = false;
  };

  const handleUpdateData = () => {
    props.handleUpdateMedia(data, selectData.id).then((resp) => {
      if (!resp?.error) {
        props.getMediaData();
        handleShowModal();
      }
    });
  };

  const handleSubmit = () => {
    if (update) {
      handleUpdateData();
    } else {
      props.handleMediaData(data).then((resp) => {
        if (resp && resp.data) {
          props.getMediaData();
          handleShowModal();
        }
      });
    }
  };
  const handleChange = (e) => {
    data[e.target.name] = e.target.value;
    if (e.target.name === "file") {
      data["bannerImage"] = isBanner;
      data["gallary"] = JSON.stringify([...e.target.oldImg]);
    }
  };

  const handleDelete = (id) => {
    props.handleDeleteMedia(id).then((res) => {
      if (res.status === 200) {
        props.getMediaData();
      }
    });
  };

  const handleEdit = (item) => {
    setSelectData(item);
    handleShowModal();
    update = true;
    isBanner = false;
  };

  const onDrop = (picture, banner = false) => {
    const files = [];
    let filterState = [];
    if (banner) {
      bannreFile = picture[0];
    } else {
      const imgState = imageRef?.current?.state?.pictures;
      filterState = imgState?.filter((name) => {
        return name?.includes("http://localhost:4000/");
      });
      map(picture, (item, index) => {
        files.push(item);
      });
    }

    if (bannreFile) {
      files.unshift(bannreFile);
    }
    handleChange({
      target: {
        name: "file",
        value: files,
        oldImg: filterState,
      },
    });
  };

  useEffect(() => () => handleEnterLeave(), []);

  return (
    <section>
      <ComNavigation title="Media Kit" />
      <div className="spadding position-relative">
        <Button
          onClick={handleNewAdd}
          className="add_new_carousel"
          onMouseEnter={handleEnterMouse}
          onMouseLeave={handleEnterLeave}
        >
          Add New Post
        </Button>
        <div className="container">
          <Row>
            {mediaData &&
              map(mediaData, (item, index) => (
                <Col
                  md={6}
                  className="post_item position-relative"
                  key={`blog_${index}`}
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
                    style={{ left: "15px" }}
                    onMouseEnter={handleEnterMouse}
                    onMouseLeave={handleEnterLeave}
                  >
                    <i class="fa fa-trash" />
                  </Button>
                  <div className="item">
                    <div className="media_img_block">
                      <Image src={item?.banner_img} />
                    </div>
                    <div className="item_content">
                      <h4
                        className="title"
                        data-aos="fade-down"
                        data-aos-easing="linear"
                        data-aos-delay="200"
                        data-aos-duration="500"
                      >
                        {item?.title}
                      </h4>
                      <p
                        className="desc"
                        className="title"
                        data-aos="fade-up"
                        data-aos-easing="linear"
                        data-aos-delay="200"
                        data-aos-duration="500"
                      >
                        <span
                          dangerouslySetInnerHTML={{
                            __html: item?.description,
                          }}
                        />
                      </p>
                    </div>
                    <div
                      className="post_more_read"
                      onClick={() => handleMediaDetails(`blog_${item.id}`)}
                      onMouseEnter={handleEnterMouse}
                      onMouseLeave={handleEnterLeave}
                    >
                      <span className="more_line" />
                      <span>READ MORE</span>
                    </div>
                  </div>
                </Col>
              ))}
          </Row>
        </div>
      </div>
      <Modal show={show} onHide={handleShowModal}>
        <Modal.Header closeButton>
          <Modal.Title>{`${update ? "Update" : "Add New"} Media`}</Modal.Title>
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
          <div>
            <label>Description</label>
            <CKEditor
              handleChange={handleChange}
              defaultData={selectData?.description}
            />
          </div>
          <div>
            <label>Banner Image</label>
            <ImageUploader
              withPreview={true}
              withIcon={true}
              buttonText="Choose Banner Image"
              onChange={(e) => {
                isBanner = true;
                onDrop(e, true);
              }}
              label={" Max file size: 100mb || accepted: jpg, jpeg, png"}
              imgExtension={[".jpg", ".jpeg", ".png"]}
              maxFileSize={105906176}
              singleImage={true}
              accept="image/jpg, image/jpeg, image/png"
              defaultImages={selectData && [selectData?.banner_img]}
            />
          </div>
          <div>
            <ImageUploader
              ref={imageRef}
              withPreview={true}
              withIcon={true}
              buttonText="Choose images"
              onChange={(e) => onDrop(e, false)}
              label={" Max file size: 100mb || accepted: jpg, jpeg, png"}
              imgExtension={[".jpg", ".jpeg", ".png"]}
              maxFileSize={105906176}
              singleImage={false}
              accept="image/jpg, image/jpeg, image/png"
              defaultImages={
                selectData && [...map(selectData?.gallary, (item) => item.src)]
              }
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
  mediaData: state?.media?.mediaData,
});
const mapDispatchToProps = {
  handleMediaData,
  handleUpdateMedia,
  getMediaData,
  handleDeleteMedia,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MediaKit));
