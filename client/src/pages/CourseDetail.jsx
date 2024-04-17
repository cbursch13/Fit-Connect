import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Cart from '../components/Cart';
import { useStoreContext } from '../utils/GlobalState';
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PRODUCTS,
} from '../utils/actions';
import { QUERY_ALL_COURSES } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import spinner from '../assets/spinner.gif';

function CourseDetail() {
  const [state, dispatch] = useStoreContext();
  const { courseID } = useParams();

  const { loading, data } = useQuery(QUERY_ALL_COURSES);
  const [currentCourse, setCurrentCourse] = useState({});
  console.log(data);
  let instructor; 
  const { cart } = state;
  useEffect(() => {
    // already in global store
    if (data) {
        console.log(data);
        setCurrentCourse(data.courses.find((product) => product._id === courseID));
        instructor = currentCourse.instructor;
    }
    // retrieved from server
    if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.courses,
      });

      data.courses.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise('products', 'get').then((indexedProducts) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: indexedProducts,
        });
      });
    }
  }, [data, loading, dispatch, courseID]);
  

  console.log(currentCourse.instructor);
  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === courseID);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: courseID,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...currentCourse, purchaseQuantity: 1 },
      });
      idbPromise('cart', 'put', { ...currentCourse, purchaseQuantity: 1 });
    }
  };

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentCourse._id,
    });

    idbPromise('cart', 'delete', { ...currentCourse });
  };
  return (
    <>
      {currentCourse && cart ? (
        <div className="container detail-container">
          <Link to="/courses">View All Courses</Link>

          <h1>{currentCourse.title}</h1>

          <p>{currentCourse.description}</p>
          {/* <p>Instructor: <Link to={`/trainers/${currentCourse.instructor._id}`}>  {currentCourse.instructor.firstName} {currentCourse.instructor.lastName}  </Link></p> */}
          <p>
            <strong>Price:</strong>${currentCourse.price}{' '}
            <button onClick={addToCart}>Add to Cart</button>
            <button
              disabled={!cart.find((p) => p._id === currentCourse._id)}
              onClick={removeFromCart}
            >
              Remove from Cart
            </button>
          </p>

          <img
            src={`/images/${currentCourse.image}`}
            alt={currentCourse.name}
          />
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart />
    </>
  );
}

export default CourseDetail;
