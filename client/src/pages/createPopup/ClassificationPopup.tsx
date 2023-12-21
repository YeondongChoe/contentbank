import * as React from 'react';
import { useEffect, useState } from 'react';

import styled from 'styled-components';

import { MathViewer, Button, Select, Input } from '../../components';
import { COLOR } from '../../components/contents/COLOR';
import Contents from '../../components/mathViewer/test1.json';
import Contents2 from '../../components/mathViewer/test2.json';
import Contents3 from '../../components/mathViewer/test3.json';
import Contents4 from '../../components/mathViewer/test4.json';

import dummy from './data.json';

export function ClassificationPopup() {
  const ContentList = dummy.ContentInfo;
  const Category1 = dummy.Category;
  const Category2 = dummy.Category2;

  const [didMount, setDidMount] = useState(false);
  let mountCount = 1;
  const [selectedCode, setSelectedCode] = useState(null);
  const [code, setCode] = useState('');
  const [classificatecode, setClassificatecode] = useState('');
  const [content, setContent] = useState<string[]>([]);

  const selectCategoryOption = (event: React.MouseEvent<HTMLButtonElement>) => {
    // console.log(event.currentTarget.value);
    const value = event.currentTarget.value;
    setContent((prevContent) => [...prevContent, value]);
  };

  const checkSelectedContentCode = (sort: any) => {
    setSelectedCode(sort === selectedCode ? null : sort);
  };

  const selectContentCode = (
    sort: number,
    code: string,
    classificatecode: string,
  ) => {
    checkSelectedContentCode(sort);
    setCode(code);
    setClassificatecode(classificatecode);
    console.log('가지고 있는 Info 뿌려주기');
  };

  const submitSave = async () => {
    console.log('항목의 변화가 없으면 버튼 비활성화');
    console.log('변경된 문항Info Put 요청 APi');
  };

  useEffect(() => {
    mountCount++;
    setDidMount(true);
  }, []);

  useEffect(() => {
    if (didMount) {
      console.log('Info를 포함한 contentList gey 요청 API');
    }
  }, [didMount]);

  useEffect(() => {
    if (didMount) {
      // console.log('contentListInfo 불러오는 함수');
    }
  }, [code, classificatecode]);

  return (
    <Container>
      <Wrapper>
        <ContentListWrapper>
          <Title>문항 선택</Title>
          <ContentsList>
            {ContentList.map((el, i) => (
              <Content
                key={i}
                onClick={() => {
                  selectContentCode(el.sort, el.code, el.classificatecode);
                }}
                choiced={el.sort === selectedCode}
              >
                {el.code}
              </Content>
            ))}
          </ContentsList>
        </ContentListWrapper>
        <ContentViewerWrapper>
          <Title>문항 뷰어</Title>
          {/* <ContentViewer>
            <MathViewer data={Contents} />
          </ContentViewer> */}
          {/* <ContentViewer>
            <MathViewer data={Contents2} />
          </ContentViewer> */}
          {/* <ContentViewer>
            <MathViewer data={Contents3} />
          </ContentViewer> */}
          <ContentViewer>
            <MathViewer data={Contents2} />
            <MathViewer data={Contents3} />
            <MathViewer data={Contents4} />
          </ContentViewer>
        </ContentViewerWrapper>

        <ContentClassificationWrapper>
          <form>
            <Title>문항 분류</Title>
            <ContentClassificationForm>
              <Input
                type="text"
                disabled
                placeholder="문항분류코드"
                border="normal"
                width="100%"
                height="40px"
                padding="15px"
                fontSize="14px"
                value={code}
              />
              <Input
                type="text"
                disabled
                placeholder="문항코드"
                border="normal"
                width="100%"
                height="40px"
                padding="15px"
                fontSize="14px"
                value={classificatecode}
              />
              {Category1.map((el) => (
                <Select
                  width={'100%'}
                  defaultValue={el.label}
                  key={el.label}
                  options={el.options}
                  onSelect={(event) => selectCategoryOption(event)}
                />
              ))}
            </ContentClassificationForm>
            <ContentClassificationFormBottom>
              {Category2.map((el) => (
                <Select
                  width={'174px'}
                  defaultValue={el.label}
                  key={el.label}
                  options={el.options}
                  onSelect={(event) => selectCategoryOption(event)}
                />
              ))}
            </ContentClassificationFormBottom>
            <ButtonWrapper>
              <Button
                buttonType="button"
                onClick={submitSave}
                height={'25px'}
                width={'70px'}
                fontSize="12px"
              >
                <span>저장</span>
              </Button>
            </ButtonWrapper>
          </form>
        </ContentClassificationWrapper>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  max-width: 1024px;
  min-width: 800px;
  border: 1px solid ${COLOR.BORDER_BLUE};
  border-top: none;
`;
const Wrapper = styled.div`
  display: flex;
`;
const Title = styled.div`
  font-size: 14px;
  padding: 10px;
  border-bottom: 1px solid ${COLOR.BORDER_BLUE};
`;
const ContentListWrapper = styled.div`
  border-right: 1px solid ${COLOR.BORDER_BLUE};
  flex: 1 0 30%;
`;
const ContentsList = styled.div`
  padding: 10px;
`;
const Content = styled.div<{ choiced: boolean }>`
  font-size: 13px;
  background-color: ${(props) =>
    props.choiced ? `${COLOR.BORDER_BLUE}` : 'white'};
  color: ${(props) => (props.choiced ? 'white' : 'initial')};
  cursor: pointer;
`;
const ContentViewerWrapper = styled.div`
  border-right: 1px solid ${COLOR.BORDER_BLUE};
  flex: 1 0 30%;
`;
const ContentViewer = styled.div`
  padding: 10px;
`;
const ContentClassificationWrapper = styled.div`
  flex: 1 0 40%;
`;
const ContentClassificationForm = styled.div`
  padding: 15px 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-bottom: 1px solid ${COLOR.BORDER_BLUE};
`;
const ContentClassificationFormBottom = styled.div`
  padding: 15px 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  border-bottom: 1px solid ${COLOR.BORDER_BLUE};
`;
const ButtonWrapper = styled.div`
  height: 40px;
  padding: 15px 10px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
