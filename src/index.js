import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import store from './app/store/store';
import { Provider } from 'react-redux';
import Login from "./app/login/Login";
import App from './app/App';
import Initial from './app/menu/Initial';
import DegreeCurseSelect from './app/components/DegreeCourseSelect';
import ExamForm from './app/consultant/ExamForm';
import Exam from './app/consultant/Exam';
import ExamSearchForm from './app/consultant/ExamSearchForm';
import StudentExamSearchForm from './app/student/ExamSearchForm';
import FetchExample from './app/test/FetchExample';
import ExamResponse from './app/student/ExamResponse';
import {ReduxExample} from './app/test/ReduxExample';
import DegreesTable from './app/components/DegreesTable';
import Test from './app/test/Test';
import PdfViewTest from './app/test/PdfViewTest';
import ImageViewTest from './app/test/ImageViewTest';
import RegisterUser from "./app/login/RegisterUser";


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/app" element={<App />}>
          <Route path="/app/degreeSelect" element={<DegreeCurseSelect />} />
          <Route path="/app/initial" element={<Initial />} />
          <Route path="/app/examform" element={<ExamForm />} />
          <Route path="/app/exam" element={<Exam />} />
          <Route path="/app/examSearch" element={<ExamSearchForm />} />
          <Route path="/app/fetchExample" element={<FetchExample />} />
          <Route path="/app/reduxExample" element={<ReduxExample/>} />
          <Route path="/app/degreesTable" element={<DegreesTable/>} />
          <Route path="/app/test" element={<Test/>} />
          <Route path="/app/studentExamSearch" element={<StudentExamSearchForm />} />
          <Route path="/app/examResponse" element={<ExamResponse />} />
          <Route path="/app/pdfViewTest" element={<PdfViewTest />} />
          <Route path="/app/imageViewTest" element={<ImageViewTest />} />
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
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
