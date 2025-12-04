import React from "react";
import MultipleChoiceQuestionEditor from "./MultipleChoiceQuestionEditor";
import TrueFalseQuestionEditor from "./TrueFalseQuestionEditor";
import FillBlank from "./FillBlank";

export default function GeneralQuestion({
  idx,
  question,
  onChange,
}: {
  idx: number;
  question: any;
  onChange: any;
}) {
  if (question.type === "MCQ") {
    return (
      <MultipleChoiceQuestionEditor
        idx={idx}
        question={question}
        onChange={onChange}
      />
    );
  } else if (question.type === "TRUE_FALSE") {
    return <TrueFalseQuestionEditor />;
  } else if (question.type === "FILL_BLANK") {
    return <FillBlank />;
  }
}
