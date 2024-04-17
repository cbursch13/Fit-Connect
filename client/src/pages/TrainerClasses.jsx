import TrainerById from "../components/TrainerById";
import ProductList from "../components/ProductList";
import Cart from "../components/Cart";

const TrainerClasses = () => {
  return (
    <div className="container">
      <TrainerById />
      <ProductList />
      <Cart />
    </div>
  );
};

export default TrainerClasses;