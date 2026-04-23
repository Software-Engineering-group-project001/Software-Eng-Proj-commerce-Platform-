import { AiFillRobot } from "react-icons/ai";
import { Link } from "react-router-dom";

const AIButton  = () => {
  return (
    <Link to="/ai" className="ai-float">
      <AiFillRobot size={40} />
    </Link>
  );
};

export default AIButton 