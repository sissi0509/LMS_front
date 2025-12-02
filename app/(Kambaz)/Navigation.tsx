"use client";
import { RiDashboard3Line } from "react-icons/ri";
import { FaBook } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { SiMailboxdotorg } from "react-icons/si";
import { AiOutlineExperiment } from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function KambazNavigation() {
  const pathname = usePathname();
  const links = [
    { label: "Dashboard", path: "/Dashboard", icon: RiDashboard3Line },
    { label: "Courses", path: "/Dashboard", icon: FaBook },
    { label: "Calendar", path: "/Calendar", icon: FaCalendarAlt },
    { label: "Inbox", path: "/Inbox", icon: SiMailboxdotorg },
    { label: "Labs", path: "/Labs", icon: AiOutlineExperiment },
  ];

  return (
    <ListGroup
      className="rounded-0 position-fixed bottom-0 top-0 d-none d-lg-block bg-black z-2"
      style={{ width: 110 }}
      id="wd-kambaz-navigation"
    >
      <ListGroupItem
        as={Link}
        href="https://www.northeastern.edu/"
        id="wd-neu-link"
        className="bg-black border-0 text-white text-center"
        target="_blank"
      >
        <img src="/images/NEU.png" width="75px" alt="" />
      </ListGroupItem>
      <ListGroupItem
        as={Link}
        href="/Account"
        className={`border-0 text-center ${
          pathname.includes("Account")
            ? "text-danger bg-white"
            : "text-white bg-black"
        }`}
        id="wd-account-link"
      >
        <FaRegUserCircle className="fs-1" />
        <br />
        Account
      </ListGroupItem>
      {links.map(({ label, path, icon }) => (
        <ListGroupItem
          key={label}
          as={Link}
          href={path}
          className={` border-0 text-center ${
            pathname.includes(label)
              ? "text-danger bg-white"
              : "text-white bg-black"
          }`}
          id={`wd-${label.toLowerCase()}-link`}
        >
          {icon({ className: "fs-1 text-danger" })}
          <br />
          {label}
        </ListGroupItem>
      ))}
    </ListGroup>
  );
}
