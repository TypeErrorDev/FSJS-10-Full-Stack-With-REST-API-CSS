import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import "../src/styles/global.css";
import CourseDetail from "./components/CourseDetail";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from "./components/UpdateCourse";
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import Courses from "./components/Courses";
import NotFound from "./components/NotFound";
import UserSignOut from "./components/UserSignOut";
import PrivateRoute from "./PrivateRoute";
import { UserProvider } from "./components/UserContext";

const App = () => {
  // const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/courses")
      .then((res) => {
        // handle success
        setCourses(res.data);
        console.log(res.data[1].title);
      })
      .catch((error) => {
        // handle error
        console.log("Error fetching and parsing data", error);
      });
  }, []);

  return (
    <Router>
      <UserProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<UserSignIn />} />
            <Route path="/courses" element={<Courses courses={courses} />} />
            <Route
              path="/courses/create"
              element={
                <PrivateRoute>
                  <CreateCourse />
                </PrivateRoute>
              }
            />
            <Route
              path="/courses/:id/update"
              element={
                <PrivateRoute>
                  <UpdateCourse courses={courses} />
                </PrivateRoute>
              }
            />
            <Route
              path="/courses/:id"
              element={<CourseDetail courses={courses} />}
            />
            <Route path="/signin" element={<UserSignIn />} />
            <Route path="/signup" element={<UserSignUp />} />
            <Route path="/signout" element={<UserSignOut />} />
            <Route element={<NotFound />} />
          </Routes>
        </Suspense>
      </UserProvider>
    </Router>
  );
};

export default App;
