import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { editorConfiguration } from "../../config/CkEditor";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const CKEditors = (props) => (
  <CKEditor
    editor={ClassicEditor}
    config={editorConfiguration}
    data={props.defaultData}
    onChange={(event, editor) => {
      const data = editor?.getData();
      console.log({ event, editor, data });
      props.handleChange({ target: { name: "description", value: data } });
    }}
  />
);

export default CKEditors;
