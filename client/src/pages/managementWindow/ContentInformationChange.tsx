import * as React from 'react';
import { useState, useEffect, useMemo, useRef } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import { IoSearch } from 'react-icons/io5';
import { MdPublishedWithChanges } from 'react-icons/md';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { classificationInstance, quizService } from '../../api/axios';
import {
  Button,
  CheckBoxI,
  DropdownWithCheckbox,
  EditListItem,
  List,
  Modal,
  PaginationBox,
  ValueNone,
} from '../../components';
import { COLOR } from '../../components/constants';
import ArrowClockwiseIcon from '../../components/contents/createcontent/editer/components/icons/ArrowClockwiseIcon';
import ArrowCounterclockwiseIcon from '../../components/contents/createcontent/editer/components/icons/ArrowCounterclockwiseIcon';
import BarCharLineIcon from '../../components/contents/createcontent/editer/components/icons/BarCharLineIcon';
import BoxArrowInUpRightIcon from '../../components/contents/createcontent/editer/components/icons/BoxArrowInUpRightIcon';
import ChevronLeftIcon from '../../components/contents/createcontent/editer/components/icons/ChevronLeftIcon';
import ChevronRightIcon from '../../components/contents/createcontent/editer/components/icons/ChevronRightIcon';
import CloseIcon from '../../components/contents/createcontent/editer/components/icons/CloseIcon';
import TrashIcon from '../../components/contents/createcontent/editer/components/icons/TrashIcon';
import { QuizList } from '../../components/contents/createcontent/list';
import { useModal } from '../../hooks';
import { pageAtom } from '../../store/utilAtom';
import { QuizListType } from '../../types';

import { EditModal } from './EditModal';

interface PairState {
  selectedItems1: string[];
  selectedItems2: string[];
  includeType: 'includeOne' | 'includeAll';
}

