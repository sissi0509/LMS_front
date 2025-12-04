"use client"
import { Button, Col, Nav, NavItem, NavLink, Row, Table } from "react-bootstrap";
import { FaEllipsisVertical } from "react-icons/fa6";
import { MdDoNotDisturb } from "react-icons/md";
import QuizDetailControl from "./QuizDetailControl";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

export default function QuizDetailsScreen() {
    const {qid} = useParams();
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    return (
        <div>
            {currentUser?.role === "FACULTY" ? 
                <div>
                <QuizDetailControl />
                <hr />
                <h2>Q1-HTML</h2>

                <Row>
                    <Col xs="2" className="text-end">Quiz Type</Col>
                    <Col>
                        Graded Quiz
                    </Col>
                </Row>
                <Row>
                    <Col xs="2"  className="text-end">Points</Col>
                    <Col>29</Col>
                </Row>
                <Row>
                    <Col xs="2" className="text-end">Assignment Group</Col>
                    <Col>QUIZZES</Col>
                </Row>
                <Row>
                    <Col xs="2"  className="text-end">Shuffle Answers</Col>
                    <Col>No</Col>
                </Row>
                <Row>
                    <Col xs="2" className="text-end">Time Limit</Col>
                    <Col>30 Minutes</Col>
                </Row>
                <Row>
                    <Col xs="2"  className="text-end">Multiple Attempts</Col>
                    <Col>No</Col>
                </Row>
                <Row>
                    <Col xs="2"  className="text-end">View Responses</Col>
                    <Col>Always</Col>
                </Row>
                                <Row>
                    <Col xs="2"  className="text-end">Show Correct Answers</Col>
                    <Col>Immediately</Col>
                </Row>
                                <Row>
                    <Col xs="2" className="text-end">One Question at a Time</Col>
                    <Col>Yes</Col>
                </Row>
                                <Row>
                    <Col xs="2" className="text-end">Require Respondus LockDown Browser</Col>
                    <Col>No</Col>
                </Row>
                                <Row>
                    <Col xs="2" className="text-end">Required to View Quiz Results</Col>
                    <Col>No</Col>
                </Row>
                                <Row>
                    <Col xs="2" className="text-end">Webcam Required</Col>
                    <Col>No</Col>
                </Row>
                                <Row>
                    <Col xs="2" className="text-end">Lock Questions After Answering</Col>
                    <Col>No</Col>
                </Row>
                <br />

                <Table className="border-secondary">
                    <thead>
                        <tr><th>Due</th><th>For</th><th>Available from</th><th>Until</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>Sep 21 at 1pm</td><td>Everyone</td><td>Sep 21 at 11:40am</td><td>Sep 21 at 1pm</td></tr>
                    </tbody>
                </Table>
                </div>
            :
                <div>
                    Hello
                </div>

            }   

        </div>
    );
}