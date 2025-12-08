import Link from "next/link";
import React from "react";

export default function Labs() {
  return (
    <div>
      <h1>Group Project Information:</h1>
      <h3>Session 4</h3>
      <h4>Name:</h4>
      <ul>
        <li>
          <strong>Xi Zhao</strong>
        </li>
        <li>
          {" "}
          <strong>Eunjin Lee</strong>
        </li>
      </ul>

      <ul>
        <li>
          <Link
            href="https://github.com/sissi0509/LMS_front"
            target="_blank"
            rel="noopener noreferrer"
          >
            front end GitHub
          </Link>
        </li>
        <li>
          <Link
            href="https://github.com/sissi0509/LMS_back"
            target="_blank"
            rel="noopener noreferrer"
          >
            server project Github
          </Link>
        </li>
      </ul>
    </div>
  );
}
