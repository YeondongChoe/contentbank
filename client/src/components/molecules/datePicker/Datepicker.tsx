import * as React from 'react';
import { useEffect, useState } from 'react';

import { parseISO, format } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';

const StyleDatePicker = styled(DatePicker)`
  width: 242px;
`;

export const CommonDate = ({
  $button,
  setDate,
  minDate,
}: {
  $button?: JSX.Element;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  minDate?: Date | string | null;
}) => {
  const [pickDate, setPickDate] = useState<Date | null>(null);

  // minDate가 문자열인 경우 Date 객체로 변환
  const parsedMinDate =
    typeof minDate === 'string' ? parseISO(minDate) : minDate;

  useEffect(() => {
    if (pickDate) {
      console.log('날자 pickDate :', pickDate);
      //const date = pickDate.toISOString().slice(0, 19);
      const formattedDate = format(pickDate, "yyyy-MM-dd'T'HH:mm:ss");
      setDate(formattedDate);
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
        minDate={parsedMinDate}
      />
    </span>
  );
};
