"use client";
import React, { useEffect, useState } from "react";
import AddNewQuestionBtn from "./AddNewQuestionBtn";
import GeneralQuestion from "./GeneralQuestion";
import { Col, Dropdown, Form, InputGroup, Row } from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { RxCross2 } from "react-icons/rx";
import QuizDetailEditorControl from "./QuizDetailEditorControl";
import QuizQuestionsEditor from "./QuizQuestionsEditor";
import CancelSaveButton from "../../CancelSaveButton";
import * as client from "../../../../client";

export default function DetailEditor({quizId}: {quizId: string}) {

  const [q, setQuiz] = useState<any>({})
  const [multipleAttempt, setMultipleAttempt] = useState(false)
  const [timeLimitBool, setTimeLimitBool] = useState(false)
  const [shuffle, setShuffle] = useState(false)
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false)
 
  const fetchQuiz = async () => {
    const quiz = await client.getQuizById(quizId)
    setQuiz(quiz)
    setMultipleAttempt(quiz.multipleAttempts)
    setTimeLimitBool(quiz.timeLimitMinutes > 0 ? true : false)
    setShuffle(quiz.shuffleAnswers)
    setShowCorrectAnswer(quiz.showCorrectAnswers)
  }

  const dateToString = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1;
    const strMonth = "0" + month
    const specificDate = date.getDate()
    const strDate = "0" + specificDate;

    return year + "-" + strMonth + strDate;

  }

  const updateQuiz = async () => {
    
  }

  useEffect(() => {
      fetchQuiz();
  }, [])

  console.log(q.availableFrom?.slice(0, 19))

  return (
    <div>
      <Form>
        <Form.Control defaultValue={q.title} className="mb-3 w-75" />

        <div>Quiz Instructions: </div>
        <Form.Control as="textarea" rows={8} defaultValue={q.description}  className="mb-3 w-75" />

        <div className="me-4 ">
          <Row className="mb-3">
            <Form.Label sm="4" column className="text-end">
              Quiz type
            </Form.Label>
            <Col sm="4">
              <Form.Select value={q.type}>
                <option value="GRADED_QUIZ">Graded Quiz</option>
                <option value="PRACTICE_QUIZ">Practice Quiz</option>
                <option value="GRADED_SURVEY">Graded Survey</option>
                <option value="UNGRADED_SURVEY">Ungraded Survey</option>
              </Form.Select>
            </Col>
          </Row>

          <Row>
            <Form.Label sm="4" column className="text-end">
              Assignment Group
            </Form.Label>
            <Col sm="4">
              <Form.Select value={q.assignmentGroup}>
                <option value="QUIZZES">QUIZZES</option>
                <option value="EXAMS">EXAMS</option>
                <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                <option value="PROJECT">PROJECT</option>
              </Form.Select>

              <fieldset className="mt-3">
                <Form.Label>Options</Form.Label>
                <Form.Check name="quizdetailoption" label="Shuffle Answers" 
                    checked={shuffle}
                    onChange={(e) => setShuffle(e.target.checked)}/>

                <Form.Group className="d-flex align-items-center">
                  <Form.Check
                    name="quizdetailoption"
                    label="Time Limit"
                    className="text-nowrap me-5"
                    checked={timeLimitBool}
                    onChange={(e) => setTimeLimitBool(e.target.checked)}
                  />
                  <Form.Control
                    type="number me-5"
                    value={timeLimitBool ? q.timeLimitMinutes : 0}
                    className="me-2"
                  />
                  <span>Minutes</span>
                </Form.Group>
              </fieldset>
            </Col>
          </Row>

          <Row>
            <Form.Label sm="4" column className="text-end"></Form.Label>
            <Col>
              <Form.Group className="border mt-2">
                  <Form.Check
                    className="ms-2 mt-2 mb-2 text-nowrap"
                    name="quizdetailoption"
                    label="Allow Multiple Attempts"
                    checked={multipleAttempt}
                    onChange={(e) => setMultipleAttempt(e.target.checked)}
                  />
                  {multipleAttempt ? 
                  
                    <Row className="me-3 d-flex pb-2 align-items-center">
                      <Col className="ms-4"><span className="text-nowrap">How Many Attemps</span></Col>
                      <Col>
                      <Form.Control type="number" defaultValue={q.maxAttempts}/>
                      </Col>
                    </Row>
                    :
                    ""
                  }
                </Form.Group>
            
            </Col>
          </Row>

          <Row>
            <Form.Label sm="4" column className="text-end"></Form.Label>
            <Col>
              <Form.Group className="border mt-2">
                  <Form.Check className="ms-2 mt-2 mb-2 text-nowrap"
                              name="showcorrectanswer"
                              label="Let students see the correct answer"
                              checked={showCorrectAnswer}
                              onChange={(e) => setShowCorrectAnswer(e.target.checked)}/>

                  {showCorrectAnswer ? 
                    <Row className="me-3 d-flex pb-2 align-items-center">
                      <Col className="ms-4">Show Correct Answers at</Col>
                      <Col>
                        <Form.Control type="date" value={q.showCorrectAnswersAt !== null ? q.showCorrectAnswersAt?.slice(0, 10) : ""}/>
                      </Col>
                    </Row>
                    :
                    ""
                  }
                    
                </Form.Group>
            </Col>
          </Row>
          


          <Row className="mt-2">
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
                  <Form.Control type="date" value={q.dueDate?.slice(0, 10)} />
                </Form.Group>

                <Row>
                  <Col className="pe-1" id="wd-available-from">
                    <Form.Label>
                      <b>Available from</b>
                    </Form.Label>
                    <Form.Control type="date" defaultValue={q.availableFrom?.slice(0, 10)} />
                  </Col>
                  <Col className="ps-1" id="wd-available-until">
                    <Form.Label>
                      <b>Until</b>
                    </Form.Label>
                    <Form.Control type="date" value={q.availableUntil?.slice(0, 10)} />
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
      r
    </div>
  );
}
