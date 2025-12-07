"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Questions from "./Questions";
import * as clientX from "../client";
import * as clientE from "../../../../client";
import QuizDescription from "./QuizDescription";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";

export default function TakePage() {
  const { qid, cid } = useParams<{ qid: string; cid: string }>();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );

  const [attempt, setAttempt] = useState<any>({});
  const [questions, setQuestions] = useState<any[]>([]);
  const [quiz, setQuiz] = useState<any>({});
  const router = useRouter();
  const searchParams = useSearchParams();

  const isPreview = searchParams.get("preview") === "1";

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

  const fetchAttempt = async () => {
    const userId = currentUser?._id ? currentUser._id : "";
    const userAttempt = await clientE.getUserQuizAttempt(qid, userId);
    setAttempt(userAttempt);
  };

  // const createUpdateAttempt = async () => {
  //   const today = new Date().toISOString();
  //   if (quizAttempt.attemptsUsed > 0) {
  //     const att = quizAttempt.attempt;
  //     const updated = { ...att, startAt: [...att.startAt, today] };
  //     const attempt = await client.createOrUpdateAttempt(userId, qid, updated);
  //     setAttempt(attempt);
  //   } else {
  //     const attempt = await client.createOrUpdateAttempt(userId, qid, {
  //       startAt: [today],
  //       submittedAt: [],
  //       score: [],
  //       answers: [],
  //     });
  //     setAttempt(attempt);
  //   }
  // };

  const handleSubmitAttempt = async (answers: any[]) => {
    if (isPreview) {
      const score = await clientX.getGrade(answers);
      console.log("preview score", score);
      router.push(`/Courses/${cid}/Quizzes/${qid}`);
    }
    const today = new Date().toISOString();
    const att = attempt.attempt;
    const updated = {
      ...att,
      submittedAt: [...att.submittedAt, today],
      answers: answers,
    };
    const savedAttempt = await clientE.createOrUpdateAttempt(
      updated.user,
      qid,
      updated
    );
    setAttempt(savedAttempt);
    console.log("Saved Attempt:", savedAttempt);
    router.push(`/Courses/${cid}/Quizzes/${qid}`);
  };

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
      <QuizDescription
        quiz={quiz}
        userId={currentUser ? currentUser._id : ""}
      />
      <Questions
        questions={questions}
        onePerTime={quiz.oneQuestionPerTime}
        onSubmit={handleSubmitAttempt}
      />
    </div>
  );
}
