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
  return (
    <div className="border rounded me-2 mt-2">
      <div className="p-3 ps-2 bg-secondary d-flex justify-content-between">
        <div className="ms-2">{question.title}</div>
        <div>{question.points} pts</div>
      </div>

      <div className="p-3 d-flex justify-content-between">
        <div>{question.question}</div>
      </div>

      <div className="p-3">
        <Answers
          qIdx={qIdx}
          question={question}
          onChange={onChange}
          studentAnswer={studentAnswer}
        />
      </div>
    </div>
  );
}
