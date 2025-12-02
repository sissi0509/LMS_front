"use client";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";
import { Button, Col, Form, Row } from "react-bootstrap";
import { RootState } from "../../../../store";
import { useState } from "react";
import { setAssignments } from "../reducer";
import { useDispatch, useSelector } from "react-redux";
import * as client from "../../../client";

export default function AssignmentEditor() {
  const { cid, aid } = useParams<{ cid: string; aid: string }>();
  const assignments: any = useSelector(
    (state: RootState) => state.assignmentsReducer.assignments
  );
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );

  const dispatch = useDispatch();

  const existing = assignments.find((a: any) => a._id === aid);
  const isNew = aid === "new";

  const toInputDateTime = (value?: string | Date) => {
    if (!value) {
      return new Date().toISOString().slice(0, 16);
    }
    const d = value instanceof Date ? value : new Date(value);
    return d.toISOString().slice(0, 16);
  };

  // const formatDisplayDate = (value?: string | Date) => {
  //   if (!value) return "";
  //   const d = value instanceof Date ? value : new Date(value);
  //   return d.toLocaleString();
  // };

  const [title, setTitle] = useState(existing?.title ?? "");
  const [description, setDescription] = useState(existing?.description ?? "");
  const [points, setPoints] = useState(existing?.points ?? 0);
  const [dueDate, setDueDate] = useState(toInputDateTime(existing?.dueDate));

  const [availableDate, setAvailableDate] = useState(
    toInputDateTime(existing?.availableDate)
  );
  const [untilDate, setUntilDate] = useState(
    toInputDateTime(existing?.untilDate)
  );

  const handleSave = async () => {
    const newAssignment = {
      title,
      description,
      points: Number(points),
      dueDate,
      availableDate,
      untilDate,
    };
    if (isNew) {
      await client.createAssignmentForCourse(cid as string, newAssignment);
      dispatch(setAssignments([...assignments, newAssignment]));
    } else if (existing) {
      const updatedAssignment = { ...existing, ...newAssignment };
      await client.updateAssignment(cid, updatedAssignment);
      const newAssignments = assignments.map((a: any) =>
        a._id === aid ? updatedAssignment : a
      );
      dispatch(setAssignments(newAssignments));
    }
  };
  const isFaculty = currentUser?.role === "FACULTY";
  if (!isFaculty) {
    return (
      <div className="p-3">
        <h3>{title}</h3>
        {description && <p>{description}</p>}
        <p>
          <b>Points:</b> {points}
        </p>
        <p>
          <b>Due:</b> {dueDate.slice(0, 10)}
        </p>
        <p>
          <b>Available from:</b> {availableDate.slice(0, 10)}
        </p>
        <p>
          <b>Until:</b> {untilDate.slice(0, 10)}
        </p>
        <Link href={`/Courses/${cid}/Assignments`}>
          <Button variant="secondary">Back</Button>
        </Link>
      </div>
    );
  }
  if (!currentUser) {
    return redirect("/Account/Signin");
  }

  return (
    <Form id="wd-assignments-editor" className="p-3">
      <Form.Label className="fs-5" htmlFor="wd-name">
        Assignment Name
      </Form.Label>
      <Form.Control
        id="wd-name"
        className="mb-3 rounded-0"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Form.Control
        as="textarea"
        rows={5}
        value={description}
        placeholder="Enter description here"
        className="mb-3 rounded-0"
        onChange={(e) => setDescription(e.target.value)}
      />

      <Row className="mb-3">
        <Form.Label htmlFor="wd-points" column sm="4" className="text-end">
          Points
        </Form.Label>
        <Col sm={8}>
          <Form.Control
            id="wd-points"
            type="number"
            className="rounded-0"
            value={points}
            onChange={(e) => setPoints(Number(e.target.value))}
          />
        </Col>
      </Row>

      <Row className="mb-3">
        <Form.Label htmlFor="wd-group" column sm="4" className="text-end">
          Assignment Group
        </Form.Label>

        <Col sm={8}>
          <Form.Select id="wd-group" value="ASSI" className="rounded-0">
            <option value="ASSI">ASSIGNMENTS</option>
            <option value="QUIZ">QUIZZES</option>
            <option value="EXAM">EXAMS</option>
            <option value="PROJ">PROJECT</option>
          </Form.Select>
        </Col>
      </Row>

      <Row className="mb-3">
        <Form.Label
          htmlFor="wd-display-grade-as"
          column
          sm={4}
          className="text-end"
        >
          Display Grade as
        </Form.Label>

        <Col sm={8}>
          <Form.Select
            id="wd-display-grade-as"
            value="PERC"
            className="rounded-0"
          >
            <option value="PERC">Percentage</option>
            <option value="POINT">Points</option>
            <option value="LET">Letter Grade</option>
          </Form.Select>
        </Col>
      </Row>

      <Row className="mb-3">
        <Form.Label
          column
          htmlFor="wd-submission-type"
          sm={4}
          className="text-end"
        >
          Submission Type
        </Form.Label>
        <Col sm={8}>
          <div className="border border-light-subtle rounded-0 p-3">
            <Form.Select
              id="wd-submission-type"
              value="ONLINE"
              className="mb-3 rounded-0 "
            >
              <option value="ONLINE">Online</option>
              <option value="PAPER">On Paper</option>
            </Form.Select>
            <div>
              <div id="wd-submission-type" className="mb-3 fw-bold">
                Online Entry Options
              </div>
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="submission"
                  id="wd-text-entry"
                />
                <label className="form-check-label" htmlFor="wd-text-entry">
                  Text Entry
                </label>
              </div>
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="submission"
                  id="wd-website-url"
                />
                <label className="form-check-label" htmlFor="wd-website-url">
                  Website URL
                </label>
              </div>
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="submission"
                  id="wd-media-recordings"
                />
                <label
                  className="form-check-label"
                  htmlFor="wd-media-recordings"
                >
                  Media Recordings
                </label>
              </div>
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="submission"
                  id="wd-student-annotation"
                />
                <label
                  className="form-check-label"
                  htmlFor="wd-student-annotation"
                >
                  Student Annotation
                </label>
              </div>
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="submission"
                  id="wd-file-upload"
                />
                <label className="form-check-label" htmlFor="wd-file-upload">
                  File Uploads
                </label>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col sm={4} className="text-end">
          Assign
        </Col>
        <Col sm={8}>
          <div className="border border-light-subtle rounded-0 p-3">
            <Form.Label htmlFor="wd-assign-to" className="fw-bold">
              Assign to
            </Form.Label>

            <input
              id="wd-assign-to"
              className="form-control mb-3 rounded-0"
              value="Everyone"
            />

            <Form.Label className="fw-bold">Due</Form.Label>
            <div className="input-group mb-3">
              <Form.Control
                type="datetime-local"
                step="1"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>

            <Row>
              <Col sm={6}>
                <Form.Label htmlFor="wd-available-from" className="fw-bold">
                  Available from
                </Form.Label>
                <div className="input-group mb-3">
                  <input
                    className="form-control rounded-0"
                    type="datetime-local"
                    step="1"
                    id="wd-available-from"
                    value={availableDate}
                    onChange={(e) => setAvailableDate(e.target.value)}
                  />
                </div>
              </Col>
              <Col sm={6}>
                <Form.Label htmlFor="wd-available-until" className="fw-bold">
                  Until
                </Form.Label>
                <div className="input-group mb-3">
                  <input
                    className="form-control rounded-0"
                    type="datetime-local"
                    step="1"
                    id="wd-available-until"
                    value={untilDate}
                    onChange={(e) => setUntilDate(e.target.value)}
                  />
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <hr className="" />
      <div className="d-flex justify-content-end">
        <Link href={`/Courses/${cid}/Assignments`}>
          <Button className="me-2" variant="secondary" size="lg" id="wd-save">
            Cancel
          </Button>
        </Link>
        <Link href={`/Courses/${cid}/Assignments`}>
          <Button
            className="me-2 "
            variant="danger"
            size="lg"
            id="wd-cancel"
            onClick={handleSave}
          >
            Save
          </Button>
        </Link>
      </div>
    </Form>
  );
}
