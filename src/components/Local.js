import React from "react";
import "../style/local.css";
import { AiOutlineClose } from "react-icons/ai";

const local = ({ visible, onClose }) => {
  return (
    <>
      <div
        className="modal-local"
        style={{ display: visible ? "block" : "none" }}
      >
        <div className="local-form">
          <button className="btn-local" onClick={onClose}>
            <AiOutlineClose />
          </button>
          <form>
            <label>Your Name:</label>
            <input type="text" />

            <label>Phone Number:</label>
            <input type="text" />

            <label>Address:</label>
            <input type="text" />
          </form>
        </div>
      </div>
    </>
  );
};

export default local;
