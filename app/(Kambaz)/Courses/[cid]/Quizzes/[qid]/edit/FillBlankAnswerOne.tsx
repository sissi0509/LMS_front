import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { ImArrowRight } from "react-icons/im";
import { IoTrashBinOutline } from "react-icons/io5";

export default function FillBlankAnswerOne({
  question,
  onChange,
}: {
  question: any;
  onChange: any;
}) {
  const [allowedAnswers, setAllowedAnswers] = useState(
    question.acceptableAnswers
  );

  const handleChoiceChange = (answerIndex: number, text: string) => {
    const updatedAnswers = allowedAnswers.map((a: any, i: number) =>
      i === answerIndex ? text : a
    );
    setAllowedAnswers(updatedAnswers);
    onChange({ ...question, acceptableAnswers: updatedAnswers });
  };

  // const addChoice = () => {

  //   setAllowedAnswers([...allowedAnswers, ""]);
  //   onChange({ ...question, acceptableAnswers: allowedAnswers });
  // };

  const addChoice = () => {
    setAllowedAnswers((prev: any) => {
      const updated = [...prev, ""];
      onChange({ ...question, acceptableAnswers: allowedAnswers });
      return updated;
    });
  };

  const deleteChoice = (answerIndex: any) => {
    allowedAnswers.splice(answerIndex, 1);
    setAllowedAnswers(allowedAnswers);
    onChange({ ...question, acceptableAnswers: allowedAnswers });
  };

  return (
    <div>
      <h5>Answers:</h5>
      {allowedAnswers?.map((a: any, i: number) => (
        <Row key={i} className="align-items-center mb-2">
          <Col xs={12} sm={3}>
            Possible Answer
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
