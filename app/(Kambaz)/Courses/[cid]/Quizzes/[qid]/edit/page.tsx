"use client";
import React, { useEffect, useState } from "react";
import AddNewQuestionBtn from "./AddNewQuestionBtn";
import GeneralQuestion from "./GeneralQuestion";
import * as client from "../client";
import * as clientE from "../../../../client";
import { useParams } from "next/navigation";
import DetailEditor from "./DetailEditor";
import { Button, Tab, Tabs } from "react-bootstrap";
import { MdDoNotDisturb } from "react-icons/md";

export default function QuizDetailEditor() {
  const { cid } = useParams<{ cid: string }>();
  const { qid } = useParams<{ qid: string }>();
  const [questions, setQuestions] = useState<any[]>([]);
  const [showDetail, setShowDetail] = useState(false);
  const [point, setQuizPoint] = useState(0)
  const [active, setActive] = useState("details")
  const [quiz, setQuiz] = useState<any>({})

  const getQuizPoint = async () => {
      const p = await clientE.findQuizPoints(qid)
      setQuizPoint(p)
    }

  const fetchQuiz = async () => {
    const quiz = await clientE.getQuizById(qid)
    setQuiz(quiz)
  }

  const emptyQuestion = {
    _id: "new",
    title: "new title",
    question: "new question",
    type: "MCQ",
    points: 0,
    choices: [],
    // correctChoiceIndex: 0,
    // correctBoolean: true,
    acceptableAnswers: [],
  };
  // const [currentIndex, setCurrentIndex] = useState(0);
  // const currentQuestion = questions[currentIndex];

  const AddNewQuestion = () => {
    setQuestions((prev) => {
      const newQuestions = [...prev, { ...emptyQuestion }];
      // setCurrentIndex(newQuestions.length - 1);
      return newQuestions;
    });
  };
  const handleUpdateQuestion = (index: number, updated: any) => {
    setQuestions((prev) => prev.map((q, i) => (i === index ? updated : q)));
  };

  const handleDeleteQuestion = async (questionId: string) => {
    await client.deleteQuestionFromQuiz(qid, questionId);
    setQuestions((prev) => prev.filter((q) => q._id !== questionId));
  };
  const resetQuestionsFromDb = async () => {
    await fetchAllQuestionsForQuiz();
  };

  const handleSave = async () => {
    await Promise.all(
      questions.map((question) =>
        client.createOrUpdateQuestion(question._id, question, qid)
      )
    );
    await fetchAllQuestionsForQuiz();
  };

  const fetchAllQuestionsForQuiz = async () => {
    const questionsFromDB = await client.fetchAllQuestionsForQuiz(qid);
    setQuestions(questionsFromDB);
  };


  useEffect(() => {
    fetchAllQuestionsForQuiz();
    // setCurrentIndex(0);
    getQuizPoint();
    fetchQuiz();
  }, [qid, active]);
  return (
    <div>

      <div className="d-flex justify-content-end align-items-center">
        <div className="me-2">Points {point}</div>
        <div><MdDoNotDisturb /> {quiz.published ? "Published" : "Unpublished"}</div>
      </div>
      <Tabs activeKey={active} onSelect={(e) => { if (e) {setActive(e)}}}>
        <Tab eventKey="details" title="Details" >
          <br />
            <DetailEditor key={active} courseId={cid} quizId={qid} point={point}/>          
        </Tab>
        <Tab eventKey="questions" title="Questions">
          <div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="showDetails"
                checked={showDetail}
                onChange={(e) => setShowDetail(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="showDetails">
                Show Question Details
              </label>
            </div>
            <div>
              {questions.map((question: any, idx) => (
                <GeneralQuestion
                  key={idx}
                  idx={idx}
                  question={question}
                  onChange={handleUpdateQuestion}
                  onDelete={handleDeleteQuestion}
                  showAnser={showDetail}
                />
              ))}
              <div className="mt-2">
                <AddNewQuestionBtn onClick={AddNewQuestion} />
              </div>
              <hr />
              <div className="float-end">
                <Button
                  className="btn-secondary me-2"
                  onClick={resetQuestionsFromDb}
                >
                  cancel
                </Button>
                <Button className="btn-danger" onClick={handleSave}>
                  save
                </Button>
              </div>
            </div>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}
