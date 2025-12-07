import React, { useEffect, useState } from 'react';
import * as client from "../../client";
import { useSelector } from 'react-redux';
import { RootState } from "../../../store";
import { Alert, Button, Dropdown, FormControl } from 'react-bootstrap';
import Link from 'next/link';

export default function QuizCopyDetail({quiz, cid, setShow, showStatus, fetchQuizzes} : 
  {quiz: any; cid: string; setShow: (show: boolean) => void; showStatus: boolean; fetchQuizzes: (cid: string) => void}) {

  const { currentUser } = useSelector((state: RootState) => state.accountReducer);

  const [courses, setCourses] = useState<any>([])
  const [copying, setCopying] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState("Show my Courses")

  const [completeCopy, setCompleteCopy] = useState(false)
  const [copyCourse, setCopyCourse] = useState("")

  const copyQuizForCourse = async (courseId: string, quizId: string) => {
    if (courseId === "Show my Courses") {
      return
    }
    await client.copyQuiz(courseId, quizId)
    if (courseId === cid) {
      fetchQuizzes(cid)
    }
  }


  const fetchMyCourses = async () => {
    const courses = await client.findMyCourses()
    setCourses(courses)
  }

  useEffect(() => {
      fetchMyCourses();
    }, [currentUser]);

  console.log(courses)
  return (
    <div className="position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25 z-3">

      {
        completeCopy ? 
          <Alert variant="success">
            Submission completed! Please go to the course to {selectedCourse} to check it!
          </Alert>
        :

        ""
      }

      <Dropdown>
        <Dropdown.Toggle variant="secondary" className="w-100">{selectedCourse}</Dropdown.Toggle>
        <Dropdown.Menu className="w-100">
          {
            courses.map((c: any) => (
              <Dropdown.Item key={c._id}
                onClick={() => {
                  setSelectedCourse(c.name)
                  setCopyCourse(c._id)
                }}
                >{c.name}
              </Dropdown.Item>
          ))
          }
          <Dropdown.Item onClick={() => setSelectedCourse("Show my Courses")}>Show my Courses</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      
      <br /><br />
      <Button className="btn-secondary" onClick={() => setShow(!showStatus)}>Cancel</Button>
      <Button onClick={() => 
        {
          if (selectedCourse !== "Show my Courses") { 
            copyQuizForCourse(copyCourse, quiz._id);
            setCompleteCopy(true) }
          }} className="btn btn-danger float-end">Copy</Button>
    </div>
  )
}
