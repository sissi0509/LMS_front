"use client";
import Link from 'next/link';
import { useEffect, useState } from "react";
import * as client from "../../../client";
import { Button } from 'react-bootstrap'
import { PiPencilLight } from "react-icons/pi";
import { IoCheckmarkCircle } from 'react-icons/io5';
import { FaBan } from 'react-icons/fa6';


export default function QuizDetailControl({courseId, quizId}: 
  {courseId: string; quizId: string}) {


    const [quiz, setQuiz] = useState<any>({})

    const getQuizById = async () => {
      const newQuiz = await client.getQuizById(quizId);
      setQuiz(newQuiz)
    }

    const updatePublished = async () => {
      const updated = await client.updateQuiz(quizId, {...quiz, published: !quiz.published})
      setQuiz(updated)
    }
    
    useEffect(() => {
      getQuizById();
    }, [])

    console.log(quiz)
        
    return (
    <div className="d-flex justify-content-center">

      {
        quiz.published ? 
          <Button variant="success" size="lg" className="me-1" onClick={updatePublished}><IoCheckmarkCircle className="fs-4" />  Published</Button>
        :
          <Button variant="danger" size="lg" className="me-1" onClick={updatePublished}><FaBan />  Unpublished</Button>

      }
        
        <Button size="lg" variant="light" className="border-secondary text-black me-1"
          href={`/Courses/${courseId}/Quizzes/${quizId}/take?preview=1`}>Preview</Button>
        <Link className="btn ps-3 pt-2 pe-3 pb-2 border-secondary bg-light text-black" href={`/Courses/${courseId}/Quizzes/${quizId}/edit`}>
            <PiPencilLight className="fs-4 left-right-flip"/>
            <span className="fs-5">Edit</span>
        </Link>
    </div>
  )
}
