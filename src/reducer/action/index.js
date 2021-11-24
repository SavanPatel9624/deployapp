import axios from "axios";

const url = "http://localhost:4000";

export const handleFirstTimeLoad = (isFirstTime) => {
  return (dispatch) => dispatch({ type: "IS_FIRST_TIME", data: isFirstTime });
};

export function getAllData() {
  return (dispatch) =>
    axios({
      method: "get",
      url: `${url}/get_home_data`,
    })
      .then((resp) => {
        if (resp && resp.data) {
          console.log("resp.data");
          dispatch({ type: "GET_HOME_DATA", data: resp.data.data });
          return resp.data;
        }
        return resp || {};
      })
      .catch((error) => (error && error.response && error.response.data) || {});
}

export function handlePostData(submitData) {
  const data = new FormData();

  if (submitData.subTitle) {
    data.append("subTitle", submitData.subTitle);
  }
  if (submitData.title) {
    data.append("title", submitData.title);
  }
  if (submitData.description) {
    data.append("description", submitData.description);
  }
  if (submitData.more_details) {
    data.append("more_details", submitData.more_details);
  }
  if (submitData.year) {
    data.append("year", submitData.year);
  }
  if (submitData.alias_name) {
    data.append("alias_name", submitData.alias_name);
  }
  if (submitData.file) {
    for (var x = 0; x < submitData.file.length; x++) {
      data.append("file", submitData.file[x]);
    }
  }

  return (dispatch) =>
    axios({
      method: "post",
      url: `${url}/add_data`,
      data,
      headers: {
        "content-type": "multipart/form-data",
      },
    })
      .then((resp) => {
        if (resp && resp.data) {
          return resp.data;
        }
        return resp;
      })
      .catch((error) => (error && error.response && error.response.data) || {});
}

export function handleUpdateData(submitData, id) {
  const data = new FormData();

  if (submitData.subTitle) {
    data.append("subTitle", submitData.subTitle);
  }
  if (submitData.title) {
    data.append("title", submitData.title);
  }
  if (submitData.description) {
    data.append("description", submitData.description);
  }
  if (submitData.more_details) {
    data.append("more_details", submitData.more_details);
  }
  if (submitData.img) {
    data.append("img", submitData.img);
  }
  if (submitData.year) {
    data.append("year", submitData.year);
  }
  if (submitData.alias_name) {
    data.append("alias_name", submitData.alias_name);
  }
  if (submitData.file) {
    for (var x = 0; x < submitData.file.length; x++) {
      data.append("file", submitData.file[x]);
    }
  }

  return (dispatch) =>
    axios({
      method: "put",
      url: `${url}/update_data/${id}`,
      data,
      headers: {
        "content-type": "multipart/form-data",
      },
    })
      .then((resp) => {
        if (resp && resp.data) {
          return resp.data;
        }
        return resp;
      })
      .catch((error) => (error && error.response && error.response.data) || {});
}

export function getFooterData() {
  return (dispatch) =>
    axios({
      method: "get",
      url: `${url}/footer`,
    })
      .then((resp) => {
        if (resp && resp.data) {
          console.log("resp.data");
          dispatch({ type: "GET_FOOTER_DATA", data: resp.data.data });
          return resp.data;
        }
        return resp || {};
      })
      .catch((error) => (error && error.response && error.response.data) || {});
}

export function handleUpdateFooterData(submitData, id) {
  const data = new FormData();

  if (submitData.mobile) {
    data.append("mobile", submitData.mobile);
  }
  if (submitData.email) {
    data.append("email", submitData.email);
  }
  if (submitData.address) {
    data.append("address", submitData.address);
  }
  if (submitData.facebook) {
    data.append("facebook", submitData.facebook);
  }
  if (submitData.twitter) {
    data.append("twitter", submitData.twitter);
  }
  if (submitData.instagram) {
    data.append("instagram", submitData.instagram);
  }
  if (submitData.printrest) {
    data.append("printrest", submitData.printrest);
  }
  if (submitData.logo) {
    data.append("logo", submitData.logo);
  }
  if (submitData.file) {
    data.append("file", submitData.file);
  }

  return (dispatch) =>
    axios({
      method: "put",
      url: `${url}/update_footer/${id}`,
      data,
      headers: {
        "content-type": "multipart/form-data",
      },
    })
      .then((resp) => {
        if (resp && resp.data) {
          return resp.data;
        }
        return resp;
      })
      .catch((error) => (error && error.response && error.response.data) || {});
}

export function getCompanyProfile() {
  return (dispatch) =>
    axios({
      method: "get",
      url: `${url}/get_company_profile`,
    })
      .then((resp) => {
        if (resp && resp.data) {
          console.log("resp.data");
          dispatch({ type: "GET_COMPANY_PROFILE_DATA", data: resp.data.data });
          return resp.data;
        }
        return resp || {};
      })
      .catch((error) => (error && error.response && error.response.data) || {});
}

export function getInfrastructure() {
  return (dispatch) =>
    axios({
      method: "get",
      url: `${url}/get_infrastructure`,
    })
      .then((resp) => {
        if (resp && resp.data) {
          console.log("resp.data");
          dispatch({ type: "GET_INFRASTRUCTURE_DATA", data: resp.data.data });
          return resp.data;
        }
        return resp || {};
      })
      .catch((error) => (error && error.response && error.response.data) || {});
}

export function getMediaData() {
  return (dispatch) =>
    axios({
      method: "get",
      url: `${url}/get_media`,
    })
      .then((resp) => {
        if (resp && resp.data) {
          console.log("resp.data");
          dispatch({ type: "GET_MEDIA_DATA", data: resp.data.data });
          return resp.data;
        }
        return resp || {};
      })
      .catch((error) => (error && error.response && error.response.data) || {});
}

