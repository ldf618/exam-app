
import React from 'react';
import HeaderUserInfo from 'components/HeaderUserInfo';
import DegreeCourseSelect from 'components/DegreeCourseSelect';
import MainMenu from 'components/MainMenu';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'App.css';


function App() {

  return (
    <div className="m-3">
      <MainMenu/>
      <HeaderUserInfo/>
      <br/>
      <DegreeCourseSelect/>
    </div>
  );
}

export default App;
