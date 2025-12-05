import React from 'react'
import { Col, Row, Table } from 'react-bootstrap'

export default function QuizDetail({quiz}: {quiz: any}) {
    
  return (
    <div>
        <h2>{quiz.title}</h2>

        <Row>
            <Col xs="2" className="text-end">Quiz Type</Col>
            <Col>
                {quiz.type}
            </Col>
        </Row>
        <Row>
            <Col xs="2"  className="text-end">Points</Col>
            <Col>{quiz.points}</Col>
        </Row>
        <Row>
            <Col xs="2" className="text-end">Assignment Group</Col>
            <Col>{quiz.assignmentGroup}</Col>
        </Row>
        <Row>
            <Col xs="2"  className="text-end">Shuffle Answers</Col>
            <Col>{quiz.shuffleAnswers}</Col>
        </Row>
        <Row>
            <Col xs="2" className="text-end">Time Limit</Col>
            <Col>{quiz.timeLimitMinutes}</Col>
        </Row>
        <Row>
            <Col xs="2"  className="text-end">Multiple Attempts</Col>
            <Col>{quiz.multipleAttempts}</Col>
        </Row>
        <Row>
            <Col xs="2"  className="text-end">View Responses</Col>
            <Col>Always</Col>
        </Row>
                        <Row>
            <Col xs="2"  className="text-end">Show Correct Answers</Col>
            <Col>{quiz.showCorrectAnswersAt}</Col>
        </Row>
                        <Row>
            <Col xs="2" className="text-end">One Question at a Time</Col>
            <Col>{quiz.oneQuestionPerTime}</Col>
        </Row>
        <Row>
            <Col xs="2" className="text-end">Webcam Required</Col>
            <Col>{quiz.webcamRequired}</Col>
        </Row>
        <Row>
            <Col xs="2" className="text-end">Lock Questions After Answering</Col>
            <Col>{quiz.lockQuestionAfterAnswer}</Col>
        </Row>
        <br />

        <Table className="border-secondary">
            <thead>
                <tr><th>Due</th><th>Available from</th><th>Until</th></tr>
            </thead>
            <tbody>
                <tr><td>{quiz.dueDate ? quiz.dueDate : "-"}</td><td>{quiz.availableFrom ? quiz.availableFrom : "-"}</td><td>{quiz.availableUntil ? quiz.availableUntil : "-"}</td></tr>
            </tbody>
        </Table>
        </div>
  )
}
