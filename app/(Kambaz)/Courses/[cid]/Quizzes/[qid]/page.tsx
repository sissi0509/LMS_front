"use client";
import {
  Button,
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  Table,
} from "react-bootstrap";
import { FaEllipsisVertical } from "react-icons/fa6";
import { MdDoNotDisturb } from "react-icons/md";
import QuizDetailControl from "./QuizDetailControl";
import { useParams, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import StudentQuizTake from "./StudentQuizTake";
import QuizDetail from "./QuizDetail";
import { useEffect, useState } from "react";
import * as client from "../../../client";
import PreviewQuestions from "./PreviewQuestions";
import Link from "next/link";
import { configureStore } from "@reduxjs/toolkit";
import StudentQuizAttemptHistory from "./StudentQuizAttemptHistory";

export default function QuizDetailsScreen() {
  const { cid, qid } = useParams();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );

  const [quiz, setQuiz] = useState<any>({});
  const [quizTotal, setQuizTotal] = useState(0);

  const getQuizById = async () => {
    const newQuiz = await client.getQuizById(qid as string);
    setQuiz(newQuiz);
  };

  const now = new Date();
  const showCorrectAnswersAtDate = quiz.showCorrectAnswersAt
    ? new Date(quiz.showCorrectAnswersAt)
    : null;

  const conRevealForStu = Boolean(
    quiz.showCorrectAnswers &&
      (showCorrectAnswersAtDate === null || showCorrectAnswersAtDate <= now)
  );

  const showAnswer = Boolean(
    currentUser?.role === "FACULTY" || conRevealForStu
  );

  const getQuizTotal = async () => {
    const total = await client.findQuizPoints(qid as string);
    setQuizTotal(total);
  };

  useEffect(() => {
    getQuizById();
    getQuizTotal();
  }, []);

  return (
    <div>
      {currentUser?.role === "FACULTY" ? (
        <div>
          <QuizDetailControl courseId={cid as string} quizId={qid as string} />
          <hr />
          <QuizDetail courseId={cid as string} quizId={qid as string} />
        </div>
      ) : (
        <div>
          <StudentQuizTake
            cid={cid as string}
            qid={qid as string}
            userId={currentUser?._id ? currentUser._id : ""}
          />
          <StudentQuizAttemptHistory quizId={qid as string} />
        </div>
      )}
      <PreviewQuestions
        userId={currentUser?._id ? currentUser._id : ""}
        showAnswer={showAnswer}
        maxAttemptsAllowed={quiz.maxAttempts}
      />
      <Link
        href={`/Courses/${cid}/Quizzes/`}
        className="btn btn-secondary btn-lg"
      >
        Previous
      </Link>
    </div>
  );
}
