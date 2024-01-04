import React from "react";

const Toast_Success = ({ message }) => {
  return (
    <div className="toast toast-end">
      <div className="alert alert-success">
        <span className="text-white">{message}</span>
      </div>
    </div>
  );
};

export default Toast_Success;
