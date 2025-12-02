import Link from 'next/link'
import React from 'react'
import { Button } from 'react-bootstrap'
import { BsPlus } from 'react-icons/bs'
import CancelSaveButton from '../../CancelSaveButton'

export default function QuizQuestionsEditor() {
  return (
    <div>
      <div className='d-flex justify-content-center'>
        <Button href="/Courses/1234/Quizzes/1/edit/editquestion/quiztypes" size="lg" className="background--light-gray border-0 text-black">
          <BsPlus className="fs-5"/>New Question
        </Button>
      </div>
      <br />

      <hr />
      <div className='flaot-start ms-4'>
        <CancelSaveButton />
      </div>
      


    </div>
  )
}
