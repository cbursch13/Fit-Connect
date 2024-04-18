import { useParams } from "react-router-dom";
import TrainerById from "../components/TrainerById";
import ProductList from "../components/ProductList";

const TrainerClasses = () => {
  const { instructorID } = useParams();
  return (
    <div className="container">
      <TrainerById trainerId={instructorID} />
      <ProductList />
    </div>
  );
};

export default TrainerClasses;