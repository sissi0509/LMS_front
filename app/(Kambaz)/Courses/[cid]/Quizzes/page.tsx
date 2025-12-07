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
import QuizCopyDetail from "./QuizCopyDetail";




export default function Quizzes() {

    const { cid } = useParams();
    const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    

    const dispatch = useDispatch();

    const fetchQuizzes = async () => {
        const quizzes = await client.findCourseQuizzes(cid as string);
        const pointUpdatedQuizzes = []

        for (const pq of quizzes) {
            const point = await client.findQuizPoints(pq._id)
            pointUpdatedQuizzes.push({...pq, points: point})
        }
        dispatch(setQuizzes(pointUpdatedQuizzes))
    }

    const fetchPublishedQuizzes = async () => {
        const quizzes = await client.findPublishedQuizzesForCourse(cid as string);
        const pointUpdatedQuizzes = [];

        for (const pq of quizzes) {
            const point = await client.findQuizPoints(pq._id)
            pointUpdatedQuizzes.push({...pq, points: point})
        }
        dispatch(setQuizzes(pointUpdatedQuizzes))
    }

    const get_t = (a: Date) => {
        const date = a.toLocaleDateString('en-US', {timeZone: "UTC", month: 'short', day: '2-digit'});
        const t = a.toLocaleTimeString('en-US', {timeZone: "UTC", hour: '2-digit', minute: '2-digit', hour12: true}).substring(0, 5);
        const z = a.toLocaleTimeString('en-US', {timeZone: "UTC", hour: '2-digit', minute: '2-digit', hour12: true}).substring(6, 8).toLowerCase();
        return `${date} at ${t}${z}`;
    }

    const currentDate = new Date();

    const setAvailability = (available_date: Date, close_date: Date) => {

        if (currentDate.getTime() >= available_date.getTime() && currentDate.getTime() <= close_date.getTime()) {
            return <><b>Available Until</b> {get_t(new Date(close_date))} | <b>Available From</b> {get_t(new Date(available_date))}</>
        } 
        else if (currentDate.getTime() > close_date.getTime()) {
            return <><b>Closed</b> | <b>Available From</b> {get_t(new Date(available_date))}</>
        }
        else if (currentDate.getTime() < available_date.getTime()) {
            return <><b>Not Available until</b> {get_t(new Date(available_date))} | <b>Available From</b> {get_t(new Date(available_date))}</>
        }
    }

    const updateQuiz = async (quizId: string, updatedQuiz: any) => {
        await client.updateQuiz(quizId, updatedQuiz);
        const newQuizzes = quizzes.map((q: any) => q._id === quizId ? updatedQuiz : q);
        dispatch(setQuizzes(newQuizzes))
    }

    const deleteQuizFromCourse = async (courseId: string, quizId: string) => {
        await client.deleteQuizFromCourse(courseId, quizId)
        dispatch(setQuizzes(quizzes.filter((quiz: any) => quiz._id !== quizId)))
    }

    // const onDeleteQuiz = async ()

    useEffect(() => {
        if (currentUser?.role === "FACULTY") {
            fetchQuizzes();
        } else {
            fetchPublishedQuizzes();
        }
    }, [])

    
    return (
        <div>
            <QuizControls courseId={cid as string} />

            <br /><br /><hr />
            {quizzes.length !== 0 ? 
                <ListGroup className="rounded-0 mt-4">
                    <ListGroupItem className="p-0 mb-5 fs-5 border-gray">
                        <div className="p-3 ps-2 bg-secondary">
                            <IoMdArrowDropdown className="me-2"/><b>Assignment Quizzes</b>
                        </div>
                        <ListGroup className="rounded-0">
                            {quizzes.map((quiz) => 
                                <ListGroupItem key={quiz._id} className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center justify-content-between"> 
                                    <PiRocketLaunch className="me-3 ms-3 fs-3 text-success flex-shrink-0"/>
                                    <div>
                                        <Link href={`/Courses/${cid}/Quizzes/${quiz._id}`} className="text-black text-decoration-none"><b>{quiz.title}</b></Link><br/>
                                        <span className="fs-6">{setAvailability(new Date(quiz.availableFrom), new Date(quiz.availableUntil))}</span> | <b className="fs-6">Due</b> <span className="fs-6">{get_t(new Date(quiz.availableUntil))}</span> | <span className="fs-6">{quiz.points} pts | {quiz.questions?.length} Questions</span>
                                    </div>
                                </div>
                                {currentUser?.role === "FACULTY" ? <QuizControlButtons cid={cid as string} quiz={quiz} updateQuiz={updateQuiz} user={currentUser} deleteQuiz={deleteQuizFromCourse} fetchQuizzes={fetchQuizzes}/> : null}
                                </ListGroupItem>
                                
                            )}
                        </ListGroup>
                    </ListGroupItem>
                </ListGroup>
                

                :
                
                
                (currentUser && currentUser.role === "FACULTY") ? 
                    <div className="d-flex justify-content-center"><h3>Please Create a Quiz by clicking +Quiz Button.</h3></div>
                    :
                    <div className="d-flex justify-content-center"><h3>There is no Quiz yet.</h3></div>


                

            }
        </div>
    );
}