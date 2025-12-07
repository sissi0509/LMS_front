import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { IoTrashBinOutline } from "react-icons/io5";

export default function FillBlankAnswer({
  question,
  onChange,
}: {
  question: any;
  onChange: any;
}) {
  const extractBlanks = (text: any) => {
    const result: { name: string }[] = [];
    if (!text) return result;

    const regex = /\[\[([^[\]]+)\]\]/g;
    let match;
    while ((match = regex.exec(text)) !== null) {
      const name = match[1].trim();
      result.push({ name });
    }
    return result;
  };

  const blanks = extractBlanks(question.question);
  const acceptable = question.acceptableAnswers ?? [];

  const normalizedAnswers = blanks.map((_, idx) => {
    const existing = acceptable[idx];
    if (existing?.length > 0) return existing;
    return [""];
  });

  const syncToParent = (updated: string[][]) => {
    onChange({
      ...question,
      acceptableAnswers: updated,
    });
  };

  const handleAnswerChange = (
    blankIdx: number,
    answerIdx: number,
    value: string
  ) => {
    const copy = normalizedAnswers.map((arr) => [...arr]);
    copy[blankIdx][answerIdx] = value;
    onChange({
      ...question,
      acceptableAnswers: copy,
    });
    syncToParent(copy);
  };

  const addAnswer = (blankIdx: number) => {
    const copy = normalizedAnswers.map((arr) => [...arr]);
    copy[blankIdx].push("");
    syncToParent(copy);
  };

  const deleteAnswer = (blankIdx: number, answerIdx: number) => {
    const copy = normalizedAnswers.map((arr) => [...arr]);
    copy[blankIdx].splice(answerIdx, 1);
    if (copy[blankIdx].length === 0) copy[blankIdx].push("");
    syncToParent(copy);
  };

  if (blanks.length === 0) {
    return (
      <div className="text-muted">
        No blanks detected. Type something like <code>[[a]]</code> or{" "}
        <code>[[1]]</code> in the question text to create blanks.
      </div>
    );
  }

  return (
    <div className="mt-3">
      <h5 className="mb-3">Blank names & Acceptable Answers:</h5>
      <p className="text-muted">
        Each <code>[[name]]</code> in the question corresponds to one section
        below.
      </p>

      {blanks.map((blank, blankIdx) => (
        <div key={blankIdx} className="border rounded p-2 mb-3">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <strong>
              Blank {blankIdx + 1}: {blank.name}
            </strong>
          </div>

          {normalizedAnswers[blankIdx].map((ans: any, answerIdx: number) => (
            <Row key={answerIdx} className="align-items-center mb-2">
              <Col xs={12} sm={3}>
                Possible Answer
              </Col>
              <Col xs={12} sm={8}>
                <input
                  type="text"
                  className="form-control"
                  value={ans}
                  onChange={(e) =>
                    handleAnswerChange(blankIdx, answerIdx, e.target.value)
                  }
                  placeholder="Type an acceptable answer"
                />
              </Col>
              <Col xs={12} sm={1} className="text-end mt-2 mt-sm-0">
                <button
                  type="button"
                  className="btn btn-link text-danger p-0"
                  onClick={() => deleteAnswer(blankIdx, answerIdx)}
                >
                  <IoTrashBinOutline />
                </button>
              </Col>
            </Row>
          ))}

          <div className="d-flex justify-content-end align-items-center mb-2">
            <FaPlus className="text-danger me-1" />
            <a
              href="#"
              className="link-danger link-offset-2 link-offset-3-hover link-underline 
               link-underline-opacity-0 link-underline-opacity-75-hover"
              onClick={(e) => {
                e.preventDefault();
                addAnswer(blankIdx);
              }}
              style={{ cursor: "pointer" }}
            >
              Add Another Answer
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
