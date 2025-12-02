import React from "react";

export default function EditorHeader() {
  return (
    <div className="d-flex justify-content-between">
      <div className="d-flex ms-2 me-2">
        <input className="form-control me-2" placeholder="title"></input>
        <select className="form-select" defaultValue="MULTI">
          <option value="MULTI">Multiple Choice</option>
          <option value="1">True/False</option>
          <option value="2">Fill in the Blank</option>
        </select>
      </div>
      <div className="d-flex align-items-center">
        <label className="form-label me-2" htmlFor="question-point">
          pts:
        </label>
        <input
          className="form-control text-center"
          type="number"
          id="question-point"
          defaultValue={4}
          style={{ width: "40px" }}
        />
      </div>
    </div>
  );
}
