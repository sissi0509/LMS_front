import { FaCheckCircle, FaCircle } from "react-icons/fa";
import { FaBan } from "react-icons/fa";

export default function GreenCheckmark({publishStatus}: {publishStatus: boolean}) {
  return (
    <span>
    {publishStatus ? 
      <span className="me-1">
        <FaCheckCircle
          className="text-success fs-4"
        />
      </span>

      :
      <span className="me-1">
        <FaBan 
              className="text-danger fs-4"/>
      </span>

    }
    </span>
  );
}
