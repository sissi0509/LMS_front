"use client";
import React, { useEffect, useState } from "react";
import SingleQuestions from "./SingleQuestions";
import { useParams } from "next/navigation";

import * as clientX from "../../../client";
import * as clientE from "../../../../../../client";

export default function TakePage() {
  const { qid } = useParams<{ qid: string }>();
  const [questions, setQuestions] = useState<any[]>([]);
  // const [quiz, setQuiz] = useState<any>({});

  const fetchAllQuestionsForQuiz = async () => {
    const questionsFromDB = await clientX.fetchAllQuestionsForQuiz(qid);
    setQuestions(questionsFromDB);
  };

  // const fetchQuiz = async () => {
  //   const quiz = await clientE.getQuizById(qid);
  //   setQuiz(quiz);
  // };

  useEffect(() => {
    fetchAllQuestionsForQuiz();
    // fetchQuiz();
  }, [qid]);

  return (
    <div>
      <SingleQuestions questions={questions} />
    </div>
  );
}
