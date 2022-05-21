import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import store from './app/store/store'
import { Provider } from 'react-redux'
import Login from "./Login"
import App from './app/App';
import Initial from './app/components/Initial';
import DegreeCurseSelect from './app/components/DegreeCourseSelect';
import ExamForm from './app/components/ExamForm';
import Exam from './app/components/Exam';
import ExamSearchForm from './app/components/ExamSearchForm';
import FetchExample from './app/components/FetchExample';
import {ReduxExample} from './app/components/ReduxExample';


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/app" element={<App />}>
          <Route path="/app/degreeselect" element={<DegreeCurseSelect />} />
          <Route path="/app/initial" element={<Initial />} />
          <Route path="/app/examform" element={<ExamForm />} />
          <Route path="/app/exam" element={<Exam />} />
          <Route path="/app/examSearch" element={<ExamSearchForm />} />
          <Route path="/app/fetchExample" element={<FetchExample />} />
          <Route path="/app/reduxExample" element={<ReduxExample/>} />
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
