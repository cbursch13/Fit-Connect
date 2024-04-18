import { useEffect } from 'react';
import CourseItem from '../CourseItem';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_PRODUCTS } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_COURSES,} from '../../utils/queries';
import spinner from '../../assets/spinner.gif';
import { useParams } from 'react-router-dom';

function CourseCatalog() {
  const [state, dispatch] = useStoreContext();
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
  return (
    <div className="my-2">
      <h2>Our Classes:</h2>
      {state.products.length ? (
        <div className="flex-row">
          {state.products.map((course) => (
            <CourseItem
              key={course._id}
              _id={course._id}
              name={course.title}
              price={course.price}
              instructor={course.instructor}
              schedule={course.schedule}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any courses yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default CourseCatalog;
