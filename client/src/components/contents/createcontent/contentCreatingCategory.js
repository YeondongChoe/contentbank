export const selectCategory0 = [
  {
    id: '1',
    label: '교과',
    value: '1',
    options: [
      { id: '20220', label: '2022학년', value: '20220' },
      { id: '20151', label: '2015학년', value: '20151' },
      { id: '20182', label: '2018학년', value: '20182' },
      { id: '20203', label: '2020학년', value: '20203' },
    ],
  },
];
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
        value: '교재',
        optionsdepth: [
          {
            id: 0,
            value: '0',
            parentValue: '교재',
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
            parentValue: '교재',
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
            parentValue: '교재',
            type: 'select',
            options: [
              { id: '0', label: '1', value: '0' },
              { id: '1', label: '2', value: '1' },
              { id: '2', label: '3', value: '2' },
              { id: '3', label: '4', value: '3' },
              { id: '4', label: '5', value: '4' },
            ],
            label: '시리즈',
          },
          {
            id: 3,
            value: '0',
            parentValue: '교재',
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
            parentValue: '교재',
            type: 'input',
            inputValue: '',
            label: '교재페이지',
          },
          {
            id: 5,
            value: '0',
            parentValue: '교재',
            type: 'input',
            inputValue: '',
            label: '교재번호',
          },
          {
            id: 6,
            value: '0',
            parentValue: '교재',
            type: 'select',
            options: [
              { id: '0', label: '1', value: '0' },
              { id: '1', label: '2', value: '1' },
              { id: '2', label: '3', value: '2' },
              { id: '3', label: '4', value: '3' },
              { id: '4', label: '5', value: '4' },
            ],
            label: '출판년도',
          },
          {
            id: 7,
            value: '0',
            parentValue: '교재',
            type: 'select',
            options: [
              { id: '0', label: '1', value: '0' },
              { id: '1', label: '2', value: '1' },
              { id: '2', label: '3', value: '2' },
              { id: '3', label: '4', value: '3' },
              { id: '4', label: '5', value: '4' },
            ],
            label: '교재난이도',
          },
        ],
      },
      {
        id: '1',
        label: '내신',
        value: '내신',
        optionsdepth: [
          {
            id: 0,
            value: '0',
            parentValue: '내신',
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
            parentValue: '내신',
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
            parentValue: '내신',
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
            parentValue: '내신',
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
            parentValue: '내신',
            type: 'input',
            inputValue: '',
            label: '내신페이지',
          },
          {
            id: 6,
            value: '0',
            parentValue: '내신',
            type: 'input',
            inputValue: '',
            label: '문항번호',
          },
          {
            id: 7,
            value: '0',
            parentValue: '내신',
            type: 'input',
            inputValue: '',
            label: '배점',
          },
          {
            id: 8,
            value: '0',
            parentValue: '내신',
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
        value: '기출',
        optionsdepth: [
          {
            id: 0,
            value: '0',
            parentValue: '기출',
            type: 'select',
            options: [
              { id: '0', label: '수학', value: '0' },
              { id: '1', label: '과학', value: '1' },
            ],
            label: '기출속성',
          },
          {
            id: 1,
            value: '0',
            parentValue: '기출',
            type: 'select',
            options: [
              { id: '0', label: '수학', value: '0' },
              { id: '1', label: '과학', value: '1' },
            ],
            label: '주관사',
          },
          {
            id: 2,
            value: '0',
            parentValue: '기출',
            type: 'select',
            options: [
              { id: '0', label: '수학', value: '0' },
              { id: '1', label: '과학', value: '1' },
            ],
            label: '기출명',
          },
          {
            id: 3,
            value: '0',
            parentValue: '기출',
            type: 'select',
            options: [
              { id: '0', label: '수학', value: '0' },
              { id: '1', label: '과학', value: '1' },
            ],
            label: '시행학제',
          },
          {
            id: 4,
            value: '0',
            parentValue: '기출',
            type: 'select',
            options: [
              { id: '0', label: '수학', value: '0' },
              { id: '1', label: '과학', value: '1' },
            ],
            label: '시행학년',
          },
          {
            id: 5,
            value: '0',
            parentValue: '기출',
            type: 'select',
            options: [
              { id: '0', label: '수학', value: '0' },
              { id: '1', label: '과학', value: '1' },
            ],
            label: '시험지타입',
          },
          {
            id: 6,
            value: '0',
            parentValue: '기출',
            type: 'input',
            inputValue: '',
            label: '문항번호',
          },
          {
            id: 7,
            value: '0',
            parentValue: '기출',
            type: 'input',
            inputValue: '',
            label: '기출배점',
          },
          {
            id: 8,
            value: '0',
            parentValue: '기출',
            type: 'datepicker',
            dateValue: '',
            label: '기출일시',
          },
        ],
      },
      {
        id: '3',
        label: '자체제작',
        value: '자체제작',
        optionsdepth: [],
      },
      {
        id: '4',
        label: '기타',
        value: '기타',
        optionsdepth: [],
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
      { id: '주관식0', label: '주관식', value: '주관식0' },
      { id: '객관식1', label: '객관식', value: '객관식1' },
      { id: '서술형2', label: '서술형', value: '서술형2' },
    ],
  },
];

