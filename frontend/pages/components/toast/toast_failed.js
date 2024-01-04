import React from "react";

const Toast_Failed = ({ message }) => {
  return (
    <div className="toast toast-end">
      <div className="alert bg-red-500">
        <span className="text-white">{message}</span>
      </div>
    </div>
  );
};

export default Toast_Failed;
