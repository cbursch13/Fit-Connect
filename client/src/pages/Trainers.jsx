import TrainerList from "../components/TrainerList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";

const Trainers = () => {
  return (
    <div className="container">
      <CategoryMenu />
      <TrainerList />
      <Cart />
    </div>
  );
};

export default Trainers;