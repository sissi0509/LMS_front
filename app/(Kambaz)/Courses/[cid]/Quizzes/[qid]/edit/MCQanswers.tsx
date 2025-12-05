import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { ImArrowRight } from "react-icons/im";

export default function MCQanswers({
  idx,
  question,
  onChange,
}: {
  idx: number;
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
    onChange(idx, { ...question, Choices: updatedChoices });
  };

  const changeCorrectChoiceIndex = (correctIdx: number) => {
    setCorrectChoiceIndex(correctIdx);
    onChange(idx, { ...question, correctChoiceIndex: correctIdx });
  };

  return (
    <div>
      <h5>Answers:</h5>
      {possibleChoices.map((a: any, i: number) => (
        <Row key={i} className="align-items-center mb-2">
          <Col xs={1}>
            <ImArrowRight
              className="me-2"
              onClick={() => changeCorrectChoiceIndex(i)}
              style={{ cursor: "pointer" }}
            />
          </Col>

          <Col sm={3} className="text-end">
            {i === correctChoiceIndex ? "Correct Answer:" : "Possible Answer:"}
          </Col>

          <Col sm={4}>
            <input
              type="text"
              className="form-control"
              value={a}
              onChange={(e) => handleChoiceChange(i, e.target.value)}
            />
          </Col>
        </Row>
      ))}

      <div className="d-flex justify-content-end align-items-center mb-2">
        <FaPlus className="text-danger me-1" />

        <a
          href="#"
          className="link-danger link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
          onClick={() => setPossibleChoices([...possibleChoices, ""])}
        >
          Add Another Answer
        </a>
      </div>
      <div>
        <Button className="btn-secondary me-2">Cancel</Button>
        <Button className="btn-danger">Update Questions</Button>
      </div>
    </div>
  );
}
