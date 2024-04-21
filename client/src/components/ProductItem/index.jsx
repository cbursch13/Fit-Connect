import { Link } from "react-router-dom";
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

function ProductItem(item) {
  const [state, dispatch] = useStoreContext();
  console.log(state);
  const {
    title,
    _id,
    price,
    schedule
  } = item;

  const { cart } = state

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      idbPromise('courses', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      console.log(item);
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 }
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }
    console.log(state);
  }

  return (
    <div className="course-container">
    <div className="card px-1 py-1">
      <Link to={`/courses/${_id}`} className="card-link">
        <p>{title}</p>
      </Link>
      <div>
        <span>${price}</span> <br />
        <span>{schedule}</span>
      </div>
      <button style={{marginTop: '20px'}} onClick={addToCart}>Add to cart</button>
    </div>
    </div>
  );
}

export default ProductItem;
