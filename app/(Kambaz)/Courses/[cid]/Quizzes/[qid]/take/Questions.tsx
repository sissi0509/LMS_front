import React from "react";
import OneQuestion from "./OneQuestion";
export default function Questions({ questions }: { questions: any }) {
  return (
    <div>
      {questions.map((q, i) => (
        <OneQuestion key={i} question={q} />
      ))}
    </div>
  );
}
