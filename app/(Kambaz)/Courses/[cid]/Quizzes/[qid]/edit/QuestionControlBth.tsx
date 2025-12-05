import React from "react";
import { Button } from "react-bootstrap";
import * as client from "../client";

export default function QuestionControlBth({
  idx,
  onSubmit,
}: {
  idx: number;
  onSubmit: any;
}) {
  return (
    <div>
      <Button className="btn-secondary me-2">Cancel</Button>
      <Button
        className="btn-danger"
        onClick={() => {
          onSubmit(idx);
        }}
      >
        Update Questions
      </Button>
    </div>
  );
}
