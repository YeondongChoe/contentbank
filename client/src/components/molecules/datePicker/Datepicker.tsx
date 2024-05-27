import * as React from 'react';
import { useEffect, useState } from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';

const StyleDatePicker = styled(DatePicker)`
  width: 242px;
`;

export const CommonDate = ({
  $button,
  setDate,
}: {
  $button?: JSX.Element;
  setDate: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [pickDate, setPickDate] = useState<Date | null>(null);
  useEffect(() => {
    if (pickDate) {
      console.log('날자 pickDate :', pickDate);
      const date = pickDate.toISOString().slice(0, 19);
      console.log('날자 커스텀 :', date);
      setDate(date);
    }
  }, [pickDate, setDate]);

  return (
    <span>
      <StyleDatePicker
        showIcon
        selected={pickDate}
        onChange={(date) => {
          setPickDate(date as Date);
        }}
        dateFormat="yyyy-MM-dd"
        timeFormat="HH:mm:ss"
        placeholderText="날짜 입력"
        showMonthDropdown
        showYearDropdown
        customInput={$button}
      />
    </span>
  );
};
