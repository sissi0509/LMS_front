"use client";
import React, { useEffect, useState } from "react";
import * as clientX from "./client";
import * as clientE from "../../../client";
import { useParams } from "next/navigation";
import OneQuestion from "./OneQuestion";

export default function PreviewQuestions({ userId }: { userId: string }) {
  const { qid } = useParams<{ qid: string }>();
  const [questions, setQuestions] = useState<any[]>([]);
  const [studentAns, setStudentAns] = useState<any[]>([]);
  const fetchAllQuestionsForQuiz = async () => {
    const questionsFromDB = await clientX.fetchAllQuestionsForQuiz(qid);
    setQuestions(questionsFromDB);
  };

  const fetchAttempt = async () => {
    const userAttempt = await clientE.getUserQuizAttempt(qid, userId);
    const ans = userAttempt.attempt.answers;

    setStudentAns(ans);
    console.log("vv userAttempt", ans);
  };

  useEffect(() => {
    fetchAllQuestionsForQuiz();
    fetchAttempt();
    // setCurrentIndex(0);
  }, []);

  if (!studentAns) {
    return <div>loading.....</div>;
  }

  return (
    <div>
      {questions.map((q, i) => (
        <OneQuestion key={i} question={q} studentAnswer={studentAns[i]} />
      ))}
    </div>
  );
}