export function handleMediaData(submitData) {
  const data = new FormData();
  if (submitData.title) {
    data.append("title", submitData.title);
  }
  if (submitData.description) {
    data.append("description", submitData.description);
  }
  if (submitData.bannerImage) {
    data.append("bannerImage", submitData.bannerImage);
  }
  if (submitData.file) {
    for (var x = 0; x < submitData.file.length; x++) {
      data.append("file", submitData.file[x]);
    }
  }

  return (dispatch) =>
    axios({
      method: "post",
      url: `${url}/add_media`,
      data,
      headers: {
        "content-type": "multipart/form-data",
      },
    })
      .then((resp) => {
        if (resp && resp.data) {
          return resp.data;
        }
        return resp;
      })
      .catch((error) => (error && error.response && error.response.data) || {});
}

export function handleUpdateMedia(submitData, id) {
  const data = new FormData();

  if (submitData.title) {
    data.append("title", submitData.title);
  }
  if (submitData.description) {
    data.append("description", submitData.description);
  }

  if (submitData.bannerImage) {
    data.append("bannerImage", submitData.bannerImage);
  }
  if (submitData.gallary) {
    data.append("gallary", submitData.gallary);
  }
  if (submitData.file) {
    for (var x = 0; x < submitData.file.length; x++) {
      data.append("file", submitData.file[x]);
    }
  }

  return (dispatch) =>
    axios({
      method: "put",
      url: `${url}/update_media/${id}`,
      data,
      headers: {
        "content-type": "multipart/form-data",
      },
    })
      .then((resp) => {
        if (resp && resp.data) {
          return resp.data;
        }
        return resp;
      })
      .catch((error) => (error && error.response && error.response.data) || {});
}

export function addCollection(submitData) {
  const data = new FormData();

  if (submitData.title) {
    data.append("title", submitData.title);
  }
  if (submitData.size_x) {
    data.append("size_x", submitData.size_x);
  }
  if (submitData.size_y) {
    data.append("size_y", submitData.size_y);
  }
  if (submitData.size_type) {
    data.append("size_type", submitData.size_type);
  }
  if (submitData.weight) {
    data.append("weight", submitData.weight);
  }
  if (submitData.thickness) {
    data.append("thickness", submitData.thickness);
  }
  if (submitData.tiles) {
    data.append("tiles", submitData.tiles);
  }
  if (submitData.file) {
    data.append("file", submitData.file);
  }

  return (dispatch) =>
    axios({
      method: "post",
      url: `${url}/add_collection`,
      data,
      headers: {
        "content-type": "multipart/form-data",
      },
    })
      .then((resp) => {
        if (resp && resp.data) {
          return resp.data;
        }
        return resp;
      })
      .catch((error) => (error && error.response && error.response.data) || {});
}

export function handleUpdateCollection(submitData, id) {
  const data = new FormData();

  if (submitData.title) {
    data.append("title", submitData.title);
  }
  if (submitData.size_x) {
    data.append("size_x", submitData.size_x);
  }
  if (submitData.size_y) {
    data.append("size_y", submitData.size_y);
  }
  if (submitData.size_type) {
    data.append("size_type", submitData.size_type);
  }
  if (submitData.weight) {
    data.append("weight", submitData.weight);
  }
  if (submitData.thickness) {
    data.append("thickness", submitData.thickness);
  }
  if (submitData.tiles) {
    data.append("tiles", submitData.tiles);
  }
  if (submitData.img) {
    data.append("img", submitData.img);
  }
  if (submitData.file) {
    data.append("file", submitData.file);
  }

  return (dispatch) =>
    axios({
      method: "put",
      url: `${url}/update_collection/${id}`,
      data,
      headers: {
        "content-type": "multipart/form-data",
      },
    })
      .then((resp) => {
        if (resp && resp.data) {
          return resp.data;
        }
        return resp;
      })
      .catch((error) => (error && error.response && error.response.data) || {});
}

export function handleDeleteCollection(id) {
  return (dispatch) =>
    axios({ method: "delete", url: `${url}/delete_collection/${id}` })
      .then((resp) => {
        if (resp.status === 200) {
          return resp;
        }
        return "";
      })
      .catch((err) => err?.response?.data || {});
}

export function getCollection() {
  return (dispatch) =>
    axios({
      method: "get",
      url: `${url}/get_collection`,
    })
      .then((resp) => {
        if (resp && resp.data) {
          dispatch({ type: "GET_COLLECTION_DATA", data: resp.data.data });
          return resp.data;
        }
        return resp || {};
      })
      .catch((error) => (error && error.response && error.response.data) || {});
}

export function getExportData() {
  return (dispatch) =>
    axios({
      method: "get",
      url: `${url}/get_export`,
    })
      .then((resp) => {
        if (resp?.data) {
          dispatch({ type: "GET_EXPORT_DATA", data: resp.data.data });
          return resp.data;
        }
        return resp || {};
      })
      .catch((err) => err?.response?.data || {});
}

export function handleDeleteMedia(id) {
  return (dispatch) =>
    axios({ method: "delete", url: `${url}/delete_media/${id}` })
      .then((resp) => {
        if (resp.status === 200) {
          return resp;
        }
        return "";
      })
      .catch((err) => err?.response?.data || {});
}

export function handleInquiryForm(data) {
  return () =>
    axios({
      method: "post",
      url: `${url}/send_email`,
      data: { data },
    }).then((resp) => {
      if (resp?.data) {
        return resp;
      }
      return "";
    });
}
