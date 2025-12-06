"use client"
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import * as client from "../../../client";

export default function StudentQuizTake({cid, qid, userId}: {cid: string, qid: string, userId: string}) {

  const [quizAttempt, setAttempt] = useState<any>({})  
  const [quiz, setQuiz] = useState<any>({})

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

  useEffect(() => {
    fetchAttempt();
    fetchQuiz();
  }, [])

  console.log("attempt", quizAttempt)
  console.log("max", quiz.maxAttempts)

  if (!quiz || quiz.length === 0) {
    return <div>Loading questions...</div>;
  }

  
  return (
    <div>
        <h1>Title</h1>
        <hr />
            <div className='d-flex flex-wrap'>
                <div className="me-5 text-nowrap mb-1"><b>Due </b>Dec 8 at 11:59</div>
                <div className="me-5 text-nowrap mb-1"><b>Points </b>20</div>
                <div className="me-5 text-nowrap mb-1"><b>Questions </b>2</div>
                <div className="me-5 text-nowrap mb-1"><b>Available </b>Dec 1 at 12am - Dec 8 at 11:59pm</div>
                <div className="me-5 text-nowrap mb-1"><b>Time Limit</b> 20 Minutes</div>
            </div>
        <hr />
        <div>{quiz.description}</div>
        <br />
        {   
        quizAttempt.attemptsUsed === 0 &&
          <div className="d-flex justify-content-center">
          <Button className="btn-danger rounded-1" href={`/Courses/${cid}/Quizzes/${quiz._id}/take`}
            onClick={async (e) => {
              e.preventDefault()
              await createUpdateAttempt()
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
              await createUpdateAttempt()
              window.location.href = `/Courses/${cid}/Quizzes/${quiz._id}/take`


              }}>Take the Quiz Again</Button>
            </div>

        }
        <br />
        <hr />



    </div>
  )
}
