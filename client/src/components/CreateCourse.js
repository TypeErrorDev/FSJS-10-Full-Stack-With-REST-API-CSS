import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import Header from "./Header";

const CreateCourse = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  let [courseTitle, setCourseTitle] = useState("");
  let [courseDescription, setCourseDescription] = useState("");
  let [courseEstimatedTime, setCourseEstimatedTime] = useState("");
  let [courseMaterialsNeeded, setCourseMaterialsNeeded] = useState("");

  const [valErrors, setValErrors] = useState([]);

  const addCourse = async () => {
    await fetch("http://localhost:5000/api/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(`${user.emailAddress}:${user.password}`),
      },
      body: JSON.stringify({
        title: courseTitle,
        description: courseDescription,
        estimatedTime: courseEstimatedTime,
        materialsNeeded: courseMaterialsNeeded,
        userId: user.id,
      }),
    })
      .then((res) => {
        if (res.status === 201) {
          console.log("Success");
        } else if (res.status === 400) {
          return res.json().then((data) => {
            return data.errors;
          });
        } else {
          throw new Error("Error: There was a server error");
        }
      })
      .then((errors) => (errors ? setValErrors(errors) : navigate("/")))
      .catch((err) => {
        console.log("Error related to course creation", err);
      });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValErrors([]);
    if (courseTitle === "" || courseTitle === null) {
      setValErrors((prevState) => [...prevState, "A course title is Required"]);
    }
    if (courseDescription === "" || courseDescription === null) {
      setValErrors((prevState) => [
        ...prevState,
        "A course description is Required",
      ]);
    }
    if (
      courseTitle !== "" &&
      courseTitle !== null &&
      courseDescription !== null &&
      courseDescription !== ""
    ) {
      addCourse();
    }
  };
  return (
    <React.Fragment>
      <Header />
      <div className="wrap">
        <h2>Create Course</h2>
        {valErrors.length !== 0 ? (
          <div className="validation--errors">
            <h3>Validation Errors</h3>
            <ul>
              {valErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <form onSubmit={handleSubmit}>
          <div className="main--flex">
            <div>
              <label>
                Course Title
                <input
                  id="courseTitle"
                  name="courseTitle"
                  type="text"
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                />
              </label>
              <p>By Joe Smith</p>

              <label>
                Course Description
                <textarea
                  id="courseDescription"
                  name="courseDescription"
                  value={courseDescription}
                  onChange={(e) => setCourseDescription(e.target.value)}
                ></textarea>
              </label>
            </div>
            <div>
              <label>
                Estimated Time
                <input
                  id="estimatedTime"
                  name="estimatedTime"
                  type="text"
                  value={courseEstimatedTime}
                  onChange={(e) => setCourseEstimatedTime(e.target.value)}
                />
              </label>
              <label>
                Materials Needed
                <textarea
                  id="materialsNeeded"
                  name="materialsNeeded"
                  value={courseMaterialsNeeded}
                  onChange={(e) => setCourseMaterialsNeeded(e.target.value)}
                ></textarea>
              </label>
            </div>
          </div>
          <button className="button" type="submit" onClick={handleSubmit}>
            Create Course
          </button>
          <button className="button button-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default CreateCourse;
