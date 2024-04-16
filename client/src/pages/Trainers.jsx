import TrainerList from "../components/TrainerList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";

const Home = () => {
  return (
    <div className="container">
      <CategoryMenu />
      <TrainerList />
      <Cart />
    </div>
  );
};

export default Home;
