"use client";
import { ReactNode, useEffect, useState } from "react";
import CourseNavigation from "./Navigation";
import { FaAlignJustify } from "react-icons/fa6";
// import Breadcrumb from "./Breadcrumb";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import * as client from "../client";

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams<{ cid: string }>();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const [course, setCourse] = useState<any>();

  const loadInitialData = async () => {
    const courseFromServer = await client.findCourseById(cid);
    setCourse(courseFromServer);
  };

  useEffect(() => {
    if (!currentUser) return;
    loadInitialData();
  }, [currentUser]);

  const [showNav, setShowNav] = useState(true);

  return (
    <div id="wd-courses">
      <h2 className="text-danger d-none d-lg-block">
        <FaAlignJustify
          className="me-4 fs-4 mb-1 "
          onClick={() => setShowNav(!showNav)}
        />
        {course?.name}
        {/* <Breadcrumb course={course} /> */}
      </h2>

      <hr />
      <div className="d-flex">
        {showNav && (
          <div className="d-none d-lg-block me-5">
            <CourseNavigation cid={cid} />
          </div>
        )}
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}
