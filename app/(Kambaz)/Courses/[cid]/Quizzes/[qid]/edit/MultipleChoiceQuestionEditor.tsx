import React from "react";
import EditorHeader from "./EditorHeader";
import EditorQuestion from "./EditorQuestion";
import MCQanswers from "./MCQanswers";

export default function MultipleChoiceQuestionEditor() {
  return (
    <div className="border">
      <div className="p-2">
        <EditorHeader />
      </div>
      <hr />
      <div className="p-3">
        <EditorQuestion />
      </div>
      <div className="p-3">
        <MCQanswers />
      </div>
    </div>
  );
}
