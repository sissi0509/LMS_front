import { IoEllipsisVertical } from "react-icons/io5";
import QuizCheckMark from "./QuizCheckMark";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "react-bootstrap";
import { useState } from "react";
import Link from "next/link";
export default function QuizControlButtons({cid, quizId } : {cid: string; quizId: string}) {

    const [open, setOpen] = useState(false);
  return (
    <div className="d-flex gap-2 align-items-center" onClick={event => event.preventDefault()}>
      <QuizCheckMark />
      
      <Dropdown>
        <DropdownToggle as="button" className="border-0 bg-transparent mb-2" bsPrefix="dropdown-toggle-no-caret" 
            >
            <IoEllipsisVertical className="fs-4" />
        </DropdownToggle>
        <DropdownMenu>
            <DropdownItem>
                <Link href={`/Courses/${cid}/Quizzes/${quizId}`} className="text-decoration-none text-black">Edit</Link>
            </DropdownItem>
            <DropdownItem>
                Delete
            </DropdownItem>
            <DropdownItem>
                Publish
            </DropdownItem>
            <DropdownItem>
                Copy
            </DropdownItem>
            <DropdownItem>
                Sort by Name
            </DropdownItem>
        </DropdownMenu>

      </Dropdown>
    </div>
  );
}
