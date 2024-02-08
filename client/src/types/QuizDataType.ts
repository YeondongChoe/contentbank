export type quizDataType = {
  idx: number | string;
  code: number | string;
  quiz_type: number | string; // 문항 타입: 객관식/주관식/서술형
  score: number | string;
  created_at: number | string;
  created_by: number | string;
  last_modified_at: number | string; //마지막 수정일시
  last_modified_by: number | string; //마지막 수정자
  is_use: boolean; //사용여부
  favorite: {
    idx: number | string;
    created_by: number | string;
    quiz_idx: number | string;
  };
  quiz_item: {
    idx: number | string;
    quiz_idx: number | string;
    item_type: number | string;
    content: number | string;
  };
  quiz_source: {
    idx: number | string;
    quiz_idx: number | string;
    source_idx: number | string;
    source_props_idx: number | string;
  };
  etc_class: {
    idx: number | string;
    quiz_idx: number | string;
    etc_class_idx: number | string;
  };
  category_class: {
    idx: number | string;
    quiz_idx: number | string;
    category_class_idx: number | string;
  };
  unit_class: {
    idx: number | string;
    quiz_idx: number | string;
    unit_class_idx: number | string;
  };
};
