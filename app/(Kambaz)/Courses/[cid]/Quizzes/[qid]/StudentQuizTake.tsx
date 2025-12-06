import React from 'react'
import { Button } from 'react-bootstrap'

export default function StudentQuizTake({cid, quiz}: {cid: string, quiz: any}) {

  
  return (
    <div>
        <h1>Title</h1>
        <hr />
            <div className='d-flex flex-wrap'>
                <div className="me-5 text-nowrap mb-1"><b>Due </b>Dec 8 at 11:59</div>
                <div className="me-5 text-nowrap mb-1"><b>Points </b>20</div>
                <div className="me-5 text-nowrap mb-1"><b>Questions </b>2</div>
                <div className="me-5 text-nowrap mb-1"><b>Available </b>Dec 1 at 12am - Dec 8 at 11:59pm</div>
                <div className="me-5 text-nowrap mb-1"><b>Time Limit</b> 20 Minutes</div>
            </div>
        <hr />
        <div>{quiz.description}</div>
        <br />
        <div className="d-flex justify-content-center">
        <Button className="btn-danger rounded-1" href={`/Courses/${cid}/Quizzes/${quiz._id}/take`}>Take the Quiz</Button>
        </div>
        <br />
        <hr />



    </div>
  )
}
