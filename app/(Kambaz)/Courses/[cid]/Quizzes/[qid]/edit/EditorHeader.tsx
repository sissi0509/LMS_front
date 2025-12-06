import React from "react";

export default function EditorHeader({
  question,
  onChange,
}: {
  question: any;
  onChange: any;
}) {
  return (
    <div className="d-flex justify-content-between">
      <div className="d-flex ms-2 me-2">
        <input
          className="form-control me-2"
          placeholder="title"
          value={question.title}
          onChange={(e) => onChange({ ...question, title: e.target.value })}
        ></input>
        <select
          className="form-select"
          value={question.type}
          onChange={(e) => onChange({ ...question, type: e.target.value })}
        >
          <option value="MCQ">Multiple Choice</option>
          <option value="TRUE_FALSE">True/False</option>
          <option value="FILL_BLANK">Fill in the Blank</option>
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
          value={question.points}
          onChange={(e) =>
            onChange({ ...question, points: Number(e.target.value) })
          }
          style={{ width: "60px" }}
        />
      </div>
    </div>
  );
}
