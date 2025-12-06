"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Questions from "./Questions";
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
    if (quiz.shuffleAnswers) {
      const shuffled = questionsFromDB.map((q: any) => {
        if (q.type === "MCQ") {
          q.choices = shuffleArray(q.choices);
        }
        return q;
      });
      setQuestions(shuffled);
    } else {
      setQuestions(questionsFromDB);
    }
  };
  const shuffleArray = (arr: any[]) => {
    const copy = [...arr];
    const len = copy.length;
    for (let i = 0; i < len; i++) {
      const j = Math.floor(Math.random() * len);
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  const shuffleQuestionChoices = (q: any) => {
    if (q.type !== "MCQ") return q;

    const originalChoices = q.choices;
    const originalCorrectIndex = q.correctChoiceIndex;
    const indices = originalChoices.map((_: any, i: number) => i);
    const shuffledIndices = shuffleArray(indices);
    const newChoices = shuffledIndices.map((i) => originalChoices[i]);
    const newCorrectIndex = shuffledIndices.indexOf(originalCorrectIndex);

    return {
      ...q,
      choices: newChoices,
      correctChoiceIndex: newCorrectIndex,
    };
  };
  const fetchQuiz = async () => {
    const newQuiz = await clientE.getQuizById(qid);
    setQuiz(newQuiz);
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

  if (!questions || questions.length === 0) {
    return <div>Loading questions...</div>;
  }

  return (
    <div>
      <QuizDescription quizId={qid} userId={currentUser ? currentUser._id : ""}/>
      <Questions questions={questions} onePertime={quiz.oneQuestionPerTime} />

    </div>
  );
}
