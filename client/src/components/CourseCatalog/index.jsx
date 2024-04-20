import React, { useEffect } from 'react';
import CourseItem from '../CourseItem';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_PRODUCTS } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_COURSES } from '../../utils/queries';
import spinner from '../../assets/spinner.gif';

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

  return (
    <div className="my-2" style={{ paddingTop: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 style={{marginTop: '50px', marginBottom: '20px'}}>Our Courses:</h2>
      {state.products.length ? (
        <div className="flex-row" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '30px'}}>
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
