import React from "react";
import EditorHeader from "./EditorHeader";
import EditorQuestion from "./EditorQuestion";
import MCQanswers from "./MCQanswers";

export default function MultipleChoiceQuestionEditor({
  idx,
  question,
  onChange,
}: {
  idx: number;
  question: any;
  onChange: any;
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
    </div>
  );
}
