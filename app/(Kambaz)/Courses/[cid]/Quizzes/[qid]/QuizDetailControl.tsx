import Link from 'next/link';
import { Button } from 'react-bootstrap'
import { PiPencilLight } from "react-icons/pi";


export default function QuizDetailControl({courseId, quizId}: {courseId: string; quizId: string}) {
  return (
    <div className="d-flex justify-content-center">
        <Button size="lg" variant="light" className="border-secondary text-black me-1"
          href={`/Courses/${courseId}/Quizzes/${quizId}/take?preview=1`}>Preview</Button>
        <Link className="btn ps-3 pt-2 pe-3 pb-2 border-secondary bg-light text-black" href={`/Courses/${courseId}/Quizzes/${quizId}/edit`}>
            <PiPencilLight className="fs-4 left-right-flip"/>
            <span className="fs-5">Edit</span>
        </Link>
    </div>
  )
}
