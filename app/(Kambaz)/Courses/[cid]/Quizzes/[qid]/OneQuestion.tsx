"use client";
import React, { useState } from "react";
import ChoiceAndAnswer from "./ChoiceAndAnswer";
// import Answers from "./Answers";

export default function OneQuestion({
  question,
  studentAnswer,
  showAnswer,
}: {
  question: any;
  studentAnswer: any;
  showAnswer: boolean;
}) {
  const renderFillBlankQuestion = () => {
    const text = question.question || "";
    const parts = text.split(/(\[\[[^[\]]+\]\])/);
    let blankCounter = 0;

    // const handleBlankChange = (idx: number, value: string) => {
    //   const prev = studentAnswer?.textAnswer || [];
    //   const updated = [...prev];
    //   if (updated.length <= idx) {
    //     for (let i = updated.length; i <= idx; i++) {
    //       updated[i] = "";
    //     }
    //   }
    //   updated[idx] = value;
    //   onChange(qIdx, {
    //     ...(studentAnswer || {}),
    //     question: question._id,
    //     textAnswer: updated,
    //   });
    // };

    return (
      <div>
        {parts.map((part: any) => {
          const isBlank = part.startsWith("[[") && part.endsWith("]]");

          if (!isBlank) return part;

          const thisBlank = blankCounter++;
          return (
            <input
              key={`blank-${thisBlank}`}
              type="text"
              className="mx-1"
              style={{ minWidth: "80px" }}
              defaultValue={studentAnswer?.textAnswer[thisBlank]}
              // defaultValue={studentAnswer?.textAnswer?.[thisBlank] ?? ""}
              // onChange={(e) => handleBlankChange(thisBlank, e.target.value)}
              disabled
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="border rounded me-2 mt-2">
      <div className="p-3 ps-2 bg-secondary d-flex justify-content-between">
        <div className="ms-2">{question.title}</div>
        <div>{`${studentAnswer.pointsAwarded}/${question.points} pts`}</div>
        {/* <div>{question.points} pts</div> */}
      </div>
      <div className="p-3 d-flex justify-content-between">
        <div>
          {question.type === "FILL_BLANK"
            ? renderFillBlankQuestion()
            : question.question}
        </div>
      </div>
      <div className="p-3">
        <ChoiceAndAnswer
          question={question}
          studentAnswer={studentAnswer}
          showAnswer={showAnswer}
        />
      </div>
    </div>
  );
}
