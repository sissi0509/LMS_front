"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

export default function AssignmentControls() {
  const { cid } = useParams();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );

  const isFaculty = currentUser?.role === "FACULTY";

  return (
    <div
      id="wd-assignment-controls"
      className="text-nowrap d-flex flex-wrap justify-content-between mb-3"
    >
      <div
        id="wd-search-assignment"
        className="input-group"
        style={{ maxWidth: "250px" }}
      >
        <span className="input-group-text bg-white border-end-0">
          <FaSearch />
        </span>
        <input
          type="search"
          className="form-control border-start-0 from-slate-500"
          placeholder="Search..."
        />
      </div>

      <div className="d-flex float-end">
        <Button
          id="wd-add-assignment-group "
          className="me-2 d-flex align-items-center"
          variant="secondary"
          size="lg"
        >
          <FaPlus className="me-2" />
          Group
        </Button>
        {isFaculty && (
          <Link
            href={`/Courses/${cid}/Assignments/new`}
            className="text-decoration-none"
          >
            <Button
              id="wd-add-assignment"
              className=" me-2  d-flex align-items-center"
              variant="danger"
              size="lg"
            >
              <FaPlus className="me-2" />
              Assignment
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
