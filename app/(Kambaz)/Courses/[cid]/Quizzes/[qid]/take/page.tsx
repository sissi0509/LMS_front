"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Questions from "./Questions";
import * as clientX from "../client";
import * as clientE from "../../../../client";
import QuizDescription from "./QuizDescription";

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

  useEffect(() => {
    fetchAllQuestionsForQuiz();
    fetchQuiz();
  }, [qid]);

  if (!questions || questions.length === 0) {
    return <div>Loading questions...</div>;
  }

  return (
    <div>
      <Questions questions={questions} onePertime={quiz.oneQuestionPerTime} />
    </div>
  );
}
