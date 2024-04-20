import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import ThoughtForm from '../components/Thought';
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
import ThoughtSection from '../components/ThoughtSection';


function CourseDetail() {
  const [state, dispatch] = useStoreContext();
  const { courseID } = useParams();

  const { loading, data } = useQuery(QUERY_ALL_COURSES);
  const [currentCourse, setCurrentCourse] = useState({});
  const { cart } = state;

  useEffect(() => {
    if (data) {
      const course = data.courses.find((product) => product._id === courseID);
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.courses,
      });
      data.courses.forEach((product) => {
        idbPromise('products', 'put', product);
      });
      setCurrentCourse(course);
    } else if (!loading) {
      idbPromise('products', 'get').then((indexedProducts) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: indexedProducts,
        });
      });
    }
  }, [data, loading, dispatch, courseID]);
  
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
        <div className='single-course'>
        <div className="container detail-container card" style={{width: '40%'}}>
          <Link to="/courses" className="back-link">View All Courses</Link>

          <h1>{currentCourse.title}</h1>

          <p>{currentCourse.description}</p>
          {currentCourse.instructor && (
            <p>
                Instructor:{' '}
                <Link to={`/trainers/${currentCourse.instructor._id}`}>
                {currentCourse.instructor.firstName} {currentCourse.instructor.lastName}
                </Link>
            </p>
          )}
          <p>
            <strong>Price:</strong> ${currentCourse.price}{' '}
            <button className="add-to-cart" onClick={addToCart}>Add to Cart</button>
            <button
              className="remove-from-cart"
              disabled={!cart.find((p) => p._id === currentCourse._id)}
              onClick={removeFromCart}
            >
              Remove from Cart
            </button>
          </p>
        </div>
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <ThoughtForm courseId={currentCourse._id} />
      {currentCourse.thoughts && (
        <ThoughtSection course={currentCourse} />
      )}
    </>
  );
}

export default CourseDetail;
