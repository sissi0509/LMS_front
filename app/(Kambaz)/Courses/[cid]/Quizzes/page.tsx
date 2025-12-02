import { Form, ListGroup, ListGroupItem } from "react-bootstrap";
import { PiRocketLaunch } from "react-icons/pi";
import LessonControlButtons from "../Modules/LessonControlButtons";
import QuizControls from "./QuizControls";
import { IoMdArrowDropdown } from "react-icons/io";

export default function Quizzes() {
    console.log(Form.Group);
    return (
        <div>
            <QuizControls />
            
            <br /><br /><hr />
            
            <ListGroup className="rounded-0 mt-4">
                <ListGroupItem className="p-0 mb-5 fs-5 border-gray">
                    <div className="p-3 ps-2 bg-secondary">
                        <IoMdArrowDropdown className="me-2"/><b>Assignment Quizzes</b>
                    </div>
                    <ListGroup className="rounded-0">
                        <ListGroupItem className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center justify-content-between"> 
                                <PiRocketLaunch className="me-2 ms-2 fs-3 text-success flex-shrink-0"/>
                                <div className="ms-2">
                                    <b>Q1-HTML</b><br/>
                                    <b>closed</b> | <b>Due</b> Sep 21 at 1pm | 29 pts | 11 Questions
                                </div>
                            </div>
                            <LessonControlButtons />

                        </ListGroupItem>
                        <ListGroupItem className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center justify-content-between"> 
                                <PiRocketLaunch className="me-2 ms-2 fs-3 text-success flex-shrink-0"/>
                                <div className="ms-2">
                                    <b>Q1-HTML</b><br/>
                                    <b>closed</b> | <b>Due</b> Sep 21 at 1pm | 29 pts | 11 Questions
                                </div>
                            </div>
                            <LessonControlButtons />

                        </ListGroupItem>
                        <ListGroupItem className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center justify-content-between"> 
                                <PiRocketLaunch className="me-2 ms-2 fs-3 text-success flex-shrink-0"/>
                                <div className="ms-2">
                                    <b>Q1-HTML</b><br/>
                                    <b>closed</b> | <b>Due</b> Sep 21 at 1pm | 29 pts | 11 Questions
                                </div>
                            </div>
                            <LessonControlButtons />

                        </ListGroupItem>
                        <ListGroupItem className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center justify-content-between"> 
                                <PiRocketLaunch className="me-2 ms-2 fs-3 text-success flex-shrink-0"/>
                                <div className="ms-2">
                                    <b>Q1-HTML</b><br/>
                                    <b>closed</b> | <b>Due</b> Sep 21 at 1pm | 29 pts | 11 Questions
                                </div>
                            </div>
                            <LessonControlButtons />
                        </ListGroupItem>
                    </ListGroup>
                </ListGroupItem>
            </ListGroup>
        </div>
    );
}