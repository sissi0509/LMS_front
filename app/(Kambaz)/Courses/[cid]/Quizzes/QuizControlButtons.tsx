import { IoEllipsisVertical } from "react-icons/io5";
import QuizCheckMark from "./QuizCheckMark";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "react-bootstrap";
import { useState } from "react";
import Link from "next/link";
export default function QuizControlButtons(
  {cid, quiz, updateQuiz, user } : 
  {cid: string; quiz: any; updateQuiz: (quizId: string, updatedData: any) => void; user: any}) {

  const [showCopyDetail, setCopyDetail] = useState(false);

  return (
    <div className="d-flex gap-2 align-items-center">
      <QuizCheckMark publishStatus={quiz.published}/>
      
      <Dropdown>
        <DropdownToggle as="button" className="border-0 bg-transparent" bsPrefix="dropdown-toggle-no-caret" 
            >
            <IoEllipsisVertical className="fs-4" />
        </DropdownToggle>
        <DropdownMenu>
            <DropdownItem href={`/Courses/${cid}/Quizzes/${quiz._id}`}>
                Edit
            </DropdownItem>
            <DropdownItem>
                Delete
            </DropdownItem>
            <DropdownItem onClick={() => updateQuiz(quiz._id, {...quiz, published: !quiz.published})}>
                {quiz.published ? "Unpublish" : "Publish"}
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
