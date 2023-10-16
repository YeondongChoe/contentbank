import React from 'react';
import './App.css';
import CommonDate from './components/DatePicker/Datepicker';
import SelectAlert from './components/Alert/SelectAlert';
import NoticeAlert from './components/Alert/NoticeAlert';

function App() {
  return (
    <div className="App">
      <CommonDate></CommonDate>
      <SelectAlert description={'내용에 대한 설명'}></SelectAlert>
      <NoticeAlert description={'내용에 대한 설명'}></NoticeAlert>
    </div>
  );
}

export default App;
