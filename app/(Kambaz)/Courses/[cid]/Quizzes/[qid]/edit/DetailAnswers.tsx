import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import { FcCheckmark } from "react-icons/fc";
import { ImArrowRight } from "react-icons/im";

export default function DetailAnswers({ question }: { question: any }) {
  const choices = question.choices || [];
  const trueFalseAnswers = [true, false];
  const answers = question.acceptableAnswers || [];

  return (
    <div className="mt-3">
      {question.type === "MCQ" &&
        choices.map((choice: string, index: number) => (
          <Row key={index} className="align-items-center">
            <hr />
            <Col xs={1}>
              {choice.toLowerCase() === question.correctChoiceText && (
                <FcCheckmark />
              )}
            </Col>
            <Col xs={11}>
              <Form.Check
                type="radio"
                name={`${question.title}-${question.type}`}
                label={choice}
                className="mb-2"
                // checked={choice.toLowerCase() === question.correctChoiceText}
                disabled
              />
            </Col>
          </Row>
        ))}

      {question.type === "TRUE_FALSE" &&
        trueFalseAnswers.map((choice: boolean, index: number) => (
          <Row key={index} className="d-flex align-items-center">
            <hr />
            <Col xs={1}>
              {choice === question.correctBoolean && (
                <FcCheckmark className="me-2" />
              )}
            </Col>
            <Col xs={11}>
              <Form.Check
                key={index}
                type="radio"
                name={`${question.title}-${question.type}`}
                label={choice ? "True" : "False"}
                className="mb-2"
                // checked={choice === question.correctBoolean}
                disabled
              />
            </Col>
          </Row>
        ))}
      {question.type === "FILL_BLANK" && (
        <div>
          <hr />
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
