import * as React from 'react';
import { useState, useEffect, useRef } from 'react';

import axios from 'axios';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { LuDownload, LuFileSearch2 } from 'react-icons/lu';
import { SlOptionsVertical, SlPrinter } from 'react-icons/sl';
import { useLocation, useNavigate } from 'react-router';
import ReactToPrint from 'react-to-print';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import {
  Button,
  IndexInfo,
  PaginationBox,
  Search,
  TabMenu,
  Table,
} from '../../components';
import { WorksheetBasic } from '../../components/worksheet/WorksheetBasic';
import { previewWorksheetBoolAtom } from '../../store/creatingWorksheetAtom';
import { pageAtom, totalPageAtom } from '../../store/utilAtom';
import { WorksheetTableType } from '../../types';
import { windowOpenHandler } from '../../utils/windowHandler';
import { COLOR, worksheetColWidth, worksheetTheadList } from '../constants';
import dummy from '../constants/data.json';

export function Worksheet() {
  const location = useLocation();
  const navigate = useNavigate();

  const [tabVeiw, setTabVeiw] = useState<string>('학습지');
  const [subTabVeiw, setSubTabVeiw] = useState<string>('전체');
  const [searchValue, setSearchValue] = useState<string>('');
  const [totalPage, settotalPage] = useRecoilState(totalPageAtom);

  // 검색 기능 함수
  const filterSearchValue = () => {
    console.log('기존데이터 입력된 값으로 솎아낸뒤 재출력');
  };

  const changeListData = () => {
    console.log('탭클릭시 tabVeiw에 맞는 리스트 데이터 출력');
    console.log(tabVeiw, subTabVeiw);
  };

  const [didMount, setDidMount] = useState(false);

  const [isPreview, setIsPreview] = useRecoilState(previewWorksheetBoolAtom);
  // const setIsEditWorksheet = useSetRecoilState(editWorksheetBoolAtom);

  const openEditFilePopup = () => {};
  // 학습지 설정 버튼
  const openSettingList = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    console.log(event.currentTarget.children[1].classList);
    event.currentTarget.children[1].classList.add('show');
  };
  const closeSettingList = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.currentTarget.children[1].classList.remove('show');
  };

  // 학습지 만들기 페이지로 이동
  const openWindowCreateWorksheet = () => {
    windowOpenHandler({
      name: 'createworksheetwindow',
      url: '/content-create/exam/step1',
      options:
        'width=1600,height=965,top=Math.round(window.screen.height / 2 - windowHeight / 2),left=Math.round(window.screen.width / 2 - windowWidth / 2),toolbar=no,titlebar=no,scrollbars=no,status=no,location=no,menubar=no,frame=no',
    });
  };

  const ref = useRef(null);

  useEffect(() => {
    setDidMount(true);
  }, []);

  useEffect(() => {
    if (didMount) {
      console.log('학습지테이블 데이타 가져오기');
    }
  }, [didMount]);

  // useEffect(() => {
  //   //초기화
  //   if (subTabVeiw !== '전체') {
  //     return setSubTabVeiw('전체');
  //   }
  // }, [tabVeiw]);

  useEffect(() => {
    changeListData();
  }, [tabVeiw, subTabVeiw]);

  const menuList = [
    {
      label: '학습지',
      value: '학습지',
    },
    {
      label: '즐겨찾는학습지',
      value: '즐겨찾는학습지',
    },
  ];
  const subMenuList = [
    {
      label: '전체',
      value: '전체',
    },
    {
      label: '초등',
      value: '초등',
    },
    {
      label: '중등',
      value: '중등',
    },
    {
      label: '고등',
      value: '고등',
    },
  ];
  const worksheetList: WorksheetTableType[] = dummy.Worksheet;

  const [showPdf, setShowPdf] = useState(false);

  const closePdfViewer = () => {
    setShowPdf(false);
  };

  const [pdfData, setPdfData] = useState<string | undefined>(undefined);

  const testApi = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/get-pdf',
        {
          title: 'Sample Title1',
          content: 'Sample Content1',
        },
        {
          responseType: 'arraybuffer', // 서버로부터 바이너리 데이터로 응답 받기
        },
      );

      if (response.status === 200) {
        const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setPdfData(pdfUrl);
        setShowPdf(true);
      } else {
        console.error('Server responded with an error');
      }
    } catch (error) {
      console.error('Failed to fetch PDF data:', error);
    }
  };

  return (
    <Container>
      {showPdf ? (
        <IframeWrapper>
          <IframeButtonWrapper>
            <Button
              height={'30px'}
              width={'80px'}
              fontSize="13px"
              $filled
              cursor
              onClick={closePdfViewer}
            >
              닫기
            </Button>
          </IframeButtonWrapper>
          <iframe
            src={pdfData}
            width="1100"
            height="750"
            style={{ border: 'none', borderRadius: 25 }}
          ></iframe>
        </IframeWrapper>
      ) : (
        <>
          <TitleWrapper>
            <Title>문항</Title>
            <Button
              height={'35px'}
              width={'150px'}
              onClick={openWindowCreateWorksheet}
              fontSize="13px"
              $filled
              cursor
            >
              + 학습지 만들기
            </Button>
          </TitleWrapper>
          <HeadWrapper>
            <TabMenu
              length={2}
              menu={menuList}
              width={'250px'}
              selected={tabVeiw}
              setTabVeiw={setTabVeiw}
            />
            <Search
              value={searchValue}
              width={'25%'}
              height="40px"
              onClick={() => filterSearchValue()}
              onKeyDown={(e) => {}}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="학습지명, 학년, 태그, 작성자 검색"
            />
          </HeadWrapper>
          {/* <TableWrapper>
        <Table
          list={worksheetList}
          colWidth={worksheetColWidth}
          theadList={worksheetTheadList}
          setIsEnabled={() => {}}
          setSelectedRows={() => {}}
        />
      </TableWrapper> */}
          <TabMenu
            length={4}
            menu={subMenuList}
            width={'300px'}
            selected={subTabVeiw}
            setTabVeiw={setSubTabVeiw}
            lineStyle
            $margin={'10px 0 20px 0'}
          />
          <ListWrapper>
            <ListTitleWrapper>
              <ListTitle className="bookmark"></ListTitle>
              <ListTitle className="grade">학년</ListTitle>
              <ListTitle className="tag">태그</ListTitle>
              <ListTitle className="title">학습지명</ListTitle>
              <ListTitle className="createAt">등록일</ListTitle>
              <ListTitle className="creater">작성자</ListTitle>
              <ListTitle className="preview">미리보기</ListTitle>
              <ListTitle className="setting">설정</ListTitle>
            </ListTitleWrapper>
            {worksheetList.map((content) => (
              <WorksheetList key={content?.id}>
                <div
                  className="bookmark"
                  onClick={() => {
                    //addFavoriteQuestion(content.questionSeq);
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  {content.favorited ? <FaBookmark /> : <FaRegBookmark />}
                </div>
                <div className="grade">{content.schoolLevel}</div>
                <div className="tag">{content.tag}</div>
                <div className="title">{content.worksheetName}</div>
                <div className="createAt">{content.createdAt}</div>
                <div className="creater">{content.creater}</div>
                <div className="preview">
                  <LuFileSearch2
                    style={{ fontSize: '22px', cursor: 'pointer' }}
                    onClick={testApi}
                  />
                </div>
                <div className="setting">
                  <SettingButton
                    type="button"
                    onClick={(event) => openSettingList(event)}
                    onMouseLeave={(event) => closeSettingList(event)}
                  >
                    <SlOptionsVertical style={{ fontSize: '16px' }} />
                    <SettingList>
                      <li>
                        <button
                          type="button"
                          onClick={(event) => {
                            openEditFilePopup();
                          }}
                        >
                          수정
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={(event) => {
                            openEditFilePopup();
                          }}
                        >
                          복제 후 수정
                        </button>
                      </li>
                      <li>
                        <button type="button" onClick={(event) => {}}>
                          삭제
                        </button>
                      </li>
                    </SettingList>
                  </SettingButton>
                </div>
              </WorksheetList>
            ))}
          </ListWrapper>
          <PaginationBox itemsCountPerPage={10} totalItemsCount={totalPage} />
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  padding: 40px 80px;
  width: 100%;
`;
const IframeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;
const IframeButtonWrapper = styled.div`
  width: 1100px;
  display: flex;
  justify-content: flex-end;
`;
const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
`;
const Title = styled.div`
  font-size: 24px;
  font-weight: 800;
`;
const HeadWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10px;
`;
const TableWrapper = styled.div`
  min-height: 280px;
`;
const ListWrapper = styled.div`
  min-height: 550px;
`;
const ListTitleWrapper = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-color: ${COLOR.TABLE_GRAY};
  border-top: 1px solid ${COLOR.BORDER_GRAY};
  border-bottom: 1px solid ${COLOR.BORDER_GRAY};

  .bookmark {
    min-width: 5%;
  }
  .grade {
    min-width: 5%;
  }
  .tag {
    min-width: 10%;
  }
  .title {
    min-width: 50%;
  }
  .createAt {
    min-width: 10%;
  }
  .creater {
    min-width: 10%;
  }
  .preview {
    min-width: 5%;
  }
  .setting {
    min-width: 5%;
  }
`;
const ListTitle = styled.div`
  font-size: 15px;
  font-weight: bold;
  display: flex;
  justify-content: center;
`;
const WorksheetList = styled.li`
  height: 43px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-color: white;
  font-size: 14px;

  .bookmark {
    min-width: 5%;
    display: flex;
    justify-content: center;
  }
  .grade {
    min-width: 5%;
    display: flex;
    justify-content: center;
  }
  .tag {
    min-width: 10%;
    display: flex;
    justify-content: center;
  }
  .title {
    min-width: 50%;
    display: flex;
    justify-content: center;
  }
  .createAt {
    min-width: 10%;
    display: flex;
    justify-content: center;
  }
  .creater {
    min-width: 10%;
    display: flex;
    justify-content: center;
  }
  .preview {
    min-width: 5%;
    display: flex;
    justify-content: center;
  }
  .setting {
    min-width: 5%;
    display: flex;
    justify-content: center;

    > button {
      background-color: transparent;
      border: none;
      cursor: pointer;
    }
  }
`;
const SettingButton = styled.button`
  position: relative;
  padding: 5px;
  margin: -5px;
`;

const SettingList = styled.ul`
  display: none;
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  border: 1px solid ${COLOR.SECONDARY};
  border-radius: 5px;
  overflow: hidden;
  z-index: 1;

  &.show {
    display: block;
  }

  li {
    width: 140px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;

    button {
      font-size: 14px;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      background-color: #fff;
      color: ${COLOR.GRAY};
      transition: all 0.1s;
      z-index: 2;
      border: none;

      &:hover {
        background-color: ${COLOR.HOVER};
        color: ${COLOR.PRIMARY};
      }
    }
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;
