"use client";
import React, { useEffect, useState } from "react";
import AddNewQuestionBtn from "./AddNewQuestionBtn";
import GeneralQuestion from "./GeneralQuestion";
import { Button, Col, Dropdown, Form, InputGroup, Row } from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { RxCross2 } from "react-icons/rx";
// import QuizDetailEditorControl from "./QuizDetailEditorControl";
import QuizQuestionsEditor from "./QuizQuestionsEditor";
// import CancelSaveButton from "../../CancelSaveButton";
import * as client from "../../../../client";
import Link from "next/link";

export default function DetailEditor({courseId, quizId}: {courseId: string; quizId: string}) {

  const [q, setQuiz] = useState<any>({})
  const [multipleAttempt, setMultipleAttempt] = useState(false)
  const [maxAtt, setMaxAtt] = useState(1);
  const [timeLimitBool, setTimeLimitBool] = useState(false)
  const [shuffle, setShuffle] = useState(false)
  const [showCorrAnswer, setShowCorrectAnswer] = useState(false)
  const [accessCodeRequirement, setAccessCodeRequirement] = useState(false)
  const [oneQuestion, setOneQuestion] = useState(false)
  const [webcam, setWbecam] = useState(false)
  const [due, setDue] = useState("")
  const [available, setAvailable] = useState("")
  const [until, setUntil] = useState("")
  const [correctAnswerAt, setCorrectAnswerAt] = useState("")
  const [lockQuestion, setLockQuestion] = useState(false)
 
  const fetchQuiz = async () => {
    const quiz = await client.getQuizById(quizId)
    setQuiz(quiz)
    setMultipleAttempt(quiz.multipleAttempts)
    setMaxAtt(quiz.maxAttempts)
    setTimeLimitBool(quiz.timeLimitMinutes > 0 ? true : false)
    setShuffle(quiz.shuffleAnswers)
    setShowCorrectAnswer(quiz.showCorrectAnswers)
    setAccessCodeRequirement(quiz.accessCode !== null ? true : false)
    setOneQuestion(quiz.oneQuestionPerTime)
    setWbecam(quiz.webcamRequired)
    setDue(quiz.dueDate ? quiz.dueDate.slice(0, 10) : "")
    setAvailable(quiz.availableFrom ? quiz.availableFrom.slice(0, 10) : "")
    setUntil(quiz.availableUntil ? quiz.availableUntil.slice(0, 10) : "")
    setCorrectAnswerAt(quiz.showCorrectAnswersAt ? quiz.showCorrectAnswersAt.slice(0,10) : "")
    setLockQuestion(quiz.lockQuestionAfterAnswer)
  }

  const updateQuizWithoutPublish = async () => {
    const updatedQuiz = await client.updateQuiz(quizId, q)
    setQuiz(updatedQuiz)
  }

  const updateQuizWithPublish = async () => {
    const publishedQuiz = {...q, published: true}
    const updatedQuiz = await client.updateQuiz(quizId, publishedQuiz)
    setQuiz(updatedQuiz)
  }

  useEffect(() => {
      fetchQuiz();
  }, [])

  console.log(typeof q.dueDate)

  return (
    <div>
      <Form>
        <Form.Control defaultValue={q.title} className="mb-3" onChange={(e) => setQuiz({...q, title: e.target.value})}/>

        <div>Quiz Instructions: </div>
        <Form.Control as="textarea" rows={8} defaultValue={q.description} className="mb-3" onChange={(e) => setQuiz({...q, description: e.target.value})} />

        <div className="me-4 ">
          <Row className="mb-3">
            <Form.Label sm="4" column className="text-end">
              Quiz type
            </Form.Label>
            <Col sm="4">
              <Form.Select value={q.type} onChange={(e) => setQuiz({...q, type: e.target.value})}>
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
              <Form.Select value={q.assignmentGroup} onChange={(e) => setQuiz({...q, assignmentGroup: e.target.value})}>
                <option value="QUIZZES">QUIZZES</option>
                <option value="EXAMS">EXAMS</option>
                <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                <option value="PROJECT">PROJECT</option>
              </Form.Select>

              <fieldset className="mt-3">
                <Form.Label>Options</Form.Label>
                <Form.Check name="quizdetailoption" label="Shuffle Answers" 
                    checked={shuffle}
                    onChange={(e) => {
                      setShuffle(e.target.checked)
                      setQuiz({...q, shuffleAnswers: e.target.checked})}}/>

                <Form.Group className="d-flex align-items-center">
                  <Form.Check
                    name="quizdetailoption"
                    label="Time Limit"
                    className="text-nowrap me-5"
                    checked={timeLimitBool}
                    onChange={(e) => {
                      const tl = e.target.checked
                      setTimeLimitBool(tl)
                      setQuiz({...q, 
                        timeLimitMinutes: tl ? q.timeLimitMinutes : 0})
                    }}
                  />
                  <Form.Control
                    type="number me-5"
                    value={timeLimitBool ? q.timeLimitMinutes : 0}
                    className="me-2"
                    onChange={(e) => {
                      setQuiz({...q, timeLimitMinutes: e.target.value})
                      
                    }}
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
                    onChange={(e) => {
                      const multipleA = e.target.checked
                      setMultipleAttempt(multipleA)
                      setQuiz({...q, 
                        multipleAttempts: multipleA,
                        maxAttempts: multipleA ? q.maxAttempts || 1 : 1})
                    }}
                  />
                  {multipleAttempt ? 
                  
                    <Row className="me-3 d-flex pb-2 align-items-center">
                      <Col className="ms-4"><span className="text-nowrap">How Many Attemps</span></Col>
                      <Col>
                      <Form.Control type="number" defaultValue={q.maxAttempts} 
                        onChange={(e) =>
                            setQuiz({...q, maxAttempts: e.target.value})
                           }
                           />
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
                              checked={showCorrAnswer}
                              onChange={(e) => {
                                const ca = e.target.checked
                                setShowCorrectAnswer(ca)
                                setQuiz({...q, 
                                  showCorrectAnswers: ca,
                                  showCorrectAnswersAt: ca ? q.showCorrectAnswersAt : null
                                })
                                
                              }}/>

                  {showCorrAnswer ? 
                    <Row className="me-3 d-flex pb-2 align-items-center">
                      <Col className="ms-4">Show Correct Answers at</Col>
                      <Col>
                        <Form.Control type="date" defaultValue={correctAnswerAt}
                          onChange={(e) => setQuiz({...q, showCorrectAnswersAt: new Date(e.target.value)})}/>
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
                              name="showonequestion"
                              label="Show one question at a time"
                              checked={oneQuestion}
                              onChange={(e) => {
                                setOneQuestion(e.target.checked)
                                setQuiz({...q, oneQuestionPerTime: e.target.checked})
                                }}/>
                    
                </Form.Group>
            </Col>
          </Row>

          <Row> 
            <Form.Label sm="4" column className="text-end">Quiz Restrictions</Form.Label>
            <Col>
              <Form.Group className="border mt-2">
                  <Form.Check className="ms-2 mt-2 mb-2 text-nowrap"
                              name="accesscode"
                              label="Require an access code"
                              checked={accessCodeRequirement}
                              onChange={(e) => 
                                {
                                  const ac = e.target.checked;
                                  setAccessCodeRequirement(ac);
                                  setQuiz({...q, accessCode: ac ? q.accessCode || "123" : null})
                                  }}/>

                  {accessCodeRequirement ? 
                    <Row className="me-3 d-flex pb-2 align-items-center">
                      <Col className="ms-4">
                        Access Code
                      </Col>
                      <Col>
                        <Form.Control defaultValue={q.accessCode ? q.accessCode : ""} onChange={(e) => setQuiz({...q, accessCode: e.target.value})}/>
                      </Col>
                    </Row>  

                    : ""
                  }

                  <Form.Check className="ms-2 mt-2 mb-2 text-nowrap"
                              name="webcam"
                              label="Require a webcam"
                              checked={webcam}
                              onChange={(e) => {
                                setWbecam(e.target.checked)
                                setQuiz({...q, webcamRequired: e.target.checked})}} />

                  <Form.Check className="ms-2 mt-2 mb-2 text-nowrap"
                              name="webcam"
                              label="Lock Question After Answering"
                              checked={lockQuestion}
                              onChange={(e) => {
                                const lq = e.target.checked
                                setLockQuestion(lq)
                                setQuiz({...q, lockQuestionAfterAnswer: lq})}} />
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
                  <Form.Control type="date" defaultValue={due} onChange={(e) => setQuiz({...q, dueDate: new Date(e.target.value)})}/>
                </Form.Group>

                <Row>
                  <Col className="pe-1" id="wd-available-from">
                    <Form.Label>
                      <b>Available from</b>
                    </Form.Label>
                    <Form.Control type="date" defaultValue={available} onChange={(e) => setQuiz({...q, availableFrom: new Date(e.target.value)})}/>
                  </Col>
                  <Col className="ps-1" id="wd-available-until">
                    <Form.Label>
                      <b>Until</b>
                    </Form.Label>
                    <Form.Control type="date" defaultValue={until} onChange={(e) => setQuiz({...q, availableUntil: new Date(e.target.value)})}/>
                  </Col>
                </Row>
              </fieldset>
            </Col>
          </Row>
        </div>
      </Form>
      <hr />
      <div className="float-end me-4">
        <div className="mt-2 mb-3">
            <Link href={`/Courses/${courseId}/Quizzes/${quizId}`} onClick={() => updateQuizWithoutPublish()} className="btn btn-danger btn-lg me-1 text-nowrap float-end">
                Save
            </Link>
            <Link href={`/Courses/${courseId}/Quizzes`} onClick={() => updateQuizWithPublish()} className="btn btn-secondary btn-lg me-1 text-nowrap float-end">
                Save and Publish
            </Link>
            <Link href={`/Courses/${courseId}/Quizzes`} className="btn btn-secondary btn-lg me-1 text-nowrap float-end">
                Cancel
            </Link>
        </div>
      </div>
      
    </div>
  );
}