export const selectCategory4 = [
  {
    id: '1',
    label: '교육과정',
    value: '1',
    options: [
      { id: '1차', label: '1차', value: '1차' },
      { id: '2차', label: '2차', value: '2차' },
      { id: '3차', label: '3차', value: '3차' },
      { id: '4차', label: '4차', value: '4차' },
      { id: '5차', label: '5차', value: '5차' },
      { id: '6차', label: '6차', value: '6차' },
      { id: '7차', label: '7차', value: '7차' },
      { id: '8차', label: '8차', value: '8차' },
      { id: '9차', label: '9차', value: '9차' },
      { id: '10차', label: '10차', value: '10차' },
    ],
  },
];

export const questionList = [
  {
    id: 'Gasdv_1234567890',
    text: '수학/수1/내신/객관식',
    classificationData: ['qnsfb', 'epdlxj'],
  },
  {
    id: 'Gasdv_12345678901',
    text: '수학/수1/내신/객관식',
    classificationData: ['qnsfb', 'epdlxj'],
  },
  {
    id: 'Gasdv_12345678902',
    text: '수학/수1/내신/객관식',
    classificationData: [],
  },
  {
    id: 'Gasdv_12345678903',
    text: '수학/수1/내신/객관식',
    classificationData: [],
  },
  {
    id: 'Gasdv_12345678904',
    text: '수학/수1/내신/객관식',
    classificationData: [],
  },
  {
    id: 'Gasdv_12345678905',
    text: '수학/수1/내신/객관식',
    classificationData: [],
  },
  {
    id: 'Gasdv_12345678906',
    text: '수학/수1/내신/객관식',
    classificationData: [],
  },
  {
    id: 'Gasdv_12345678907',
    text: '수학/수1/내신/객관식',
    classificationData: [],
  },
  {
    id: 'Gasdv_12345678908',
    text: '수학/수1/내신/객관식',
    classificationData: [],
  },
  {
    id: 'Gasdv_12345678909',
    text: '수학/수1/내신/객관식',
    classificationData: [],
  },
  {
    id: 'Gasdv_123456789010',
    text: '수학/수1/내신/객관식',
    classificationData: [],
  },
  {
    id: 'Gasdv_123456789011',
    text: '수학/수1/내신/객관식',
    classificationData: [],
  },
  {
    id: 'Gasdv_123456789012',
    text: '수학/수1/내신/객관식',
    classificationData: [],
  },
  {
    id: 'Gasdv_123456789013',
    text: '수학/수1/내신/객관식',
    classificationData: [],
  },
  {
    id: 'Gasdv_123456789014',
    text: '수학/수1/내신/객관식',
    classificationData: [],
  },
  {
    id: 'Gasdv_123456789015',
    text: '수학/수1/내신/객관식',
    classificationData: [],
  },
];

