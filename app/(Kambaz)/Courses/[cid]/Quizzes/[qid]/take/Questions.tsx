"use client";
import React, { useEffect, useState } from "react";
import OneQuestion from "./OneQuestion";
import { Button } from "react-bootstrap";

export default function Questions({
  questions,
  onePerTime,
  onSubmit,
}: {
  questions: any;
  onePerTime: boolean;
  onSubmit: any;
}) {
  const [studentAns, setStudentAns] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // const handleUpdateAns = (index: number, updated: any) => {
  //   setStudentAns((prev: any) =>
  //     prev.map((a: any, i: number) => (i === index ? updated : a))
  //   );

  // };
  // const handleUpdateAns = (index: number, updated: any) => {
  //   setStudentAns((prev: any) => {
  //     const copy = [...prev];

  //     // If this question's answer hasn't been created yet, insert it:
  //     copy[index] = {
  //       ...(copy[index] || {}), // keep any existing fields
  //       ...updated, // update with new data
  //     };

  //     return copy;
  //   });
  // };
  const handleUpdateAns = (index: number, updated: any) => {
    setStudentAns((prev: any) => {
      const copy = [...prev];
      copy[index] = updated;
      return copy;
    });
  };

  const initial = questions.map((q: any) => {
    // const matches = q.question.match(/\[\[([^[\]]+)\]\]/g);
    // const blankCount = matches ? matches.length : 0;

    return {
      question: q._id,
      selectedChoiceIndex: null,
      selectedBoolean: null,
      // textAnswer: Array(blankCount).fill(""),
      textAnswer: [],
    };
  });

  useEffect(() => {
    setStudentAns(initial);
    setCurrentIndex(0);
  }, [questions]);
  // useEffect(() => {
  //   if (studentAns.length === 0) {
  //     setStudentAns(initial);
  //   }
  // }, [questions]);
  return (
    <div>
      {onePerTime && (
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
      {!onePerTime &&
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
          console.log("!!!!!!!!!", studentAns);
          onSubmit(studentAns);
        }}
      >
        Submit
      </Button>
      <div></div>
    </div>
  );
}
