import React from "react";
import Answers from "./Answers";

import { BsGripVertical } from "react-icons/bs";

export default function OneQuestion({ question }: { question: any }) {
  return (
    <div className="border rounded me-2 mt-2">
      <div className="p-3 ps-2 bg-secondary d-flex justify-content-between">
        <div>
          <BsGripVertical className="me-2" />
          <span>{question.title}</span>
        </div>

        <div>{question.points} pts</div>
      </div>

      <div className="p-3 d-flex justify-content-between">
        <div>{question.question}</div>
      </div>

      <div className="p-3">
        <Answers question={question} />
      </div>
    </div>
  );
}
