import React from "react";

export default function QuestionNaviButtons({
  currentIndex,
  total,
  onPrev,
  onNext,
}: {
  currentIndex: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="d-flex justify-content-between mt-3">
      <button
        className="btn btn-outline-secondary"
        disabled={currentIndex === 0}
        onClick={onPrev}
      >
        Previous
      </button>

      <button
        className="btn btn-outline-secondary"
        disabled={currentIndex === total - 1}
        onClick={onNext}
      >
        Next
      </button>
    </div>
  );
}
