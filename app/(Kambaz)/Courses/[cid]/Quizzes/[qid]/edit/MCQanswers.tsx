import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";

export default function MCQanswers() {
  return (
    <div>
      <h5>Answers:</h5>
      <Row>
        <Col sm={3} className="text-end">
          Possible Answer:
        </Col>
        <Col sm={4}>
          <input type="text" className="form-control" />
        </Col>
      </Row>
      <Row>
        <Col sm={3} className="text-end">
          Possible Answer:
        </Col>
        <Col sm={6}>
          <input type="text" className="form-control" />
        </Col>
      </Row>
      <Row>
        <Col sm={3} className="text-end">
          Possible Answer:
        </Col>
        <Col sm={6}>
          <input type="text" className="form-control" />
        </Col>
      </Row>
      <Row>
        <Col sm={3} className="text-end">
          Possible Answer:
        </Col>
        <Col sm={6}>
          <input type="text" className="form-control" />
        </Col>
      </Row>
      <div className="d-flex justify-content-end align-items-center mb-2">
        <FaPlus className="text-danger me-1" />

        <a
          href="#"
          className="link-danger link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
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
