"use client";
import React, { useEffect, useState } from "react";
import EditorHeader from "./EditorHeader";
import EditorQuestion from "./EditorQuestion";
import MCQanswers from "./MCQanswers";
import FillBlankAnswer from "./FillBlankAnswer";
import TrueFalseAnswers from "./TrueFalseAnswers";
import QuestionControlBth from "./QuestionControlBth";
import { BsGripVertical } from "react-icons/bs";
import { GiPencil } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import DetailAnswers from "./DetailAnswers";

export default function GeneralQuestion({
  idx,
  question,
  onChange,
  onDelete,
  showAnser,
}: {
  idx: number;
  question: any;
  onChange: any;
  onDelete: any;
  showAnser: boolean;
}) {
  const [isEditing, setIsEditing] = useState(false);

  const [currentQuestion, setCurrentQuestion] = useState(question);

  const submitQuestion = () => {
    onChange(idx, { ...currentQuestion });
    setIsEditing(false);
  };

  const handleCancel = async () => {
    setCurrentQuestion(question);
    setIsEditing(false);
  };

  useEffect(() => {
    setCurrentQuestion(question);
  }, [question]);

  return (
    <div>
      {!isEditing && (
        <div className="border rounded me-2 mb-2 mt-2">
          <div className="p-3 ps-2 bg-secondary d-flex justify-content-between">
            <div>
              <BsGripVertical className="me-2" />
              <span>{currentQuestion.title}</span>
            </div>

            <div>{currentQuestion.points} pts</div>
          </div>

          <div className="p-3 d-flex justify-content-between">
            <div>{currentQuestion.question}</div>
            <div>
              <GiPencil onClick={() => setIsEditing(true)} />
              <RxCross2 onClick={() => onDelete(currentQuestion._id)} />
            </div>
          </div>
          {showAnser && (
            <div className="p-3">
              <DetailAnswers question={currentQuestion} />
            </div>
          )}
        </div>
      )}

      {isEditing && (
        <div className="border me-2 mb-2">
          <div className="p-2">
            <EditorHeader
              question={currentQuestion}
              onChange={setCurrentQuestion}
            />
          </div>
          <hr />
          <div className="p-3">
            <EditorQuestion
              question={currentQuestion}
              onChange={setCurrentQuestion}
            />
          </div>
          {currentQuestion.type === "MCQ" && (
            <div className="p-3">
              <MCQanswers
                question={currentQuestion}
                onChange={setCurrentQuestion}
              />
            </div>
          )}
          {currentQuestion.type === "TRUE_FALSE" && (
            <div className="p-3">
              <TrueFalseAnswers
                question={currentQuestion}
                onChange={setCurrentQuestion}
              />
            </div>
          )}
          {currentQuestion.type === "FILL_BLANK" && (
            <div className="p-3">
              <FillBlankAnswer
                idx={idx}
                question={currentQuestion}
                onChange={setCurrentQuestion}
              />
            </div>
          )}

          <div className="p-3">
            <QuestionControlBth
              onSubmit={submitQuestion}
              onCancel={handleCancel}
            />
          </div>
        </div>
      )}
    </div>
  );
}
