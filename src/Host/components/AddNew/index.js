import React, { useRef } from "react";
import { Modal, Button, FloatingLabel, FormControl } from "react-bootstrap";
import ImageUploader from "react-images-upload";
import CKEditor from "../CkEditor";

const AddNewPost = ({
  show,
  handleClose,
  modalTitle,
  handleChange,
  isSingle,
  handleSubmit,
  selectData,
  selectMultiImage,
  notSubTitle = false,
  notTitle = false,
  notDesc = false,
  showYear = false,
  showImageUploader = true,
}) => {
  const imageRef = useRef(null);
  const onDrop = (picture) => {
    const imgState = imageRef?.current?.state?.pictures;
    const filterState = imgState?.filter((name) => {
      return name?.includes("http://localhost:4000/");
    });
    if (selectMultiImage) {
      handleChange({
        target: {
          name: "file",
          value: picture,
          oldImg: filterState,
        },
      });
    } else {
      handleChange({ target: { name: "file", value: picture } });
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!notSubTitle && (
          <FloatingLabel
            controlId="floatingName"
            label="Sub Tilte"
            className="mb-3"
          >
            <FormControl
              type="text"
              name="subTitle"
              placeholder="Sub Tilte"
              defaultValue={selectData?.sub_title}
              onChange={(e) => handleChange(e)}
            />
          </FloatingLabel>
        )}
        {!notTitle && (
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
        )}
        {showYear && (
          <FloatingLabel controlId="floatingName" label="Year" className="mb-3">
            <FormControl
              type="text"
              name="year"
              placeholder="Year"
              defaultValue={selectData?.year}
              onChange={(e) => handleChange(e)}
            />
          </FloatingLabel>
        )}
        {!notDesc && (
          <div>
            <label>Description</label>
            <CKEditor
              handleChange={handleChange}
              defaultData={selectData?.description}
            />
          </div>
        )}
        {showImageUploader && (
          <ImageUploader
            ref={imageRef}
            withPreview={true}
            withIcon={true}
            buttonText="Choose images"
            onChange={onDrop}
            label={" Max file size: 100mb || accepted: jpg, jpeg, png"}
            imgExtension={[".jpg", ".jpeg", ".png"]}
            maxFileSize={105906176}
            singleImage={isSingle}
            accept="image/jpg, image/jpeg, image/png"
            defaultImages={
              selectMultiImage ? selectData?.img : [selectData?.img]
            }
          />
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddNewPost;
