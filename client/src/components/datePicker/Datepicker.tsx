import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';

const StyleDatePicker = styled(DatePicker)`
  width: 242px;
`;

const CommonDate = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);

  return (
    <div>
      <label>
        <StyleDatePicker
          showIcon
          selected={startDate}
          onChange={(date) => setStartDate(date as Date)}
          dateFormat="yyyy-MM-dd"
          placeholderText="날짜 입력"
          showMonthDropdown
          showYearDropdown
        />
      </label>
    </div>
  );
};

export { CommonDate };
