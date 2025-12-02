import React from "react";
import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";

export default function AddNewQuestionBtn() {
  return (
    <Button
      id="wd-quiz-add-question"
      className="me-2 d-flex align-items-center"
      variant="secondary"
      size="lg"
    >
      <FaPlus className="me-2" />
      <span>New Question</span>
    </Button>
  );
}
