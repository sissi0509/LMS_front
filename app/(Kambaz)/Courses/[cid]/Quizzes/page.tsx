"use client"
import { Form, ListGroup, ListGroupItem } from "react-bootstrap";
import { PiRocketLaunch } from "react-icons/pi";
import QuizControls from "./QuizControls";
import { IoMdArrowDropdown } from "react-icons/io";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import * as client from "../../client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setQuizzes } from "./reducer";
import Link from "next/link";
import QuizControlButtons from "./QuizControlButtons";




export default function Quizzes() {

    const { cid } = useParams();
    const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);


    const dispatch = useDispatch();

    const fetchQuizzes = async () => {
        const quizzes = await client.findCourseQuizzes(cid as string);
        const pointUpdatedQuizzes = await quizzes.map((pq: any) => ({...pq, points:  client.findQuizPoints(pq._id)}))
        dispatch(setQuizzes(pointUpdatedQuizzes))
    }

    const currentDate = new Date();

    const setAvailability = (available_date: Date, close_date: Date) => {

        if (currentDate.getTime() >= available_date.getTime() && currentDate.getTime() <= close_date.getTime()) {
            return "Available"
        } 
        else if (currentDate.getTime() > close_date.getTime()) {
            return "Closed"
        }
        else if (currentDate.getTime() < available_date.getTime()) {
            return `Not Available until ${available_date}`
        }
    }

    const get_t = (a: Date) => {
        const date = a.toLocaleDateString('en-US', {month: 'short', day: '2-digit'});
        const t = a.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: true}).substring(0, 5);
        const z = a.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: true}).substring(6, 8).toLowerCase();
        return `${date} at ${t}${z}`;
    }

    // const onDeleteQuiz = async ()

    useEffect(() => {
        fetchQuizzes();
    }, [])

    
    return (
        <div>
            <QuizControls />
            
            <br /><br /><hr />
            {quizzes.length !== 0 ? 
                <ListGroup className="rounded-0 mt-4">
                    <ListGroupItem className="p-0 mb-5 fs-5 border-gray">
                        <div className="p-3 ps-2 bg-secondary">
                            <IoMdArrowDropdown className="me-2"/><b>Assignment Quizzes</b>
                        </div>
                        <ListGroup className="rounded-0">
                            {quizzes.map((quiz) => 
                                <Link key={quiz._id} href={`/Courses/${cid}/Quizzes/${quiz._id}`} className="text-decoration-none">
                                    <ListGroupItem className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center justify-content-between"> 
                                        <PiRocketLaunch className="me-2 ms-2 fs-3 text-success flex-shrink-0"/>
                                        <div className="ms-2">
                                            <b>{quiz.title}</b><br/>
                                            <b>{setAvailability(new Date(quiz.availableFrom), new Date(quiz.availableUntil))}</b> | <b>Due</b> <span>{get_t(new Date(quiz.availableUntil))}</span> | {quiz.points}pts | {quiz.questions.length} Questions
                                        </div>
                                    </div>
                                    {currentUser?.role === "FACULTY" ? <QuizControlButtons cid={cid as string} quizId={quiz._id} /> : null}
                                    </ListGroupItem>
                                </Link>
                                
                            )}
                        </ListGroup>
                    </ListGroupItem>
                </ListGroup>

                :

                <div>Please Create a Quiz.</div>

            }
        </div>
    );
}