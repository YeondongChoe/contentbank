export const selectCategory1 = [
  {
    id: '1',
    label: '교과',
    value: '1',
    options: [
      { id: '0', label: '2022학년', value: '0' },
      { id: '1', label: '2015학년', value: '1' },
      { id: '2', label: '2018학년', value: '2' },
      { id: '3', label: '2020학년', value: '3' },
    ],
  },
  {
    id: '2',
    label: '과목',
    value: '2',
    options: [
      { id: '0', label: '수학', value: '0' },
      { id: '1', label: '과학', value: '1' },
    ],
  },
];

export const selectCategory2 = [
  {
    id: '1',
    label: '출처',
    value: '1',
    options: [
      {
        id: '0',
        label: '교재',
        value: '0',
        optionsDeps: [
          {
            id: 0,
            value: '0',
            type: 'select',
            options: [
              { id: '0', label: '수학', value: '0' },
              { id: '1', label: '과학', value: '1' },
            ],
            label: '교재속성',
          },
          {
            id: 1,
            value: '0',
            type: 'select',
            options: [
              { id: '0', label: '수학', value: '0' },
              { id: '1', label: '과학', value: '1' },
            ],
            label: '출판사',
          },
          {
            id: 2,
            value: '0',
            type: 'select',
            options: [
              { id: '0', label: '수학', value: '0' },
              { id: '1', label: '과학', value: '1' },
            ],
            label: '시리즈',
          },
          {
            id: 3,
            value: '0',
            type: 'select',
            options: [
              { id: '0', label: '수학', value: '0' },
              { id: '1', label: '과학', value: '1' },
            ],
            label: '교재명',
          },
          {
            id: 4,
            value: '0',
            type: 'input',
            inputValue: '',
            label: '교재페이지',
          },
          {
            id: 5,
            value: '0',
            type: 'input',
            inputValue: '',
            label: '교재번호',
          },
          {
            id: 6,
            value: '0',
            type: 'select',
            options: [
              { id: '0', label: '수학', value: '0' },
              { id: '1', label: '과학', value: '1' },
            ],
            label: '출판년도',
          },
        ],
      },
      {
        id: '1',
        label: '내신',
        value: '1',
        optionsDeps: [
          {
            id: 0,
            value: '0',
            type: 'select',
            options: [
              { id: '0', label: '수학', value: '0' },
              { id: '1', label: '과학', value: '1' },
            ],
            label: '내신형식',
          },
          { id: 1, value: '0', type: 'modal', label: '학교명' },
          {
            id: 2,
            value: '0',
            type: 'select',
            options: [
              { id: '0', label: '수학', value: '0' },
              { id: '1', label: '과학', value: '1' },
            ],
            label: '내신학제',
          },
          {
            id: 3,
            value: '0',
            type: 'select',
            options: [
              { id: '0', label: '수학', value: '0' },
              { id: '1', label: '과학', value: '1' },
            ],
            label: '내신학년',
          },
          {
            id: 4,
            value: '0',
            type: 'select',
            options: [
              { id: '0', label: '수학', value: '0' },
              { id: '1', label: '과학', value: '1' },
            ],
            label: '학사일정',
          },
          {
            id: 5,
            value: '0',
            type: 'input',
            inputValue: '',
            label: '내신페이지',
          },
          {
            id: 6,
            value: '0',
            type: 'input',
            inputValue: '',
            label: '문항번호',
          },
          {
            id: 7,
            value: '0',
            type: 'input',
            inputValue: '',
            label: '배점',
          },
          {
            id: 8,
            value: '0',
            type: 'select',
            options: [
              { id: '0', label: '수학', value: '0' },
              { id: '1', label: '과학', value: '1' },
            ],
            label: '출제년도',
          },
        ],
      },
      {
        id: '2',
        label: '기출',
        value: '2',
        optionsDeps: [
          { id: 0, value: '0', type: 'select', options: [], label: '기출속성' },
          { id: 1, value: '0', type: 'select', options: [], label: '주관사' },
          { id: 2, value: '0', type: 'select', options: [], label: '기출명' },
          { id: 3, value: '0', type: 'select', options: [], label: '시행학제' },
          { id: 4, value: '0', type: 'select', options: [], label: '시행학년' },
          {
            id: 5,
            value: '0',
            type: 'select',
            options: [],
            label: '시험지타입',
          },
          {
            id: 6,
            value: '0',
            type: 'input',
            inputValue: '',
            label: '문항번호',
          },
          {
            id: 7,
            value: '0',
            type: 'input',
            inputValue: '',
            label: '기출배점',
          },
          {
            id: 8,
            value: '0',
            type: 'datepickup',
            dateValue: '',
            label: '기출일시',
          },
        ],
      },
      {
        id: '3',
        label: '자체제작',
        value: '3',
        optionsDeps: [],
      },
      {
        id: '4',
        label: '기타',
        value: '4',
        optionsDeps: [],
      },
    ],
  },
  // + 버튼으로 복제시 셀렉트 옵션도 동일하게 복제
];

export const selectCategory3 = [
  {
    id: '1',
    label: '문항타입',
    value: '1',
    options: [
      { id: '0', label: '주관식', value: '0' },
      { id: '1', label: '객관식', value: '1' },
      { id: '2', label: '서술형', value: '2' },
    ],
  },
];

export const questionList = [
  {
    id: 'Gasdv_1234567890',
    text: '수학/수1/내신/객관식',
  },
  {
    id: 'Gasdv_12345678901',
    text: '수학/수1/내신/객관식',
  },
  {
    id: 'Gasdv_12345678902',
    text: '수학/수1/내신/객관식',
  },
  {
    id: 'Gasdv_12345678903',
    text: '수학/수1/내신/객관식',
  },
  {
    id: 'Gasdv_12345678904',
    text: '수학/수1/내신/객관식',
  },
  {
    id: 'Gasdv_12345678905',
    text: '수학/수1/내신/객관식',
  },
  {
    id: 'Gasdv_12345678906',
    text: '수학/수1/내신/객관식',
  },
  {
    id: 'Gasdv_12345678907',
    text: '수학/수1/내신/객관식',
  },
  {
    id: 'Gasdv_12345678908',
    text: '수학/수1/내신/객관식',
  },
  {
    id: 'Gasdv_12345678909',
    text: '수학/수1/내신/객관식',
  },
  {
    id: 'Gasdv_123456789010',
    text: '수학/수1/내신/객관식',
  },
  {
    id: 'Gasdv_123456789011',
    text: '수학/수1/내신/객관식',
  },
  {
    id: 'Gasdv_123456789012',
    text: '수학/수1/내신/객관식',
  },
  {
    id: 'Gasdv_123456789013',
    text: '수학/수1/내신/객관식',
  },
  {
    id: 'Gasdv_123456789014',
    text: '수학/수1/내신/객관식',
  },
  {
    id: 'Gasdv_123456789015',
    text: '수학/수1/내신/객관식',
  },
];
