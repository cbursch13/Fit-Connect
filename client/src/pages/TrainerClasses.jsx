import { useParams } from "react-router-dom";
import TrainerById from "../components/TrainerById";
import ProductList from "../components/ProductList";
import Cart from "../components/Cart";

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