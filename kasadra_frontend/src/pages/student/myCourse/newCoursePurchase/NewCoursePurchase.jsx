// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchStudentCourses } from "../../../../features/student/myCourse/newCoursePurchase/newCoursePurchase";
// import "../../../../styles/student/myCourse/newCoursePurchase/NewCoursePurchase.css";
// import Studentnavbar from "../../../../components/Studentnavbar";

// const NewCoursePage = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { courses, loading, error } = useSelector(
//     (state) => state.studentCourses
//   );

//   useEffect(() => {
//     dispatch(fetchStudentCourses());
//   }, [dispatch]);

//   return (
//     <div className="new-course-page">
//       <div className="new-course-container">
//         <Studentnavbar />
//         <h1>New Courses</h1>
//         <div className="course-np">
//           <p>Welcome! Choose your first course</p>
//         </div>

//         {loading && <div className="spinner"></div>}
//         {error && <p style={{ color: "red" }}>{error}</p>}

//         {!loading && !error && (
//           <div className="courses-grid">
//             {courses.length > 0 ? (
//               courses.map((course) => {
//                 // const thumbnail = course.thumbnail?.startsWith("http")
//                 //   ? course.thumbnail
//                 //   : `http://localhost:8000/${course.thumbnail}`;

//                 return (
//                   <div className="course-card" key={course.id}>
//                     <img
//                       src={course.thumbnail}
//                       alt={course.title}
//                       className="course-thumbnail"
//                     />
//                     {/* <h2>{course.thumbnail}</h2> */}
//                     <h3 className="course-heading">
//                       <b>{course.title}</b>
//                     </h3>
//                     <p className="Para-des">{course.description}</p>
//                     <button
//                       onClick={() =>
//                           navigate(`/student/course/${course.id}/course-overview`)
//                       }
//                     >
//                       Enrollnow
//                     </button>
//                   </div>
//                 );
//               })
//             ) : (
//               <p>No courses available yet.</p>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default NewCoursePage;

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentCourses } from "../../../../features/student/myCourse/newCoursePurchase/newCoursePurchase";
import "../../../../styles/student/myCourse/newCoursePurchase/NewCoursePurchase.css";
import Studentnavbar from "../../../../components/Studentnavbar";

const NewCoursePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courses, loading, error } = useSelector(
    (state) => state.studentCourses
  );

  useEffect(() => {
    dispatch(fetchStudentCourses());
  }, [dispatch]);

  return (
    <div className="new-course-pages">
      <div className="new-course-container-container">
        <Studentnavbar />
       
          <h1 className="my-course-heading">New Courses</h1>
          <div className="course-np">
            <p>Welcome! Choose your first course</p>
        </div>
        {loading && <div className="spinner"></div>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && !error && (
          <div className="courses-grid">

            {courses.length > 0 ? (
              courses.map((course) => {

                return (
                  <div className="new-course-containers">
                    <div className="course-card col-md-4 col-sm-6 mb-4" key={course.id}>
                      <div className="course-infos">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="course-thumbnail"
                        />
                        {/* <h2>{course.thumbnail}</h2> */}
                        {/* <div className="course-info"> */}
                        <h3 className="course-heading">
                          <b>{course.title}</b>
                        </h3>
                        <p className="Para-des">{course.description}</p>
                        <button
                          onClick={() =>
                            navigate(`/student/course/${course.id}/course-overview`)
                          }
                        >
                          Enrollnow
                        </button>
                      </div>
                    </div>
                  </div>

                );

              })
            ) : (
              <p>No courses available yet.</p>
            )}
          </div>
        )}
      </div>
    </div>

  );
};

export default NewCoursePage;

