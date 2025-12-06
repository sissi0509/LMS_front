import React from "react";
import { Form } from "react-bootstrap";

export default function Answers({ question }: { question: any }) {
  const choices = question.choices || [];
  const trueFalseAnswers = [true, false];
  const answers = question.acceptableAnswers || [];

  return (
    <div className="mt-3">
      {question.type === "MCQ" &&
        choices.map((choice: string, index: number) => (
          <Form.Check
            key={index}
            type="radio"
            name={`${question._id}-${question.question}`}
            label={choice}
            className="mb-2"
            checked={index === question.correctChoiceIndex}
          />
        ))}

      {question.type === "TRUE_FALSE" &&
        trueFalseAnswers.map((choice: boolean, index: number) => (
          <Form.Check
            key={index}
            type="checkbox"
            name={`${question._id}-${question.question}`}
            label={choice ? "True" : "False"}
            className="mb-2"
            checked={choice === question.correctBoolean}
          />
        ))}
      {question.type === "FILL_BLANK" && (
        <div>
          <strong>Acceptable Answers:</strong>
          {answers.map((choice: string, index: number) => (
            <div key={index}>{choice}</div>
          ))}
        </div>
      )}
    </div>
  );
}
