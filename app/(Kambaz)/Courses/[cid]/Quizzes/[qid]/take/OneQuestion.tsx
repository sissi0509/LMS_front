"use client";
import React, { useState } from "react";
import Answers from "./Answers";

import { BsGripVertical } from "react-icons/bs";

export default function OneQuestion({
  qIdx,
  question,
  onChange,
  studentAnswer,
}: {
  qIdx: number;
  question: any;
  onChange: any;
  studentAnswer: any;
}) {
  const renderFillBlankQuestion = () => {
    const text = question.question || "";
    const parts = text.split(/(\[\[[^[\]]+\]\])/);
    let blankCounter = 0;

    const handleBlankChange = (idx: number, value: string) => {
      const prev = studentAnswer?.textAnswer || [];
      const updated = [...prev];
      if (updated.length <= idx) {
        for (let i = updated.length; i <= idx; i++) {
          updated[i] = "";
        }
      }
      updated[idx] = value;
      onChange(qIdx, {
        ...(studentAnswer || {}),
        question: question._id,
        textAnswer: updated,
      });
    };

    return (
      <div>
        {parts.map((part: any) => {
          const isBlank = part.startsWith("[[") && part.endsWith("]]");

          if (!isBlank) return part;

          const thisBlank = blankCounter++;
          return (
            <input
              key={`blank-${thisBlank}`}
              type="text"
              className="mx-1"
              style={{ minWidth: "80px" }}
              value={studentAnswer?.textAnswer?.[thisBlank] ?? ""}
              onChange={(e) => handleBlankChange(thisBlank, e.target.value)}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="border rounded me-2 mt-2">
      <div className="p-3 ps-2 bg-secondary d-flex justify-content-between">
        <div className="ms-2">{question.title}</div>
        <div>{question.points} pts</div>
      </div>

      <div className="p-3 d-flex justify-content-between">
        <div>
          {" "}
          {question.type === "FILL_BLANK"
            ? renderFillBlankQuestion()
            : question.question}
        </div>
      </div>

      {question.type !== "FILL_BLANK" && (
        <div className="p-3">
          <Answers
            qIdx={qIdx}
            question={question}
            onChange={onChange}
            studentAnswer={studentAnswer}
          />
        </div>
      )}
    </div>
  );
}
