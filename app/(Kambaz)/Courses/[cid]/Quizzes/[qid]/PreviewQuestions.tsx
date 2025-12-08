"use client";
import React, { useEffect, useState } from "react";
import * as clientX from "./client";
import * as clientE from "../../../client";
import { useParams, useSearchParams } from "next/navigation";
import OneQuestion from "./OneQuestion";
import { RootState } from "../../../../store";
import { useSelector } from "react-redux";
import Link from "next/link";

export default function PreviewQuestions({
  userId,
  showAnswer,
  maxAttemptsAllowed,
}: {
  userId: string;
  showAnswer: boolean;
  maxAttemptsAllowed: any;
}) {
  const { qid, cid } = useParams<{ qid: string; cid: string }>();
  const [questions, setQuestions] = useState<any[]>([]);
  const [studentAns, setStudentAns] = useState<any[]>([]);
  const [quizAttempt, setAttempt] = useState<any>({});
  const [profScore, setProfScore] = useState(0);

  const searchParams = useSearchParams();

  const isPreview = searchParams.get("preview") === "1";

  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const fetchAllQuestionsForQuiz = async () => {
    const questionsFromDB = await clientX.fetchAllQuestionsForQuiz(qid);
    setQuestions(questionsFromDB);
  };

  const fetchAttempt = async () => {
    let ans;
    if (currentUser?.role === "FACULTY") {
      const raw = localStorage.getItem(`quiz-preview-${qid}`);

      if (raw) {
        const data = JSON.parse(raw);
        if (data.userId === currentUser?._id) {
          ans = data.answers;
          const score = data.score;
          setProfScore(score);
        } else {
          ans = [];
        }
      }
    } else {
      const userAttempt = await clientE.getUserQuizAttempt(qid, userId);
      setAttempt(userAttempt);
      ans = userAttempt.attempt.answers;
    }
    setStudentAns(ans);
  };

  useEffect(() => {
    fetchAllQuestionsForQuiz();
    fetchAttempt();
    // setCurrentIndex(0);
  }, []);

  if (currentUser?.role === "FACULTY" && !isPreview) {
    return;
  }

  if (!studentAns && !isPreview) {
    return <div>loading.....</div>;
  }

  return (
    <div>
      {currentUser?.role === "FACULTY" && isPreview && (
        <div>Total Score: {profScore}</div>
      )}
      {((currentUser?.role === "FACULTY" && isPreview) ||
        (quizAttempt && quizAttempt.attemptsUsed >= maxAttemptsAllowed)) &&
        questions.map((q, i) => (
          <OneQuestion
            key={i}
            question={q}
            studentAnswer={studentAns[i]}
            showAnswer={showAnswer}
          />
        ))}
      {currentUser?.role === "FACULTY" && isPreview && (
        <Link href={`/Courses/${cid}/Quizzes/${qid}/edit`}>
          Continue to Edit
        </Link>
      )}
    </div>
  );
}
