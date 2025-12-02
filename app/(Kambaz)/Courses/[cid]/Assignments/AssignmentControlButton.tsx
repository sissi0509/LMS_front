import { IoEllipsisVertical } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";

export default function LessonControlButtons() {
  return (
    <div className="d-flex gap-2 align-items-center ">
      <span className="rounded-pill text-black border border-dark me-2 p-2 fs-6">
        40% of Total
      </span>
      <IoMdAdd className="fs-4" />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
