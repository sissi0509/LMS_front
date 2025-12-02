import { Button, FormControl, InputGroup } from "react-bootstrap";
import { BsPlus } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";


export default function QuizControls() {
  return (
    <div>
        <InputGroup size="lg" className="float-start w-50">
            <FormControl placeholder="Search for Quiz"></FormControl>
        </InputGroup>

        <Button size="lg" variant="secondary" className="float-end me-1">
            <IoEllipsisVertical />
        </Button>
        <Button size="lg" variant="danger" className="float-end me-1 ps-2">
            <BsPlus className="position-relative fs-3 ms-1"/>Quiz
        </Button>
    </div>
  )
}
