"use client"
import React, { useState } from 'react'
import * as clientX from "../client";
import * as clientE from "../../../../client";

export default function QuizDescription({quizId, userId}: {quizId: string, userId: string}) {

  const [quiz, setQuiz] = useState<any>({})
  const [attempt, setAttempt] = useState<any>({})
  
  const fetchQuiz = async () => {
    
  }


  
  return (
    <div>
        <h2>{quiz.title}</h2>
        <span>Started: </span>
        <h2>Quiz Instructions</h2>
        {quiz.description}
        <hr />
    </div>
  )
}
