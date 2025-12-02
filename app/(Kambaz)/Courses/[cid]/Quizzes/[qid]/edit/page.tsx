"use client";
import React from "react";
import AddNewQuestionBtn from "./AddNewQuestionBtn";
import MultipleChoiceQuestionEditor from "./MultipleChoiceQuestionEditor";
import { Col, Form, InputGroup, Row } from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { RxCross2 } from "react-icons/rx";
import QuizDetailEditorControl from "./QuizDetailEditorControl";
import QuizQuestionsEditor from "./QuizQuestionsEditor";
import CancelSaveButton from "../../CancelSaveButton";

export default function QuizDetailEditor() {
  return (
    <div>
      <QuizDetailEditorControl />
      <br />
      <Form>
        <Form.Control defaultValue="Unnamed Quiz" className="mb-3 w-75" />
        {/* <div>
          <AddNewQuestionBtn />
          <MultipleChoiceQuestionEditor />
        </div> */}

        <div className="me-4 ">
          <Row className="mb-3">
            <Form.Label sm="4" column className="text-end">
              Quiz type
            </Form.Label>
            <Col sm="4">
              <Form.Select>
                <option value="GRADED QUIZ">Graded Quiz</option>
                <option value="PRACTICE QUIZ">Practice Quiz</option>
                <option value="GRADED SURVEY">Graded Survey</option>
                <option value="UNGRADED SURVEY">Ungraded Survey</option>
              </Form.Select>
            </Col>
          </Row>

          <Row className="mb-4">
            <Form.Label sm="4" column className="text-end">
              Assignment Group
            </Form.Label>
            <Col sm="4">
              <Form.Select>
                <option value="QUIZZES">QUIZZES</option>
                <option value="EXAMS">EXAMS</option>
                <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                <option value="PROJECT">PROJECT</option>
              </Form.Select>

              <fieldset className="mt-3">
                <Form.Label>Options</Form.Label>
                <Form.Check name="quizdetailoption" label="Shuffle Answers" />
                <Form.Group className="d-flex align-items-center">
                  <Form.Check
                    name="quizdetailoption"
                    label="Time Limit"
                    className="text-nowrap me-5"
                  />
                  <Form.Control
                    type="number"
                    defaultValue={20}
                    className="me-2"
                  />
                  <span>Minutes</span>
                </Form.Group>

                <Form.Group className="border mt-2">
                  <Form.Check
                    className="ms-2 mt-2 mb-2"
                    name="quizdetailoption"
                    label="Allow Multiple Attempts"
                  />
                </Form.Group>
              </fieldset>
            </Col>
          </Row>

          <Row>
            <Form.Label sm="4" column className="text-end">
              Assign
            </Form.Label>
            <Col>
              <fieldset className="border pt-3 pb-3 ps-3 pe-3">
                <Form.Group className="mb-3">
                  <Form.Label>
                    <b>Assign to</b>
                  </Form.Label>
                  <Form.Group className="border pt-2 pb-2 ps-2 pe-2">
                    <InputGroup>
                      <InputGroupText>Everyone</InputGroupText>
                      <InputGroupText className="border-left-none">
                        <RxCross2 className="fs-6" />
                      </InputGroupText>
                    </InputGroup>
                  </Form.Group>
                </Form.Group>

                <Form.Group id="wd-due-date" className="mb-3">
                  <Form.Label>
                    <b>Due</b>
                  </Form.Label>
                  <Form.Control type="date" defaultValue="2024-05-13" />
                </Form.Group>

                <Row>
                  <Col className="pe-1" id="wd-available-from">
                    <Form.Label>
                      <b>Available from</b>
                    </Form.Label>
                    <Form.Control type="date" defaultValue="2024-05-13" />
                  </Col>
                  <Col className="ps-1" id="wd-available-until">
                    <Form.Label>
                      <b>Until</b>
                    </Form.Label>
                    <Form.Control type="date" defaultValue="2024-05-13" />
                  </Col>
                </Row>
              </fieldset>
            </Col>
          </Row>
        </div>
      </Form>
      <hr />
      <div className="float-end me-4">
        <CancelSaveButton />
      </div>
      <br /> <br /> <br /> <br />
      <div>
        <h1>question</h1>
        <div>
          <AddNewQuestionBtn />
          <MultipleChoiceQuestionEditor />
        </div>
      </div>
    </div>
  );
}
