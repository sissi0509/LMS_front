"use client"
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import * as client from "../../../client";

export default function StudentQuizTake({cid, qid, userId}: {cid: string, qid: string, userId: string}) {

  const [quizAttempt, setAttempt] = useState<any>({})  
  const [quiz, setQuiz] = useState<any>({})
  const [quizPoint, setQuizPoint] = useState<any>(0)

  const createUpdateAttempt = async () => {
    const today = new Date().toISOString()
    if (quizAttempt.attemptsUsed > 0) {
      const att = quizAttempt.attempt;
      const updated = {...att, startAt: [...att.startAt, today]}
      const attempt = await client.createOrUpdateAttempt(userId, qid, updated)
      setAttempt(attempt);
    } else {
      const attempt = await client.createOrUpdateAttempt(userId, qid, {startAt: [today], submittedAt: [], score: [], answers: []})
      setAttempt(attempt);
    }
  }

  const getQuizPoint = async () => {
    const p = await client.findQuizPoints(qid)
    setQuizPoint(p)
  }

  const fetchQuiz = async () => {
    const quiz = await client.getQuizById(qid)
    setQuiz(quiz)
  } 

  const fetchAttempt = async () => {
    console.log("fetchAttempt")
    console.log(qid, userId)
    const userAttempt = await client.getUserQuizAttempt(qid, userId)

    setAttempt(userAttempt)
  }

  const get_t = (a: Date) => {
        const date = a.toLocaleDateString('en-US', {timeZone: "UTC", month: 'short', day: '2-digit'});
        const t = a.toLocaleTimeString('en-US', {timeZone: "UTC", hour: '2-digit', minute: '2-digit', hour12: true}).substring(0, 5);
        const z = a.toLocaleTimeString('en-US', {timeZone: "UTC", hour: '2-digit', minute: '2-digit', hour12: true}).substring(6, 8).toLowerCase();
        return `${date} at ${t}${z}`;
    }

  useEffect(() => {
    fetchAttempt();
    fetchQuiz();
    getQuizPoint();
  }, [])

  console.log("quiz", quiz)

  if (!quiz || quiz.length === 0) {
    return <div>Loading questions...</div>;
  }

  
  return (
    <div>
        <h1>{quiz.title}</h1>
        <hr />
            <div className='d-flex flex-wrap'>
                <div className="me-5 text-nowrap mb-1"><b>Due </b>{get_t(new Date(quiz.dueDate))}</div>
                <div className="me-5 text-nowrap mb-1"><b>Points </b>{quizPoint}</div>
                <div className="me-5 text-nowrap mb-1"><b>Questions </b>{quiz.questions?.length}</div>
                <div className="me-5 text-nowrap mb-1"><b>Available </b>{get_t(new Date(quiz.availableFrom))} - {get_t(new Date(quiz.availableUntil))}</div>

                {quiz.timeLimitMinutes > 0 ? 
                <div className="me-5 text-nowrap mb-1"><b>Time Limit</b> {quiz.timeLimitMinutes} Minutes</div>
                  :
                  ""
                }
            </div>
        <hr />
        <h3>Instructions</h3>
        <div>{quiz.description}</div>
        <br />
        {   
        quizAttempt.attemptsUsed === 0 &&
          <div className="d-flex justify-content-center">
          <Button className="btn-danger rounded-1" href={`/Courses/${cid}/Quizzes/${quiz._id}/take`}
            onClick={async (e) => {
              e.preventDefault()
              if (quiz.accessCode) {
                await createUpdateAttempt()
              }
              window.location.href = `/Courses/${cid}/Quizzes/${quiz._id}/take`


              }}>Take the Quiz</Button>
          </div>
        }

        {
          (quizAttempt && quizAttempt.attemptsUsed >= quiz.maxAttempts) &&
            ""
        }


        {
          (quizAttempt.attemptsUsed < quiz.maxAttempts && quizAttempt.attemptsUsed > 0) &&
            <div className="d-flex justify-content-center">
            <Button className="btn-danger rounded-1" href={`/Courses/${cid}/Quizzes/${quiz._id}/take`}
              onClick={async (e) => {
              e.preventDefault()
              if (quiz.accessCode) {
                await createUpdateAttempt()
              }
              window.location.href = `/Courses/${cid}/Quizzes/${quiz._id}/take`


              }}>Take the Quiz Again</Button>
            </div>

        }
        <br />
        <hr />



    </div>
  )
}
