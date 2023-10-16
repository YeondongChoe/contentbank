import React from 'react';
import './App.css';
import CommonDate from './components/DatePicker/Datepicker';
import SelectAlert from './components/Alert/SelectAlert';
import NoticeAlert from './components/Alert/NoticeAlert';
import PopupModal from './components/Alert/Popup';

function App() {
  return (
    <div className="App">
      <CommonDate></CommonDate>
      <SelectAlert title={'설명에 대한 제목'}></SelectAlert>
      <NoticeAlert
        title={'문자 내용을 확인하여 주시기 바랍니다.'}
        description={'담당자 OR에게 문자가 발송 되었습니다.'}
      ></NoticeAlert>
      <PopupModal
        description="등록하시겠습니까?"
        title="중복 확인"
      ></PopupModal>
    </div>
  );
}

export default App;
