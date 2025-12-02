"use client";
import Link from "next/link";
import AssignmentControl from "./AssignmentControl";
import { Button, ListGroup, ListGroupItem, Modal } from "react-bootstrap";
import LessonControlButtons from "../Modules/LessonControlButtons";
import AssignmentControlButton from "./AssignmentControlButton";
import { LuNotebookPen } from "react-icons/lu";
import { BsGripVertical } from "react-icons/bs";
import { GoTriangleDown } from "react-icons/go";
import { RootState } from "../../../store";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { deleteAssignment, setAssignments } from "./reducer";
import { FaTrash } from "react-icons/fa6";
import { useEffect, useState } from "react";
import * as client from "../../client";

export default function Assignments() {
  const { cid } = useParams<{ cid: string }>();
  const assignments: any = useSelector(
    (state: RootState) => state.assignmentsReducer.assignments
  );
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );

  const isFaculty = currentUser?.role === "FACULTY";

  const dispatch = useDispatch();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setDeleteId(id);
  };

  const handleConfirmDelete = async () => {
    if (deleteId) {
      await client.deleteAssignment(cid, deleteId);
      dispatch(deleteAssignment(deleteId));
    }
    setDeleteId(null);
  };
  const handleCancel = () => {
    setDeleteId(null);
  };

  const dateConvert = (isoString: string) => {
    const date = new Date(isoString);

    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };

    return date
      .toLocaleString("en-US", options)
      .replace(",", " at")
      .replace("AM", "am")
      .replace("PM", "pm");
  };

  const fetchAssignments = async () => {
    const assignments = await client.findAssignmentsForCourse(cid as string);
    dispatch(setAssignments(assignments));
    console.log("ass:", assignments);
  };
  useEffect(() => {
    fetchAssignments();
  }, [cid]);

  return (
    <div id="wd-assignments">
      <div className="mb-5">
        <AssignmentControl />
      </div>
      <ListGroup className="rounded-0 fs-5">
        <ListGroupItem className="wd-assignments-title p-3 ps-3 bg-secondary d-flex justify-content-between align-items-center">
          <div>
            <BsGripVertical className="me-2" />
            <GoTriangleDown className="me-1" />
            <b>ASSIGNMENTS</b>
          </div>

          <AssignmentControlButton />
        </ListGroupItem>

        {assignments.length > 0 && (
          <ListGroup id="wd-assignment-list" className="rounded-0">
            {assignments.map((a: any, i: number) => (
              <ListGroupItem
                key={i}
                className="wd-assignment-list-item d-flex align-items-center"
              >
                <BsGripVertical className="me-2" />
                <LuNotebookPen className="text-success" />
                <div className="ms-4 flex-fill">
                  <Link
                    href={`/Courses/${cid}/Assignments/${a._id}`}
                    className="wd-assignment-link text-dark text-decoration-none "
                  >
                    <b>{`${a.title}`}</b>
                  </Link>
                  <div className="d-flex justify-content-between">
                    <span className="fs-6 me-5">
                      <span className="text-danger">Multiple Modules </span>|
                      <strong> Not available until</strong>{" "}
                      {dateConvert(a.availableDate)} |<strong> Due</strong>{" "}
                      {dateConvert(a.dueDate)} | {a.points} pts
                    </span>
                    <div className="d-flex">
                      {isFaculty && (
                        <FaTrash
                          className="text-danger me-2 mb-1"
                          onClick={() => handleDelete(a._id)}
                        />
                      )}
                      <Modal show={deleteId !== null} onHide={handleCancel}>
                        <Modal.Header closeButton>
                          <Modal.Title>Delete Assignment</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          Are you sure you want to delete this assignment?
                        </Modal.Body>
                        <Modal.Footer>
                          <Button
                            variant="secondary"
                            onClick={handleConfirmDelete}
                          >
                            Yes
                          </Button>
                          <Button variant="primary" onClick={handleCancel}>
                            No
                          </Button>
                        </Modal.Footer>
                      </Modal>
                      <LessonControlButtons />
                    </div>
                  </div>
                </div>
              </ListGroupItem>
            ))}
          </ListGroup>
        )}
      </ListGroup>
    </div>
  );
}
