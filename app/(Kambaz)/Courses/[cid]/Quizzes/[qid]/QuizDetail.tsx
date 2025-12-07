"use client";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import * as client from "../../../client";
import Link from "next/link";

export default function QuizDetail({
  courseId,
  quizId,
}: {
  courseId: string;
  quizId: string;
}) {
  const [quiz, setQuiz] = useState<any>({});

  const fetchQuiz = async () => {
    const specificQuiz = await client.getQuizById(quizId);
    const point = await client.findQuizPoints(quizId);
    setQuiz({ ...specificQuiz, points: point });
  };

  const getTime = (date: string) => {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const dateS = dateObj.toLocaleDateString("en-US", {
      timeZone: "UTC",
      month: "short",
      day: "2-digit",
    });
    const t = dateObj
      .toLocaleTimeString("en-US", {
        timeZone: "UTC",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .substring(0, 5);
    const z = dateObj
      .toLocaleTimeString("en-US", {
        timeZone: "UTC",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .substring(6, 8)
      .toLowerCase();

    return `${dateS} at ${t}${z}`;
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  console.log(quiz.accessCode);

  return (
    <div>
      <h2>{quiz.title}</h2>

      <Form.Control
        as="textarea"
        rows={3}
        plaintext
        className="border rounded no-click p-3 mb-3"
        defaultValue={quiz.description}
        readOnly
      />
        <Row>
            <Col xs="3" className="text-end"><b>Quiz Type</b></Col>
            <Col>
                {quiz.type}
            </Col>
        </Row>
        <Row>
            <Col xs="3"  className="text-end"><b>Points</b></Col>
            <Col>{quiz.points}</Col>
        </Row>
        <Row>
            <Col xs="3" className="text-end"><b>Assignment Group</b></Col>
            <Col>{quiz.assignmentGroup}</Col>
        </Row>
        <Row>
            <Col xs="3"  className="text-end"><b>Shuffle Answers</b></Col>
            <Col>{quiz.shuffleAnswers ? "Yes" : "No"}</Col>
        </Row>
        <Row>
            <Col xs="3" className="text-end"><b>Time Limit</b></Col>
            <Col>{quiz.timeLimitMinutes === 0 ? "No Time Limit" : quiz.timeLimitMinutes}</Col>
        </Row>
        <Row>
            <Col xs="3"  className="text-end"><b>Multiple Attempts</b></Col>
            <Col>{quiz.multipleAttempts ? "Yes" : "No"}</Col>
        </Row>
        <Row>
            <Col xs="3"  className="text-end"><b>View Responses</b></Col>
            <Col>Always</Col>
        </Row>
        <Row>
            <Col xs="3"  className="text-end"><b>Show Correct Answers</b></Col>
            <Col>
                {quiz.showCorrectAnswers && quiz.showCorrectAnswersAt && <span>{quiz.showCorrectAnswersAt.slice(0, 19)}</span>}
                {quiz.showCorrectAnswers && quiz.showCorrectAnswersAt === null && <span>Immediately</span>}
                {quiz.showCorrectAnswers === false && <span>No</span>}
            </Col>
        </Row>
        <Row>
            <Col xs="3" className="text-end"><b>Access Code</b></Col>
            <Col>{quiz.accessCode !== null ? quiz.accessCode : "No"}</Col>
        </Row>
        <Row>
            <Col xs="3" className="text-end"><b>One Question at a Time</b></Col>
            <Col>{quiz.oneQuestionPerTime ? "Yes" : "No"}</Col>
        </Row>
        <Row>
            <Col xs="3" className="text-end"><b>Webcam Required</b></Col>
            <Col>{quiz.webcamRequired ? "Yes" : "No"}</Col>
        </Row>
        <Row>
            <Col xs="3" className="text-end"><b>Lock Questions After Answering</b></Col>
            <Col>{quiz.lockQuestionAfterAnswer ? "Yes" : "No"}</Col>
        </Row>
        <br />

      <Table className="border-secondary">
        <thead>
          <tr>
            <th>Due</th>
            <th>Available from</th>
            <th>Until</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{getTime(quiz.dueDate)}</td>
            <td>{getTime(quiz.availableFrom)}</td>
            <td>{getTime(quiz.availableUntil)}</td>
          </tr>
        </tbody>
      </Table>

      <hr />
    </div>
  );
}
