import React from "react";
import { Form } from "react-bootstrap";

export default function Answers({
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
  const choices = question.choices || [];
  const trueFalseAnswers = [true, false];

  return (
    <div className="mt-3">
      {question.type === "MCQ" &&
        choices.map((choice: string, index: number) => (
          <Form.Check
            key={index}
            id={`q${qIdx}-choice${index}`}
            type="radio"
            name={String(qIdx)}
            label={choice}
            className="mb-2"
            checked={choice === studentAnswer?.selectedChoiceText}
            onChange={() =>
              onChange(qIdx, {
                ...studentAnswer,
                selectedChoiceText: choice,
              })
            }
          />
        ))}

      {question.type === "TRUE_FALSE" &&
        trueFalseAnswers.map((choice: boolean, index: number) => (
          <Form.Check
            key={index}
            id={`q${qIdx}-choice${index}`}
            type="radio"
            name={String(qIdx)}
            label={choice ? "True" : "False"}
            className="mb-2"
            checked={choice === studentAnswer?.selectedBoolean}
            onChange={() =>
              onChange(qIdx, {
                ...studentAnswer,
                selectedBoolean: choice,
              })
            }
          />
        ))}
    </div>
  );
}
