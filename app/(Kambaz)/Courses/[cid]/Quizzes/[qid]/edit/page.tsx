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

  const emptyQuestion = {
    title: "",
    question: "",
    type: "MCQ",

    points: 0,

    choices: [""],
    correctChoiceIndex: 0,

    // For true false
    correctBoolean: true,

    // For fill in blank
    acceptableAnswers: [""],
  };
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentQuestion = questions[currentIndex];

  const AddNewQuestion = () => {
    setQuestions((prev) => {
      const newQuestions = [...prev, { ...emptyQuestion }];
      setCurrentIndex(newQuestions.length - 1);
      return newQuestions;
    });
  };
  const handleUpdateQuestion = (index: number, updated: any) => {
    setQuestions((prev) => prev.map((q, i) => (i === index ? updated : q)));
  };

  const sendQuestionToDb = async (index: number) => {
    const updated_question = questions[index];
    await client.updateQuestion(updated_question._id, updated_question);
  };

  const fetchAllQuestionsForQuiz = async () => {
    const questionsFromDB = await client.fetchAllQuestionsForQuiz(qid);
    setQuestions(questionsFromDB);
  };

  const [pageChange, setPageChange] = useState("Details")

  useEffect(() => {
    fetchAllQuestionsForQuiz();
    setCurrentIndex(0);
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
          <AddNewQuestionBtn onClick={AddNewQuestion} />
          {currentQuestion && (
            <GeneralQuestion
              idx={currentIndex}
              question={currentQuestion}
              onChange={handleUpdateQuestion}
              onSubmit={sendQuestionToDb}
            />
          )}
          <QuestionNaviButtons
            currentIndex={currentIndex}
            total={questions.length}
            onPrev={() => setCurrentIndex((i) => i - 1)}
            onNext={() => setCurrentIndex((i) => i + 1)}
          />
        </div>
      </div>

                  </Tab>
        </Tabs>
    </div>
  );
}
