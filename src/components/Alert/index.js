import React from "react";
import cx from "classnames";
import "../../sass/alert.scss";

function Alert(props) {
  const { isLoading, isMessage, isError } = props;
  return (
    <div className={cx("alert-box", isError && "error-box")}>
      {isLoading && (
        <div className="loader">
          <div className="yellow"></div>
          <div className="red"></div>
          <div className="blue"></div>
          <div className="violet"></div>
        </div>
      )}
      {isMessage && (
        <div className={cx("alert-message", !isLoading && "ml-10")}>
          <p>{isMessage}</p>
        </div>
      )}
    </div>
  );
}
export default Alert;
