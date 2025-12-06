"use client";
import React, { useState } from "react";
import EditorHeader from "./EditorHeader";
import EditorQuestion from "./EditorQuestion";
import MCQanswers from "./MCQanswers";
import FillBlankAnswer from "./FillBlankAnswer";
import TrueFalseAnswers from "./TrueFalseAnswers";
import QuestionControlBth from "./QuestionControlBth";
import { BsGripVertical } from "react-icons/bs";
import { FormControl } from "react-bootstrap";
import { GiPencil } from "react-icons/gi";
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
  const [isEditing, setIsEditing] = useState(false);

  const submitQuestion = () => {
    onSubmit(idx);
    setIsEditing(false);
  };

  return (
    <div>
      {!isEditing && (
        <div className="border rounded me-2 mt-2">
          <div className="p-3 ps-2 bg-secondary d-flex justify-content-between">
            <div>
              <BsGripVertical className="me-2" />
              <span>{question.title}</span>
            </div>
            <div>{question.points} pts</div>
          </div>

          <div className="p-3 d-flex justify-content-between">
            <div>{question.question}</div>
            <GiPencil onClick={() => setIsEditing(true)} />
          </div>
        </div>
      )}

      {isEditing && (
        <div className="border">
          <div className="p-2">
            <EditorHeader idx={idx} question={question} onChange={onChange} />
          </div>
          <hr />
          <div className="p-3">
            <EditorQuestion idx={idx} question={question} onChange={onChange} />
          </div>
          {question.type === "MCQ" && (
            <div className="p-3">
              <MCQanswers idx={idx} question={question} onChange={onChange} />
            </div>
          )}
          {question.type === "TRUE_FALSE" && (
            <div className="p-3">
              <TrueFalseAnswers
                idx={idx}
                question={question}
                onChange={onChange}
              />
            </div>
          )}
          {question.type === "FILL_BLANK" && (
            <div className="p-3">
              <FillBlankAnswer
                idx={idx}
                question={question}
                onChange={onChange}
              />
            </div>
          )}

          <div className="p-3">
            <QuestionControlBth
              idx={idx}
              onSubmit={submitQuestion}
              onCancel={() => setIsEditing(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
