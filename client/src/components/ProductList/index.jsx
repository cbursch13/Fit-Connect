import { useEffect, useState } from 'react';
import ProductItem from '../ProductItem';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_PRODUCTS } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_COURSES,} from '../../utils/queries';
import spinner from '../../assets/spinner.gif';
import { useParams } from 'react-router-dom';

function ProductList() {
  const [state, dispatch] = useStoreContext();

  const { instructorID } = useParams();
  // const [currentInstructor, setCurrentInstructor] = useState(instructorID);
  // console.log(currentInstructor);

  const { loading, data } = useQuery(QUERY_ALL_COURSES);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.courses,
      });
    }
  }, [data, loading, dispatch]);

  console.log(state.products);
  const courses = state.products.filter(course => course.instructor._id === instructorID);
  console.log(courses);
  return (
    <div className="my-2">
      <h2>Our Classes:</h2>
      {courses.length ? (
        <div className="flex-row">
          {courses.map((course) => (
            <ProductItem
              key={course._id}
              _id={course._id}
              name={course.title}
              price={course.price}
            />
          ))}
        </div>
      ) : (
        <h3>No available courses!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ProductList;
