import React, { useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import UserContext from "../context/UserContext";
import ReactMarkdown from "react-markdown";

const Courses = (props) => {
  let navigate = useNavigate();
  const { user } = useContext(UserContext);
  let { courses } = props;

  let { id } = useParams();
  let newID = parseInt(id);

  const index = courses.findIndex((course) => course.id === newID);
  let course = courses[index];
  let updateCourseURL = `/courses/${newID}/update`;

  const deleteCourse = async () => {
    await fetch(`http://localhost:3001/api/courses/${newID}`, {
      method: "DELETE",
      headers: {
        Authorization: "Basic " + btoa(`${user.emailAddress}:${user.password}`),
      },
    })
      .then((res) => {
        if (res.status === 204) {
          console.log("Success");
        } else if (res.status === 401) {
          return res.json().then((data) => {
            return console.log(data.errors);
          });
        } else {
          throw new Error("Error: There was a server error");
        }
      })
      .then((errors) => (errors ? console.log(errors) : navigate("/")))
      .catch((err) => {
        console.log("Error related to course creation", err);
      });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    deleteCourse();
    navigate("/");
  };

  if (user !== null && user.id === course.userId) {
    return (
      <React.Fragment>
        <>
          <div className="actions--bar">
            <div className="wrap">
              <Link className="button" to={updateCourseURL}>
                Update Course
              </Link>
              <button className="button" onClick={handleDelete}>
                Delete Course
              </button>
              <Link className="button-secondary button" to="/">
                Return to List
              </Link>
            </div>
          </div>

          <div className="wrap">
            <h2>Course Detail</h2>
            <form>
              <div className="main--flex">
                <div>
                  <h3 className="course--detail--title">Course</h3>
                  <h4 className="course--name">{course.title}</h4>
                  <p>
                    By: {course.user.firstName} {course.user.lastName}
                  </p>
                  <ReactMarkdown children={course.description} />
                </div>
                <h3 className="course--detail--title">Materials Needed</h3>
                <ul className="course--detail--list">
                  <ReactMarkdown children={course.materialsNeeded} />
                </ul>
              </div>
            </form>
          </div>
        </>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <>
          <div className="actions--bar">
            <div className="wrap">
              <Link className="button-secondary" to="/">
                Return to List
              </Link>
            </div>
          </div>

          <div className="wrap">
            <h2>Course Detail</h2>
            <form>
              <div className="main--flex">
                <div>
                  <h2 className="course--detail--title">Course</h2>
                  <h4 className="course--name">{course.title}</h4>
                  <p>
                    By:{course.user.firstName} {course.user.lastName}
                  </p>
                  <ReactMarkdown children={course.description} />
                </div>

                <div>
                  <h3 className="course--detail--title">Estimated Time</h3>
                  <p>{course.estimatedTime}</p>

                  <h3 className="course--detail--title">Materials Needed</h3>
                  <ul className="course--detail--list">
                    <ReactMarkdown children={course.materialsNeeded} />
                  </ul>
                </div>
              </div>
            </form>
          </div>
        </>
      </React.Fragment>
    );
  }
};
export default Courses;
