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
  setPlayWithAi,
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

  const togglePlayWithAi = () => {
    setName2("CPU"); // Corrected here
    setPlayWithAi(true);
    console.log(name1, name2);
    onClose();
  };

  return ReactDOM.createPortal(
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="playWithFriend">
          <h1>Set your nicknames!</h1>
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

        <div className="playWithCPU">
          <h1 className="h1-line">OR</h1>
          <div>
            <h2>Play With Computer! alfa version be aware of bugs</h2>

            <form onSubmit={onSubmit}>
              <label>Your Nickname</label>
              <input
                type="text"
                value={name1}
                onChange={(e) => setName1(e.target.value)}
              />
              {/* Use defaultValue */}
            </form>

            <button type="submit" onClick={togglePlayWithAi}>
              CPU
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default Popup;
