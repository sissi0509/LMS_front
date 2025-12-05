"use client";
import React from "react";
import EditorHeader from "./EditorHeader";
import EditorQuestion from "./EditorQuestion";
import MCQanswers from "./MCQanswers";
import FillBlankAnswer from "./FillBlankAnswer";
import TrueFalseAnswers from "./TrueFalseAnswers";
import QuestionControlBth from "./QuestionControlBth";
export default function GeneralQuestion({
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
  {
     const handleChangeQuestion = (newQuestion: string) => {
    onChange(idx, { ...question, question: newQuestion });
  };
    return (
       <div className="border">
            <div className="p-2">
              <EditorHeader idx={idx} question={question} onChange={onChange} />
            </div>
            <hr />
            <div className="p-3">
              <EditorQuestion idx={idx} question={question} onChange={onChange} />
            </div>
            {question.type === "MCQ" &&
            <div className="p-3">
              <MCQanswers idx={idx} question={question} onChange={onChange} />
            </div>}
            {question.type === "TRUE_FALSE" &&
            <div className="p-3">
              <TrueFalseAnswers idx={idx} question={question} onChange={onChange} />
            </div>}
            {question.type === "FILL_BLANK" &&
            <div className="p-3">
              <FillBlankAnswer  idx={idx} question={question} onChange={onChange} />
            </div>}

            <div className="p-3">
              <QuestionControlBth idx={idx} onSubmit={onSubmit} />
            </div>
          </div>)
  }

  //     <MultipleChoiceQuestionEditor
  //       idx={idx}
  //       question={question}
  //       onChange={onChange}
  //       onSubmit={onSubmit}
  //     />
  //   );
  // } else if (question.type === "TRUE_FALSE") {
  //   return (
  //     <TrueFalseQuestionEditor
  //       idx={idx}
  //       question={question}
  //       onChange={onChange}
  //       onSubmit={onSubmit}
  //     />
  //   );
  // } else if (question.type === "FILL_BLANK") {
  //   return (
  //     <FillBlankEditor
  //       idx={idx}
  //       question={question}
  //       onChange={onChange}
  //       onSubmit={onSubmit}
  //     />
  //   );
  // }

