import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import Login from "./Login"
import App from './app/App';
import Initial from './app/components/Initial';
import DegreeCurseSelect from './app/components/DegreeCourseSelect';
import CreateExam from './app/components/CreateExam';
import Exam from './app/components/Exam';


ReactDOM.render(
  <BrowserRouter>
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/app" element={<App />}>
          <Route path="/app/degreeselect" element={<DegreeCurseSelect/>}/>
          <Route path="/app/initial" element={<Initial/>}/>
          <Route path="/app/createexam" element={<CreateExam/>}/>
          <Route path="/app/exam" element={<Exam/>}/>          
        </Route>
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
