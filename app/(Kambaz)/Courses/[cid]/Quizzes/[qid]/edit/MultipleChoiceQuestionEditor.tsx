"use client";
import React from "react";
import EditorHeader from "./EditorHeader";
import EditorQuestion from "./EditorQuestion";
import MCQanswers from "./MCQanswers";
import QuestionControlBth from "./QuestionControlBth";
export default function MultipleChoiceQuestionEditor({
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
        <MCQanswers idx={idx} question={question} onChange={onChange} />
      </div>
      <div className="p-3">
        <QuestionControlBth idx={idx} onSubmit={onSubmit} />
      </div>
    </div>
  );
}