export const metaList = [
  {
    data: [
      {
        id: '1',
        label: '교육과정',
        value: '1',
        options: [
          { id: '0', label: '1차', value: '1차0' },
          { id: '1', label: '2차', value: '2차1' },
          { id: '2', label: '3차', value: '3차2' },
          { id: '3', label: '4차', value: '4차3' },
          { id: '4', label: '5차', value: '5차4' },
          { id: '5', label: '6차', value: '6차5' },
          { id: '6', label: '7차', value: '7차6' },
          { id: '7', label: '8차', value: '8차7' },
          { id: '8', label: '9차', value: '9차8' },
          { id: '9', label: '10차', value: '10차9' },
        ],
      },
    ],
  },
  {
    data: [
      {
        id: '2',
        label: '학교급',
        value: '2',
        options: [
          { id: '0', label: '초등', value: '초등0' },
          { id: '1', label: '중등', value: '중등1' },
          { id: '2', label: '고등', value: '고등2' },
        ],
      },
    ],
  },
  {
    data: [
      {
        id: '3',
        label: '학년',
        value: '3',
        options: [
          { id: '0', label: '전체', value: '전체0' },
          { id: '1', label: '1학년', value: '1학년1' },
          { id: '2', label: '2학년', value: '2학년2' },
          { id: '3', label: '3학년', value: '3학년3' },
          { id: '4', label: '4학년', value: '4학년4' },
          { id: '5', label: '5학년', value: '5학년5' },
          { id: '6', label: '6학년', value: '6학년6' },
        ],
      },
    ],
  },
  {
    data: [
      {
        id: '4',
        label: '학기',
        value: '4',
        options: [
          { id: '0', label: '전체', value: '전체0' },
          { id: '1', label: '1학기', value: '1학기1' },
          { id: '2', label: '2학기', value: '2학기2' },
        ],
      },
    ],
  },
  {
    data: [
      {
        id: '5',
        label: '교과',
        value: '5',
        options: [
          { id: '0', label: '수학', value: '수학0' },
          { id: '1', label: '영어', value: '영어1' },
          { id: '2', label: '국어', value: '국어2' },
        ],
      },
    ],
  },
  {
    data: [
      {
        id: '6',
        label: '과목',
        value: '6',
        options: [
          { id: '0', label: '공통수학', value: '공통수학0' },
          { id: '1', label: 'Grammar', value: 'Grammar1' },
        ],
      },
    ],
  },
  {
    data: [
      {
        id: '7',
        label: '오픈여부',
        value: '7',
        options: [
          { id: '0', label: '전체', value: '전체0' },
          { id: '1', label: '활성화', value: '활성화1' },
          { id: '2', label: '비활성화', value: '비활성화2' },
        ],
      },
    ],
  },
];
export const metaListChange = [
  {
    data: [
      {
        id: 'changeValue1',
        label: '교육과정',
        value: 'changeValue1',
        options: [
          { id: 'changeValue0', label: '1차', value: 'changeValue1차0' },
          { id: 'changeValue1', label: '2차', value: 'changeValue2차1' },
          { id: 'changeValue2', label: '3차', value: 'changeValue3차2' },
          { id: 'changeValue3', label: '4차', value: 'changeValue4차3' },
          { id: 'changeValue4', label: '5차', value: 'changeValue5차4' },
          { id: 'changeValue5', label: '6차', value: 'changeValue6차5' },
          { id: 'changeValue6', label: '7차', value: 'changeValue7차6' },
          { id: 'changeValue7', label: '8차', value: 'changeValue8차7' },
          { id: 'changeValue8', label: '9차', value: 'changeValue9차8' },
          { id: 'changeValue9', label: '10차', value: 'changeValue10차9' },
        ],
      },
    ],
  },
  {
    data: [
      {
        id: 'changeValue2',
        label: '학교급',
        value: 'changeValue2',
        options: [
          { id: 'changeValue0', label: '초등', value: 'changeValue초등0' },
          { id: 'changeValue1', label: '중등', value: 'changeValue중등1' },
          { id: 'changeValue2', label: '고등', value: 'changeValue고등2' },
        ],
      },
    ],
  },
  {
    data: [
      {
        id: 'changeValue3',
        label: '학년',
        value: 'changeValue3',
        options: [
          { id: 'changeValue0', label: '전체', value: 'changeValue전체0' },
          { id: 'changeValue1', label: '1학년', value: 'changeValue1학년1' },
          { id: 'changeValue2', label: '2학년', value: 'changeValue2학년2' },
          { id: 'changeValue3', label: '3학년', value: 'changeValue3학년3' },
          { id: 'changeValue4', label: '4학년', value: 'changeValue4학년4' },
          { id: 'changeValue5', label: '5학년', value: 'changeValue5학년5' },
          { id: 'changeValue6', label: '6학년', value: 'changeValue6학년6' },
        ],
      },
    ],
  },
  {
    data: [
      {
        id: 'changeValue4',
        label: '학기',
        value: 'changeValue4',
        options: [
          { id: 'changeValue0', label: '전체', value: 'changeValue전체0' },
          { id: 'changeValue1', label: '1학기', value: 'changeValue1학기1' },
          { id: 'changeValue2', label: '2학기', value: 'changeValue2학기2' },
        ],
      },
    ],
  },
  {
    data: [
      {
        id: 'changeValue5',
        label: '교과',
        value: 'changeValue5',
        options: [
          { id: 'changeValue0', label: '수학', value: 'changeValue수학0' },
          { id: 'changeValue1', label: '영어', value: 'changeValue영어1' },
          { id: 'changeValue2', label: '국어', value: 'changeValue국어2' },
        ],
      },
    ],
  },
  {
    data: [
      {
        id: 'changeValue6',
        label: '과목',
        value: 'changeValue6',
        options: [
          {
            id: 'changeValue0',
            label: '공통수학',
            value: 'changeValue공통수학0',
          },
          {
            id: 'changeValue1',
            label: 'Grammar',
            value: 'changeValueGrammar1',
          },
        ],
      },
    ],
  },
  {
    data: [
      {
        id: 'changeValue7',
        label: '오픈여부',
        value: 'changeValue7',
        options: [
          { id: 'changeValue0', label: '전체', value: 'changeValue전체0' },
          { id: 'changeValue1', label: '활성화', value: 'changeValue활성화1' },
          {
            id: 'changeValue2',
            label: '비활성화',
            value: 'changeValue비활성화2',
          },
        ],
      },
    ],
  },
];

