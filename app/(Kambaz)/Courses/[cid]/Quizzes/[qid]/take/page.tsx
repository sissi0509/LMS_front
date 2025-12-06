"use client";
import React, { useEffect, useState } from "react";
import Questions from "./Questions";
import { useParams } from "next/navigation";

import * as clientX from "../client";
import * as clientE from "../../../../client";
import QuizDescription from "./QuizDescription";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";


export default function TakePage() {
  const { qid } = useParams<{ qid: string }>();
  const [questions, setQuestions] = useState<any[]>([]);
  const [quiz, setQuiz] = useState<any>({});

  const fetchAllQuestionsForQuiz = async () => {
    const questionsFromDB = await clientX.fetchAllQuestionsForQuiz(qid);
    setQuestions(questionsFromDB);
  };

  const fetchQuiz = async () => {
    const quiz = await clientE.getQuizById(qid);
    setQuiz(quiz);
  };

  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const [attempt, setAttempt] = useState<any>({})

  const fetchAttempt = async () => {
    const userId = currentUser?._id ? currentUser._id : ""
    console.log(userId)
    const userAttempt = await clientE.getUserQuizAttempt(qid, userId)
    setAttempt(userAttempt);
  }

  useEffect(() => {
    fetchAllQuestionsForQuiz();
    fetchQuiz();
    fetchAttempt();
  }, [qid]);

  console.log(attempt);
  return (
    <div>
      <QuizDescription quizId={qid} userId={currentUser ? currentUser._id : ""}/>
      page
      <Questions questions={questions} oneQuestionPerTime={false} />
    </div>
  );
}
