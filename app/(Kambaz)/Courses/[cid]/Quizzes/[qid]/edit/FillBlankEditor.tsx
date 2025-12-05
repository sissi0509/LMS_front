"use client";
import React from "react";
import EditorHeader from "./EditorHeader";
import EditorQuestion from "./EditorQuestion";

import QuestionControlBth from "./QuestionControlBth";
import FillBlankAnswer from "./FillBlankAnswer";
export default function FillBlankEditor({
  idx,
  question,
  onChange,
  onSubmit,
}: {
  idx: number;
  question: any;
  onChange: any;
  onSubmit: any;
}) {
  return (
    <div className="border">
      <div className="p-2">
        <EditorHeader idx={idx} question={question} onChange={onChange} />
      </div>
      <hr />
      <div className="p-3">
        <EditorQuestion idx={idx} question={question} onChange={onChange} />
      </div>
      <div className="p-3">
        <FillBlankAnswer idx={idx} question={question} onChange={onChange} />
      </div>
      <div className="p-3">
        <QuestionControlBth idx={idx} onSubmit={onSubmit} />
      </div>
    </div>
  );
}
