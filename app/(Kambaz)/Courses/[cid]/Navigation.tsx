"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function CourseNavigation({ cid }: { cid: string }) {
  const pathname = usePathname();
  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "Grades",
    "People",
  ];

  return (
    <div id="wd-course-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link, i) => (
        <Link
          key={i}
          href={`/Courses/${cid}/${link}`}
          id={`wd-course-${link}-link`}
          className={`list-group-item  border-0  ${
            pathname.endsWith(link) ? "active" : "text-danger"
          }`}
        >
          {link}
        </Link>
      ))}
    </div>
  );
}
