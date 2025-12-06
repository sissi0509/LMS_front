import { Nav, NavItem, NavLink } from "react-bootstrap";

export default function QuizDetailEditorControl() {
  return (
    <div>
        <Nav variant="tabs">
            <NavItem>
                {/* <NavLink href="#">Details</NavLink> */}
                <button className=""></button>
            </NavItem>
            <NavItem>
                <NavLink href="#/Courses/1234/Quizzes/1/edit/a">Questions</NavLink>
            </NavItem>
        </Nav>
    </div>
  )
}
