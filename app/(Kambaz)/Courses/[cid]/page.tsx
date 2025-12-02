"use client";
import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function CoursesPage() {
  const router = useRouter();
  const { cid } = useParams();

  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const enrollments = useSelector(
    (state: RootState) => state.enrollmentsReducer.enrollments
  );

  const isEnrolled = enrollments.some(
    (e) => e.user === currentUser?._id && e.course === cid
  );

  useEffect(() => {
    if (!currentUser) {
      router.push("/Account/Signin");
      return;
    }

    if (!isEnrolled) {
      router.push("/Dashboard");
      return;
    }

    router.push(`/Courses/${cid}/Home`);
  }, [currentUser, isEnrolled, router, cid]);

  return null;
}
