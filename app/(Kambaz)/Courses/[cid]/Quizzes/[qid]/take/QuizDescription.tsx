import React, { useEffect, useState } from 'react'
import * as client from "../../../../client";


export default function QuizDescription({quiz, userId}: {quiz: any; userId: string}) {

  const [quizPoint, setQuizPoint] = useState<any>(0)
  
  const get_t = (a: Date) => {
        const date = a.toLocaleDateString('en-US', {timeZone: "UTC", month: 'short', day: '2-digit'});
        const t = a.toLocaleTimeString('en-US', {timeZone: "UTC", hour: '2-digit', minute: '2-digit', hour12: true}).substring(0, 5);
        const z = a.toLocaleTimeString('en-US', {timeZone: "UTC", hour: '2-digit', minute: '2-digit', hour12: true}).substring(6, 8).toLowerCase();
        return `${date} at ${t}${z}`;
    }

  const getQuizPoint = async () => {
      const p = await client.findQuizPoints(quiz._id)
      setQuizPoint(p)
    }

  useEffect(() => {
      getQuizPoint();
    }, [])


  if (!quiz) {
    return <div>loading</div>
  }
  
  return (
    <div>
      <h1>{quiz.title}</h1>
      <hr />
      <div className='d-flex flex-wrap'>
                <div className="me-5 text-nowrap mb-1"><b>Due </b>{get_t(new Date(quiz.dueDate))}</div>
                <div className="me-5 text-nowrap mb-1"><b>Points </b>{quizPoint}</div>
                <div className="me-5 text-nowrap mb-1"><b>Questions </b>{quiz.questions?.length}</div>
                <div className="me-5 text-nowrap mb-1"><b>Available </b>{get_t(new Date(quiz.availableFrom))} - {get_t(new Date(quiz.availableUntil))}</div>

                {quiz.timeLimitMinutes > 0 ? 
                <div className="me-5 text-nowrap mb-1"><b>Time Limit</b> {quiz.timeLimitMinutes} Minutes</div>
                  :
                  ""
                }
      </div>
      <hr />

      <h2>Quiz Instructions</h2>
      
      <span>{quiz.description}</span>
      <hr />

    </div>
  )
}
