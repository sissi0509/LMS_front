import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { ImArrowRight } from "react-icons/im";
import { IoTrashBinOutline } from "react-icons/io5";

export default function MCQanswers({
  question,
  onChange,
}: {
  question: any;
  onChange: any;
}) {
  const [possibleChoices, setPossibleChoices] = useState(question.choices);
  const [correctChoiceIndex, setCorrectChoiceIndex] = useState(
    question.correctChoiceIndex
  );

  const handleChoiceChange = (answerIndex: number, text: string) => {
    const updatedChoices = possibleChoices.map((a: any, i: number) =>
      i === answerIndex ? text : a
    );
    setPossibleChoices(updatedChoices);
    onChange({ ...question, choices: updatedChoices });
  };

  const changeCorrectChoiceIndex = (correctIdx: number) => {
    setCorrectChoiceIndex(correctIdx);
    onChange({ ...question, correctChoiceIndex: correctIdx });
  };

  const addChoice = () => {
    setPossibleChoices([...possibleChoices, ""]);
    onChange({ ...question, choices: possibleChoices });
  };

  const deleteChoice = (answerIndex) => {
    possibleChoices.splice(answerIndex, 1);
    setPossibleChoices(possibleChoices);
    onChange({ ...question, choices: possibleChoices });
  };

  return (
    <div>
      <h5>Answers:</h5>
      {possibleChoices.map((a: any, i: number) => (
        <Row key={i} className="align-items-center mb-2">
          <Col xs={12} sm={3} className="d-flex align-items-center">
            <ImArrowRight
              className="me-2"
              onClick={() => changeCorrectChoiceIndex(i)}
              style={{ cursor: "pointer" }}
            />

            <span className="text-end">
              {i === correctChoiceIndex ? "Correct Answer" : "Possible Answer"}
            </span>
          </Col>

          <Col xs={12} sm={8}>
            <input
              type="text"
              className="form-control"
              value={a}
              onChange={(e) => handleChoiceChange(i, e.target.value)}
            />
          </Col>

          <Col xs={1} sm="auto" className="text-end">
            <IoTrashBinOutline onClick={() => deleteChoice(i)} />
          </Col>
        </Row>
      ))}

      <div className="d-flex justify-content-end align-items-center mb-2">
        <FaPlus className="text-danger me-1" />

        <a
          href="#"
          className="link-danger link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
          onClick={() => {
            addChoice();
          }}
        >
          Add Another Answer
        </a>
      </div>
    </div>
  );
}
