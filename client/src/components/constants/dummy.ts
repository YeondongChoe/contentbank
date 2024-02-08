// TODO : ui 작업중 임시로 사용하고 삭제

export const quizData = {
  idx: '0',
  code: '545465455451215782021485',
  // 문항 타입: 객관식/주관식/서술형
  quiz_type: '객관식',
  score: 'url/',
  created_at: '20230208',
  created_by: 'skqldk',
  last_modified_at: '0809', //마지막 수정일시
  last_modified_by: 'skqldk', //마지막 수정자
  is_use: true, //사용여부
  favorite: {
    idx: '1',
    created_by: 'skqldk',
    quiz_idx: '2',
  },
  quiz_item: {
    idx: '2',
    quiz_idx: 'fdafaf565323',
    item_type: '객관식',
    content: 'content 453 32131 132',
  },
  quiz_source: {
    idx: '111',
    quiz_idx: '222',
    source_idx: '333',
    source_props_idx: '444',
  },
  etc_class: {
    idx: '1',
    quiz_idx: '45',
    etc_class_idx: 'fa4545',
  },
  category_class: {
    idx: '2',
    quiz_idx: '3',
    category_class_idx: 'fasf2532adsa',
  },
  unit_class: {
    idx: '5',
    quiz_idx: 'fda',
    unit_class_idx: '45455',
  },
};

export const sourceData = {
  idx: '2',
  source_code: 'fdasfa fdsafs fda',
  name: 'name source',
  quiz_source: {
    idx: '111',
    quiz_idx: '222',
    source_idx: '333',
    source_props_idx: '444',
  },
  source_item: {
    idx: '3',
    source_idx: 'fdaf 121321',
    name: 'name source item',
    element_type: 'fakfjdk fjdsakfjk',
    source_item_props: {
      idx: '5',
      item_idx: 'fda fdafdaf f',
      name: 'name surce item props',
    },
    quiz_source: {
      idx: '111',
      quiz_idx: '222',
      source_idx: '333',
      source_props_idx: '444',
    },
  },
};

// 카테고리 분류
export const categoryClassData = {
  idx: '3',
  item_seq: 'f45daf5as',
  name: 'class fdasf name',
  sort: '0',
  created_at: '20230809',
  created_by: 'skqldk',
  last_modified_at: '0809', //마지막 수정일시
  last_modified_by: 'skqldk', //마지막 수정자
  is_use: true, //사용여부
  category_item: {
    idx: '2',
    item_type: '2',
    sort: '2',
    code: '2code22',
    name: 'category name',
  },
};
//추가분류
export const etcClassData = {
  idx: 'fda',
  item_idx: 'dfaf',
  name: 'etx name',
  sort: '0',
  created_at: '20230809',
  created_by: 'skqldk',
  last_modified_at: '0809', //마지막 수정일시
  last_modified_by: 'skqldk', //마지막 수정자
  is_use: true, //사용여부
  category_item: {
    idx: '2',
    item_type: '2',
    sort: '2',
    code: '2code22',
    name: 'category name',
  },
};
//카테고리 검색의 추가정보
export const categoryClassAndEtcData = {
  idx: 'fda',
  class_search_idx: '1fda',
  etc_class_idx: 'fdas',
  etc_class: {
    idx: 'fda',
    item_idx: 'dfaf',
    name: 'etx name',
    sort: '0',
    created_at: '20230809',
    created_by: 'skqldk',
    last_modified_at: '0809', //마지막 수정일시
    last_modified_by: 'skqldk', //마지막 수정자
    is_use: true, //사용여부
    category_item: {
      idx: '2',
      item_type: '2',
      sort: '2',
      code: '2code22',
      name: 'category name',
    },
  },
  category_class_search: {
    idx: '2',
    code: '2code22',
    created_at: '20230809',
    created_by: 'skqldk',
  },
};
//카테고리의 교육과정
export const categoryCurriculumData = {
  idx: '1',
  category_class_idx: '1dsad',
  search_idx: 'dsadd',
  category_class: {
    idx: '3',
    item_seq: 'f45daf5as',
    name: 'class fdasf name',
    sort: '0',
    created_at: '20230809',
    created_by: 'skqldk',
    last_modified_at: '0809', //마지막 수정일시
    last_modified_by: 'skqldk', //마지막 수정자
    is_use: true, //사용여부
    category_curriculum: {
      idx: '1',
      category_class_idx: '1dsad',
      search_idx: 'dsadd',
    },
  },
  category_class_search: {
    idx: '2',
    code: '2code22',
    created_at: '20230809',
    created_by: 'skqldk',
  },
};
//카테고리의 분류의 교육과정
export const categoryClassAndCurriculumData = {
  idx: '1',
  class_search_idx: 'dsadd',
  curriculum_idx: '1fdaf',
  category_class_search: {
    idx: '2',
    code: '2code22',
    created_at: '20230809',
    created_by: 'skqldk',
  },
  curriculum: {
    idx: 'fda',
    name: 'curriculum name',
    created_at: '20230809',
    created_by: 'skqldk',
    last_modified_at: '0809', //마지막 수정일시
    last_modified_by: 'skqldk', //마지막 수정자
    is_use: true, //사용여부
  },
};
// 단원 분류
export const unitClassData = {
  idx: '56',
  curriculum_idx: 'fda',
  item_idx: 'f45daf5as',
  sort: '0',
  subject: 'title text',
  created_at: '20230809',
  created_by: 'skqldk',
  last_modified_at: '0809', //마지막 수정일시
  last_modified_by: 'skqldk', //마지막 수정자
  is_use: true, //사용여부
  unit_item: {
    idx: 'ffdd',
    level: '1',
    name: '대단원', // 대단원/중단원/소단원/유형
  },
  curriculum: {
    idx: 'fda',
    name: 'curriculum name',
    created_at: '20230809',
    created_by: 'skqldk',
    last_modified_at: '0809', //마지막 수정일시
    last_modified_by: 'skqldk', //마지막 수정자
    is_use: true, //사용여부
  },
};
//학교기본 정보
export const infoSchoolData = {
  idx: '123',
  edu_code: 'fdasf',
  edu_name: 'edu name',
  school_code: 'fdafa fd',
  school_ko_name: '한국 이름',
  school_en_name: 'fdafa ffdafdd',
  school_type: 'type fdas',
  location: '서울특별시 동작구',
  org_dept: '관할조직명 fda',
  establishment_type: '설립명',
  post_road: '도로명 우편',
  address_road: '도로명 주소',
  address_road_detail: '도로명상 상세 주소',
  phone_number: '000 0000 0000',
  home_page: 'https//url',
  coed_school_type: '남녀공학구분',
  fax_number: '02 000 0000',
  high_school_type: '고등학교구분',
  is_industry_special: '산업체특별학급존재여부',
  general_voca_type: '고등학교일반실업구분명',
  special_high_affiliated: '특수목정고등학교계열명',
  entrance_type: '입시전후기구분명',
  day_night_type: '주야구분영',
  establishment_at: '설립일자',
  anniversary_at: '개교기념일',
  last_modified_at: '0809',
};
