"use client";
import React, { useEffect, useState } from "react";
import Questions from "./Questions";
import { useParams } from "next/navigation";
import * as client from "../client";
import QuizDescription from "./QuizDescription";
export default function TakePage() {
  const { qid } = useParams<{ qid: string }>();
  const [questions, setQuestions] = useState<any[]>([]);

  const fetchAllQuestionsForQuiz = async () => {
    const questionsFromDB = await client.fetchAllQuestionsForQuiz(qid);
    setQuestions(questionsFromDB);
  };

  useEffect(() => {
    fetchAllQuestionsForQuiz();
    // setCurrentIndex(0);
  }, [qid]);
  return (
    <div>
      page
      <Questions questions={questions} oneQuestionPerTime={false} />
    </div>
  );
}
