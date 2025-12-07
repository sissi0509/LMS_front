import React from "react";
import { Form } from "react-bootstrap";
import { DiVim } from "react-icons/di";

export default function DetailAnswers({ question }: { question: any }) {
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
            name={`${question.title}-${question.type}`}
            label={choice}
            className="mb-2"
            checked={choice.toLowerCase() === question.correctChoiceText}
            disabled
          />
        ))}

      {question.type === "TRUE_FALSE" &&
        trueFalseAnswers.map((choice: boolean, index: number) => (
          <Form.Check
            key={index}
            type="radio"
            name={`${question.title}-${question.type}`}
            label={choice ? "True" : "False"}
            className="mb-2"
            checked={choice === question.correctBoolean}
            disabled
          />
        ))}
      {question.type === "FILL_BLANK" && (
        <div>
          <strong>Acceptable Answers:</strong>
          {answers.map((answerList: string[], blankIdx: number) => (
            <div key={blankIdx} className="mb-2">
              <div className="fw-semibold">{`Blank ${blankIdx + 1}:`}</div>

              {answerList.map((ans, ansIdx) => (
                <div key={ansIdx} className="ms-3">
                  - {ans}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
