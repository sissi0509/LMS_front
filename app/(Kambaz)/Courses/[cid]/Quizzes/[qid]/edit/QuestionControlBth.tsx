import React from "react";
import { Button } from "react-bootstrap";
import * as client from "../client";

export default function QuestionControlBth({
  onSubmit,
  onCancel,
}: {
  onSubmit: any;
  onCancel: any;
}) {
  return (
    <div>
      <Button className="btn-secondary me-2" onClick={onCancel}>
        Cancel
      </Button>
      <Button className="btn-danger" onClick={onSubmit}>
        Update Questions
      </Button>
    </div>
  );
}
