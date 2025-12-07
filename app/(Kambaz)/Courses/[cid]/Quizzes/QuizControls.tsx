import { useState } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { BsPlus } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import * as client from "../../client";
import {redirect} from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";



export default function QuizControls({courseId}: {courseId: string}) {
  const [quiz, setQuiz] = useState<any>();

  const { currentUser } = useSelector((state: RootState) => state.accountReducer);


  const createQuizForCourse = async () => {
    const newQuiz = await client.createQuizForCourse(courseId, 
      {title: "New Quiz", availableFrom: new Date(), availableUntil: new Date(), dueDate: new Date(),
        questions: []
      });
    setQuiz(newQuiz);
    redirect(`/Courses/${courseId}/Quizzes/${newQuiz?._id}/edit`)
  }

  return (
    <div>
        <InputGroup size="lg" className="float-start w-50">
            <FormControl placeholder="Search for Quiz"></FormControl>
        </InputGroup>

        <Button size="lg" variant="secondary" className="float-end me-1">
            <IoEllipsisVertical />
        </Button>
        {
          currentUser?.role === "FACULTY" && 
        <Button size="lg" variant="danger" className="float-end me-1 ps-2"
          onClick={createQuizForCourse}>
            <BsPlus className="position-relative fs-3 ms-1"/>Quiz
        </Button>
        }
    </div>
  )
}
