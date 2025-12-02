"use client";
import Modules from "../Modules/page";
import CourseStatus from "./Status";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useEffect } from "react";
export default function Home() {
  const router = useRouter();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  useEffect(() => {
    if (!currentUser) {
      router.replace("/Account/Signin");
    }
  }, [currentUser, router]);

  return (
    <div className="d-flex" id="wd-home">
      <div className="flex-fill">
        <Modules />
      </div>
      <div className="d-none ms-5  d-xl-block">
        <CourseStatus />
      </div>
    </div>
  );
}
