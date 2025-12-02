"use client";
import React from "react";
import { usePathname } from "next/navigation";

export default function Breadcrumb({
  course,
  assignment,
}: {
  course: { name: string } | undefined;
  assignment?: { number: string } | undefined;
}) {
  const pathname = usePathname();

  return (
    <span>
      Course {course?.name} &gt; {pathname.split("/").pop()}
      {assignment ? ` &gt; Assignment ${assignment.number}` : ""}
    </span>
  );
}
