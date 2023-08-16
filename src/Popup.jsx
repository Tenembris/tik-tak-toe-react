/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const Popup = ({
  isOpen,
  onClose,
  onSubmit,
  name1,
  setName1,
  setName2,
  name2,
}) => {
  if (!isOpen) {
    return null;
  }

  if (name1 !== "" && name2 !== "") {
    const button = document.querySelector("#submit");
    button.disabled = false;
    button.classList.remove("disabled");
  }

  console.log(name1);

  return ReactDOM.createPortal(
    <div className="popup-overlay">
      <h1>Set your nicknames!</h1>
      <div className="popup-content">
        <form onSubmit={onSubmit}>
          <label>
            Name 1:
            <input
              type="text"
              value={name1}
              onChange={(e) => setName1(e.target.value)}
            />
          </label>
          <label>
            Name 2:
            <input
              type="text"
              value={name2}
              onChange={(e) => setName2(e.target.value)}
            />
          </label>

          <button type="submit" id="submit" className="disabled" disabled>
            Submit
          </button>
        </form>
      </div>
    </div>,
    document.getElementById("portal") // Use document.body to place the popup at the top layer
  );
};

export default Popup;
