// Page with one trainer and a listing of their courses
import { useParams } from "react-router-dom";
import TrainerById from "../components/TrainerById";
import CourseList from "../components/CourseList";

const TrainerClasses = () => {
  const { instructorID } = useParams();
  return (
    <div className="container">
      <h1>Comments</h1>
      <TrainerById trainerId={instructorID} />
      <CourseList />
    </div>
  );
};

export default TrainerClasses;