export const depthBlockList = [
  {
    id: '1',
    label: '교육과정',
    value: '1',
    depth: 0,
    name: '1',
  },
  {
    id: '2',
    label: '교육과정',
    value: '2',
    depth: 1,
    name: '2',
  },
  {
    id: '3',
    label: '교육과정',
    value: '3',
    depth: 2,
    name: '3',
  },
  {
    id: '4',
    label: '교육과정',
    value: '4',
    depth: 3,
    name: '4',
  },
  {
    id: '5',
    label: '교육과정',
    value: '5',
    depth: 4,
    name: '5',
  },
  {
    id: '6',
    label: '교육과정',
    value: '6',
    depth: 5,
    name: '6',
  },
  {
    id: '7',
    label: '교육과정',
    value: '7',
    depth: 5,
    name: '7',
  },
  {
    id: '8',
    label: '교육과정',
    value: '8',
    depth: 5,
    name: '8',
  },
  {
    id: '9',
    label: '교육과정',
    value: '9',
    depth: 0,
    name: '9',
  },
  {
    id: '10',
    label: '교육과정',
    value: '10',
    depth: 0,
    name: '10',
  },
];

export const selectCategoryEtc1 = [
  {
    id: '1',
    label: '행동요소1',
    value: '1',
    options: [
      { id: '0', label: '계산', value: '0' },
      { id: '1', label: '이해', value: '1' },
      { id: '2', label: '추론', value: '2' },
    ],
  },
];
export const selectCategoryEtc2 = [
  {
    id: '2',
    label: '행동요소2',
    value: '2',
    options: [{ id: '0', label: '문제해결', value: '0' }],
  },
];