export function ContentInformationChange() {
  const [page, setPage] = useRecoilState(pageAtom);
  const [questionList, setQuestionList] = useState<QuizListType[]>([]);
  const [checkList, setCheckList] = useState<number[]>([]); // 문항 체크
  const [sortedQuizList, setSortedQuizList] = useState<QuizListType[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [changeValue, setChangeValue] = useState<string>('');

  const searchDivRef = useRef<HTMLDivElement | null>(null);
  const changeDivRef = useRef<HTMLDivElement | null>(null);
  // 드롭박스 셀렉팅 값
  const [components, setComponents] = useState<PairState[]>([
    { selectedItems1: [], selectedItems2: [], includeType: 'includeOne' },
  ]);
  const [selectedItems1, setSelectedItems1] = useState<string[]>([]);
  const [selectedItems2, setSelectedItems2] = useState<string[]>([]);
  const [includeType1, setIncludeType1] = useState<'includeOne' | 'includeAll'>(
    'includeOne',
  );
  const [state, setState] = useState<'수정' | '복제' | null>(null);
  const { openModal } = useModal();

  // 검색 api
  // setQuestionList(list); // 검색 이후 리스트 값
  // 임시 전체 퀴즈 리스트
  const getQuiz = async () => {
    const res = await quizService.get(
      `/v1/quiz?pageIndex=${page}&pageUnit=${8}`,
    );
    return res.data.data;
  };

  const { data: quizData, refetch: quizDataRefetch } = useQuery({
    queryKey: ['get-quizList'],
    queryFn: getQuiz,
    meta: {
      errorMessage: 'get-quizList 에러 메세지',
    },
  });

  useEffect(() => {
    console.log('quizData-----', quizData);
    if (quizData) setQuestionList(quizData.quizList);
  }, [quizData]);

  // 데이터 변경시 리랜더링
  useEffect(() => {
    quizDataRefetch();
  }, [page]);

  // 새로운 컴포넌트 쌍을 추가하는 함수
  const addComponentSet = () => {
    if (components.length < 19) {
      setComponents([
        ...components,
        { selectedItems1: [], selectedItems2: [], includeType: 'includeOne' },
      ]);
    }
  };

  // 컴포넌트 쌍을 삭제하는 함수
  const removeComponentSet = (index: number) => {
    setComponents(components.filter((_, i) => i !== index));
  };

  // 선택된 항목을 업데이트하는 함수
  const updateSelectedItems1 = (index: number, selectedItems: string[]) => {
    const updatedComponents = [...components];
    updatedComponents[index].selectedItems1 = selectedItems;
    setComponents(updatedComponents);
  };

  const updateSelectedItems2 = (index: number, selectedItems: string[]) => {
    const updatedComponents = [...components];
    updatedComponents[index].selectedItems2 = selectedItems;
    setComponents(updatedComponents);
  };

  // SwitchButton 상태 업데이트 함수
  const updateIncludeType = (
    index: number,
    type: 'includeOne' | 'includeAll',
  ) => {
    const updatedComponents = [...components];
    updatedComponents[index].includeType = type;
    setComponents(updatedComponents);
  };

  // 체크박스 설정
  const handleAllCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.currentTarget.checked);
    if (e.target.checked) {
      setCheckList(questionList.map((item: QuizListType) => item.idx));
    } else {
      setCheckList([]);
    }
  };
  const handleButtonCheck = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number,
  ) => {
    const target = e.currentTarget.childNodes[0].childNodes[0].childNodes[0]
      .childNodes[0].childNodes[0] as HTMLInputElement;

    if (!target.checked) {
      setCheckList((prev) => [...prev, id]);
    } else {
      setCheckList(checkList.filter((el) => el !== id));
    }
  };
  const submitSave = () => {
    // saveHandler();
    // 이미지 데이터 저장
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  window.editorType_s = true;
  const ocrIframeContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initialScripts = [
      '/static/tinymce5/js/tinymce/tinymce.min.js',
      '/static/iTeX_EQ/js/jquery-3.3.1.min.js',
      '/static/iTeX_EQ/js/jquery-ui.min.js',
      '/static/iTeX_EQ/js/ds.min.js',
      '/static/OCR/cropper/cropper.js',
      '/static/OCR/PDF/pdf.js',
      '/static/iTeX_fulltext/js/bootstrap.bundle.min.js',
      '/static/iTeX_fulltext/js/sort-list.js',
      '/static/dream_ui/js/dream_setting.js',
      '/static/iTeX_EQ/js/itex_total_eq_origin_32.js',
    ];
    const subsequentScripts = [
      '/static/dream_ui/js/init_setting.js',
      '/static/iTeX_EQ/js/itexLoader.js',
      '/static/iTeX_fulltext/js/fulltext_dream.js?v=0.71',
      '/static/dream_ui/js/data_view_area.js',
      '/static/dream_ui/js/frame_controller.js',
      '/static/iTeX_fulltext/js/itex_parser_dream.js?v=0.9.6.12',
      '/static/iTeX_fulltext/js/itex_parser_pj2.js?v=0.9.1',
      '/static/iTeX_fulltext/js/cw_poc_pj_dream.js?v=0.87',
      '/static/iTeX_fulltext/js/dream_function.js',
      '/static/iTeX_fulltext/js/hmlupload.js?v=0.1',
      '/static/iTeX_fulltext/js/pdf_postprocess.js?v=0.1',
    ];

    // 동적 스크립트 로딩 함수
    const dynamicallyLoadScripts = (
      scriptUrls: any[],
      callback: { (): Promise<void>; (): void; (): void },
    ) => {
      const promises = scriptUrls.map((url) => {
        return new Promise((resolve, reject) => {
          // 스크립트가 이미 존재하는지 확인
          if (document.querySelector(`script[src="${url}"]`)) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            resolve(); // 이미 로드된 경우 건너뜀
            return;
          }

          // 존재하지 않는 경우 새로 로드
          const script = document.createElement('script');
          script.src = url;
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          script.onload = () => resolve();
          script.onerror = () =>
            reject(new Error(`Failed to load script ${url}`));
          document.body.appendChild(script);
        });
      });

      Promise.all(promises)
        .then(() => {
          if (callback) callback();
        })
        .catch((err) => {
          console.error(err);
        });
    };

    const initComponent = async () => {
      dynamicallyLoadScripts([...initialScripts], async () => {
        console.log('Initial scripts loaded');
        const checkTinyMCEReady = () => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          if (window.tinymce) {
            console.log('tinymce loaded successfully');
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            dynamicallyLoadScripts([...subsequentScripts], () => {
              console.log('Subsequent scripts loaded');

              if (ocrIframeContainer.current) {
                const iframe = document.createElement('iframe');
                iframe.width = '0';
                iframe.height = '0';
                iframe.src = '/static/OCR/ocr_iframe_origin.html?v=0.34';
                iframe.frameBorder = '0';
                iframe.scrolling = 'no';
                iframe.id = 'itex_frame_area';
                ocrIframeContainer.current.appendChild(iframe);
              }
            });
          } else {
            setTimeout(checkTinyMCEReady, 50);
          }
        };

        checkTinyMCEReady();
      });
    };

    initComponent();
  }, []);

  //수식 입력기
  const openFormula = (state: unknown) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    window.openEQ(state);
  };

  const handleSearchValueChange = (e: React.FormEvent<HTMLDivElement>) => {
    const newValue = e.currentTarget.innerHTML;
    if (newValue !== searchValue) {
      setSearchValue(newValue);
    }
  };

  /* 상세정보 수정 모달 열기 */
  const openEditModal = () => {
    // console.log(accountIdx, 'accountIdx');
    //모달 열릴시 체크리스트 초기화
    setCheckList([]);
    // getUser(accountIdx);
    openModal({
      title: '',
      content: (
        <EditModal
          sortedQuizList={sortedQuizList}
          searchedValue={searchValue}
          openFormula={openFormula}
          // refetch={refetch}
        />
      ),
    });
  };

  const editSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();

    // if (state == '수정') {
    openEditModal();
    // }
    // if (state == '복제') {
    // }
  };

  // 해당  문항찾기
  const onSearchList = () => {
    if (searchDivRef.current) {
      const divContent = searchDivRef.current.innerHTML;
      setSearchValue(divContent);
      console.log('Div content:', divContent);

      // 여기에 기존의 검색 로직을 추가합니다.
    }
  };

  useEffect(() => {}, [searchValue]);

  useEffect(() => {
    // 드롭다운 리스트 값
    console.log('드롭다운 리스트 값', components);
  }, [components, selectedItems1, selectedItems2, includeType1]);

  const buttonDisabled = useMemo(() => {
    if (
      // searchValue.length > 1 &&
      selectedItems1.length > 0 &&
      selectedItems2.length > 0
    ) {
      return false;
    } else {
      return true;
    }
  }, [selectedItems1, selectedItems2]);

  useEffect(() => {
    console.log('questionList/----------*', questionList);
  }, [questionList]);

  // 체크박스 선택된 리스트값 있을시 버튼 노출
  useEffect(() => {
    const sorted = questionList.filter((el) => checkList.includes(el.idx));
    console.log('sortedList------------', sorted);
    setSortedQuizList(sorted);
  }, [checkList]);

  useEffect(() => {
    setCheckList([]);
  }, [page]);

  return (
    <>
      <Container>
        <PositionWrapper className="width_400">
          <Title>
            <span className="title_top">검색 조건</span>
          </Title>
          <ScrollWrapper className="height_500">
            <PerfectScrollbar>
              <DropdownWithCheckboxWrapper>
                <DropdownWithCheckbox
                  width={'140px'}
                  selectedList={setSelectedItems1}
                  options={[
                    'lisdsad sadasdsa dsadsada dsa t1',
                    'list2',
                    'list3',
                    'list4',
                    'list5',
                    'list6',
                  ]}
                />
                <span>이(가)</span>
                <DropdownWithCheckbox
                  width={'200px'}
                  selectedList={setSelectedItems2}
                  options={[
                    'lisdsad sadasdsa dsadsada dsa t1',
                    'list2',
                    'list3',
                    'list4',
                    'list5',
                    'list6',
                  ]}
                />
              </DropdownWithCheckboxWrapper>
              <SwitchContainer>
                <SwitchButton
                  isSelected={includeType1 === 'includeOne'}
                  onClick={() => setIncludeType1('includeOne')}
                >
                  하나 이상 포함
                </SwitchButton>
                <SwitchButton
                  isSelected={includeType1 === 'includeAll'}
                  onClick={() => setIncludeType1('includeAll')}
                >
                  모두 포함
                </SwitchButton>
              </SwitchContainer>

              {components.map((component, index) => (
                <ComponentSet key={index}>
                  <DropdownWithCheckboxWrapper>
                    <DropdownWithCheckbox
                      width={'120px'}
                      selectedList={(selectedItems: string[]) =>
                        updateSelectedItems1(index, selectedItems)
                      }
                      options={[
                        'lisdsad sadasdsa dsadsada dsa t1',
                        'list2',
                        'list3',
                        'list4',
                        'list5',
                        'list6',
                      ]}
                    />
                    <span>이(가)</span>
                    <DropdownWithCheckbox
                      width={'200px'}
                      selectedList={(selectedItems: string[]) =>
                        updateSelectedItems2(index, selectedItems)
                      }
                      options={[
                        'lisdsad',
                        'list2',
                        'list3',
                        'list4',
                        'list5',
                        'list6',
                      ]}
                    />
                  </DropdownWithCheckboxWrapper>

                  <SwitchContainer>
                    <SwitchButton
                      isSelected={component.includeType === 'includeOne'}
                      onClick={() => updateIncludeType(index, 'includeOne')}
                    >
                      하나 이상 포함
                    </SwitchButton>
                    <SwitchButton
                      isSelected={component.includeType === 'includeAll'}
                      onClick={() => updateIncludeType(index, 'includeAll')}
                    >
                      모두 포함
                    </SwitchButton>
                  </SwitchContainer>

                  {/* 삭제 버튼 */}
                  <RemoveButton onClick={() => removeComponentSet(index)}>
                    -
                  </RemoveButton>
                </ComponentSet>
              ))}
            </PerfectScrollbar>
          </ScrollWrapper>

          <ButtonWrapper>
            {/* 컴포넌트 쌍 추가 버튼 */}
            <AddButton onClick={addComponentSet}>+ 검색 조건 추가</AddButton>

            <InputWrapper>
              <div
                ref={(el) => {
                  if (el && el.innerHTML !== searchValue) {
                    el.innerHTML = searchValue;
                  }
                  searchDivRef.current = el;
                }}
                className="first_area_test"
                contentEditable
                onInput={handleSearchValueChange}
                style={{
                  minHeight: '35px',
                  padding: '5px 10px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  outline: 'none',
                  width: 'calc(100% - 85px)',
                  overflowWrap: 'break-word',
                }}
              />
              {searchValue === '' && (
                <span
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '15px',
                    color: '#999',
                    pointerEvents: 'none',
                    width: 'calc(100% - 125px)',
                    height: '20px',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                  }}
                >
                  <span>찾을값을 입력해주세요(두글자 이상)</span>
                </span>
              )}

              <Button
                width={'80px'}
                height={'35px'}
                fontSize={'14px'}
                $margin={'0 0 0 5px'}
                cursor
                $filled
                $success
                onClick={() => {
                  openFormula('first_area_test');
                }}
              >
                수식
              </Button>
            </InputWrapper>

            <InfoText>
              {searchValue === '' &&
              selectedItems1.length == 0 &&
              selectedItems2.length == 0 ? (
                <span className="placeholder">
                  {/* 검색조건을 입력해주세요 */}
                </span>
              ) : (
                <span>
                  {selectedItems1.map((item1, idx1) => (
                    <span key={`item1-${idx1}`}>
                      &apos;{item1}&apos;
                      {idx1 < selectedItems1.length - 1 && ', '}
                    </span>
                  ))}
                  <span> 이 </span>
                  {selectedItems2.map((item2, idx2) => (
                    <span key={`item2-${idx2}`}>
                      &apos;{item2}&apos;
                      {idx2 < selectedItems2.length - 1 && ', '}
                    </span>
                  ))}
                  <span>
                    {includeType1 === 'includeAll'
                      ? '모두를 포함하고'
                      : '하나 이상을 포함하고'}
                  </span>
                  <br />
                  {components.map((el, idx) => (
                    <span key={`info-${idx}`}>
                      {el.selectedItems1.map((item1, idx1) => (
                        <span key={`item1-${idx1}`}>
                          &apos;{item1}&apos;
                          {idx1 < el.selectedItems1.length - 1 && ', '}
                        </span>
                      ))}
                      <span> 이 </span>
                      {el.selectedItems2.map((item2, idx2) => (
                        <span key={`item2-${idx2}`}>
                          &apos;{item2}&apos;
                          {idx2 < el.selectedItems2.length - 1 && ', '}
                        </span>
                      ))}
                      <span>
                        {el.includeType === 'includeAll'
                          ? '모두를 포함하고'
                          : '하나 이상을 포함하고'}
                      </span>
                      <br />
                    </span>
                  ))}
                  {searchValue && (
                    <span>
                      검색어가 &apos;
                      <span
                        dangerouslySetInnerHTML={{ __html: searchValue }}
                      ></span>
                      &apos;인 문항
                    </span>
                  )}
                </span>
              )}
            </InfoText>
            <Button
              $filled
              cursor
              disabled={buttonDisabled}
              onClick={() => onSearchList()}
            >
              <span>
                검색 <IoSearch />
              </span>
            </Button>
          </ButtonWrapper>
        </PositionWrapper>

        <PositionWrapper className="width">
          {questionList.length ? (
            <>
              <p className="top_info">
                {state == null && (
                  <span>
                    <CheckBoxI
                      $margin={'0 5px 0 0'}
                      onChange={(e) => handleAllCheck(e)}
                      checked={
                        checkList.length === questionList.length ? true : false
                      }
                      id={'all check'}
                      value={'all check'}
                    />
                    총 {checkList.length}건 전체 선택
                  </span>
                )}
                {state == null && (
                  <>
                    {checkList.length > 0 ? (
                      <ButtonEditWrapper>
                        <Button
                          $border
                          width="80px"
                          height="30px"
                          onClick={() => {
                            setState('복제');
                          }}
                        >
                          복제
                        </Button>
                        <Button
                          width="80px"
                          height="30px"
                          $filled
                          onClick={() => {
                            setState('수정');
                          }}
                        >
                          수정
                        </Button>
                      </ButtonEditWrapper>
                    ) : (
                      <span>검수완료(활성화)된 문항만 검색됩니다.</span>
                    )}
                  </>
                )}
                {state !== null && (
                  <>
                    <ButtonEditWrapper className="revers">
                      <Button
                        $border
                        width="120px"
                        height="30px"
                        // disabled={true}
                        onClick={(e) => {
                          editSubmit(e);
                        }}
                      >
                        문항 수정
                      </Button>
                      <Button
                        width="120px"
                        height="30px"
                        // disabled={true}
                        onClick={() => {
                          setState(null);
                        }}
                      >
                        {`${state} 취소`}
                      </Button>
                    </ButtonEditWrapper>
                  </>
                )}
              </p>
              <ScrollWrapper className="height">
                {state === null && (
                  <PerfectScrollbar>
                    <ListWrapper>
                      {questionList.map((item: QuizListType) => (
                        <EditListItem
                          key={item.code}
                          isChecked={checkList.includes(item.idx)}
                          onClick={(e) => handleButtonCheck(e, item.idx)}
                        >
                          <ContentsWrapper>
                            <ContentsBox>
                              <CheckBoxI
                                id={item.code}
                                value={item.idx}
                                $margin={`0 5px 0 0`}
                                checked={checkList.includes(item.idx)}
                                readOnly
                                width="15px"
                              />
                              <p className="flex_line size_12">
                                {item.quizCategoryList.map(
                                  (categoryItem, categoryIdx) => {
                                    const { quizCategory } = categoryItem; // quizCategory 추출

                                    return (
                                      <span
                                        key={`category-${item.idx}-${categoryIdx}`}
                                      >
                                        {/* "*유형"에 해당하는 값 */}

                                        <span>{`${quizCategory.대유형 ? quizCategory.대유형.replace(/\^\^\^\d+$/, '') + ' >' : ''}`}</span>
                                        <span>{`${quizCategory.중유형 ? quizCategory.중유형.replace(/\^\^\^\d+$/, '') + ' >' : ''}`}</span>
                                        <span>{`${quizCategory.소유형 ? quizCategory.소유형.replace(/\^\^\^\d+$/, '') + ' >' : ''}`}</span>
                                        <span>{`${quizCategory.유형 ? quizCategory.유형.replace(/\^\^\^\d+$/, '') + ' >' : ''}`}</span>
                                      </span>
                                    );
                                  },
                                )}
                              </p>
                            </ContentsBox>
                            <ContentsBox>
                              <p className="flex_line size_12">
                                {item.quizCategoryList.map(
                                  (categoryItem, categoryIdx) => {
                                    const { quizCategory } = categoryItem; // quizCategory 추출

                                    return (
                                      <span
                                        key={`category-${item.idx}-${categoryIdx}`}
                                      >
                                        {quizCategory &&
                                          quizCategory.sources &&
                                          quizCategory.sources.length > 0 &&
                                          quizCategory.sources.map(
                                            (el, idx) => (
                                              <span key={`${el.출처}-${idx}`}>
                                                {`${el.출처} `}
                                                {/* {idx <
                                            quizCategory.sources.length - 1
                                              ? ', '
                                              : ''} */}
                                              </span>
                                            ),
                                          )}
                                      </span>
                                    );
                                  },
                                )}
                              </p>
                            </ContentsBox>
                          </ContentsWrapper>
                        </EditListItem>
                      ))}
                    </ListWrapper>
                  </PerfectScrollbar>
                )}

                {state === '수정' && (
                  <PerfectScrollbar>
                    <ListWrapper>
                      {sortedQuizList.map((item: QuizListType) => (
                        <EditListItem
                          key={item.code}
                          isChecked={checkList.includes(item.idx)}
                          onClick={(e) => handleButtonCheck(e, item.idx)}
                        >
                          <ContentsWrapper>
                            <ContentsBox>
                              <CheckBoxI
                                id={item.code}
                                value={item.idx}
                                $margin={`0 5px 0 0`}
                                checked={checkList.includes(item.idx)}
                                readOnly
                                width="15px"
                              />
                              <p className="flex_line size_12">
                                {item.quizCategoryList.map(
                                  (categoryItem, categoryIdx) => {
                                    const { quizCategory } = categoryItem; // quizCategory 추출

                                    return (
                                      <span
                                        key={`category-${item.idx}-${categoryIdx}`}
                                      >
                                        {/* "*유형"에 해당하는 값 */}

                                        <span>{`${quizCategory.대유형 ? quizCategory.대유형.replace(/\^\^\^\d+$/, '') + ' >' : ''}`}</span>
                                        <span>{`${quizCategory.중유형 ? quizCategory.중유형.replace(/\^\^\^\d+$/, '') + ' >' : ''}`}</span>
                                        <span>{`${quizCategory.소유형 ? quizCategory.소유형.replace(/\^\^\^\d+$/, '') + ' >' : ''}`}</span>
                                        <span>{`${quizCategory.유형 ? quizCategory.유형.replace(/\^\^\^\d+$/, '') + ' >' : ''}`}</span>
                                      </span>
                                    );
                                  },
                                )}
                              </p>
                            </ContentsBox>
                            <ContentsBox>
                              <p className="flex_line size_12">
                                {item.quizCategoryList.map(
                                  (categoryItem, categoryIdx) => {
                                    const { quizCategory } = categoryItem; // quizCategory 추출

                                    return (
                                      <span
                                        key={`category-${item.idx}-${categoryIdx}`}
                                      >
                                        {quizCategory &&
                                          quizCategory.sources &&
                                          quizCategory.sources.length > 0 &&
                                          quizCategory.sources.map(
                                            (el, idx) => (
                                              <span key={`${el.출처}-${idx}`}>
                                                {`${el.출처} `}
                                                {/* {idx <
                                            quizCategory.sources.length - 1
                                              ? ', '
                                              : ''} */}
                                              </span>
                                            ),
                                          )}
                                      </span>
                                    );
                                  },
                                )}
                              </p>
                            </ContentsBox>
                          </ContentsWrapper>
                        </EditListItem>
                      ))}
                    </ListWrapper>
                  </PerfectScrollbar>
                )}
                {state === '복제' && (
                  <HalfWrapper>
                    <PerfectScrollbar>
                      <ListWrapper>
                        {sortedQuizList.map((item: QuizListType) => (
                          <EditListItem
                            key={item.code}
                            isChecked={checkList.includes(item.idx)}
                            onClick={(e) => handleButtonCheck(e, item.idx)}
                          >
                            <ContentsWrapper>
                              <ContentsBox>
                                <CheckBoxI
                                  id={item.code}
                                  value={item.idx}
                                  $margin={`0 5px 0 0`}
                                  checked={checkList.includes(item.idx)}
                                  readOnly
                                  width="15px"
                                />
                                <p className="flex_line size_12">
                                  {item.quizCategoryList.map(
                                    (categoryItem, categoryIdx) => {
                                      const { quizCategory } = categoryItem; // quizCategory 추출

                                      return (
                                        <span
                                          key={`category-${item.idx}-${categoryIdx}`}
                                        >
                                          {/* "*유형"에 해당하는 값 */}

                                          <span>{`${quizCategory.대유형 ? quizCategory.대유형.replace(/\^\^\^\d+$/, '') + ' >' : ''}`}</span>
                                          <span>{`${quizCategory.중유형 ? quizCategory.중유형.replace(/\^\^\^\d+$/, '') + ' >' : ''}`}</span>
                                          <span>{`${quizCategory.소유형 ? quizCategory.소유형.replace(/\^\^\^\d+$/, '') + ' >' : ''}`}</span>
                                          <span>{`${quizCategory.유형 ? quizCategory.유형.replace(/\^\^\^\d+$/, '') + ' >' : ''}`}</span>
                                        </span>
                                      );
                                    },
                                  )}
                                </p>
                              </ContentsBox>
                              <ContentsBox>
                                <p className="flex_line size_12">
                                  {item.quizCategoryList.map(
                                    (categoryItem, categoryIdx) => {
                                      const { quizCategory } = categoryItem; // quizCategory 추출

                                      return (
                                        <span
                                          key={`category-${item.idx}-${categoryIdx}`}
                                        >
                                          {quizCategory &&
                                            quizCategory.sources &&
                                            quizCategory.sources.length > 0 &&
                                            quizCategory.sources.map(
                                              (el, idx) => (
                                                <span key={`${el.출처}-${idx}`}>
                                                  {`${el.출처} `}
                                                  {/* {idx <
                                            quizCategory.sources.length - 1
                                              ? ', '
                                              : ''} */}
                                                </span>
                                              ),
                                            )}
                                        </span>
                                      );
                                    },
                                  )}
                                </p>
                              </ContentsBox>
                            </ContentsWrapper>
                          </EditListItem>
                        ))}
                      </ListWrapper>
                    </PerfectScrollbar>
                    <p>복제된 문항 총 {`${sortedQuizList.length}`}건</p>
                    <PerfectScrollbar>
                      <ListWrapper>
                        {sortedQuizList.map((item: QuizListType) => (
                          <EditListItem
                            key={item.code}
                            isChecked={checkList.includes(item.idx)}
                            onClick={(e) => handleButtonCheck(e, item.idx)}
                          >
                            <ContentsWrapper>
                              <ContentsBox>
                                <CheckBoxI
                                  id={item.code}
                                  value={item.idx}
                                  $margin={`0 5px 0 0`}
                                  checked={checkList.includes(item.idx)}
                                  readOnly
                                  width="15px"
                                />
                                <p className="flex_line size_12">
                                  {item.quizCategoryList.map(
                                    (categoryItem, categoryIdx) => {
                                      const { quizCategory } = categoryItem; // quizCategory 추출

                                      return (
                                        <span
                                          key={`category-${item.idx}-${categoryIdx}`}
                                        >
                                          {/* "*유형"에 해당하는 값 */}

                                          <span>{`${quizCategory.대유형 ? quizCategory.대유형.replace(/\^\^\^\d+$/, '') + ' >' : ''}`}</span>
                                          <span>{`${quizCategory.중유형 ? quizCategory.중유형.replace(/\^\^\^\d+$/, '') + ' >' : ''}`}</span>
                                          <span>{`${quizCategory.소유형 ? quizCategory.소유형.replace(/\^\^\^\d+$/, '') + ' >' : ''}`}</span>
                                          <span>{`${quizCategory.유형 ? quizCategory.유형.replace(/\^\^\^\d+$/, '') + ' >' : ''}`}</span>
                                        </span>
                                      );
                                    },
                                  )}
                                </p>
                              </ContentsBox>
                              <ContentsBox>
                                <p className="flex_line size_12">
                                  {item.quizCategoryList.map(
                                    (categoryItem, categoryIdx) => {
                                      const { quizCategory } = categoryItem; // quizCategory 추출

                                      return (
                                        <span
                                          key={`category-${item.idx}-${categoryIdx}`}
                                        >
                                          {quizCategory &&
                                            quizCategory.sources &&
                                            quizCategory.sources.length > 0 &&
                                            quizCategory.sources.map(
                                              (el, idx) => (
                                                <span key={`${el.출처}-${idx}`}>
                                                  {`${el.출처} `}
                                                  {/* {idx <
                                            quizCategory.sources.length - 1
                                              ? ', '
                                              : ''} */}
                                                </span>
                                              ),
                                            )}
                                        </span>
                                      );
                                    },
                                  )}
                                </p>
                              </ContentsBox>
                            </ContentsWrapper>
                          </EditListItem>
                        ))}
                      </ListWrapper>
                    </PerfectScrollbar>
                  </HalfWrapper>
                )}
              </ScrollWrapper>

              {state == null ? (
                <>
                  {quizData.pagination && (
                    <PaginationBox
                      itemsCountPerPage={8}
                      totalItemsCount={quizData.pagination.totalCount}
                      $margin={'0 0 20px 0'}
                    />
                  )}
                </>
              ) : (
                <ButtonApplyWrapper>
                  <Button
                    $filled
                    disabled={true}
                    width="80px"
                    height="40px"
                    onClick={() => {}}
                  >
                    적용
                  </Button>
                  <p>
                    {`${
                      state == '수정'
                        ? `총 ${sortedQuizList.length}문항 변경된 내용으로`
                        : `복제된 총 ${sortedQuizList.length}문항 변경된 내용으로`
                    }`}
                  </p>
                </ButtonApplyWrapper>
              )}
            </>
          ) : (
            <ValueNoneWrapper>
              <ValueNone textOnly info={'검색 조건을 입력해주세요'} />
            </ValueNoneWrapper>
          )}
        </PositionWrapper>
        <Modal />
      </Container>

      {/* 수식 입력창 영역 */}
      <div className="itex_editor_container">
        <div id="first" className="resizeable" style={{ display: 'none' }}>
          <div id="itex_viewer_area">
            <div id="data_viewer_body">
              <div className="trans_area h-100">
                <div
                  className="itex_hml_convert_view"
                  //   contentEditable="true"
                ></div>
                <button id="pasteButton" className="hml_copy_btn">
                  붙여넣기
                </button>
                <div className="origin_img_area h-100 hml_multi">
                  <div className="itex_ocrimg_area" style={{ width: '100%' }}>
                    <img id="itex_main_img" alt="" />
                  </div>
                  <div className="itex-drag-area multi">
                    <div className="icon">{/* <DocumentIcon /> */}</div>
                    <input
                      id="upload_file"
                      className="hml_multi"
                      name="images"
                      type="file"
                      accept=".hml"
                    />
                  </div>
                </div>
              </div>
              <div
                className="itex_fixed_tool position-absolute bottom-0 start-50 translate-middle-x zindex-fixed"
                role="toolbar"
                aria-label="Toolbar with button groups"
              >
                <div
                  className="btn-group btn-group-md"
                  role="group"
                  aria-label="1th group"
                >
                  <button
                    type="button"
                    className="btn btn-secondary"
                    id="itex_page_clear"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    data-bs-trigger="hover"
                    title="지우기"
                  >
                    <TrashIcon />
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-method="rotate"
                    id="itex_Rotate_L"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    data-bs-trigger="hover"
                    title="왼쪽으로 회전"
                    disabled={true}
                  >
                    <ArrowCounterclockwiseIcon />
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-method="rotate"
                    id="itex_Rotate_R"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    data-bs-trigger="hover"
                    title="오른쪽으로 회전"
                    disabled={true}
                  >
                    <ArrowClockwiseIcon />
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    id="onPrevPage"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    data-bs-trigger="hover"
                    title="이전 페이지"
                    disabled={true}
                  >
                    <ChevronLeftIcon />
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    id="onNextPage"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    data-bs-trigger="hover"
                    title="다음 페이지"
                    disabled={true}
                  >
                    <ChevronRightIcon />
                  </button>
                  <div className="pdf_page_show pdf_page_hidden">
                    <input
                      className="input-group-text pdf_page_a"
                      id="inputGroup-sizing-sm"
                      type="text"
                    />
                    <span
                      className="input-group-text btn-secondary pdf_page_s"
                      id="inputGroup-sizing-sm"
                    >
                      /0
                    </span>
                  </div>
                  <button
                    type="button"
                    className="btn btn-secondary itex_edit_mv"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    data-bs-trigger="hover"
                    title="모바일 환경에서 에디터 창으로 이동합니다."
                    style={{ display: 'none' }}
                  >
                    <BoxArrowInUpRightIcon />
                  </button>
                  <button
                    type="button"
                    className="btn btn-info itex_total_count"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    data-bs-trigger="hover"
                    title="변환 내역"
                    style={{ display: 'none' }}
                  >
                    <BarCharLineIcon />
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      <span className="itex_obj_count">0</span>
                      <span className="visually-hidden"></span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <div id="data_viewer_footer"></div>
            <div className="qnai_trans_form">
              <div>
                <div className="btn-group btn-group-sm">
                  <button
                    type="button"
                    className="btn btn-primary"
                    title="선택영역의 컨텐츠를 인식합니다."
                    id="doc_ocr_converter"
                  >
                    문항인식
                  </button>
                  <button
                    type="button"
                    className="btn btn-success"
                    id="img_crop_normal"
                    title="선택영역을 이미지로 변환합니다."
                  >
                    그림넣기
                  </button>
                  <button
                    type="button"
                    className="btn btn-warning"
                    id="itex_crop_clear"
                    title="크롭 해제"
                    aria-label="Close"
                  >
                    <CloseIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="dragger-left" className="dragger dragger-left">
          <button className="open_btn_left" style={{ display: 'none' }}>
            {'>'}
          </button>
        </div>
        <div id="second" className="resizeable" style={{ display: 'none' }}>
          <div className="col-lg-4 p-0 tiny_wrap">
            <textarea id="tinyeditor"></textarea>
            <div className="save_exam_btn_wrap">
              {/* <button id="exam_change">변경</button> */}
              <button
                id="exam_save_all"
                onClick={async () => {
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-expect-error
                  const gggg = await window.saveHmlData();
                  console.log(gggg);
                }}
              >
                저장
              </button>
            </div>
            <div className="poc_checker_block"></div>
          </div>
        </div>

        <div className="tools_wrap eq_config_hidden">
          <div id="editor_container"></div>
          <div id="iframe_ocr_box" ref={ocrIframeContainer}></div>
          <div id="itexhml_board"></div>
          <div id="modal_block">
            <div className="sk-cube-grid">
              <div className="sk-cube sk-cube1"></div>
              <div className="sk-cube sk-cube2"></div>
              <div className="sk-cube sk-cube3"></div>
              <div className="sk-cube sk-cube4"></div>
              <div className="sk-cube sk-cube5"></div>
              <div className="sk-cube sk-cube6"></div>
              <div className="sk-cube sk-cube7"></div>
              <div className="sk-cube sk-cube8"></div>
              <div className="sk-cube sk-cube9"></div>
            </div>
          </div>
        </div>
        <input
          type="file"
          accept=".jpg,.jpeg,.png"
          id="itex_imgfile"
          style={{ display: 'none' }}
        />
      </div>
    </>
  );
}
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const PositionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  margin: 0 5px;

  &.width_400 {
    min-width: 400px;
    padding-right: 0;
  }
  &.width {
    flex: 1 0 0;
    min-height: 500px;
    background-color: ${COLOR.LIGHT_GRAY};
  }

  .top_info {
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
const Title = styled.div`
  padding: 15px;
  padding-bottom: 5px;
  background-color: ${COLOR.LIGHT_GRAY};
  display: flex;
  align-items: center;

  .title_top {
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: bold;
  }
`;

const ScrollWrapper = styled.div`
  margin-top: 10px;

  overflow-y: auto;
  width: 100%;
  background-color: ${COLOR.LIGHT_GRAY};

  &.height_500 {
    height: calc(100vh - 500px);
  }

  &.height {
    height: calc(100vh - 280px);
  }

  .flex_line {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: flex-start;
  }
  .size_12 {
    font-size: 12px;
  }
`;
const ContentsBox = styled.div`
  display: flex;
`;

const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  width: 100%;
  border: 1px solid ${COLOR.BORDER_GRAY};
  border-radius: 5px;
  padding: 5px;
  position: relative;

  > input {
    width: calc(100% - 85px);
    border: none;
    border-radius: 5px;
    font-size: 15px;
    padding: 0 10px;
    text-overflow: ellipsis;
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;

  .pagination {
    padding-bottom: 12px;
  }
`;

const ButtonEditWrapper = styled.div`
  display: flex;
  gap: 10px;
  &.revers {
    width: 100%;
    flex-direction: row-reverse;
  }
`;
const ButtonApplyWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
`;

const DropdownWithCheckboxWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  padding: 10px;
  padding-left: 15px;
  span {
    font-size: 13px;
    padding: 5px;
  }
`;

const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 10px;
`;

// Button은 선택된 상태에 따라 배경색을 변경
const SwitchButton = styled.button<{ isSelected: boolean }>`
  padding: 5px 20px;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid #358aff;
  background-color: ${({ isSelected }) => (isSelected ? '#358aff' : '#f0f0f0')};
  color: ${({ isSelected }) => (isSelected ? 'white' : '#358aff')};
  font-size: 14px;
  font-weight: bold;
`;

const ComponentSet = styled.div`
  position: relative;
  margin-left: 20px;
`;

const AddButton = styled.button`
  margin: 10px 0;
  padding: 10px 20px;
  color: ${COLOR.PRIMARY};
  border: 1px dotted ${COLOR.PRIMARY};
  border-radius: 4px;
  cursor: pointer;
  background-color: transparent;
`;
const InfoText = styled.p`
  padding: 10px;
  width: 400px;
  margin: 0 auto;
  border: 1px dashed #aaa;
  margin-bottom: 10px;
  .placeholder {
    color: #aaa;
  }
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 20px;
  left: -10px;
  background-color: #dc3545;
  color: white;
  border: none;
  width: 20px;
  height: 20px;
  line-height: 20px;
  border-radius: 50%;
  cursor: pointer;
`;

const ValueNoneWrapper = styled.div`
  background-color: ${COLOR.LIGHT_GRAY};
  display: flex;
  height: 100%;
`;

const ListWrapper = styled.ul`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 10px;
`;

const HalfWrapper = styled.div`
  > div {
    border: 5px solid #aaa;
    background-color: #fff;
  }
  > div:first-child {
    position: relative;
    background-color: #aaa;
    margin-bottom: 10px;
  }
  /* > div:first-child::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
  } */
  padding: 20px;
  height: 50%;
`;
const LoaderWrapper = styled.div`
  display: flex;
  width: 100%;
  padding-top: 30px;
  padding-left: calc(50% - 35px);
`;
