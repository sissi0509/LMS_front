"use client"
import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap'
import * as client from "../../../client";
import Link from 'next/link';


export default function QuizDetail({courseId, quizId}: {courseId: string; quizId: string}) {

    const [quiz, setQuiz] = useState<any>({})

    const fetchQuiz = async () => {
        const specificQuiz = await client.getQuizById(quizId)
        const point = await client.findQuizPoints(quizId)
        setQuiz({...specificQuiz, points: point})
    }

    useEffect(() => {
        fetchQuiz()
    }, [])
    
  return (
    <div>
        <h2>{quiz.title}</h2>

        <Row>
            <Col xs="3" className="text-end">Quiz Type</Col>
            <Col>
                {quiz.type}
            </Col>
        </Row>
        <Row>
            <Col xs="3"  className="text-end">Points</Col>
            <Col>{quiz.points}</Col>
        </Row>
        <Row>
            <Col xs="3" className="text-end">Assignment Group</Col>
            <Col>{quiz.assignmentGroup}</Col>
        </Row>
        <Row>
            <Col xs="3"  className="text-end">Shuffle Answers</Col>
            <Col>{quiz.shuffleAnswers ? "Yes" : "No"}</Col>
        </Row>
        <Row>
            <Col xs="3" className="text-end">Time Limit</Col>
            <Col>{quiz.timeLimitMinutes}</Col>
        </Row>
        <Row>
            <Col xs="3"  className="text-end">Multiple Attempts</Col>
            <Col>{quiz.multipleAttempts ? "Yes" : "No"}</Col>
        </Row>
        <Row>
            <Col xs="3"  className="text-end">View Responses</Col>
            <Col>Always</Col>
        </Row>
        <Row>
            <Col xs="3"  className="text-end">Show Correct Answers</Col>
            <Col>
                {quiz.showCorrectAnswers && quiz.showCorrectAnswersAt && <span>{quiz.showCorrectAnswersAt.slice(0, 19)}</span>}
                {quiz.showCorrectAnswers && quiz.showCorrectAnswersAt === null && <span>Immediately</span>}
                {quiz.showCorrectAnswers === false && <span>No</span>}
            </Col>
        </Row>
                        <Row>
            <Col xs="3" className="text-end">One Question at a Time</Col>
            <Col>{quiz.oneQuestionPerTime ? "Yes" : "No"}</Col>
        </Row>
        <Row>
            <Col xs="3" className="text-end">Webcam Required</Col>
            <Col>{quiz.webcamRequired ? "Yes" : "No"}</Col>
        </Row>
        <Row>
            <Col xs="3" className="text-end">Lock Questions After Answering</Col>
            <Col>{quiz.lockQuestionAfterAnswer ? "Yes" : "No"}</Col>
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

        <hr />

        <Link href={`/Courses/${courseId}/Quizzes/`} className="btn btn-secondary btn-lg">Previous</Link>
        </div>
  )
}
