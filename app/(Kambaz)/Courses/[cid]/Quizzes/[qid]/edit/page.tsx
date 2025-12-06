"use client";
import React, { useEffect, useState } from "react";
import AddNewQuestionBtn from "./AddNewQuestionBtn";
import GeneralQuestion from "./GeneralQuestion";
import { Col, Form, InputGroup, Row, Tab, Tabs } from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { RxCross2 } from "react-icons/rx";
import QuizDetailEditorControl from "./QuizDetailEditorControl";
import CancelSaveButton from "../../CancelSaveButton";
import * as client from "../client";
import { useParams } from "next/navigation";
import QuestionNaviButtons from "./QuestionNaviButtons";
import DetailEditor from "./DetailEditor";
import { Nav, NavItem, NavLink } from "react-bootstrap";

export default function QuizDetailEditor() {
  const { qid } = useParams<{ qid: string }>();
  const [questions, setQuestions] = useState<any[]>([]);
  const [showQuestion, setShowQuestion] = useState(false);

  const emptyQuestion = {
    _id: "new",
    title: "new title",
    question: "new question",
    type: "MCQ",
    points: 0,
    choices: ["new choice"],
    correctChoiceIndex: 0,
    correctBoolean: true,
    acceptableAnswers: ["new answer"],
  };
  // const [currentIndex, setCurrentIndex] = useState(0);
  // const currentQuestion = questions[currentIndex];

  const AddNewQuestion = () => {
    setQuestions((prev) => {
      const newQuestions = [...prev, { ...emptyQuestion }];
      // setCurrentIndex(newQuestions.length - 1);
      console.log("after add:", newQuestions);
      return newQuestions;
    });
  };
  const handleUpdateQuestion = (index: number, updated: any) => {
    setQuestions((prev) => prev.map((q, i) => (i === index ? updated : q)));
  };

  const resetQuestionsFromDb = async () => {
    await fetchAllQuestionsForQuiz();
  };

  const sendQuestionToDb = async (index: number) => {
    const newQuestion = questions[index];
    console.log(newQuestion);

    const updated = await client.createOrUpdateQuestion(
      newQuestion._id,
      newQuestion,
      qid
    );

    setQuestions((prev) => {
      const copy = [...prev];
      copy[index] = updated;
      return copy;
    });
  };

  const fetchAllQuestionsForQuiz = async () => {
    const questionsFromDB = await client.fetchAllQuestionsForQuiz(qid);
    setQuestions(questionsFromDB);
  };

  const [pageChange, setPageChange] = useState("Details");

  useEffect(() => {
    fetchAllQuestionsForQuiz();
    // setCurrentIndex(0);
  }, [qid]);
  return (
    <div>
      <Tabs>
        <Tab eventKey="details" title="Details">
          <br />
          <DetailEditor quizId={qid} />
        </Tab>
        <Tab eventKey="questions" title="Questions">
          <div>
            <h1>question</h1>
            <div>
              {questions.map((question: any, idx) => (
                <GeneralQuestion
                  key={idx}
                  idx={idx}
                  question={question}
                  onChange={handleUpdateQuestion}
                  onSubmit={sendQuestionToDb}
                />
              ))}
              <div className="mt-2">
                <AddNewQuestionBtn onClick={AddNewQuestion} />
              </div>
            </div>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}
