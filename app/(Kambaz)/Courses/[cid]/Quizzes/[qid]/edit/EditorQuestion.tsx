"use client";
import React, { useEffect, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { MdBorderColor } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { BiFontColor } from "react-icons/bi";

export default function EditorQuestion({
  question,
  onChange,
}: {
  question: any;
  onChange: any;
}) {
  return (
    <div className="wb-quiz-editor-question">
      <div className="mb-3">
        Enter your question and multiple answers, then select the one correct
        answer.
      </div>
      <h5 className="mb-2 fw-bold">Question</h5>

      <div className="btn-group ms-2" role="group">
        <button type="button" className="btn btn-light">
          Edit
        </button>
        <button type="button" className="btn btn-light">
          View
        </button>
        <button type="button" className="btn btn-light">
          Insert
        </button>
        <button type="button" className="btn btn-light">
          Format
        </button>
        <button type="button" className="btn btn-light">
          Tools
        </button>
        <button type="button" className="btn btn-light">
          Table
        </button>
      </div>
      <hr />
      <div className="d-flex align-items-center ms-2 gap-2 mb-2">
        <select
          id="wb-font-select"
          className="form-select no-border"
          style={{ width: 80 }}
          defaultValue={"8"}
          name="font-size"
        >
          <option value="8">8pt</option>
          <option value="12">12pt</option>
          <option value="14">14pt</option>
          <option value="16">16pt</option>
          <option value="18">18pt</option>
        </select>

        <select
          id="wb-style-select"
          className="form-select no-border"
          defaultValue={"paragraph"}
          style={{ width: 140 }}
          name="style"
        >
          <option value="heading1">heading1</option>
          <option value="paragraph">paragraph</option>
        </select>
        {/* <div className="vr mx-2"></div> */}
        <div className="btn-group ms-2 gap-1" role="group">
          <button className="btn btn-light">
            <b>B</b>
          </button>
          <button className="btn btn-light fst-italic">I</button>
          <button className="btn btn-light text-decoration-underline">U</button>
          <label htmlFor="colorNative" className="btn btn-light">
            <BiFontColor size={22} />
            <IoIosArrowDown />
          </label>
          <input
            type="color"
            id="colorNative"
            style={{ opacity: 0, width: 1, height: 1 }}
          />
          <label htmlFor="colorNative" className="btn btn-light">
            <MdBorderColor />
            <IoIosArrowDown />
          </label>
          <input
            type="color"
            id="colorNative"
            style={{ opacity: 0, width: 1, height: 1 }}
          />

          <select
            className="form-select no-border"
            style={{ width: 70 }}
            defaultValue={"super"}
            name="script"
          >
            <option value="super">
              {"T\u00B2\u00A0\u00A0\u00A0\u00A0Superscript"}
            </option>
            <option value="sub">
              {"T\u2082\u00A0\u00A0\u00A0\u00A0Subscript"}
            </option>
          </select>
        </div>

        <div className="vr mx-2">
          <button className="btn btn-light">
            <HiDotsVertical />
          </button>
        </div>
      </div>
      <div>
        <textarea
          className="form-control p-5"
          rows={5}
          value={question.question}
          onChange={(e) => onChange({ ...question, question: e.target.value })}
        />
      </div>
    </div>
  );
}
