import React, { useState } from "react";
import { ImArrowRight } from "react-icons/im";

export default function TrueFalseAnswers({
  idx,
  question,
  onChange,
}: {
  idx: number;
  question: any;
  onChange: any;
}) {
  const [correctAnswer, setCorrectAnswer] = useState(question.correctBoolean);

  const changeCorrectBoolean = (correctBloo: boolean) => {
    setCorrectAnswer(correctBloo);
    onChange({ ...question, correctBoolean: correctBloo });
  };

  const choices = [true, false];

  return (
    <div>
      <h5>Answers:</h5>
      {choices.map((c, i) => (
        <div key={i} className="d-flex align-items-center">
          <ImArrowRight
            className="me-2"
            style={{
              visibility: c === correctAnswer ? "visible" : "hidden",
            }}
          />

          <span onClick={() => changeCorrectBoolean(c)}>
            {c ? "True" : "False"}
          </span>
        </div>
      ))}
    </div>
  );
}
