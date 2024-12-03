import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import { styled } from 'styled-components';

import { Alert } from '..';
import { quizService } from '../../../api/axios';
import { useModal } from '../../../hooks';
import { postRefreshToken } from '../../../utils/tokenHandler';
import { Button, Label, Select, openToastifyAlert } from '../../atom';
import { COLOR } from '../../constants';

type ReportProcessType = {
  registorReport?: boolean;
  reportIdx?: number;
};

export function ReportProcessModal({
  registorReport,
  reportIdx,
}: ReportProcessType) {
  const { closeModal } = useModal();
  const [content, setContent] = useState<string>();
  const [commentValue, setCommentValue] = useState('');
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [reportType, setReportType] = useState<
    {
      id: string;
      label: string;
      name: string;
    }[]
  >([
    {
      id: '단원·유형 분류 오류',
      label: '단원·유형 분류 오류',
      name: '단원·유형 분류 오류',
    },
    {
      id: '난이도 및 문항타입 오류',
      label: '난이도 및 문항타입 오류',
      name: '난이도 및 문항타입 오류',
    },
    {
      id: '이미지 및 그래프/도표 오류',
      label: '이미지 및 그래프/도표 오류',
      name: '이미지 및 그래프/도표 오류',
    },
    {
      id: '오탈자',
      label: '오탈자',
      name: '오탈자',
    },
    {
      id: '기타',
      label: '기타',
      name: '기타',
    },
  ]);
  // 문항 신고
  const postReportQuiz = async (data: any) => {
    return await quizService.post(`/v1/report`, data);
  };

  const { mutate: postReportQuizData } = useMutation({
    mutationFn: postReportQuiz,
    onError: (context: {
      response: { data: { message: string; code: string } };
    }) => {
      openToastifyAlert({
        type: 'error',
        text: context.response.data.message,
      });
      if (context.response.data.code == 'GE-002') {
        postRefreshToken();
      }
    },
    onSuccess: (response) => {
      openToastifyAlert({
        type: 'success',
        text: response.data.message,
      });
      closeModal();
    },
  });

  const selectCategoryOption = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.value;
    setContent(value);
  };
  const submitReportProcess = () => {
    const data = {
      reportType: registorReport ? 'REPORT' : 'ANSWER',
      idx: reportIdx,
      type: content,
      content: commentValue,
      articleList: [],
    };
    if (content === undefined) {
      openToastifyAlert({
        type: 'error',
        text: '신고유형을 선택해주세요',
      });
    } else {
      postReportQuizData(data);
    }
    //해당 신고내역에 처리된 상태 보내기
  };

  const [images, setImages] = useState<Array<string | null>>([null]); // 초기 빈 ImgBox 1개
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 파일 선택 트리거
  const handleClick = (index: number) => {
    fileInputRef.current?.click();
    if (fileInputRef.current) {
      fileInputRef.current.dataset.index = String(index);
    }
  };
  console.log(images);

  // 이미지 파일 처리
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const index = event.target.dataset.index;

    if (file && index !== undefined) {
      const reader = new FileReader();
      reader.onload = () => {
        setImages((prevImages) => {
          const updatedImages = [...prevImages];
          updatedImages[parseInt(index, 10)] = reader.result as string;

          // 새로운 빈 ImgBox 추가 (최대 5개 제한)
          if (updatedImages.length < 5 && !updatedImages.includes(null)) {
            updatedImages.push(null);
          }

          return updatedImages;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // 이미지 삭제 처리
  const handleRemoveImage = (index: number) => {
    setImages((prevImages) => {
      const updatedImages = prevImages.filter((_, i) => i !== index); // 선택한 인덱스 제거

      // 빈 ImgBox가 5개 미만일 때 추가
      if (updatedImages.length < 5 && !updatedImages.includes(null)) {
        updatedImages.push(null);
      }

      return updatedImages;
    });
  };

  return (
    <Container>
      <Title>{registorReport ? '문항 신고' : '처리완료 상태 등록'}</Title>
      <InputWrapper>
        <Label
          width="100px"
          fontSize="15px"
          value={registorReport ? '신고 유형' : '처리 유형'}
        />
        <Select
          width={`100%`}
          height="50px"
          padding="5px 0px 0px 0px"
          defaultValue={
            registorReport
              ? '신고유형을 선택해주세요'
              : '처리유형을 선택해주세요'
          }
          options={reportType}
          isnormalizedOptions
          onSelect={(event) => selectCategoryOption(event)}
        />
      </InputWrapper>
      <InputWrapper>
        <Label
          width="100px"
          fontSize="15px"
          value={registorReport ? '신고 내용' : '처리 내용'}
        />
        <div>
          <Textarea
            onChange={(e) => {
              setCommentValue(e.target.value);
            }}
            maxLength={1000}
          />
        </div>
      </InputWrapper>
      <ImgWrapper>
        <LabelWrapper>
          <Label width="100px" fontSize="15px" value={'이미지 첨부'} />
          <p>이미지는 최대 5개까지 등록 가능합니다.(용량 500mb)</p>
        </LabelWrapper>
        <ImgBoxWrapper>
          {images.map((imgSrc, index) => (
            <ImgBox key={index} onClick={() => handleClick(index)}>
              {imgSrc ? (
                <>
                  <img
                    src={imgSrc}
                    alt="uploaded"
                    style={{ width: '100%', height: '100%' }}
                  />
                  <CloseButton
                    onClick={(e) => {
                      e.stopPropagation(); // ImgBox 클릭 이벤트 방지
                      handleRemoveImage(index);
                    }}
                  >
                    X
                  </CloseButton>
                </>
              ) : (
                '+'
              )}
            </ImgBox>
          ))}
        </ImgBoxWrapper>
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </ImgWrapper>
      <ButtonGroup>
        <Button
          buttonType="button"
          onClick={() => closeModal()}
          $padding="10px"
          width="70px"
          height={'30px'}
          fontSize="14px"
          $border
          cursor
        >
          <span>취소</span>
        </Button>
        <Button
          buttonType="button"
          onClick={() => setIsAlertOpen(true)}
          $padding="10px"
          width="70px"
          height={'30px'}
          fontSize="14px"
          $filled
          cursor
        >
          <span>등록</span>
        </Button>
      </ButtonGroup>

      <Alert
        top="calc(50% - 100px)"
        isAlertOpen={isAlertOpen}
        description={
          registorReport
            ? '해당 문항을 신고하시겠습니까?'
            : '해당 문항을 처리하시겠습니까?'
        }
        subDescription={
          registorReport
            ? '신고 후 해당 문항은 리스트에서 사라지며, 취소는 불가합니다.'
            : '처리 후 해당 문항은 리스트에서 사라지며, 취소는 불가합니다.'
        }
        action="확인"
        isWarning={true}
        onClick={() => submitReportProcess()}
        onClose={() => setIsAlertOpen(false)}
      />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  min-width: 600px;
`;
const Title = styled.strong`
  font-size: 22px;
  width: 100%;
  display: block;
  font-weight: normal;
  text-align: center;
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid ${COLOR.BORDER_GRAY};
`;
const InputWrapper = styled.div`
  width: 100%;
  padding: 10px 40px;
  display: flex;
  justify-content: space-between;
  position: relative;
  padding-bottom: 20px;

  > div {
    width: calc(100% - 100px);
  }
`;
const ImgWrapper = styled.div`
  padding: 10px 40px;
  display: flex;
  justify-content: space-between;
  position: relative;
  padding-bottom: 20px;
`;
const LabelWrapper = styled.div`
  p {
    width: 100px;
    padding-right: 10px;
    font-size: 10px;
    color: ${COLOR.FONT_GRAY};
  }
`;
const ImgBoxWrapper = styled.ul`
  width: 440px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 10px;
`;
const ImgBox = styled.div`
  position: relative;
  width: 140px;
  height: 140px;
  border: 1px solid ${COLOR.BORDER_GRAY};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  color: ${COLOR.FONT_GRAY};
  cursor: pointer;
`;
const CloseButton = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  background: gray;
  color: white;
  border: none;
  border-radius: 50%;
  width: 14px;
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 12px;
`;
const Textarea = styled.textarea`
  width: 100%;
  height: 100px;
  font-size: 14px;
  border: 1px solid ${COLOR.BORDER_GRAY};
  padding: 10px;
  resize: none;
  border-radius: 5px;
`;
const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  gap: 10px;
  background-color: ${COLOR.LIGHT_GRAY};
  padding: 10px;
`;
