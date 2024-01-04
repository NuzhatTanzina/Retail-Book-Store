import React from "react";

const Toast_Info = ({ message }) => {
  return (
    <div className="toast toast-end">
      <div className="alert alert-info">
        <span className="">{message}</span>
      </div>
    </div>
  );
};

export default Toast_Info;
