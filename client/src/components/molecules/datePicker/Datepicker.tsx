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
      const date = pickDate.toLocaleDateString();

      console.log('날자 커스텀 :', date);
      setDate(date);
    }
  }, [pickDate]);

  return (
    <span>
      <StyleDatePicker
        showIcon
        selected={pickDate}
        onChange={(date) => {
          setPickDate(date as Date);
        }}
        dateFormat="yyyy-MM-dd"
        placeholderText="날짜 입력"
        showMonthDropdown
        showYearDropdown
        customInput={$button}
      />
    </span>
  );
};
