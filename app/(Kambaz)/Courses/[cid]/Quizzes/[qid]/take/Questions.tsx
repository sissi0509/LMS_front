"use client";
import React, { useEffect, useState } from "react";
import OneQuestion from "./OneQuestion";
import { Button } from "react-bootstrap";

export default function Questions({
  questions,
  onePertime,
}: {
  questions: any;
  onePertime: boolean;
}) {
  const [studentAns, setStudentAns] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleUpdateAns = (index: number, updated: any) => {
    setStudentAns((prev: any) =>
      prev.map((a: any, i: number) => (i === index ? updated : a))
    );
  };

  const initial = questions.map((q: any) => ({
    question: q._id,
    selectedChoiceIndex: null,
    selectedBoolean: null,
    textAnswer: "",
  }));

  useEffect(() => {
    setStudentAns(initial);
    setCurrentIndex(0);
  }, [questions]);
  return (
    <div>
      {onePertime && (
        <>
          <OneQuestion
            key={currentIndex}
            qIdx={currentIndex}
            question={questions[currentIndex]}
            onChange={handleUpdateAns}
            studentAnswer={studentAns[currentIndex] || {}}
          />
          <div className="d-flex justify-content-between align-items-center mt-3">
            <Button
              className="btn-secondary"
              onClick={() => setCurrentIndex((i) => i - 1)}
              disabled={currentIndex === 0}
            >
              Previous
            </Button>

            <Button
              className="btn-secondary"
              onClick={() => setCurrentIndex((i) => i + 1)}
              disabled={currentIndex === questions.length - 1}
            >
              Next
            </Button>
          </div>
        </>
      )}
      {!onePertime &&
        questions.map((q: any, i: number) => (
          <OneQuestion
            key={i}
            qIdx={i}
            question={q}
            onChange={handleUpdateAns}
            studentAnswer={studentAns[i]}
          />
        ))}
      <Button
        className="btn-danger mt-3 float-end"
        onClick={() => {
          console.log(studentAns);
        }}
      >
        Submit
      </Button>
      <div></div>
    </div>
  );
}
