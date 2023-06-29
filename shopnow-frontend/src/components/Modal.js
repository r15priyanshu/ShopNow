
import React from "react";
import ReactDOM from 'react-dom';
import "./css/Modal.css"

function Modal(props) {
  return ReactDOM.createPortal(
    <div>
      <div className="portal-overlay"></div>
      <div className="portal-content">
        {props.children}
      </div>
    </div>,
    document.getElementById("portal-container")
  );
}

export default Modal;
